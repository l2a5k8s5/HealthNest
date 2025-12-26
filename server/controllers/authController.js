import User from "../models/user.js";
import { generateToken } from "../middlewares/auth.js";
import twilio from "twilio";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";

// ✅ Debug: Check if credentials are loaded
console.log("Twilio Config Check:", {
  ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ? "✓ Loaded" : "❌ MISSING",
  AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ? "✓ Loaded" : "❌ MISSING",
  PHONE: process.env.TWILIO_PHONE || "❌ MISSING",
});

// ✅ Initialize Twilio client
let twilioClient = null;

function getTwilioClient() {
  if (!twilioClient) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    
    if (!accountSid || !authToken) {
      console.error("❌ Twilio credentials missing!");
      console.log("ACCOUNT_SID:", accountSid || "MISSING");
      console.log("AUTH_TOKEN:", authToken ? "EXISTS" : "MISSING");
      throw new Error("Twilio credentials not configured");
    }
    
    twilioClient = twilio(accountSid, authToken);
    console.log("✓ Twilio client initialized");
  }
  return twilioClient;
}

export const sendVerificationCode = async (
  verificationMethod,
  verificationCode,
  name,
  email,
  phone
) => {
  try {
    if (verificationMethod === "email") {
      const message = generateEmailTemplate(verificationCode);

      await sendEmail({
        email,
        subject: "Your Verification Code",
        message,
      });

      return {
        success: true,
        message: `Verification email sent to ${email}`,
      };
    }

    if (verificationMethod === "phone") {
      // ✅ Get client when needed (after env vars are loaded)
      const client = getTwilioClient();
      
      // Normalize phone number for India
      let normalizedPhone = phone;
      if (!normalizedPhone.startsWith("+")) {
        normalizedPhone = "+91" + normalizedPhone.replace(/^0+/, '');
      }

      console.log("📞 Attempting to call:", normalizedPhone);
      console.log("📞 From number:", process.env.TWILIO_PHONE);

      const verificationCodeWithSpace = verificationCode
        .toString()
        .split("")
        .join(" ");

      const call = await client.calls.create({
        twiml: `<Response><Say voice="alice" language="en-IN">Your verification code is ${verificationCodeWithSpace}. I repeat, your verification code is ${verificationCodeWithSpace}.</Say></Response>`,
        from: process.env.TWILIO_PHONE,
        to: normalizedPhone,
      });

      console.log("✓ Call initiated successfully. SID:", call.sid);

      return { 
        success: true, 
        message: "OTP sent via call",
        callSid: call.sid 
      };
    }

    throw new Error("Invalid verification method");

  } catch (error) {
    console.error("❌ Error sending verification code:", error);
    
    // More specific error messages
    if (error.code === 21608) {
      throw new Error("Phone number is not verified. Add it to Twilio verified caller IDs.");
    }
    if (error.code === 21211) {
      throw new Error("Invalid 'To' phone number format.");
    }
    if (error.code === 21606) {
      throw new Error("Phone number is not a valid mobile number.");
    }
    
    throw new Error(`Verification failed: ${error.message}`);
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const phone = req.body.phone?.replace(/\D/g, "").slice(-10);
    const otp = req.body.otp;

    // Phone validation
    if (phone && !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    const userAllEnteries = await User.find({
      accountVerified: false,
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : []),
      ],
    }).sort({ createdAt: -1 });

    if (userAllEnteries.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = userAllEnteries[0];

    if (!otp || user.verificationCode !== Number(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (Date.now() > new Date(user.verificationCodeExpire).getTime()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;

    await user.save({ validateModifiedOnly: true });

    sendToken(user, 200, "Account Verified", res);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, verificationMethod } = req.body;

    // Validation
    if (!verificationMethod) {
      return res.status(400).json({
        success: false,
        message: "Verification method is required (email or phone)"
      });
    }

    // Phone validation for Indian numbers
    function ValidatePhoneNumber(phone) {
      const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers start with 6-9
      return phoneRegex.test(phone);
    }

    if (verificationMethod === "phone" && !ValidatePhoneNumber(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit Indian phone number"
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists && userExists.accountVerified) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const registrationAttemptsByUser = await User.find({
      $or: [
        { phone, accountVerified: false },
        { email, accountVerified: false },
      ],
    });

    if (registrationAttemptsByUser.length > 3) {
      return res.status(400).json({
        success: false,
        message: "Maximum registration attempts exceeded",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role && (role === 'admin' || role === 'user') ? role : 'user'
    });

    const verificationCode = await user.generateVerificationCode();
    await user.save();

    // Send verification code
    const verificationResult = await sendVerificationCode(
      verificationMethod,
      verificationCode,
      name,
      email,
      phone
    );

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: `User registered successfully. ${verificationResult.message}`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ME =================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, email },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE PASSWORD =================
export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add/Update address
// @route   POST /api/auth/address
// @access  Private

export const addAddress = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const user = await User.findById(req.user._id);

    // If first address OR marked default → unset others
    if (user.addresses.length === 0 || req.body.isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    user.addresses.push(req.body);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// @desc    Delete address
// @route   DELETE /api/auth/address/:addressId
// @access  Private
export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    user.addresses = user.addresses.filter(
      addr => addr._id.toString() !== req.params.addressId
    );
    
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
      addresses: user.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ==========================================
// ADMIN CREATION CONTROLLERS
// ==========================================

// @desc    Create Admin User (Secure with secret key)
// @route   POST /api/auth/create-admin
// @access  Public (Protected by secret key)
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, adminSecret } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check admin secret key
    const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || makhana-enterprise-2024-secret;
    
    if (!adminSecret) {
      return res.status(403).json({
        success: false,
        message: 'Admin secret key is required'
      });
    }

    if (adminSecret !== ADMIN_SECRET) {
      return res.status(403).json({
        success: false,
        message: 'Invalid admin secret key'
      });
    }
    console.log('Expected Secret:', process.env.ADMIN_SECRET_KEY);
console.log('Received Secret:', adminSecret);

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create admin user
    const admin = await User.create({
      name,
      email,
      password,
      phone,
      role: 'admin'  // Force admin role
    });

    // Generate JWT token
    const token = generateToken(admin._id);

    // Send response
    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role  // This will be 'admin'
      }
    });

  } catch (error) {
    console.error('Create Admin Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create First Admin (No Secret Required - Use Once Only)
// @route   POST /api/auth/create-first-admin
// @access  Public (Remove this route after creating first admin)
export const createFirstAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if any admin exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists. Use create-admin endpoint with secret key.'
      });
    }

    // Validate required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create first admin user
    const admin = await User.create({
      name,
      email,
      password,
      phone,
      role: 'admin'
    });

    // Generate JWT token
    const token = generateToken(admin._id);

    // Send response
    res.status(201).json({
      success: true,
      message: 'First admin user created successfully! Please remove this endpoint.',
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Create First Admin Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Promote User to Admin (Admin Only)
// @route   PUT /api/auth/promote-to-admin/:userId
// @access  Private/Admin
export  const promoteToAdmin = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if user exists
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if already admin
    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'User is already an admin'
      });
    }

    // Promote to admin
    user.role = 'admin';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User promoted to admin successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Promote to Admin Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};





function generateEmailTemplate(verificationCode){
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2>
      <p style="font-size: 16px; color: #333;">Dear User,</p>
      <p style="font-size: 16px; color: #333;">Your verification code is:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
          ${verificationCode}
        </span>
      </div>
      <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 10 minutes.</p>
      <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
      <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
        <p>Thank you,<br>Your Company Team</p>
        <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
      </footer>
    </div>
  `;
}


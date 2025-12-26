import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    addresses: [
      {
        fullName: String,
        phone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        pincode: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    avatar: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verificationCode: Number,
    verificationCodeExpire:Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
      type: Date,
      default: Date.now,
    },
    accountVerified:{
      type:Boolean,
      default:false
    },
    
  },
  
  {
    timestamps: true,
  }
);

// 🔐 Encrypt password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return ; // ✅ important
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 🔑 Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.generateVerificationCode= async function (){
  function generateRandomFiveDigit(){
    const firstDigit=Math.floor(Math.random()*9)+1;
    const remainingDigit=Math.floor(Math.random()*10000).toString().padStart(4,0);

    return parseInt(firstDigit+remainingDigit);
  }
  const verificationCode=generateRandomFiveDigit();
  this.verificationCode = verificationCode;
  this.verificationCodeExpire=Date.now()+5*60*1000;

  return verificationCode;

}



// ✅ EXPORT MODEL
const User = mongoose.model("User", userSchema);
export default User;

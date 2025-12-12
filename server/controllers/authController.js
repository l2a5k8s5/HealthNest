import User from "../models/user";
import { generateToken, generateToken } from "../middlewares/auth";
import { generateToken } from './../middlewares/auth';


export const register=async(req,res)=>{
    try{
        const {name,email,password,phone,role}=req.body;
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success:false,
                message:"User with this E-mail already exists"
            });
        }


        const user=await User.create({
            name,
            email,
            password,
            phone,
            role:'User' // Default to user
        });

        const generateToken=generateToken(user._id);
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                role:user.role  
                
            }
        });

    }catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }

};


export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'Please Provide email and Password'
            })
        }

        const user=await User.findOne({email}).select('+password');
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            });
        }

        const isMatch=await user.matchPassword(password);
        if(!isMatch) {
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            });
        }

        if(!user.isActive){
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated. Please contact support.'
              });
        }

        const token=generateToken(user._id);
        res.status(200).json({
            success:true,
            message:"Login Successfull",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                role:user.role,
            }
        });
    }catch(error)
    {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private


export const getMe  =async(req,res)=>{
    try{
        const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// @desc    Update user profile
// @route   PUT /api/auth/updateprofile
// @access  Private


export const updateProfile=async(req,res)=>{
    try {
        const { name, phone, email } = req.body;
    
        const user = await User.findByIdAndUpdate(
          req.user.id,
          { name, phone, email },
          { new: true, runValidators: true }
        );
    
        res.status(200).json({
          success: true,
          message: 'Profile updated successfully',
          user
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
}


// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
export const updatePassword = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('+password');
  
      // Check current password
      if (!(await user.matchPassword(req.body.currentPassword))) {
        return res.status(401).json({
          success: false,
          message: 'Password is incorrect'
        });
      }
  
      user.password = req.body.newPassword;
      await user.save();
  
      const token = generateToken(user._id);
  
      res.status(200).json({
        success: true,
        message: 'Password updated successfully',
        token
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  
// @desc    Add/Update address
// @route   POST /api/auth/address
// @access  Private
export const addAddress = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      // If this is the first address or marked as default, make it default
      if (user.addresses.length === 0 || req.body.isDefault) {
        user.addresses.forEach(addr => addr.isDefault = false);
      }
  
      user.addresses.push(req.body);
      await user.save();
  
      res.status(200).json({
        success: true,
        message: 'Address added successfully',
        addresses: user.addresses
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
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
  
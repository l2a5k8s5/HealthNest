import mongoose from "mongoose";
const reviewSchema=new mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      rating: {
        type: Number,
        required: [true, 'Please add a rating'],
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        required: [true, 'Please add a comment']
      },
      isVerifiedPurchase: {
        type: Boolean,
        default: false
      },
      images: [{
        url: String,
        public_id: String
      }],
      likes: {
        type: Number,
        default: 0
      },
      isApproved: {
        type: Boolean,
        default: true
      }
    }, {
      timestamps: true
    });
    
    // Prevent duplicate reviews
    reviewSchema.index({ product: 1, user: 1 }, { unique: true });
    
export default reviewSchema;
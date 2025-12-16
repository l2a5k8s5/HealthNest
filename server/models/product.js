import mongoose from "mongoose";

const product= new   mongoose.Schema({
    name : {
        type : String,
        required: [true, 'Please add Product name'],
        trim  :true,

    },
    description :{
        type : String,
        required :[true,'Plaese ad Product description'],
    },
    price : {
        type : Number,
        required: [true, 'Please add product price'],
        min: 0
    },
    discountPrice: {
        type: Number,
        default: 0,
        min: 0
    },
    category: {
        type: String,
        required: [true, 'Please add product category'],
        enum: ['makhana', 'dry-fruits', 'honey', 'laddoo', 'combo', 'other']
    },
    subCategory: {
        type: String,
        // For makhana: Plain Salted, Peri Peri, Pudina, Cheese & Herbs, Caramel, Tangy Tomato, Classic Masala
        // For dry-fruits: Almonds, Cashews, Mixed Nuts, etc.
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        min: 0,
        default: 0
      },
      weight: {
        value: {
          type: Number,
          required: true
        },
        unit: {
          type: String,
          enum: ['gm', 'kg', 'piece'],
          default: 'gm'
        }
      },
      variants: [{
        weight: String,
        price: Number,
        stock: Number
      }],
      nutritionalInfo: {
        calories: String,
        protein: String,
        carbs: String,
        fat: String,
        fiber: String
      },
      ingredients: [String],
      shelfLife: String,
      features: [String],
      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      numReviews: {
        type: Number,
        default: 0
      },
      isFeatured: {
        type: Boolean,
        default: false
      },
      isActive: {
        type: Boolean,
        default: true
      },
      tags: [String],
      soldCount: {
        type: Number,
        default: 0
      }
    }, {
      timestamps: true
    });
product.index({ name: 'text', description: 'text', tags: 'text' });
const Product = mongoose.model("Product", product);

export default Product;
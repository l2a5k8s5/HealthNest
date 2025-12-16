import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",          // ✅ Use correct model name
      required: true,
      unique: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1
        },
        price: {
          type: Number,
          required: true
        },
        weight: String
      }
    ],

    totalAmount: {
      type: Number,
      default: 0
    },

    totalItems: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true   // ✅ CORRECT PLACE
  }
);

cartSchema.pre("save", function (next) {
  this.totalItems = this.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  this.totalAmount = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

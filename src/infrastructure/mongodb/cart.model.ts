import { Schema, model } from 'mongoose';

const CartItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true }
  },
  { _id: false }
);

const CartSchema = new Schema(
  {
    items: {
      type: [CartItemSchema],
      default: []
    }
  },
  { timestamps: true }
);

export const CartModel = model('Cart', CartSchema);

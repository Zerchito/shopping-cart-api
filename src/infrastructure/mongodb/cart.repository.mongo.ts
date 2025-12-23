import { CartRepository } from '../../domain/cart/cart.repository';
import { Cart } from '../../domain/cart/cart.types';
import { CartModel } from './cart.model';

export class MongoCartRepository implements CartRepository {
  async save(cart: Cart): Promise<Cart & { id: string }> {
    const created = await CartModel.create(cart);

    return {
      id: created._id.toString(),
      items: created.items,
      totalItems: cart.totalItems
    };
  }

  async findById(id: string): Promise<(Cart & { id: string }) | null> {
    const found = await CartModel.findById(id).lean();
    if (!found) return null;

    return {
      id: found._id.toString(),
      items: found.items,
      totalItems: found.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
    };
  }
  async deleteById(id: string): Promise<void> {
    await CartModel.findByIdAndDelete(id);
  }
}

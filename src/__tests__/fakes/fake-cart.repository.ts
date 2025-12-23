import { CartRepository } from '../../domain/cart/cart.repository';
import { Cart } from '../../domain/cart/cart.types';

export class FakeCartRepository implements CartRepository {
  private cart: Cart | null = null;

  async save(cart: Cart): Promise<Cart> {
    this.cart = cart;
    return cart;
  }

  async findById(_id: string): Promise<Cart | null> {
    return this.cart;
  }

  async deleteById(_id: string): Promise<void> {
    this.cart = null;
  }
}

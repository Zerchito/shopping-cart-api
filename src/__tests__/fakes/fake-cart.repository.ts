import { CartRepository } from '../../domain/cart/cart.repository';
import { Cart } from '../../domain/cart/cart.types';

type CartWithId = Cart & { id: string };

export class FakeCartRepository implements CartRepository {
  private cart: CartWithId | null = null;
  private idCounter = 1;

  async save(cart: Cart): Promise<CartWithId> {
    // Si el carrito ya tiene id, lo preservamos
    if (this.cart) {
      this.cart = { ...cart, id: this.cart.id };
      return this.cart;
    }

    // Simulamos creación de ID (como Mongo)
    const newCart: CartWithId = {
      ...cart,
      id: String(this.idCounter++)
    };

    this.cart = newCart;
    return newCart;
  }

  async findById(_id: string): Promise<CartWithId | null> {
    return this.cart;
  }

  async deleteById(_id: string): Promise<void> {
    this.cart = null;
  }
}

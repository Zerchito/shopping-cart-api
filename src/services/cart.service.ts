import { CartRepository } from "../domain/cart/cart.repository";
import { Cart, CartItem } from "../domain/cart/cart.types";
import { calculateTotalItems } from "../domain/cart/cart.utils";
import { InvalidQuantityError } from "../domain/cart/errors/invalid-quantity.error";
import { ItemNotFoundError } from "../domain/cart/errors/item-not-found.error";

export class CartService {

  constructor(private readonly cartRepository: CartRepository) { }

  createCart(): Cart {
    return {
      items: [],
      totalItems: 0
    };
  }

  addItem(cart: Cart, item: CartItem): Cart {
    if (item.quantity <= 0) {
      throw new InvalidQuantityError();
    }

    const existingItem = cart.items.find(
      (i) => i.productId === item.productId
    );

    if (existingItem) {
      const updatedItems = cart.items.map((i) =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );

      return {
        items: updatedItems,
        totalItems: calculateTotalItems(updatedItems)
      };
    }

    const updatedItems = [...cart.items, item];

    return {
      items: updatedItems,
      totalItems: calculateTotalItems(updatedItems)
    };
  }

  removeItem(cart: Cart, productId: string): Cart {
    const itemToRemove = cart.items.find(
      (item) => item.productId === productId
    );

    if (!itemToRemove) {
      throw new ItemNotFoundError();
    }

    const updatedItems = cart.items.filter(
      (item) => item.productId !== productId
    );

    return {
      items: updatedItems,
      totalItems: calculateTotalItems(updatedItems)
    };
  }

  updateItemQuantity(
    cart: Cart,
    productId: string,
    quantity: number
  ): Cart {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (!existingItem) {
      throw new Error('Item not found in cart');
    }

    const updatedItems = cart.items.map((item) =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    );

    return {
      items: updatedItems,
      totalItems: calculateTotalItems(updatedItems)
    };
  }

  clearCart(cart: Cart): Cart {
    return {
      items: [],
      totalItems: 0
    };
  }

  async saveCart(cart: Cart): Promise<Cart> {
    return this.cartRepository.save(cart);
  }

  async getCartById(id: string): Promise<Cart | null> {
    return this.cartRepository.findById(id);
  }

  async deleteCart(id: string): Promise<void> {
    await this.cartRepository.deleteById(id);
  }
}
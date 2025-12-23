import { Cart } from './cart.types';

export interface CartRepository {
  save(cart: Cart): Promise<Cart & { id: string }>;
  findById(id: string): Promise<(Cart & { id: string }) | null>;
  deleteById(id: string): Promise<void>;
}

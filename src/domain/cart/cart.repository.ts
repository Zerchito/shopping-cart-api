import { Cart } from './cart.types';

export interface CartRepository {
  save(cart: Cart): Promise<Cart>;
  findById(id: string): Promise<Cart | null>;
  deleteById(id: string): Promise<void>;
}
import { Request, Response } from 'express';
import { CartService } from '../services/cart.service';
import { InvalidQuantityError } from '../domain/cart/errors/invalid-quantity.error';
import { ItemNotFoundError } from '../domain/cart/errors/item-not-found.error';

export class CartController {
  constructor(private readonly cartService: CartService) { }

  createCart = async (_req: Request, res: Response) => {
    const cart = this.cartService.createCart();
    const saved = await this.cartService.saveCart(cart);
    res.status(201).json(saved);
  };

  getCart = async (req: Request, res: Response) => {
    const cart = await this.cartService.getCartById(req.params.id);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  };

  addItem = async (req: Request, res: Response) => {
    try {
      const cart = await this.cartService.getCartById(req.params.id);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const updatedCart = this.cartService.addItem(cart, req.body);
      const saved = await this.cartService.saveCart(updatedCart);

      res.json(saved);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  removeItem = async (req: Request, res: Response) => {
    try {
      const cart = await this.cartService.getCartById(req.params.id);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const updatedCart = this.cartService.removeItem(
        cart,
        req.params.productId
      );

      const saved = await this.cartService.saveCart(updatedCart);
      res.json(saved);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  clearCart = async (req: Request, res: Response) => {
    const cart = await this.cartService.getCartById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cleared = this.cartService.clearCart(cart);
    const saved = await this.cartService.saveCart(cleared);

    res.json(saved);
  };

  private handleError(error: unknown, res: Response) {
    if (error instanceof InvalidQuantityError) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof ItemNotFoundError) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
}

import { CartService } from '../../services/cart.service';
import { FakeCartRepository } from '../fakes/fake-cart.repository';

describe('CartService', () => {

  describe('CartService - create cart', () => {
    it('should create an empty cart', () => {
      const cartService = new CartService(new FakeCartRepository());

      const cart = cartService.createCart();

      expect(cart).toBeDefined();
      expect(cart.items).toEqual([]);
      expect(cart.totalItems).toBe(0);
    });
  });

  describe('CartService - add item', () => {
    it('should add an item to the cart', () => {
      const cartService = new CartService(new FakeCartRepository());
      const cart = cartService.createCart();

      const updatedCart = cartService.addItem(cart, {
        productId: 'product-1',
        quantity: 2
      });

      expect(updatedCart.items.length).toBe(1);
      expect(updatedCart.items[0]).toEqual({
        productId: 'product-1',
        quantity: 2
      });
      expect(updatedCart.totalItems).toBe(2);
    });
  });

  describe('CartService - add same product twice', () => {
    it('should merge quantities when adding the same product', () => {
      const cartService = new CartService(new FakeCartRepository());
      const cart = cartService.createCart();

      const cartWithFirstItem = cartService.addItem(cart, {
        productId: 'product-1',
        quantity: 2
      });

      const updatedCart = cartService.addItem(cartWithFirstItem, {
        productId: 'product-1',
        quantity: 3
      });

      expect(updatedCart.items.length).toBe(1);
      expect(updatedCart.items[0]).toEqual({
        productId: 'product-1',
        quantity: 5
      });
      expect(updatedCart.totalItems).toBe(5);
    });
  });

  describe('CartService - invalid quantities', () => {
    it('should throw an error when adding item with zero quantity', () => {
      const cartService = new CartService(new FakeCartRepository());
      const cart = cartService.createCart();

      expect(() =>
        cartService.addItem(cart, {
          productId: 'product-1',
          quantity: 0
        })
      ).toThrow('Quantity must be greater than zero');
    });

    it('should throw an error when adding item with negative quantity', () => {
      const cartService = new CartService(new FakeCartRepository());
      const cart = cartService.createCart();

      expect(() =>
        cartService.addItem(cart, {
          productId: 'product-1',
          quantity: -2
        })
      ).toThrow('Quantity must be greater than zero');
    });
  });

  describe('CartService - remove item', () => {
    it('should remove an item from the cart', () => {
      const cartService = new CartService(new FakeCartRepository());
      const cart = cartService.createCart();

      const cartWithItems = cartService.addItem(cart, {
        productId: 'product-1',
        quantity: 3
      });

      const updatedCart = cartService.removeItem(cartWithItems, 'product-1');

      expect(updatedCart.items).toEqual([]);
      expect(updatedCart.totalItems).toBe(0);
    });

    it('should throw an error when removing a non-existing item', () => {
      const cartService = new CartService(new FakeCartRepository());
      const cart = cartService.createCart();

      expect(() =>
        cartService.removeItem(cart, 'product-1')
      ).toThrow('Item not found in cart');
    });
  });

  describe('CartService - update item quantity', () => {
    it('should update the quantity of an existing item', () => {
      const cartService = new CartService(new FakeCartRepository());
      const cart = cartService.createCart();

      const cartWithItem = cartService.addItem(cart, {
        productId: 'product-1',
        quantity: 2
      });

      const updatedCart = cartService.updateItemQuantity(
        cartWithItem,
        'product-1',
        5
      );

      expect(updatedCart.items).toEqual([
        { productId: 'product-1', quantity: 5 }
      ]);
      expect(updatedCart.totalItems).toBe(5);
    });

    it('should throw an error when updating a non-existing item', () => {
      const cartService = new CartService(new FakeCartRepository());
      const cart = cartService.createCart();

      expect(() =>
        cartService.updateItemQuantity(cart, 'product-1', 3)
      ).toThrow('Item not found in cart');
    });

    it('should throw an error when setting an invalid quantity', () => {
      const cartService = new CartService(new FakeCartRepository());
      const cart = cartService.createCart();

      const cartWithItem = cartService.addItem(cart, {
        productId: 'product-1',
        quantity: 2
      });

      expect(() =>
        cartService.updateItemQuantity(cartWithItem, 'product-1', 0)
      ).toThrow('Quantity must be greater than zero');
    });
  });

  describe('CartService - clear cart', () => {
    it('should remove all items from the cart', () => {
      const cartService = new CartService(new FakeCartRepository());
      const cart = cartService.createCart();

      const cartWithItems = cartService.addItem(cart, {
        productId: 'product-1',
        quantity: 3
      });

      const clearedCart = cartService.clearCart(cartWithItems);

      expect(clearedCart.items).toEqual([]);
      expect(clearedCart.totalItems).toBe(0);
    });
  });
})

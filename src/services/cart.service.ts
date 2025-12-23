type CartItem = {
  productId: string;
  quantity: number;
};

type Cart = {
  items: CartItem[];
  totalItems: number;
};

export class CartService {
  createCart(): Cart {
    return {
      items: [],
      totalItems: 0
    };
  }

  addItem(cart: Cart, item: CartItem): Cart {
    if (item.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
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
        totalItems: cart.totalItems + item.quantity
      };
    }

    return {
      items: [...cart.items, item],
      totalItems: cart.totalItems + item.quantity
    };
  }
}
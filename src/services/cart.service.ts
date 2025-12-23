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
        const updatedItems = [...cart.items, item];

        return {
            items: updatedItems,
            totalItems: cart.totalItems + item.quantity
        };
    }
}
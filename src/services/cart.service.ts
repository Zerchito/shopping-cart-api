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
}
import { CartItem } from './cart.types';

export const calculateTotalItems = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
};
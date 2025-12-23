export class ItemNotFoundError extends Error {
    constructor() {
        super('Item not found in cart');
        this.name = 'ItemNotFoundError';
    }
}
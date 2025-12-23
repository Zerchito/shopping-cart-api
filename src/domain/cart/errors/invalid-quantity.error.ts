export class InvalidQuantityError extends Error {
    constructor() {
        super('Quantity must be greater than zero');
        this.name = 'InvalidQuantityError';
    }
}

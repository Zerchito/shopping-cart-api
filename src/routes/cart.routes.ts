import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { CartService } from '../services/cart.service';
import { MongoCartRepository } from '../infrastructure/mongodb/cart.repository.mongo';

const router = Router();

const cartRepository = new MongoCartRepository();
const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

router.post('/', cartController.createCart);
router.get('/:id', cartController.getCart);
router.post('/:id/items', cartController.addItem);
router.delete('/:id/items/:productId', cartController.removeItem);
router.delete('/:id/items', cartController.clearCart);

export default router;

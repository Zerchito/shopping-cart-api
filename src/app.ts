import express from 'express';
import cartRoutes from './routes/cart.routes';

const app = express();

app.use(express.json());

app.use('/carts', cartRoutes);

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default app;
import express from 'express';
import ordersRouter from './order';
// import dealsRouter from './deal';

const router = express.Router();

// router.use('/deals', dealsRouter);
router.use('/orders', ordersRouter);

export default router;

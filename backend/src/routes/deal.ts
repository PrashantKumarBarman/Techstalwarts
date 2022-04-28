import express from 'express';
import dealController from '../controllers/deal';

let router = express.Router();

router.put('/cancel/:id', dealController.cancelDeal);

router.post('/agreement', dealController.generateAgreement);

router.get('/', dealController.getDeal);

export default router;
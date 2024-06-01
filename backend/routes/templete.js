import express from 'express';
import {createNewTemplete,deleteTemplete,getAllTempletes, getTempleteById,updateTemplete} from '../controllers/templete.js';
const router = express.Router();

router.get('/all',getAllTempletes );
router.post('/create', createNewTemplete );
router.get('/:TempleteID', getTempleteById );
router.put('/:TempleteID',  updateTemplete);
router.delete('/:TempleteID', deleteTemplete );

export default router;
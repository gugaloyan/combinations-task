import express, { Request, Response } from 'express';
import { createCombinations, generateItems } from '../services/itemService';
import { insertDataWithTransaction } from '../services/dbService';
import { ResponseData } from '../types/responseType';

const router = express.Router();


router.post('/generate', async (req: Request, res: Response) => {
    const { items, length } = req.body;

    if (!Array.isArray(items)) {
         res.status(400).json({ error: 'Invalid input' });
        return;
    }

    try {
        const generatedItems = generateItems(items);
        const combinations = createCombinations(generatedItems, length);
        const response: ResponseData = await insertDataWithTransaction(generatedItems, combinations);

        res.status(200).json(response);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;

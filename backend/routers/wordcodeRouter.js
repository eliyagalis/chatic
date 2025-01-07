import express from 'express';
import { checkWord } from '../controllers/wordcodeController.js';



const wordcodeRouter = express();

wordcodeRouter.route('/check').post(checkWord);

export default wordcodeRouter;
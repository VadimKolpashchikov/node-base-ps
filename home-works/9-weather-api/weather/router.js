import express from 'express';
import getWeatherByCity from './controllers/getWeatherByCity.js';

const router = express.Router();

router.get('/:city', getWeatherByCity);

export { router as weatherRouter };

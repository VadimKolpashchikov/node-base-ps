import { getWeather } from '../services/api.service.js';

export default async (req, res) => {
  const { city } = req.params;

  if (!city) {
    throw new Error('Не указан город');
  }

  const weather = await getWeather(city);
  res.json(weather);
};

import { getKeyValue, KEYS_ENUM } from './storage.service.js';
import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (city) => {
  const token = process.env.TOKEN || (await getKeyValue(KEYS_ENUM.token));
  const lang = process.env.LANGUAGE || (await getKeyValue(KEYS_ENUM.lang));

  if (!token) {
    throw new Error(
      'Получение погоды не возможно - API-токен не задан! Используйте -t [API_KEY] для установки.',
    );
  }

  const { data } = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: token,
      lang: lang ?? 'en',
      units: 'metric',
    },
  });

  return data;
};

const iconMap = {
  '01': '☀️',
  '02': '🌤',
  '03': '☁️',
  '04': '☁️',
  '09': '🌧',
  10: '🌦',
  11: '⛈',
  13: '❄️',
  50: '🌫',
};

export const getIconByCode = (code) => {
  const iconKey = code.slice(0, 2);

  return iconMap[iconKey] || iconMap['01'];
};

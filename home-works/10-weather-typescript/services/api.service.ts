import { getKeyValue } from './storage.service.js';
import { KEYS_ENUM } from '../types/storageKeys.js';
import type { WeatherData } from '../types/weather.js';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (
  city: string,
): Promise<{
  data: WeatherData;
  response: Response;
}> => {
  const token = process.env.TOKEN || (await getKeyValue(KEYS_ENUM.Token));
  const lang = process.env.LANGUAGE || (await getKeyValue(KEYS_ENUM.Lang));

  if (!token) {
    throw new Error(
      'Получение погоды не возможно - API-токен не задан! Используйте -t [API_KEY] для установки.',
    );
  }

  const url = new URL(BASE_URL);
  url.searchParams.set('q', city);
  url.searchParams.set('appid', token);
  url.searchParams.set('lang', lang ?? 'ru');
  url.searchParams.set('units', 'metric');

  const response = await fetch(url);

  if (response.status == 404) {
    throw new Error(
      'Неверно указан город! Используйте -s [CITY] для установки.',
    );
  }
  if (response.status == 401) {
    throw new Error(
      'Неверно указан API-токен! Используйте -t [API_KEY] для установки.',
    );
  }

  if (!response.ok) {
    throw new Error('Не удалось получить данные о погоде.');
  }

  const data: WeatherData = await response.json();

  return {
    data,
    response,
  };
};

const iconMap: Record<string, string> = {
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

export const getIconByCode = (code: string): string => {
  const iconKey = code.slice(0, 2);

  return iconMap[iconKey] || iconMap['01']!;
};

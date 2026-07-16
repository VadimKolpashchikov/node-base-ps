import { TOKEN, BASE_URL } from '../storages/weather.js';

export const getWeather = async (city) => {
  const url = new URL(BASE_URL);
  url.searchParams.set('q', city);
  url.searchParams.set('appid', TOKEN);
  url.searchParams.set('lang', 'ru');
  url.searchParams.set('units', 'metric');

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok && data.message) {
      throw new Error(data.message);
    } else {
      return data;
    }
  } catch (e) {
    console.log(e);
    e.stack = '';
    e.message = `Не удалось получить данные о погоде: ${e.message}`;
    throw e;
  }
};

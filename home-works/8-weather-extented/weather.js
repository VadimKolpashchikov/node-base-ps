#!/usr/bin/env node
process.stdout.setEncoding('utf8');

import { parseArgs } from './helpers/args.js';
import { getIconByCode, getWeather } from './services/api.service.js';
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from './services/log.service.js';
import {
  saveKeyValue,
  KEYS_ENUM,
  getKeyValue,
} from './services/storage.service.js';

const saveToken = async (token) => {
  try {
    if (!token.length) {
      throw new Error('Невалидный формат token!');
    }

    await saveKeyValue(KEYS_ENUM.token, token);
    printSuccess('Токен успешно сохранён.');
  } catch (err) {
    if (err instanceof Error) {
      printError(err.message);
    } else {
      printError(err);
    }
  }
};

const saveLang = async (lang) => {
  try {
    if (!lang.length) {
      throw new Error('Невалидный формат языка!');
    }

    await saveKeyValue(KEYS_ENUM.lang, lang);
    printSuccess('Язык успешно сохранён.');
  } catch (err) {
    if (err instanceof Error) {
      printError(err.message);
    } else {
      printError(err);
    }
  }
};

const saveCity = async (cityName) => {
  try {
    if (!cityName.length) {
      throw new Error('Невалидный формат города!');
    }

    saveKeyValue(KEYS_ENUM.city, cityName);
    printSuccess('Город успешно сохранён.');
  } catch (e) {
    if (e instanceof Error) {
      printError(e.message);
    } else {
      printError(e);
    }
  }
};

const getForecast = async () => {
  try {
    const cityString = process.env.CITY ?? (await getKeyValue(KEYS_ENUM.city));
    const cities = cityString.includes(',')
      ? cityString.split(',').map((str) => str.trim())
      : [cityString];

    const weathers = await Promise.all(cities.map((city) => getWeather(city)));

    return weathers;
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('Неверно указан город! Используйте -s [CITY] для установки.');
    } else if (e?.response?.status == 401) {
      printError(
        'Неверно указан API-токен! Используйте -t [API_KEY] для установки.',
      );
    } else if (e instanceof Error) {
      printError(e.message);
    } else {
      printError(e);
    }
  }
};

const initCli = async () => {
  const args = parseArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.l) {
    return saveLang(args.l);
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  const weatherDataList = await getForecast();

  return weatherDataList.forEach((data) => {
    printWeather(data, getIconByCode(data.weather[0].icon));
  });
};

initCli();

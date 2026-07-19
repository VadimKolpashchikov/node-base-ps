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
import { saveKeyValue, getKeyValue } from './services/storage.service.js';
import { KEYS_ENUM } from './types/storageKeys.js';
import type { WeatherData } from './types/weather.js';

const saveToken = async (token: string) => {
  try {
    if (!token.length) {
      throw new Error('Невалидный формат token!');
    }

    await saveKeyValue(KEYS_ENUM.Token, token);
    printSuccess('Токен успешно сохранён.');
  } catch (err) {
    if (err instanceof Error) {
      printError(err.message);
    } else {
      printError(err);
    }
  }
};

const saveLang = async (lang: string) => {
  try {
    if (!lang.length) {
      throw new Error('Невалидный формат языка!');
    }

    await saveKeyValue(KEYS_ENUM.Lang, lang);
    printSuccess('Язык успешно сохранён.');
  } catch (err) {
    if (err instanceof Error) {
      printError(err.message);
    } else {
      printError(err);
    }
  }
};

const saveCity = async (cityName: string) => {
  try {
    if (!cityName.length) {
      throw new Error('Невалидный формат города!');
    }

    saveKeyValue(KEYS_ENUM.City, cityName);
    printSuccess('Город успешно сохранён.');
  } catch (e) {
    if (e instanceof Error) {
      printError(e.message);
    } else {
      printError(e);
    }
  }
};

const getForecasts = async (): Promise<WeatherData[] | void> => {
  try {
    const cityString =
      process.env.CITY ?? (await getKeyValue(KEYS_ENUM.City)) ?? '';

    const cities = cityString.includes(',')
      ? cityString.split(',').map((str) => str.trim())
      : [cityString];

    const weathers = await Promise.all(cities.map((city) => getWeather(city)));

    return weathers.map(({ data }) => data);
  } catch (e) {
    if (e instanceof Error) {
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

  if (args.l && typeof args.l === 'string') {
    return saveLang(args.l);
  }

  if (args.s && typeof args.s === 'string') {
    return saveCity(args.s);
  }

  if (args.t && typeof args.t === 'string') {
    return saveToken(args.t);
  }

  const weatherDataList = await getForecasts();

  return weatherDataList?.forEach((data) => {
    printWeather(data, getIconByCode(data.weather[0]?.icon!));
  });
};

initCli();

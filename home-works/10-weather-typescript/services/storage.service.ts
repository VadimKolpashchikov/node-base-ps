import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

export const saveKeyValue = async (
  key: string,
  value: string,
): Promise<void> => {
  let data: Record<string, string> = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file.toString('utf8'));
  }

  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key: string): Promise<string | undefined> => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file.toString('utf-8'));
    return data[key];
  }

  return undefined;
};

const isExist = async (path: string): Promise<boolean> => {
  try {
    await promises.stat(path);
    return true;
  } catch {
    return false;
  }
};

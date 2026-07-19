import chalk from 'chalk';
import dedent from 'dedent';
import { capitalize } from '../helpers/string.js';

export const printError = (err) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + err);
};

export const printSuccess = (msg) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg);
};

export const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(' HELP ')}
    Вызов без параметров - вывод погоды.
    ${chalk.cyan('-s [CITY]')} - установить город.
    ${chalk.cyan('-t [API_KEY]')} - установить API Token.
    ${chalk.cyan('-h')} - Вывод справки.
    `,
  );
};

export const printWeather = (data, icon) => {
  console.log(
    dedent`${chalk.bgYellowBright(' WEATHER ')} Погода в ${data.name}
    ${icon}  ${chalk.bgWhite(' ' + capitalize(data.weather[0].description) + ' ')} ${icon}
    Температура: ${data.main.temp}°C (ощущается как ${data.main.feels_like}°C)
    Влажность: ${data.main.humidity}%
    Скорость ветра: ${data.wind.speed}м/сек
    `,
  );
};

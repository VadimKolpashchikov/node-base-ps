export const parseArgs = (args) => {
  const res = {};

  const [exec, file, ...rest] = args;

  rest.forEach((arg, idx, array) => {
    if (arg.charAt(0) === '-') {
      const nextArg = array[idx + 1];
      const key = arg.substring(1);

      if (!key) return;

      if (nextArg && nextArg.charAt(0) !== '-') {
        res[key] = nextArg;
      } else {
        res[key] = true;
      }
    }
  });

  return res;
};

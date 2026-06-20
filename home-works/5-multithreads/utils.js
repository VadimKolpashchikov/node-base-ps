export function remainder(array, divider = 1) {
  return array.reduce((acc, n) => {
    if (n % divider === 0) {
      acc += 1;
    }
    return acc;
  }, 0);
}

export function chunkArray(array, chunksCount) {
  const size = Math.ceil(array.length / chunksCount);
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

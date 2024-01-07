export const getRandomNumberInRange = (start: number, end: number) => {
  return Math.random() * (end - start) + start;
};

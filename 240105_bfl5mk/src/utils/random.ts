export const getRandomNumberInRange = (start: number, end: number) => {
  return Math.random() * (end - start) + start;
};

export const getRandomIntegerInRange = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start) + start);
};

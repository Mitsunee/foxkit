// returns random integer between min (inclusive) and max (exclusive)
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

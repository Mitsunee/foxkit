enum Unit {
  HOUR = 3600 * 1000,
  MINUTE = 60 * 1000,
  SECOND = 1000
}

const factorMap = new Map([
  ["h", Unit.HOUR],
  ["hour", Unit.HOUR],
  ["hours", Unit.HOUR],
  ["m", Unit.MINUTE],
  ["min", Unit.MINUTE],
  ["mins", Unit.MINUTE],
  ["s", Unit.SECOND],
  ["sec", Unit.SECOND],
  ["secs", Unit.SECOND]
]);

export function convertUnits(units: string, strict: boolean = true): number {
  const matches = units.match(
    /(?:[1-9]\d*)(?:h(?:ours?)?|m(?:s|ins?)?|s(?:ecs?)?)/g
  );

  if (!matches) {
    if (strict) throw new TypeError(`Could not find matches in ${units}`);
    return 0;
  }

  return matches.reduce((sum, pair) => {
    const n = Number.parseInt(pair);
    const unit = pair.slice(n.toString().length);
    const val = n * (factorMap.get(unit) || 1);

    return sum + val;
  }, 0);
}

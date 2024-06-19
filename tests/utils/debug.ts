export function getEnumFlagNames(enumObj: any, flags: number) {
  const allFlags = Object.keys(enumObj)
    .map(key => enumObj[key])
    .filter(value => typeof value === "number");
  const matchedFlags = allFlags.filter(flag => (flag & flags) !== 0);

  return matchedFlags
    .filter((flag, index) => matchedFlags.indexOf(flag) === index)
    .map(f => {
      const power = Math.log2(f);
      if(Number.isInteger(power)){
        return `${enumObj[f]} (2 ^ ${power})`;
      }
      return enumObj[f];
    });
}

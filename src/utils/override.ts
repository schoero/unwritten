
type AnyObject = {
  [key: string]: any;
};


export function override<Original extends AnyObject, Overrides extends AnyObject>(original: Original, overrides: Overrides): Original & Overrides {

  const result: Original & Overrides = <Original & Overrides>{};

  // Allow overriding whole object with {}
  if(Object.keys(overrides).length === 0){
    return overrides as Original & Overrides;
  }

  for(const originalKey in original){
    if(typeof original[originalKey] === "object" && typeof overrides[originalKey] === "object"){
      if(Array.isArray(original[originalKey]) || Array.isArray(overrides[originalKey])){
        // @ts-expect-error - TS type inference is not working here
        result[originalKey] = overrides[originalKey];
      } else {
      // @ts-expect-error - TS type inference is not working here
        result[originalKey] = override(original[originalKey], overrides[originalKey]);
      }
    } else {
      if(overrides[originalKey] !== undefined){
        // @ts-expect-error - TS type inference is not working here
        result[originalKey] = overrides[originalKey];
      } else {
        // @ts-expect-error - TS type inference is not working here
        result[originalKey] = original[originalKey];
      }
    }
  }

  for(const overrideKey in overrides){
    if(original[overrideKey] !== undefined){
      continue;
    }

    // @ts-expect-error - TS type inference is not working here
    result[overrideKey] = overrides[overrideKey];
  }

  return result;

}
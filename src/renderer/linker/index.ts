const _registry: Map<string, (string | number)[]> = new Map();

export function createAnchor(name: string, id: string | number): string {

  if(_registry.has(name)){
    const idArray = _registry.get(name)!;
    const idIndex = idArray.indexOf(id);
    if(idIndex === -1){
      idArray.push(id);
      _registry.set(name, idArray);
    }
  } else {
    _registry.set(name, [id]);
  }

  return getAnchor(name, id);

}


function getAnchor(name: string, id: string | number): string {

  if(!_registry.has(name)){
    return name;
  }

  const idArray = _registry.get(name)!;
  const idIndex = idArray.indexOf(id);

  if(idIndex === -1){
    return name;
  }

  return idIndex <= 0 ? name : `${name}-${idIndex}`;

}

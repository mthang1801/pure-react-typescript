export function getUniqueArrObj(arr, nameObject) {
  // store the comparison  values in array
  const unique = arr.map(e => e[nameObject])
    // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the false indexes & return unique objects
    .filter((e) => arr[e]).map(e => arr[e]);
  return unique;
}
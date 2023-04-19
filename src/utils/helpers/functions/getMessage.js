export const getMessage = (data) => {
  if (data !== undefined && data !== null) {
    let check = data;
    let result = "";
    if (Array.isArray(check)) {
      for (let i = 0; i < check.length; i++) {
        let arrObj = Object.keys(check[i]);
        for (let j = 0; j < arrObj.length; j++) {
          let obj = check[i];
          let name = arrObj[j];
          result = result + obj[name];
          if (i !== (check.length - 1) || j !== (arrObj.length - 1)) {
            result += '\n';
          }
        }
      }
    } else {
      result = data;
    }
    console.log(result)
    return result;
  }
  return '';
}

export const getMessageV1 = (data, icon) => {
  if (data !== undefined && data !== null) {
    let check = data;
    let result = "";
    if (Array.isArray(check)) {
      for (let i = 0; i < check.length; i++) {
        result += check[i];
        if (i !== (check.length - 1)) {
          result += icon || '\n';
        }
      }
    } else {
      result = data;
    }
    console.log(result)
    return result;
  }
  return '';
}

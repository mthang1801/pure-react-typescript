//for reactjs

// export const getBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     // resolve(img_b64_demo.replace(/^data:(.*,)?/, ''));
//     var reader = new FileReader();
//     reader.readAsDataURL(file);
//     // reader.onload = () => resolve(reader.result.replace(/^data:(.*,)?/, ''));
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = err => reject(err);
//     // this.setState({ listImageCMND: [...arr, { name: (change_alias(name)).replace(/\s/g, '') + '.' + nameFormat, urlBase64: base64 }] }); 
//   });
// };

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
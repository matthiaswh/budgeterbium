// thanks to http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export const guid = function () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

export const processAPIData = function (data) {
  /*
  Converts the data formatted for IndexedDB / API into the format
  our application uses.
   */
  let res = {};
  Object.keys(data).forEach((key) => { res[data[key].id] = data[key]; });
  return res;
};

export const sortObjects = (objects, key, reverse = false) => {
  /*
  Sorts a list of objects based on the value of their key property
   */
  let sortedKeys = Object.keys(objects).sort((a, b) => {
    if (reverse) return objects[b][key] - objects[a][key];
    return objects[a][key] - objects[b][key];
  });

  return sortedKeys.map((k) => {
    return objects[k];
  });
};

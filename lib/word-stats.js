//code used to calculate returned object
//object will exported.

//organizes words into object of lengths;
var statsCalc = function (array) {
  var obj = {};
  for(var word of array) {
    const len = word.length;
    if (!obj.hasOwnProperty(len)) {
      obj[len] = [word];
    } else {
      obj[len].push(word);
    }
  }
  return obj;
}

//creates array of all words from string
var seperateWordsIntoArray = function (str) {
  var array = str.split("");
  for(var word in array) {
    if (array[word] === "\n") {
      array[word] = " ";
    }
  }
  return array.join("").split(" ");
}

module.exports = {
  "statsCalc": statsCalc,
  "seperateWordsIntoArray": seperateWordsIntoArray

};
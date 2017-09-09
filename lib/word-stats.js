//code used to calculate returned object
//object will exported.




var statsCalc = function (array) {
  var obj = {};
  for(var word of array) {
    //objLength = obj[array[word]].length
    const len = word.length;
    if (!obj.hasOwnProperty(len)) {
      obj[len] = [word];
    } else {
      obj[len].push(word);
    }
    //console.log(obj[array[word]])
  }
  return obj;

}

var seperateWordsIntoArray = function (str) {
  var array = str.split("");
  for(var word in array) {
    if (array[word] === "\n") {
      array[word] = " ";
    }
  }
  // console.log(array);
  return array.join("").split(" ");
}

module.exports = {
  "statsCalc": statsCalc,
  "seperateWordsIntoArray": seperateWordsIntoArray

};
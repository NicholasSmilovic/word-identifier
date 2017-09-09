// // Each number on the telephone dial (except 0 and 1) corresponds to three
// // alphabetic characters. Those correspondences are:
// // 2 ABC
// // 3 DEF
// // 4 GHI
// // 5 JKL
// // 6 MNO
// // 7 PRS
// // 8 TUV
// // 9 WXY

// // Given a seven digit telephone number, calculate all 2187 possible "words"
// // hat number spells. Since the digits 0 and 1 have no alphabetic equivalent,
// // an input number which contains those digits should be rejected.   Then,
// // use your own heuristic to calculate the ones that are more likely
// // to "sound" like english words and display only the top 3.

// //better to have readFile in app.js referencing the functions exported
// //by word-stats


//return array of all possible combinations********************
function allPossibleCombinations(arr) {
  if (arr.lengh === 0) {
    return [];
  } else if (arr.length === 1) {
    return arr[0];
  } else {
    var result = [];
    var allCasesOfRest = allPossibleCombinations(arr.slice(1));
    for(var c in allCasesOfRest) {
      for (var i = 0; i < arr[0].length; i++) {
        result.push(arr[0][i] + allCasesOfRest[c]);
      }
    }
    return result;
  }
}

//replace number with array of letters*************************
function getLetters(number) {
  switch (number) {
    case "2":
    return ["a", "b", "c"];
    case "3":
    return ["d", "e", "f"];
    case "4":
    return ["g", "h", "i"];
    case "5":
    return ["j", "k", "l"];
    case "6":
    return ["m", "n", "o"];
    case "7":
    return ["p", "q", "r", "s"];
    case "8":
    return ["t", "u", "v"];
    case "9":
    return ["w", "x", "y", "z"];
    default:
    return "nope";
  }
}

//compare to database of english words
function compareToEnglishWords(combinations, engWords) {
  var result = [];
  var wordLength = combinations[0].length;
  for(var combo of combinations) {
    for(var word of engWords[wordLength]) {
      if (combo === word) {
        result.push(word);
      }

    }
  }
  return result;
}

//check if number is valid ----->future work use the star key and pound key to create sentences.
function validNumber(nums){
  for(var num of nums) {
    if (num === "0" || num === "1") {
      valid = false;
    }
  }
  return valid;
}

function validOutput() {
  rl.question("Is there a problem with the output? (yes/no): ", function(answer) {
    if (answer === "yes") {
      rl.question("Is your word not there? (yes/no): ", function (answer) {
        if (answer === "yes") {
          addWordToDatabase();
        } else if (answer === "no") {
          rl.question("Is you output repeated? (yes/no): ", function(answer) {
            if (answer === yes) {
              deleteRepeatedWord();
            } else if (answer === "no") {
              console.log("I don't know then. Sorry!!");
              rl.close();
            } else {
              console.log("invalid input")
              rl.close();
            }
          });
        }
      });
    } else if (answer === "no") {
      console.log("Perfect");
      rl.close();
    } else {
      console.log("invalid input")
      rl.close();
    }
  });
}


function addWordToDatabase() {
  rl.question("Please input your word in lowercase: ", function (answer) {
    var exist = checkForWord(answer);
    if (exist < 0) {
      console.log("Invalid word. Please don't try to add invalid words to database.");
      } else if (exist === 0) {
        wordsStr = wordsStr + "\n" + answer;
        fs.writeFile(filePath, wordsStr, function(err) {
          if (err) {
            throw err;
          }
        });
      } else {
        console.log("We already have this word, but thank you.");
      }
    rl.close();
  });
}

//validates word and checks database for word. returning the number of times the word occured
function checkForWord(str) {
  var count = 0;
  for (var char of str) {
    //console.log(char," to number is ", char.charCodeAt())
    if(char.charCodeAt() < "a".charCodeAt() || char.charCodeAt() > "z".charCodeAt()) {
      return -1;
    }
  }
  for (var prop in engWords) {
    for(var word of engWords[prop]) {
      if (word === str) {
      count++;
      }
    }
  }
  console.log(count)
  return count;
}

function deleteRepeatedWord() {

}
//***************Start of function calls******************************//
//.js file containing function for creating database of english words
var words = require("./lib/word-stats.js");
var fs = require("fs");
//.txt file containing some english words
var filePath = "./lib/words.txt";
var wordsStr = "";
//recieve user number input
var nums = process.argv[2];
var valid = true;
var engWords = [];
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


//call valid number before to exit if need be
if (!validNumber(nums)) {
  console.log("Invalid number input!!!")
  return;
}

fs.readFile(filePath, function(err, data) {
  if (err) {
    throw err;
  }
  wordsStr = data.toString();
  const arr = words.seperateWordsIntoArray(wordsStr);
  engWords = words.statsCalc(arr);

  //replace each numbers with array of letters
  var myArr = [];
  for (var num of nums) {
    myArr.push(getLetters(num));
  }
  var combinations = allPossibleCombinations(myArr);
  var result = compareToEnglishWords(combinations, engWords);
  console.log("Possible words for the numbers", nums," are: ", result);
  validOutput();
  //incorporate learning new words

});
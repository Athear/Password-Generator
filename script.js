var generateBtn = document.querySelector("#generate");

//object for storing password option input
var passwordOptions = {
  "charaterSet" : [],
  "passwordLength" : 0
}

//object for all possible characters
var characterTypes = {
  "upper" : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  "lower" : ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  "numeric" : [0,1,2,3,4,5,6,7,8,9],
  "special" : ["!","@","#","$","%","^","&","*","(",")","[","]","{","}","<",">","~","+","_","=","-"]
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}


function generatePassword(){
  //reset passwordOptions here
  getPasswordLength();
}

function getPasswordLength(){
  var dummyLength = 0;
  while (!(dummyLength>=8 && dummyLength<=128)){
    dummyLength = parseInt(prompt("Enter desired password length (8-128). No cancelling!"));
  }
  return dummyLength
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

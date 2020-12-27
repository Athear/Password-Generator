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
  var pwLength = getPasswordLength();
  var pwCharSet = getCharacterTypesCompact();

  //actually generate the password
  var passwordBuilder = "";

  for(var i = 0; i<pwLength; i++){
    //console.log(pwCharSet[Math.floor(Math.random()*pwCharSet.length)]); //DEBUG
    passwordBuilder = passwordBuilder + pwCharSet[Math.floor(Math.random()*pwCharSet.length)]
  }
  console.log(passwordBuilder); //DEBUG
  return passwordBuilder;
}

function getPasswordLength(){
  var inputLength = 0;
  while (!(inputLength>=8 && inputLength<=128)){
    inputLength = parseInt(prompt("Enter desired password length (8-128). No cancelling!"));
  }
  console.log(inputLength); //DEBUG
  return inputLength;
}

function getCharacterTypes(){
  var upperCase = false;
  var lowerCase = false;
  var numbers = false;
  var specialChars = false;
  var totalCharacterSet = [];

  //at least one selection must be true
  while(!upperCase && !lowerCase && !numbers && !specialChars){
    alert("Please choose at least one set of characters too include in your password. It is recommended to include all.");
    upperCase = confirm("Include upper case letters?");
    lowerCase = confirm("Include lower case letters?");
    numbers = confirm("Include numbers?");
    specialChars = confirm("Include special characters?");
  }
  console.log(upperCase + " " + lowerCase + " " + numbers +" " + specialChars); //DEBUG

  //mash all the selected character types into one array!
  if(upperCase){
    totalCharacterSet = totalCharacterSet.concat(characterTypes.upper);
  }
  if(lowerCase){
    totalCharacterSet = totalCharacterSet.concat(characterTypes.lower);
  }
  if(numbers){
    totalCharacterSet = totalCharacterSet.concat(characterTypes.numeric);
  }
  if(specialChars){
    totalCharacterSet = totalCharacterSet.concat(characterTypes.special);
  }

  console.log(totalCharacterSet);//DEBUG
  return totalCharacterSet;

}


function getCharacterTypesCompact(){
  var totalCharacterSet = [];

  //must inclue at least one set of characters.
  while (totalCharacterSet.length === 0){
    alert("Please choose at least one set of characters too include in your password. It is recommended to include all.");
    //Prompt for each character type to include in final set.
    if(confirm("Include upper case letters?")){
      totalCharacterSet = totalCharacterSet.concat(characterTypes.upper);
    }
    if(confirm("Include lower case letters?")){
      totalCharacterSet = totalCharacterSet.concat(characterTypes.lower);
    }
    if(confirm("Include numbers?")){
      totalCharacterSet = totalCharacterSet.concat(characterTypes.numeric);
    }
    if(confirm("Include special characters?")){
      totalCharacterSet = totalCharacterSet.concat(characterTypes.special);
    }
  }

  console.log(totalCharacterSet);//DEBUG
  return totalCharacterSet;
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

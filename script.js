var generateBtn = document.querySelector("#generate");

//object for storing password option input
//UNUSED
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

  
  generateBtn.disabled = false
  passwordText.value = password;

}

function generatePassword(){
  //reset passwordOptions here
  var pwLength = getPasswordLength();
  var pwCharSet = getCharacterTypeChecks();

  //console.log(pwCharSet);//DEBUG

  //actually generate the password
  var passwordBuilder = "";

  //pwCharSet is an array of arrays. Need to iterate through that pwLength times
  for(var i = 0; i<pwLength; i++){
    
    //console.log(pwCharSet[Math.floor(Math.random()*pwCharSet.length)]); //DEBUG
      var charSetIndex=Math.floor(Math.random()*pwCharSet.length)
      var singleCharSet=pwCharSet[charSetIndex]

      //console.log(singleCharSet)//DEBUG
      passwordBuilder = passwordBuilder + singleCharSet[Math.floor(Math.random()*singleCharSet.length)]
    
  }
  //console.log(passwordBuilder); //DEBUG
  return passwordBuilder;
}

function OptionsForm(){
  var CharacterForm = CharacterTypesForm();
  var cardBody = document.querySelector(".card-body");
  
  cardBody.append(CharacterForm);
  generateBtn.disabled = true
}


function getPasswordLength(){
  var inputLength = 0;
  while (!(inputLength>=8 && inputLength<=128)){
    inputLength = parseInt(prompt("Enter desired password length (8-128). No cancelling!"));
  }
  //console.log(inputLength); //DEBUG
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
  //console.log(upperCase + " " + lowerCase + " " + numbers +" " + specialChars); //DEBUG

  //mash all the selected character types into one array!
  if(upperCase){
    totalCharacterSet.push(characterTypes.upper);
  }
  if(lowerCase){
    totalCharacterSet.push(characterTypes.lower);
  }
  if(numbers){
    totalCharacterSet.push(characterTypes.numeric);
  }
  if(specialChars){
    totalCharacterSet.push(characterTypes.special);
  }

  //console.log(totalCharacterSet);//DEBUG
  return totalCharacterSet;

}


function getCharacterTypesCompact(){
  var totalCharacterSet = [];

  //must inclue at least one set of characters.
  while (totalCharacterSet.length === 0){
    alert("Please choose at least one set of characters too include in your password. It is recommended to include all.");
    //Prompt for each character type to include in final set.
    if(confirm("Include upper case letters?")){
      totalCharacterSet.push(characterTypes.upper);
    }
    if(confirm("Include lower case letters?")){
      totalCharacterSet.push(characterTypes.lower);
    }
    if(confirm("Include numbers?")){
      totalCharacterSet.push(characterTypes.numeric);
    }
    if(confirm("Include special characters?")){
      totalCharacterSet.push(characterTypes.special);
    }
  }

  // console.log(totalCharacterSet);//DEBUG
  return totalCharacterSet;
}


function getCharacterTypeChecks(){
  var totalCharacterSet = [];
  console.log(totalCharacterSet.length);
  var upperCase = document.querySelector("#upperCheck").checked;
  var lowerCase = document.querySelector("#lowerCheck").checked;
  var numbers = document.querySelector("#numberCheck").checked;
  var specialChars = document.querySelector("#specCheck").checked;

  // console.log(upperCase + " " + lowerCase + " " + numbers +" " + specialChars); //DEBUG

  if(upperCase){
    totalCharacterSet.push(characterTypes.upper);
  }
  if(lowerCase){
    totalCharacterSet.push(characterTypes.lower);
  }
  if(numbers){
    totalCharacterSet.push(characterTypes.numeric);
  }
  if(specialChars){
    totalCharacterSet.push(characterTypes.special);
  }

  //remove the checkbox form
  document.querySelector(".typeForm").remove();
  return totalCharacterSet;
}



function CharacterTypesForm(){
  //create container for checklist. Not an actual HTML form.
  var typeForm = document.createElement("div");
  typeForm.className = "typeForm";
  //typeForm.textContent = "Select Characters to use:"; //DEBUG
  typeForm.setAttribute("style", "background-color:#f5fff5");

  var header= document.createElement("h3");
  header.id = "CharacterAlert"
  header.textContent= "Select Characters to use:"
  typeForm.append(header);

  //create checkboxes with labels and containers
  upperContainer=makeCheckBoxDiv("upperCheck","Use upper case characters");
  lowerContainer=makeCheckBoxDiv("lowerCheck","Use lower case characters");
  numberContainer=makeCheckBoxDiv("numberCheck","Use numeric characters");
  specContainer=makeCheckBoxDiv("specCheck","Use special characters");


  //submission button. Not a form input. TODO: put it in the form and prevent default!
  var submitButton = document.createElement("button");
  submitButton.id = "submitButton";
  submitButton.textContent = "Submit character selections";
  submitButton.setAttribute("class","btn");
  var submitContainer = document.createElement("div");
  submitContainer.append(submitButton);
  
  // event listener for character sets
  submitButton.addEventListener("click", writePassword);  

  //Add all elements to the form
  typeForm.append(upperContainer);
  typeForm.append(lowerContainer);
  typeForm.append(numberContainer);
  typeForm.append(specContainer);
  typeForm.append(submitContainer);

  var formElements = typeForm.children;

  //add listener to checkboxes
  for(i=1;i<formElements.length-1;i++){
    
    formElements[i].children[0].addEventListener("click",checkboxValidate);
  }

  //do styling
  for(i=0;i<formElements.length-1;i++){
    //TODO- this is not responsive
    formElements[i].setAttribute("style","padding-left: 33%"); 
  }
  submitContainer.setAttribute("style", "text-align: center");
  return typeForm
}

function makeCheckBoxDiv(typeID,typeMessage){
  var newCheck = document.createElement("input");
  newCheck.type = "checkbox";
  newCheck.id = typeID;
  newCheck.name = typeID;
  newCheck.checked = true;
  var newLabel = document.createElement("Label")
  newLabel.setAttribute("for",typeID);
  newLabel.textContent = typeMessage;
  var newContainer = document.createElement("div");
  newContainer.append(newCheck);
  newContainer.append(newLabel);

  return newContainer
}

function checkboxValidate(){
  var formElements = document.querySelector(".typeForm").children
  var atLeastOne = false

  //Validate that at least one checkbox is checked
  for(i=1;i<formElements.length-1;i++){
    if(formElements[i].children[0].checked){
      atLeastOne = true;
    }
  }
  //disable the submit button if no boxes are checked.
  if(atLeastOne){
    formElements[5].children[0].disabled = false;
    formElements[5].children[0].textContent = "Submit character selections"
    
  }
  else{
    formElements[5].children[0].disabled = true;
    formElements[5].children[0].textContent = "Select one or more character types"
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", OptionsForm);

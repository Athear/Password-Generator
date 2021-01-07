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

  
  generateBtn.disabled = false
  passwordText.value = password;

}

function generatePassword(){
  //reset passwordOptions here
  var pwLength = getPasswordLength();
  var pwCharSet = getCharacterTypeChecks();

  //actually generate the password
  var passwordBuilder = "";

  for(var i = 0; i<pwLength; i++){
    //console.log(pwCharSet[Math.floor(Math.random()*pwCharSet.length)]); //DEBUG
    passwordBuilder = passwordBuilder + pwCharSet[Math.floor(Math.random()*pwCharSet.length)]
  }
  console.log(passwordBuilder); //DEBUG
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


function getCharacterTypeChecks(){
  var totalCharacterSet = [];
  console.log(totalCharacterSet.length);
  var upperCase = document.querySelector("#upperCheck").checked;
  var lowerCase = document.querySelector("#lowerCheck").checked;
  var numbers = document.querySelector("#numberCheck").checked;
  var specialChars = document.querySelector("#specCheck").checked;

  console.log(upperCase + " " + lowerCase + " " + numbers +" " + specialChars); //DEBUG

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
  var upperCheck = document.createElement("input");
  upperCheck.type = "checkbox";
  upperCheck.id = "upperCheck";
  upperCheck.name = "upperCheck";
  upperCheck.checked = true;
  var upperLabel = document.createElement("Label")
  upperLabel.setAttribute("for","upperCheck");
  upperLabel.textContent = "Use upper case characters";
  var upperContainer = document.createElement("div");
  upperContainer.append(upperCheck);
  upperContainer.append(upperLabel);
  
  var lowerCheck = document.createElement("input");
  lowerCheck.type = "checkbox";
  lowerCheck.id = "lowerCheck";
  lowerCheck.name = "lowerCheck";
  lowerCheck.checked = true;
  var lowerLabel = document.createElement("Label")
  lowerLabel.setAttribute("for","lowerCheck");
  lowerLabel.textContent = "Use lower case characters";
  var lowerContainer = document.createElement("div")
  lowerContainer.append(lowerCheck);
  lowerContainer.append(lowerLabel);


  var numberCheck = document.createElement("input");
  numberCheck.type = "checkbox";
  numberCheck.id = "numberCheck";
  numberCheck.name = "numberCheck";
  numberCheck.checked = true;
  var numberLabel = document.createElement("Label")
  numberLabel.setAttribute("for","numberCheck");
  numberLabel.textContent = "Use numeric characters";
  numberContainer = document.createElement("div")
  numberContainer.append(numberCheck);
  numberContainer.append(numberLabel);

  var specCheck = document.createElement("input");
  specCheck.type = "checkbox";
  specCheck.id = "specCheck";
  specCheck.name = "specCheck";
  specCheck.checked = true;
  var specLabel = document.createElement("Label")
  specLabel.setAttribute("for","specCheck");
  specLabel.textContent = "Use special characters";
  var specContainer = document.createElement("div")
  specContainer.append(specCheck);
  specContainer.append(specLabel);

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

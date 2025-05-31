let websiteName = document.getElementById("websiteName");
let websiteURL = document.getElementById("websiteURL");
let websiteEditName = document.getElementById("websiteEditName");
let websiteEditURL = document.getElementById("websiteEditURL");
let websiteList = []; 
let addBTN = document.getElementById("addBTN");
let editBTN = document.getElementById("editBTN");
let deleteAllBTN = document.getElementById("deleteAllBTN");
let editLayer = document.getElementById("editLayer");
let sureLayer = document.getElementById("sureLayer");
let errorLayer = document.getElementById("errorLayer");
var websiteIndex;

if ( localStorage.getItem("websites") != null ) {
  // Retrieve the JSON data and convert it in Website List
  websiteList = JSON.parse(localStorage.getItem("websites"));
  displayWebsite(websiteList);
}  else {
  websiteList = [];
}

// Function to add website to the websiteList array
function addWebsite() {
  if ( websiteName.value == '' && websiteURL.value == '' ) {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

    errorLayer.classList.add("display-error-layer");
  } else {
    var website = {
      name: websiteName.value,
      url: websiteURL.value
    };
  
    // Add website to website list array
    websiteList.push(website);
    // Store the website List in the Local Storage
    localStorage.setItem("websites", JSON.stringify(websiteList));
  
    clearInput();
    displayWebsite(websiteList);
  }
}

// Function to display the websites in the table
function displayWebsite(list) {
  var box = '';

  for ( var i = 0; i < list.length; i++ ) {
    box +=
    `
      <tr>
        <td>${i+1}</td>
        <td>${list[i].name}</td>
        <td><a href="https://${list[i].url}" target="_blank" class="btn btn-visit"><i class="fa-solid fa-eye me-md-2"></i><span>Visit</span></a></td>
        <td><button onclick='setUpEditWebsite(${i})' class="btn btn-primary"><i class="fa-solid fa-edit me-md-2"></i><span>Edit</span></button></td>
        <td><button onclick='setUpDeleteWebsite(${i})' class="btn btn-delete"><i class="fa-solid fa-trash-can me-md-2"></i><span>Delete</span></button></td>
      </tr>
    `
  }

  document.getElementById("tBody").innerHTML = box;

  if ( websiteList.length == 0 ) {
    deleteAllBTN.classList.add("d-none");
  } else {
    deleteAllBTN.classList.remove("d-none");
  }
}

function clearInput() {
  websiteName.value = '';
  websiteURL.value = '';
  websiteName.classList.remove("is-valid", "is-invalid");
  websiteURL.classList.remove("is-valid", "is-invalid");
}

// Display the details in the inputs and change add button with edit button
function setUpEditWebsite(index) {
  websiteEditName.value = websiteList[index].name;
  websiteEditURL.value = websiteList[index].url;

  editLayer.classList.remove("d-none");

  websiteIndex = index;

}

// Edit the name and url of the websites
function editWebsite() {
  websiteList[websiteIndex].name = websiteEditName.value;
  websiteList[websiteIndex].url = websiteEditURL.value;

  displayWebsite(websiteList);
  localStorage.setItem("websites", JSON.stringify(websiteList));

  editLayer.classList.add("d-none");
}

function setUpDeleteWebsite(index) {
  sureLayer.classList.remove("d-none");

  websiteIndex = index;
}

// Function to delete the website from the websiteList array and then display the list in the table
function deleteWebsite(index) {
  websiteList.splice(index, 1);
  localStorage.setItem("websites", JSON.stringify(websiteList));

  displayWebsite(websiteList);

  sureLayer.classList.add("d-none");
}

function appearLayer(layer) {
  layer.classList.remove("d-none");
}

// Function to hide edit layer
function deleteLayer(layer) {
  layer.classList.add("d-none");
}

var validatePattern = {
  // !! Gbthom mn 3alnet 3ala tol
  name: /[A-Z][a-z]{3,}/,
  url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
}

function validateForm(input, key) {
  input.classList.remove("is-valid", "is-invalid");

  var pattern = validatePattern[key];
  var userValue = input.value;
  var isMatched = pattern.test(userValue);

  if ( isMatched ) {
    input.classList.add("is-valid");
  } else {
    input.classList.add("is-invalid");
  }
}

function deleteAll() {
  websiteList.splice(0, websiteList.length);
  localStorage.setItem("websites", JSON.stringify(websiteList));

  displayWebsite(websiteList);
}

function hideErrorLayer() {
  errorLayer.classList.remove("display-error-layer");
}
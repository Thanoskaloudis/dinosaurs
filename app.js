function Dinosaur(dinoData) {
  this.species = dinoData.species;
  this.weight = Math.round(dinoData.weight / 2.21); // kg
  this.height = Math.round(dinoData.height / 0.39); // cm
  this.diet = dinoData.diet;
  this.place = dinoData.place;
  this.time = dinoData.time;
  this.fact = dinoData.fact;
}

function Human(name, weight, height, diet) {
  this.name = name;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
}

function fetchData() {
  const myInit = {
    method: "GET",
    headers: {
      "Content-Type": "application.json",
    },
    mode: "cors",
    cache: "default",
  };

  let myRequest = new Request("./dino.json", myInit);
  fetch(myRequest)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      createDinosaurs(data);
    });
}

function createDinosaurs(data) {
  const dinos = data.Dinos;
  const dinoArray = [];

  dinos.forEach((dino) => {
    dinoArray.push(new Dinosaur(dino));
  });
}

// Create Human Object

function createHuman() {
  const name = document.querySelector("#name").value;
  const weight = parseInt(document.querySelector("#weight").value);
  const height =
    parseInt(document.querySelector("#meters").value * 100) +
    parseInt(document.querySelector("#centimeters").value);
  const diet = document.querySelector("#diet").value;
  const human = new Human(name, weight, height, diet);
  console.log(human);
}

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic

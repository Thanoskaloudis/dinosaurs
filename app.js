function Dinosaur(dinoData) {
  this.species = dinoData.species;
  this.weight = (dinoData.weight / 2.21).toFixed(3); // kg
  this.height = (dinoData.height / 0.39).toFixed(3); // cm
  this.diet = dinoData.diet;
  this.place = dinoData.place;
  this.time = dinoData.time;
  this.fact = dinoData.fact;
};

function Human(hunamData) {
  this.name = hunamData.name;
  this.weight = hunamData.weight;
  this.height = hunamData.headers;
  this.diet = hunamData.diet;
};

let dinosArray = [];

(function fetchData() {
  const link = "./dino.json";
  const myInit = {
    method: "GET",
    headers: {
      "Content-Type": "application.json",
    },
    mode: "cors",
    cache: "default",
  };

  let myRequest = new Request(link, myInit);
  fetch(myRequest)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      createDinosaurs(data.Dinos);
    });
})();

function createDinosaurs(dinos) {
  dinos.forEach((dino) => {
    dinosArray.push(new Dinosaur(dino));
  });
};

function getHumanData() {
  const name = document.querySelector("#name").value;
  const weight = parseInt(document.querySelector("#weight").value) / 100;
  const height =
    parseInt(document.querySelector("#meters").value * 100) +
    parseInt(document.querySelector("#centimeters").value);
  const diet = document.querySelector("#diet").value;

  return {
    name: name,
    weight: weight,
    height: height,
    diet: diet,
  };
};

function compare() {
  const human = getHumanData();
  dinosArray.forEach((dino) => {
    compareWeight(human.name, human.weight, dino.weight, dino.species);
    compareHeight(human.name, human.height, dino.height, dino.species);
    compareDiet(human.diet, dino.diet);
  });
};

function compareWeight(name, humanWeight, dinoWeight, species) {
  const percentage = ((humanWeight * 100) / dinoWeight).toFixed(3);
  const approximate = humanWeight > dinoWeight ? "more" : "less";
  console.log(
    name + " has " + percentage + "% " + approximate + " weight than " + species
  );
};

function compareHeight(name, humanHeight, dinoHeight, species) {
  const percentage = ((humanHeight * 100) / dinoHeight).toFixed(3);
  const approximate = humanHeight > dinoHeight ? "taller" : "sorter";
  console.log(
    name + " is " + percentage + "% " + approximate + " than " + species
  );
};

function compareDiet(humanDiet, dinoDiet) {
  const isSameDiet = (humanDiet.toLowerCase() == dinoDiet);
  console.log(isSameDiet);
};

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic

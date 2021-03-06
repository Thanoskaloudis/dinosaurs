/**
* @description Represents a dinosaur
* @constructor
* @param {Array} dinoData
*/
function Dinosaur(dinoData) {
  this.species = dinoData.species;
  this.weight = (dinoData.weight / 2.21).toFixed(3); // convert to kg
  this.height = (dinoData.height / 0.39).toFixed(3); // convert to cm
  this.diet = dinoData.diet;
  this.place = dinoData.place;
  this.time = dinoData.time;
  this.fact = [dinoData.fact];
  this.image = "images/" + dinoData.species.toLowerCase() + ".png";
}

const dinosArray = [];

/**
* @description fetch dino's data from dino.json
*/
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

  const myRequest = new Request(link, myInit);
  fetch(myRequest)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      createDinosaurs(data.Dinos);
    });
})();

/**
* @description create dinosaurs 
* @param {Array} dinos
*/
function createDinosaurs(dinos) {
  dinos.forEach((dino) => {
    dinosArray.push(new Dinosaur(dino));
  });
}

/**
* @description get human data from the form
*/
function getHumanData() {
  const name = document.querySelector("#name").value;
  const weight = parseInt(document.querySelector("#weight").value) / 100;
  const height =
    parseInt(document.querySelector("#meters").value * 100) +
    parseInt(document.querySelector("#centimeters").value);
  const diet = document.querySelector("#diet").value;

  return {
    species: "Human",
    name,
    weight,
    height,
    diet,
    image: "images/human.png",
  };
}

/**
* @description compare dino's weight, height and diet with human's data from the form.
*/
function compare() {
  const isValidForm = validateForm();
  const human = getHumanData();

  dinosArray.forEach((dino) => {
    compareWeight(human.name, human.weight, dino.weight, dino.species);
    compareHeight(human.name, human.height, dino.height, dino.species);
    compareDiet(human.diet, dino.diet);
  });

  if (isValidForm) {
    hideForm();
    setTimeout(() => {
      createTiles(dinosArray, human);
      const element = document.getElementById("tryAgainBtn");
      element.style.display = "block";
    }, 600);
  }
}

/**
* @description compare dino's weight with human's input 
*/
function compareWeight(name, humanWeight, dinoWeight, species) {
  const percentage = ((humanWeight * 100) / dinoWeight).toFixed(3);
  const approximate = humanWeight > dinoWeight ? "more" : "less";
  const fact =
    name +
    " has " +
    percentage +
    "% " +
    approximate +
    " weight than " +
    species;
  addFact(fact, species);
}

/**
* @description compare dino's height with human's input 
*/
function compareHeight(name, humanHeight, dinoHeight, species) {
  const percentage = ((humanHeight * 100) / dinoHeight).toFixed(3);
  const approximate = humanHeight > dinoHeight ? "taller" : "sorter";
  const fact =
    name + " is " + percentage + "% " + approximate + " than " + species;
  addFact(fact, species);
}

/**
* @description compare dino's diet with human's selection
*/
function compareDiet(humanDiet, dinoDiet, species) {
  const isSameDiet = humanDiet.toLowerCase() == dinoDiet;
  const fact = isSameDiet ? "Same diet!" : "Not the same diet";
  addFact(fact, species);
}

/**
* @description add fact to the fact array on a specific dino
* @param {string} fact
* @param {string} species
*/
function addFact(fact, species) {
  dinosArray.forEach(
    (dino) => dino.species === species && dino.fact.push(fact)
  );
}

/**
* @description get random data from the fact array from each dino
*/
function getRandomFact(dinoIndex) {
  let index =
    Math.floor(Math.random() * 10) % dinosArray[dinoIndex].fact.length;
  return dinosArray[dinoIndex].fact[index];
}

/**
* @description add the fade out efect on the form
*/
function hideForm() {
  const element = document.getElementById("dino-compare");
  element.classList.add("fade-out");
  setTimeout(() => {
    element.style.display = "none";
  }, 500);
}

/**
* @description check if all inputs are filled, if not, alert the user
*/
function validateForm() {
  let validWeight, validHeight, validName;
  const name = document.forms["dino-compare"]["name"].value;
  if (name == "") {
    alert("Name must be filled out");
  } else {
    validName = true;
  }
  const weight = document.forms["dino-compare"]["weight"].value;
  if (weight == "") {
    alert("Weight must be filled out");
    valid = false;
  } else {
    validWeight = true;
  }
  const meters = document.forms["dino-compare"]["meters"].value;
  const centimeters = document.forms["dino-compare"]["centimeters"].value;
  if (meters == "" && centimeters == "") {
    alert("Height must be filled out");
    valid = false;
  } else {
    validHeight = true;
  }

  return validName && validHeight && validWeight;
}

/**
* @description create 9 tiles for each item in dino's array and the human object
* @param {Array} dinosArray
* @param {Object} human
*/
function createTiles(dinosArray, human) {
  for (let dinoIndex in dinosArray) {
    let dino = dinosArray[dinoIndex];
    let fact = getRandomFact(dinoIndex);

    if (dino.weight < 1) {
      fact = "All birds are dinosaurs."; // if the weight is less, ie it is definitely a bird
    }

    let gridTileDiv = getGridTile(dino.species, dino.image, fact);

    document.getElementById("grid").appendChild(gridTileDiv);

    if (dinoIndex == 3) {
      // place human tile in the middle
      let humanTileDiv = getGridTile(
        human.species,
        human.image,
        null,
        human.name
      );
      document.getElementById("grid").appendChild(humanTileDiv);
    }
  }
}

/**
* @description create grid item with some data (spicies or human's name, images and a fact)
* @param {string} species
* @param {string} imageUrl
* @param {string} fact
* @param {string} name
*/
function getGridTile(species, imageUrl, fact, name) {
  let gridTileDiv = document.createElement("div");
  gridTileDiv.className = "grid-item";

  // add species
  let speciesDiv = document.createElement("h3");
  speciesDiv.innerText = species === "Human" ? name : species;
  gridTileDiv.appendChild(speciesDiv);

  // add image
  let imageDiv = document.createElement("img");
  imageDiv.src = imageUrl;
  gridTileDiv.appendChild(imageDiv);

  // add fact
  if (fact) {
    // for humans, facts are not necessary
    let factDiv = document.createElement("p");
    factDiv.innerText = fact;
    gridTileDiv.appendChild(factDiv);
  }

  return gridTileDiv;
}

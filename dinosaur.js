// Create Dino Constructor
function Dinosaur(species, weight, height, diet, place, time, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.place = place;
  this.time = time;
  this.fact = fact;
}

function fetchData() {
    const myInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application.json'
        },
        mode: 'cors',
        cache: 'default'
    };

    let myRequest = new Request("./dino.json", myInit);
    fetch(myRequest)
    .then((resp) => {
        return resp.json();
    })
    .then( data => {
    console.log(data);
    })
}

function createDinosaurs() {
// Create Dino Objects
}

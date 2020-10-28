let fuelReady = false;
let cargoReady = false;
let fieldCheck = "";
window.addEventListener("load", function() {
   this.fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let index = Math.floor(Math.random() * json.length);
         console.log(json[index].name);
         document.getElementById("missionTarget").innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[index].name}</li>
            <li>Diameter: ${json[index].diameter}</li>
            <li>Star: ${json[index].star}</li>
            <li>Distance from Earth: ${json[index].distance}</li>
            <li>Number of Moons: ${json[index].moons}</li>
         </ol>
         <img src="${json[index].image}">
         `;
      });
   });
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let coPilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");

      document.getElementById('launchStatus').innerText = 'Awaiting Information Before Launch';
      document.getElementById('launchStatus').style.color= "black";
      document.getElementById("pilotStatus").innerText = `Pilot ${pilotNameInput.value} Ready`;
      document.getElementById("copilotStatus").innerText = `Co-Pilot ${coPilotNameInput.value} Ready`;
      document.getElementById("fuelStatus").innerText = "Fuel Level high enough for launch";
      document.getElementById("cargoStatus").innerText = "Cargo Mass low enough for launch";



      if (pilotNameInput.value === "" || coPilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
         event.preventDefault(); 
         
      } else if (typeof String(pilotNameInput.value) !== "string" || (typeof String( coPilotNameInput.value) !== "string"))  {
         alert("Pilot and Co-Pilot name is required");
         event.preventDefault();

      } else if ( isNaN(Number(fuelLevelInput.value)) || isNaN(Number(cargoMassInput.value))) {
         alert("Invalid Input: Only numbers can be used for cargo mass and fuel");
         event.preventDefault();
      }

      if (Number(fuelLevelInput.value) < 10000 ) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("fuelStatus").innerText = `There is not enough fuel for the journey! We have ${fuelLevelInput.value}L loaded and at least 10,000L are needed!`
         document.getElementById('launchStatus').innerText = 'Shuttle not ready for launch!';
         document.getElementById('launchStatus').style.color= "red";
         event.preventDefault();

      } else if (Number(cargoMassInput.value) > 10000 ) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("cargoStatus").innerText = `There is too much mass for the shuttle to take off! Max load is 10,000kg and we have ${cargoMassInput.value}kg!`
         document.getElementById('launchStatus').innerText = 'Shuttle not ready for launch!';
         document.getElementById('launchStatus').style.color= "red";
         event.preventDefault();

      } else {

         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById('launchStatus').innerText = 'Shuttle is ready for launch!';
         document.getElementById('launchStatus').style.color= "green";
      }
   });
});

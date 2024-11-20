// Recommended: All functions declared here
function allCities (whichCity) {
    for (let city of cities){
        if (whichCity == city.name){
            return city;
        }
    }
    return null;
}

function fFindDistancesFromCity (cityId){
    return distances.filter(d => d.city == cityId || d.city2 == cityId)
}

function getCityById (id) {
    return cities.find(city => city.id == id)
}

// Recommended: constants with references to existing HTML-elements
const citiesDiv = document.getElementById("cities");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3")
const tableDiv = document.getElementById("table");

// Recommended: Ask for the city name and then the rest of the code
const userCity = prompt("Ange en stad i Europa!")
const foundCity = allCities(userCity)

if (foundCity == null){
    h2.textContent = userCity + " finns inte i databasen"; 
    document.title = "Not found"
    h3.remove();
} else {
    h2.textContent = userCity + " (" + foundCity.country  + ")"; 
    document.title = userCity;
}


let closestCity = null;
let furthestCity = null;
let minDistance = Infinity;
let maxDistance = 0;

for (let d of distances){
    const otherCityId = d.city1 == foundCity.id ? d.city2 : d.city1;
    const otherCity = getCityById(otherCityId);
    if (d.distance < minDistance){
        minDistance = d.distance;
        closestCity = otherCity;
    }
    if (d.distance > maxDistance){
        maxDistance = d.distance;
        furthestCity = otherCity;
    }
}
h3.textContent = `Av städerna i databasen ligger ${closestCity.name} närmast och ${furthestCity.name} längst bort`;

for (let city of cities){
    let cityClass = "";
    if (city.name == userCity){
        cityClass = "target";
    } else if (city.id == closestCity.id){
        cityClass = "closest";
    } else if (city.id == furthestCity.id){
        cityClass = "furthest";
    }
    citiesDiv.innerHTML += `<p class="cityBox ${cityClass}">${city.name}</p>`;
}

tableDiv.innerHTML = `<p class="cell"></p>`

for (let city of cities){
    tableDiv.innerHTML += `<p class="cell head_row">${city.id}</p>`;
}
for (let city of cities){
    tableDiv.innerHTML += `<p class="cell head_col">${city.id}-${city.name}</p>`;
    tableDiv.innerHTML += `<p class="cell"></p>`;
    for (let keys of distances){
        const cellP = document.createElement("p");
        if (keys.city1 == city.id || keys.city2 == city.id){
            tableDiv.appendChild(cellP);
            cellP.classList.add("cell");
            cellP.textContent = keys.distance / 10;
        }
    }
}
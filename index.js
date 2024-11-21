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
function findDistance(city1, city2) {
    for (let keys of distances) {
        if ((keys.city1 == city1 && keys.city2 == city2) || (keys.city1 == city2 && keys.city2 == city1)) {
            return keys.distance;
        }
    }
    return null;
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
if (foundCity != null){
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
        let distanceInfo = "";
        if (city.name == userCity){
            cityClass = "target";
        } else if (city.id == closestCity.id){
            cityClass = "closest";
            const distance = findDistance(city.id, foundCity.id);
            distanceInfo = `ligger ${distance / 10} mil bort`
        } else if (city.id == furthestCity.id){
            cityClass = "furthest";
            const distance = findDistance(city.id, foundCity.id);
            distanceInfo = `ligger ${distance / 10} mil bort`
        }
        citiesDiv.innerHTML += `<p class="cityBox ${cityClass}">${city.name} ${distanceInfo}</p>`;
    }
}
if (foundCity == null){
    for (let city of cities){
        citiesDiv.innerHTML += `<p class="cityBox">${city.name}</p>`;
    }
}

tableDiv.innerHTML = `<p class="cell"></p>`


for (let city of cities){
    
    tableDiv.innerHTML += `<p class="cell head_row">${city.id}</p>`;
}

for (let cityRow of cities){
    let classForEvenRow = ""
    if(cityRow.id % 2 == 0){
        classForEvenRow = "even_row"
    }
    tableDiv.innerHTML += `<p class="cell head_col ${classForEvenRow}">${cityRow.id}-${cityRow.name}</p>`;
   
    for(let cityColumn of cities){
        let classForEvenCol = " "
        if(cityColumn.id % 2 == 0){
            classForEvenCol = "even_col"
        }
        if(cityRow.id == cityColumn.id){
            tableDiv.innerHTML += `<p class="cell ${classForEvenRow} ${classForEvenCol}"></p>`;
        } else {
            // Hitta distansen mellan city och city2
            let match = distances.filter(d => d.city1 == cityRow.id && d.city2 == cityColumn.id || d.city1 == cityColumn.id && d.city2 == cityRow.id)[0]
            tableDiv.innerHTML += `<p class="cell ${classForEvenRow} ${classForEvenCol}">${match.distance / 10}</p>`;
        }
    }
}
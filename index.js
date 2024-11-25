// Recommended: All functions declared here
function allCities (whichCity) {
    for (let city of cities){
        if (whichCity == city.name){
            return city;
        }
    }
    return null;
}

function getCityById (matchingId){
    for (let city of cities){
        if (city.id == matchingId){
            return city;
        }
    }
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
        if (d.city1 == foundCity.id || d.city2 == foundCity.id) {
            let otherCityId = null; 
            let otherCity = null;
            if (d.city1 == foundCity.id){
                otherCityId = d.city2;
            } else {
                otherCityId = d.city1;
            }
            otherCity = getCityById(otherCityId);
            const distance = d.distance;
            if (distance < minDistance){
                minDistance = distance;
                closestCity = otherCity;
            }
            if (distance > maxDistance){
                maxDistance = distance;
                furthestCity = otherCity;
            }
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
            distanceInfo = `ligger ${minDistance / 10} mil bort`
        } else if (city.id == furthestCity.id){
            cityClass = "furthest";
            distanceInfo = `ligger ${maxDistance / 10} mil bort`
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
// Recommended: All functions declared here
function allCities (whichCity) {
    for (let city of cities){
        if (whichCity == city.name){
            return city;
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

if (allCities(userCity) == null){
    h2.textContent = userCity + " finns inte i databasen"; 
    document.title = "Not found"
    h3.remove();
} else {
    h2.textContent = userCity + " (" + allCities(userCity).country  + ")"; 
    document.title = userCity;
}

for (let city of cities){
    citiesDiv.innerHTML += `<p class="cityBox">${city.name}</p>`;
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
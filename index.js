// Recommended: All functions declared here
function allCities (userCity) {
    for (let city of cities){
        if (userCity == city.name){
            return city;
        }
    }
    return null;
}


// Recommended: constants with references to existing HTML-elements
const citiesDiv = document.getElementById("cities");
const h2 = document.querySelector("h2");

// Recommended: Ask for the city name and then the rest of the code
const userCity = prompt("Ange en stad i Europa!")

if (allCities(userCity) == null){
    h2.textContent = userCity + " finns inte i databasen"; 
} else {
    h2.textContent = userCity + " (" + allCities(userCity).country  + ")"; 
}

for (let city of cities){
    citiesDiv.innerHTML += `<p class="cityBox">${city.name}</p>`;
}

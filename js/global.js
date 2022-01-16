var jourSemaine = {0: "Dimanche", 1: "Lundi", 2: "Mardi", 3: "Mercredi", 4: "Jeudi", 5: "Vendredi", 6: "Samedi"};


var DATA = {};


function createElem(obj, idx, tab) {
    var divRes = document.getElementById("search-result-meteo");
    var newDiv = document.createElement("div");
    var date = document.createElement("p");
    var temp = document.createElement("div");
    var humidite = document.createElement("div");
    humidite.classList.add("humidite");
    var humiditeIcon = document.createElement("img");

    var vent = document.createElement("div");
    var ventDir = document.createElement("h1");
    var ventSpeed = document.createElement("h2");
    vent.classList.add("vent");
    ventDir.innerHTML = getCardinalDirection(obj.deg);
    ventSpeed.innerHTML = obj.speed + " m/s";
    vent.appendChild(ventDir);
    vent.appendChild(ventSpeed);


    humiditeIcon.src = "./img/water.svg";
    var humiditeVal = document.createElement("h2");
    humiditeVal.innerHTML = obj.humidity + " %";
    humidite.appendChild(humiditeIcon);
    humidite.appendChild(humiditeVal);

    temp.classList.add("temp");
    var tempMax = document.createElement("h1");
    tempMax.classList.add("tempmax")
    var tempMin = document.createElement("h1");
    tempMin.classList.add("tempmin")
    tempMax.innerHTML = Math.round(obj.temp.max) + "°C";
    tempMin.innerHTML = Math.round(obj.temp.min) + "°C";


    var icon = document.createElement("img");
    icon.src = "http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@4x.png";
    date.innerHTML = jourSemaine[new Date(obj.dt * 1000).getDay()] + " " + new Date(obj.dt * 1000).getDate();

    newDiv.classList.add("meteo-journee");
    temp.appendChild(tempMax);
    temp.appendChild(tempMin);


    var div = document.createElement("div");
    div.classList.add("meteo-journee-content");


    var temps = document.createElement("div");
    temps.id = "temps";

    var divextend = document.createElement("div");
    divextend.classList.add("meteo-journee-extend");

    div.onclick = function () {
        var list = document.getElementsByClassName("meteo-journee");
        for (var i = 0; i < list.length; i++) {
            if (list[i] != newDiv) {
                list[i].classList.remove("extend");
            }
        }
        newDiv.classList.toggle("extend");
        loadInfo(obj);
    };
    newDiv.id = idx;

    divextend.appendChild(vent);
    divextend.appendChild(humidite);
    temps.appendChild(icon);
    temps.appendChild(temp);
    div.appendChild(date);
    div.appendChild(temps);
    newDiv.appendChild(div);
    newDiv.appendChild(divextend);
// newDiv.appendChild(humidite)
// newDiv.appendChild(vent);
    if (idx == 0) {
        newDiv.classList.add("extend");
        loadInfo(obj);
    }
    divRes.appendChild(newDiv);
}


function loadInfo(data) {
    console.log(data);


    obj = data;
    var divRes = document.getElementById("search-result-info");
    divRes.innerHTML = "";
    var newDiv = document.createElement("div");
    var newDiv2 = document.createElement("div");

    var date = document.createElement("p");
    var temp = document.createElement("div");
    var humidite = document.createElement("div");
    var humiditeIcon = document.createElement("img");
    var vent = document.createElement("div");
    var ventDir = document.createElement("h1");
    var ventSpeed = document.createElement("h2");
    var humiditeVal = document.createElement("h2");
    var tempMax = document.createElement("h1");
    var tempMin = document.createElement("h1");
    var icon = document.createElement("img");
    var temps = document.createElement("div");
    var description = document.createElement("p");
    description.classList.add("trn");
    ventDir.innerHTML = getCardinalDirection(obj.deg);

    ventSpeed.innerHTML = obj.speed + " m/s";
    vent.appendChild(ventDir);
    vent.appendChild(ventSpeed);
    humiditeIcon.src = "./img/water.svg";
    humiditeVal.innerHTML = obj.humidity + " %";
    humidite.classList.add("humidite");
    vent.classList.add("vent");
    humidite.appendChild(humiditeIcon);
    humidite.appendChild(humiditeVal);
    tempMax.innerHTML = Math.round(obj.temp.max) + "°C";
    tempMin.innerHTML = Math.round(obj.temp.min) + "°C";
    icon.src = "http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@4x.png";
    date.innerHTML = jourSemaine[new Date(obj.dt * 1000).getDay()] + " " + new Date(obj.dt * 1000).getDate();
    temp.appendChild(tempMax);
    temp.appendChild(tempMin);
    temps.id = "temps";
    description.innerHTML = obj.weather[0].description;
    temps.appendChild(icon);
    temps.appendChild(temp);
    newDiv.classList.add("search-result-info-content");
    newDiv.appendChild(temps);
    newDiv.appendChild(humidite)
    newDiv.appendChild(vent);
    divRes.appendChild(newDiv);
    divRes.appendChild(newDiv2);
    divRes.appendChild(description);
}

function getCardinalDirection(angle) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(angle / 45) % 8];
}

function search(search) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${search.lat}&lon=${search.lon}&units=metric&cnt=7&appid=ee07e2bf337034f905cde0bdedae3db8`).then(
        response => response.json()).then(
        data => {
            if (data.city !== undefined) {
                DATA = data;
                console.log("data");
                document.getElementById("ville").innerHTML = data.city.name;
                document.getElementById("pays").src = "https://countryflagsapi.com/png/" + data.city.country;
                document.getElementById("search-result-meteo").innerHTML = "";

                for (let i = 0; i < data.list.length; i++) {
                    createElem(data.list[i], i, data.list);
                }
                console.log(data);
            } else {
                document.getElementById("ville").innerHTML = "La ville n'est pas disponible à la recherche"
            }
        })
}

document.body.addEventListener('click', function () {
    document.getElementById("search-list").classList.remove("toggle");
}, true);

function load() {
    // https://openweathermap.org/data/2.5/find?q=boston&appid=ee07e2bf337034f905cde0bdedae3db8&units=metric
    var search = document.getElementById('search').value;
    fetch("https://openweathermap.org/data/2.5/find?q=" + search + "&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric").then(
        response => response.json()).then(
        data => {
            console.log(data);
            document.getElementById("search-list").innerHTML = "";
            for (let i = 0; i < data.list.length; i++) {
                createSearchList(data.list[i], i, data.list);
            }
            document.getElementById("search-list").classList.add("toggle");

        });
}

function createSearchList(obj, idx, tab) {
    var span = document.createElement("span");
    span.onclick = function () {
        document.getElementById("search-list").classList.remove("toggle");
        console.log(obj.name);
        search(obj.coord);
    }
    var titre = document.createElement("h3");
    titre.innerHTML = obj.name;
    var img = document.createElement("img");
    img.src = "https://countryflagsapi.com/png/" + obj.sys.country;
    span.appendChild(titre);
    span.appendChild(img);
    document.getElementById("search-list").appendChild(span);
}

function position(position) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&cnt=7&appid=ee07e2bf337034f905cde0bdedae3db8`).then(
        response => response.json()).then(
        data => {
            document.getElementById("ville").innerHTML = data.city.name;
            document.getElementById("pays").src = "https://countryflagsapi.com/png/" + data.city.country;
            for (let i = 0; i < data.list.length; i++) {
                createElem(data.list[i], i, data.list);
            }
            console.log(data);
        })
}

function burgerMenu() {
    let nav = document.getElementById("menu");
    nav.classList.toggle("toggle");
    document.getElementById("header-burger").classList.toggle("toggle");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.classList.toggle("toggle");
}

if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(position);


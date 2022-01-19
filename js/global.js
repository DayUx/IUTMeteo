let jourSemaine = {0: "Dimanche", 1: "Lundi", 2: "Mardi", 3: "Mercredi", 4: "Jeudi", 5: "Vendredi", 6: "Samedi"};
let latLong = {};

let DATA = {};


function createElem(obj, idx, tab) {
    let divRes = document.getElementById("search-result-meteo");
    let newDiv = document.createElement("div");
    let date = document.createElement("p");
    let temp = document.createElement("div");
    let humidite = document.createElement("div");
    humidite.classList.add("humidite");
    let humiditeIcon = document.createElement("img");

    let vent = document.createElement("div");
    let ventDir = document.createElement("h1");
    let ventSpeed = document.createElement("h2");
    vent.classList.add("vent");
    ventDir.innerHTML = getCardinalDirection(obj.deg);
    ventSpeed.innerHTML = obj.speed + " m/s";
    vent.appendChild(ventDir);
    vent.appendChild(ventSpeed);


    humiditeIcon.src = "./img/water.svg";
    let humiditeVal = document.createElement("h2");
    humiditeVal.innerHTML = obj.humidity + " %";
    humidite.appendChild(humiditeIcon);
    humidite.appendChild(humiditeVal);

    temp.classList.add("temp");
    let tempMax = document.createElement("h1");
    tempMax.classList.add("tempmax")
    let tempMin = document.createElement("h1");
    tempMin.classList.add("tempmin")
    tempMax.innerHTML = Math.round(obj.temp.max) + "°C";
    tempMin.innerHTML = Math.round(obj.temp.min) + "°C";


    let icon = document.createElement("img");
    icon.src = "http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@4x.png";
    date.innerHTML = jourSemaine[new Date(obj.dt * 1000).getDay()] + " " + new Date(obj.dt * 1000).getDate();

    newDiv.classList.add("meteo-journee");
    temp.appendChild(tempMax);
    temp.appendChild(tempMin);


    let div = document.createElement("div");
    div.classList.add("meteo-journee-content");


    let temps = document.createElement("div");
    temps.id = "temps";

    let divextend = document.createElement("div");
    divextend.classList.add("meteo-journee-extend");

    div.onclick = function () {
        let list = document.getElementsByClassName("meteo-journee");
        for (let i = 0; i < list.length; i++) {
            if (list[i] != newDiv) {
                list[i].classList.remove("extend");
            }
        }
        newDiv.classList.toggle("extend");
        loadInfo(obj);
    };
    newDiv.id = idx;

    let description = document.createElement("p");
    let coucheLever = document.createElement("div");
    let couche = document.createElement("div");
    let leve = document.createElement("div");
    description.innerHTML = obj.weather[0].description;

    couche.classList.add("couche");
    leve.classList.add("leve");
    leve.before("test");
    coucheLever.appendChild(couche);
    coucheLever.appendChild(leve);
    coucheLever.classList.add("couche-leve");


    let divextendcontent = document.createElement("div");
    divextendcontent.classList.add("meteo-journee-extend-content");
    let delimiter = document.createElement("div");
    delimiter.classList.add("delimiter");
    divextendcontent.appendChild(vent);
    divextendcontent.appendChild(delimiter);
    divextendcontent.appendChild(humidite);

    divextend.appendChild(divextendcontent);
    // divextend.appendChild(vent);
    // divextend.appendChild(humidite);
    divextend.appendChild(coucheLever);
    divextend.appendChild(description);
    let styleElement = document.createElement("style");
    styleElement.innerHTML = ".leve::before{content: \"Lever \\00000a " + new Date(obj.sunrise * 1000).getUTCHours() + "h" + new Date(obj.sunrise * 1000).getUTCMinutes() + "\" !important;}.couche::before{content: \"Coucher \\00000a" + new Date(obj.sunset * 1000).getUTCHours() + "h" + new Date(obj.sunrise * 1000).getUTCMinutes() + "\" !important;}";
    divextend.appendChild(styleElement);


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
    let divRes = document.getElementById("search-result-info");
    $(divRes).children().not(':first-child').remove();
    let newDiv = document.createElement("div");
    let newDiv2 = document.createElement("div");

    let date = document.createElement("p");
    let temp = document.createElement("div");
    let humidite = document.createElement("div");
    let humiditeIcon = document.createElement("img");
    let vent = document.createElement("div");
    let ventDir = document.createElement("h1");
    let ventSpeed = document.createElement("h2");
    let humiditeVal = document.createElement("h2");
    let tempMax = document.createElement("h1");
    let tempMin = document.createElement("h1");
    let icon = document.createElement("img");
    let temps = document.createElement("div");
    let description = document.createElement("p");
    let coucheLever = document.createElement("div");
    let couche = document.createElement("div");
    let leve = document.createElement("div");

    couche.classList.add("couche");
    leve.classList.add("leve");
    leve.before("test");
    coucheLever.appendChild(couche);
    coucheLever.appendChild(leve);
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
    tempMax.classList.add("tempmax");
    tempMin.classList.add("tempmin");


    tempMax.innerHTML = Math.round(obj.temp.max) + "°C";
    tempMin.innerHTML = Math.round(obj.temp.min) + "°C";
    let delimiter = document.createElement("div");
    delimiter.classList.add("delimiter");
    let delimiter2 = document.createElement("div");
    delimiter2.classList.add("delimiter");
    icon.src = "http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@4x.png";
    date.innerHTML = jourSemaine[new Date(obj.dt * 1000).getDay()] + " " + new Date(obj.dt * 1000).getDate();
    temp.appendChild(tempMax);
    temp.appendChild(tempMin);
    temp.classList.add("temp");
    temps.id = "temps";
    coucheLever.classList.add("couche-leve");
    description.innerHTML = obj.weather[0].description;
    temps.appendChild(icon);
    temps.appendChild(temp);
    newDiv.appendChild(temps);
    newDiv.classList.add("search-result-info-content");
    newDiv.appendChild(delimiter);
    newDiv.appendChild(humidite)
    newDiv.appendChild(delimiter2);
    newDiv.appendChild(vent);
    divRes.appendChild(newDiv);
    divRes.appendChild(newDiv2);
    divRes.appendChild(coucheLever);
    divRes.appendChild(description);
    let styleElement = document.createElement("style");
    styleElement.innerHTML = ".leve::before{content: \"Lever \\00000a " + new Date(obj.sunrise * 1000).getUTCHours() + "h" + new Date(obj.sunrise * 1000).getUTCMinutes() + "\" !important;}.couche::before{content: \"Coucher \\00000a" + new Date(obj.sunset * 1000).getUTCHours() + "h" + new Date(obj.sunrise * 1000).getUTCMinutes() + "\" !important;}";
    divRes.appendChild(styleElement);
}

function getCardinalDirection(angle) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(angle / 45) % 8];
}

function search(search) {
    let divRes = document.getElementById("search-result-info");
    $(divRes).children().not(':first-child').remove();
    console.log($("search-result-info").slice(1));

    divRes.classList.add("loading");


    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${search.lat}&lon=${search.lon}&units=metric&lang=fr&cnt=7&appid=ee07e2bf337034f905cde0bdedae3db8`).then(
        response => response.json()).then(
        data => {
            if (data.city !== undefined) {
                DATA = data;
                console.log("data");
                document.getElementById("ville").innerHTML = data.city.name;
                document.getElementById("pays").src = "https://countryflagsapi.com/png/" + data.city.country;
                document.getElementById("search-result-meteo").innerHTML = "";
                divRes.classList.remove("loading");
                for (let i = 0; i < data.list.length; i++) {
                    createElem(data.list[i], i, data.list);
                }
                console.log(data);
            }
        }).catch(function () {
        divRes.classList.remove("loading");
    })
}

document.body.addEventListener('click', function () {
    document.getElementById("search-list").classList.remove("toggle");
}, true);

function load() {
    let recherche = document.getElementById("search-list");
    $(recherche).children().not(':first-child').remove();
    document.getElementById("search-list").classList.add("loading");

    let search = document.getElementById('search').value;
    fetch("https://openweathermap.org/data/2.5/find?q=" + search + "&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric").then(
        response => response.json()).then(
        data => {
            $(recherche).children().not(':first-child').remove();
            document.getElementById("search-list").classList.add("loading");

            console.log(data);
            for (let i = 0; i < data.list.length; i++) {
                createSearchList(data.list[i], i, data.list);
            }
            document.getElementById("search-list").classList.remove("loading");
            document.getElementById("search-list").classList.add("toggle");
        }).catch(function (error) {
        document.getElementById("search-list").classList.remove("loading");
    });
}

function createSearchList(obj, idx, tab) {
    let span = document.createElement("span");
    span.onclick = function () {
        document.getElementById("search-list").classList.remove("toggle");
        console.log(obj.name);
        search(obj.coord);
    }
    let titre = document.createElement("h3");
    titre.innerHTML = obj.name;
    let img = document.createElement("img");


    img.src = "https://countryflagsapi.com/png/" + obj.sys.country;
    span.appendChild(titre);
    span.appendChild(img);
    document.getElementById("search-list").appendChild(span);


    let tempMax = document.createElement("h1");
    tempMax.classList.add("tempmax")
    let tempMin = document.createElement("h1");
    tempMin.classList.add("tempmin")
    let icon = document.createElement("img");
    let temps = document.createElement("div");
    let temp = document.createElement("div");
    tempMax.innerHTML = Math.round(obj.main.temp_max + -273, 15) + "°C";
    tempMin.innerHTML = Math.round(obj.main.temp_min + -273, 15) + "°C";
    icon.src = "http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@4x.png";

    temp.appendChild(tempMax);
    temp.appendChild(tempMin);
    temp.classList.add("temp");
    temps.id = "temps";

    temps.appendChild(icon);
    temps.appendChild(temp);
    span.appendChild(temps);
}

function position(position) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&lang=fr&cnt=7&appid=ee07e2bf337034f905cde0bdedae3db8`).then(
        response => response.json()).then(
        data => {


            if (data.city.name == "") {
                document.getElementById("ville").innerHTML = "Ville inconnue";
            } else {
                document.getElementById("ville").innerHTML = data.city.name;
            }

            if (data.city.country == "") {
                document.getElementById("pays").src = "img/nodata.svg";
            } else {
                document.getElementById("pays").src = "https://countryflagsapi.com/png/" + data.city.country;
            }
            document.getElementById("search-result-meteo").innerHTML = "";

            for (let i = 0; i < data.list.length; i++) {
                createElem(data.list[i], i, data.list);
            }
            console.log(data);
        })
}


document.getElementById("search").onkeypress = function (e) {
    if (e.keyCode == 13) {
        load();
    }
}


function burgerMenu() {
    let nav = document.getElementById("menu");
    nav.classList.toggle("toggle");
    document.getElementById("header-burger").classList.toggle("toggle");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.classList.toggle("toggle");
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position);
} else {
    position({coords: {latitude: 48.856614, longitude: 2.3522219}});
}


function initMap() {
    const myLatlng = {lat: -25.363, lng: 131.044};
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng,
    });
    google.maps.event.addListener(map, 'click', function (event) {
        marker.setPosition(event.latLng);
        latLong = event.latLng.toJSON();
    });
    let marker = new google.maps.Marker({
        position: location,
        map: map
    });

}


function valider() {
    console.log(latLong);
    document.getElementsByClassName("map-container")[0].classList.remove("toggle");
    position({coords: {latitude: latLong.lat, longitude: latLong.lng}});
}

function showMap() {
    document.getElementsByClassName("map-container")[0].classList.toggle("toggle");
}
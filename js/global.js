var jourSemaine = {0: "Dimanche",1: "Lundi", 2: "Mardi", 3: "Mercredi", 4: "Jeudi", 5: "Vendredi", 6: "Samedi"};

function createElem(obj, idx, tab) {
    var divRes = document.getElementById("search-result-meteo");
    var newDiv = document.createElement("div");
    var date = document.createElement("p");
    var temp = document.createElement("div");
    temp.classList.add("temp");

    var tempMax = document.createElement("h1");
    tempMax.classList.add("tempmax")
    var tempMin = document.createElement("h1");
    tempMin.classList.add("tempmin")
    tempMax.innerHTML=  Math.round(obj.temp.max) + "°C";
    tempMin.innerHTML=Math.round(obj.temp.min)+"°C";



    var icon = document.createElement("img");
    icon.src = "http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@4x.png";
    date.innerHTML = jourSemaine[new Date(obj.dt * 1000).getDay()] + " " + new Date(obj.dt * 1000).getDate();

    newDiv.classList.add("meteo-journee");
    temp.appendChild(tempMax);
    temp.appendChild(tempMin);

    newDiv.appendChild(temp);
    newDiv.appendChild(icon);
    newDiv.appendChild(date);
    divRes.appendChild(newDiv);
}

function search() {
    console.log("test")
    var searchId = document.getElementById('search').value;
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${searchId},fr&units=metric&cnt=7&appid=ee07e2bf337034f905cde0bdedae3db8`).then(
        response => response.json()).then(
        data => {
            document.getElementById("ville").innerHTML = data.city.name;
            document.getElementById("pays").innerHTML = data.city.country;
            document.getElementById("search-result-meteo").innerHTML="";
            for (let i = 0; i < data.list.length; i++) {
                createElem(data.list[i], i, data.list);
            }
            console.log(data);

        })
}


function position(position) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&cnt=7&appid=ee07e2bf337034f905cde0bdedae3db8`).then(
        response => response.json()).then(
        data => {
            document.getElementById("ville").innerHTML = data.city.name;
            document.getElementById("pays").innerHTML = data.city.country;
            for (let i = 0; i < data.list.length; i++) {
                createElem(data.list[i], i, data.list);
            }
            console.log(data);
        })
}

if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(position);


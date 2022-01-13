function search(){
    console.log("test")
    var searchId = document.getElementById('search').value;
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${searchId},fr&units=metric&cnt=7&appid=ee07e2bf337034f905cde0bdedae3db8`).then(
            response => response.json()).then(
                data => {
                    document.getElementById("ville").innerHTML=data.city.name;
                    document.getElementById("pays").innerHTML=data.city.country;

                    console.log(data);
    })
}

function position(position) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&cnt=7&appid=ee07e2bf337034f905cde0bdedae3db8`).then(
        response => response.json()).then(
        data => {
            document.getElementById("ville").innerHTML=data.city.name;
            document.getElementById("pays").innerHTML=data.city.country;

            console.log(data);
        })
}

if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(position);


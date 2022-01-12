function search(){
    var searchId = document.getElementById('search').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchId},fr&appid=ee07e2bf337034f905cde0bdedae3db8`).then(
            response => response.json()).then(
                data => {
        console.log(data);
    })
}


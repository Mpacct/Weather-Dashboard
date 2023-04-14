const apiKey = '7507cf6b5c3a1e1d02bbc1638c0f032d';
const userInput = document.getElementById("userInput")
const searchBtn = document.getElementById("searchBtn");
function runApi(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`
    fetch(apiUrl, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if(data.cod === "404") {
            for(i=0; i < 5; i++) {
                let day = document.querySelector(`#day${i+1}`)
                day.textContent = "";

            }
            document.querySelector("#day1").textContent = "no results found"
        } else {
            let currentDay = 1;
            for(i=0; i < data.list.length; i+=8) {
                let day = document.querySelector(`#day${currentDay}`)
                day.textContent = ""
                day.textContent = `date:${data.list[i].dt_txt} temp: ${data.list[i].main.temp_max}`
                console.log(currentDay)
                currentDay++
            }
        }
      });
};

searchBtn.addEventListener("click", function (event){
    event.preventDefault();
    const cityName = userInput.value.trim();
    runApi(cityName);
});

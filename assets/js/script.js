// global variables
var getSearch = document.getElementById('searchBtn');
var userCitySearch = document.getElementById('chooseCity');
var searchHistItems = document.getElementById('searchHist');
var APIkey = '2815fbbd6ca34e187c4349caa83d3e2c';
var currTimeUnix = moment().format('X');
var currTimeDate = moment().format('l');
var currCityDisplay = document.getElementById('currCityInfo');
var citiesSearched = [];

// adding event listener for button click
getSearch.addEventListener('click', function(e){
    e.preventDefault;
    var searchInfo = userCitySearch.value;
    searchCity(searchInfo);
    userCitySearch.value = "";
})

// adding event listener for enter key
userCitySearch.addEventListener('keyup', function(e){
    if(e.code === 'Enter' && userCitySearch.value !== ''){
        e.preventDefault;
        var searchInfo = userCitySearch.value;
        searchCity(searchInfo);
        userCitySearch.value = "";
    }else{
        return;
    }
})

/* This function grabs data from user input weather source, calls weather API and displays information based on current and future conditions.
*/
function searchCity(info) {
    var openWeather = 'https://api.openweathermap.org/geo/1.0/direct?q='+ info + '&appid=' + APIkey;
    fetch(openWeather)
      .then(function(response) {
        return response.json();
    }).then(function(data){
        currCityDisplay.textContent = '';
        if(!citiesSearched.includes(data[0].name)){
            var searchContainer = document.getElementById('searchHist');
            var searchedItem = document.createElement('li');
            searchedItem.classList.add('list-group-item' , 'prevCityList');
            searchedItem.setAttribute('data-local', data[0].name);
            searchedItem.textContent = data[0].name;
            citiesSearched.push(data[0].name);
            localStorage.setItem('search', JSON.stringify(citiesSearched));
            searchContainer.appendChild(searchedItem);
        }
        var currHeading = document.createElement('h4')
        currHeading.textContent = data[0].name + ": " + currTimeDate;
        currCityDisplay.appendChild(currHeading);
        // console.log(citiesSearched)
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        var oneAPIUse = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + latitude + '&lon=' + longitude +'&dt='+ currTimeUnix + '&units=imperial&appid=' + APIkey;

        fetch(oneAPIUse)      
            .then(function(response){
                return response.json();
            }).then(function(data){
                var weatherIcon = document.createElement('img');
                weatherIcon.setAttribute('src', 'https://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png');
                weatherIcon.setAttribute('alt', data.current.weather[0].description);
                currCityDisplay.appendChild(weatherIcon);
                var uvIndex = document.createElement('span');
                uvIndex.setAttribute('class', 'UVINcontainer');
                uvIndex.textContent = data.current.uvi;
                // checks value of uv to give an appropriate color
                if(data.current.uvi < 5){
                    uvIndex.classList.add('uv_low')
                }else if( data.current.uvi >= 5 && data.current.uvi < 10){
                    uvIndex.classList.add('uv_middle');
                }else if(data.current.uvi >= 10){
                    uvIndex.classList.add('uv_high');
                }else{
                    uvIndex.setAttribute('style', '');
                }
                var currTemp = document.createElement('p');
                currTemp.textContent = 'Temp: ' + data.current.temp + ' \u2109';
                currCityDisplay.appendChild(currTemp);

                var currWindSpeed = document.createElement('p');
                currWindSpeed.textContent = 'Wind: ' + data.current.wind_speed + ' MPH';
                currCityDisplay.appendChild(currWindSpeed);

                var currHumidity = document.createElement('p');
                currHumidity.textContent = 'Humidity: ' + data.current.humidity + '%';
                currCityDisplay.appendChild(currHumidity);

                var currUVIndex = document.createElement('p');
                currUVIndex.textContent = 'UV Index: ';
                currUVIndex.appendChild(uvIndex);
                currCityDisplay.appendChild(currUVIndex);
            });
            var fiveAPIUse = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=current,minutely,hourly,alerts&units=imperial&appid='+ APIkey;

            fetch(fiveAPIUse).then(function(response){
                return response.json();
            }).then(function(data){
                document.getElementById('cardContainer').innerHTML = '';
                // starts from 1, 0 is current day
                for(var i=1; i < 6; i++){
                    var presentCont= document.createElement('div');
                    var presentContHead = document.createElement('div');
                    var presentContBody = document.createElement('div');
                    var futureDate = document.createElement('h5');
                    var futureTemp = document.createElement('p');
                    var futureWind = document.createElement('p');
                    var futureHumid = document.createElement('p');
                    var futureIcon = document.createElement('img');
                    var presentContBody = document.createElement('div');
                    var dailyDataObj = data.daily[i];
                    presentCont.classList.add('card', 'mb-1', 'col-12', 'col-md-5', 'col-lg-2');
                    presentContHead.classList.add('card-header');
                    presentContBody.classList.add('card-body');
                    futureDate.classList.add('card-title');
                    var convertingUNIX = new Date(dailyDataObj.dt * 1000);
                    var foreCastMonth = convertingUNIX.toLocaleString("en-US",  {month: "numeric"});
                    var foreCastDay = convertingUNIX.toLocaleString("en-US",  {day: "numeric"});
                    var foreCastYear = convertingUNIX.toLocaleString("en-US",  {year: "numeric"});
                    var humanFormat = foreCastMonth+'/'+foreCastDay+'/'+ foreCastYear;
                    // console.log(humanFormat);
                    presentContHead.textContent = humanFormat;
                    
                    futureTemp.textContent = 'Temp: ' + dailyDataObj.temp.day + '\u2109';
                    futureWind.textContent = 'Wind: '+ dailyDataObj.wind_speed + 'MPH';
                    futureHumid.textContent = 'Humidity: ' + dailyDataObj.humidity + "%";
                    futureIcon.setAttribute('src',  'https://openweathermap.org/img/w/' + dailyDataObj.weather[0].icon + '.png');
                    futureIcon.setAttribute('alt',  'current weather icon');
                    presentCont.appendChild(presentContHead);
                    presentContBody.appendChild(futureIcon);
                    presentContBody.appendChild(futureTemp);
                    presentContBody.appendChild(futureWind);
                    presentContBody.appendChild(futureHumid);
                    presentCont.appendChild(presentContBody);
                    document.getElementById('cardContainer').appendChild(presentCont);               
                }
            });
    });
    
}


searchHistItems.addEventListener('click', function(e){
    var pressed = e.target;
    searchCity(pressed.textContent);
});

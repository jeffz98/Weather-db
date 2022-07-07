
var getSearch = document.getElementById('searchBtn')
var userCitySearch = document.getElementById('chooseCity')
var searchHistItems = document.getElementById('searchHist');
var APIkey = '2815fbbd6ca34e187c4349caa83d3e2c'
var currTimeUnix = moment().format('X');
var currTimeDate = moment().format('LLLL');
var currCityDisplay = document.getElementById('currCityInfo');
var citiesSearched = [];

getSearch.addEventListener('click', function(e){
    e.preventDefault;
    var searchInfo = userCitySearch.value;
    searchCity(searchInfo);
    userCitySearch.value = "";
})

userCitySearch.addEventListener('keyup', function(e){
    if(e.code === 'Enter' && userCitySearch.value !== ''){
        e.preventDefault;
        var searchInfo = userCitySearch.value;
        searchCity(searchInfo);
        userCitySearch.value = "";
    }else{
        return
    }
})
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
            var uvIndex = document.createElement('span')
            uvIndex.setAttribute('class', 'UVINcontainer')
            uvIndex.textContent = data.current.uvi;
            if(data.current.uvi < 5){
                uvIndex.classList.add('uv_low')
            }else if( data.current.uvi >= 5 && data.current.uvi < 10){
                uvIndex.classList.add('uv_middle')
            }else if(data.current.uvi >= 10){
                uvIndex.classList.add('uv_high')
            }else{
                uvIndex.setAttribute('style', '')
            }
        });

    });
}


searchHistItems.addEventListener('click', function(e){
    var pressed = e.target
    searchCity(pressed.textContent);
})

// function refresh() {

// }
// refresh()

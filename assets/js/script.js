
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
        console.log(citiesSearched)
    });
}


searchHistItems.addEventListener('click', function(e){
    var pressed = e.target
    searchCity(pressed.textContent);
})

// function refresh() {

// }
// refresh()

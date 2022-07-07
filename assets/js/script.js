
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
    console.log("hi");
}


searchHistItems.addEventListener('click', function(e){
    var pressed = e.target
    searchCity(pressed.textContent);
})


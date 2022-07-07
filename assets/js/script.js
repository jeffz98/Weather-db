
var getSearch = document.getElementById('searchBtn')
var userCitySearch = document.getElementById('chooseCity')
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

function searchCity(info) {
    console.log("hi");
}
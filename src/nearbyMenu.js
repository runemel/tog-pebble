var UI = require('ui');
var ajax = require('ajax');

var trainStations = [];

var colors = require('colors');

var distances = [5, 10, 30, 50];

var stationsMenu = new UI.Menu({
  sections: [{
    title: 'Stasjoner i nærheten',
    items: trainStations
  }],
  backgroundColor: colors.menu.backgroundColor,
  textColor: colors.menu.textColor,
  highlightBackgroundColor: colors.menu.highlightBackgroundColor
});
stationsMenu.on('select', function(e) {
  var selectedStation = trainStations[e.itemIndex];
  var stationMenu = require('stationMenu');
  stationMenu.show(selectedStation);
});

var fillStations = function(data, distance){
  trainStations.length = 0;
  var location = require('location');
  navigator.geolocation.getCurrentPosition(
    function(position){
      for(var i in data){
        var station = data[i];
        if(location.isClose(distance, {lat: position.coords.latitude, lng: position.coords.longitude}, {lat: station.Latitude, lng: station.Longitude})){
          trainStations.push({title: station.Name, stopPointRef: station.StopPointRef});
        }
      }
      
      stationsMenu.show();
    },
    function(err){
      console.log('location error (' + err.code + '): ' + err.message);
    }
  );
};

var nearByMenu = new UI.Menu({
  sections: [{
    title: 'Stasjoner i nærheten',
    items: [
      {title: 'Under 5 km'},
      {title: 'Under 10 km'},
      {title: 'Under 30 km'},
      {title: 'Under 50 km'}
    ]
  }],
  backgroundColor: colors.menu.backgroundColor,
  textColor: colors.menu.textColor,
  highlightBackgroundColor: colors.menu.highlightBackgroundColor
});

nearByMenu.on('select', function(e) {
  ajax(
    {
      url:'http://m.jbv.no/internett1/index.php?t=mobile.api_v3&f=getAllStations',
      type:'json'
    },
    function(data) {
      fillStations(data, distances[e.itemIndex]);
    },
    function(error) {
      console.log('Download failed: ' + error);
    }
  );
});

exports.show = function(){
  nearByMenu.show();
};
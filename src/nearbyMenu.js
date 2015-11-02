var UI = require('ui');
var ajax = require('ajax');

var trainStations = [];

var colors = require('colors');

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

var fillStations = function(data){
  trainStations.length = 0;
  var location = require('location');
  navigator.geolocation.getCurrentPosition(
    function(position){
      for(var i in data){
        var station = data[i];
        if(location.isClose({lat: position.coords.latitude, lng: position.coords.longitude}, {lat: station.Latitude, lng: station.Longitude})){
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

exports.show = function(){
  ajax(
    {
      url:'http://m.jbv.no/internett1/index.php?t=mobile.api_v3&f=getAllStations',
      type:'json'
    },
    function(data) {
      fillStations(data);
    },
    function(error) {
      console.log('Download failed: ' + error);
    }
  );
};
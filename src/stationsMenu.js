var UI = require('ui');
var ajax = require('ajax');

var trainStations = [];

var colors = require('colors');

var stationsMenu = new UI.Menu({
  sections: [{
    title: 'Stasjoner',
    items: trainStations
  }],
  backgroundColor: colors.menu.backgroundColor,
  textColor: colors.menu.textColor,
  highlightBackgroundColor: colors.menu.highlightBackgroundColor
});
stationsMenu.on('select', function(e) {
  var selectedStation = trainStations[e.itemIndex];
  var stationMenu = require('stationMenu');
  stationMenu.show(selectedStation, trainStations);
});

var fillStations = function(data, letterChosen){
  trainStations.length = 0;
  for(var i in data){
    var station = data[i];
    if(station.Name.substring(0, 1) === letterChosen){
      trainStations.push({title: station.Name, stopPointRef: station.StopPointRef});
    }
  }
};

exports.show = function(letterChosen){
  ajax(
    {
      url:'http://m.jbv.no/internett1/index.php?t=mobile.api_v3&f=getAllStations',
      type:'json'
    },
    function(data) {
      fillStations(data, letterChosen);
      stationsMenu.show();
    },
    function(error) {
      console.log('Download failed: ' + error);
    }
  );
};
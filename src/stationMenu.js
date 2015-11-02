require('dateFormat');

var UI = require('ui');
var ajax = require('ajax');
var Settings = require('settings');

var station = {};
var departures = [];

var isFavorite = function(){
  var favorites = Settings.data('favorites');
  if(favorites && favorites.length > 0){
    var isFavorite = favorites.filter(function(favorite){
      return favorite.stopPointRef === station.stopPointRef;
    }).length > 0;
    
    return isFavorite;
  }
  
  return false;
};

var stationMenu = new UI.Menu({
  sections: [{
    title: 'Avganger',
    items: departures
  }]
});
stationMenu.on('select', function(e) {
  if(e.itemIndex === 0){
    if(isFavorite()){
      
    }
    else{
      var favorites = Settings.data('favorites');
      console.log('Adding ', station, ' to ', favorites);
      favorites.push(station);
      Settings.data('favorites', favorites);
    }
  }
});

var fillDepartures = function(data){
  for(var i in data){
    var departure = data[i];
    departures.push({title: departure.DestinationDisplay, subtitle: new Date(departure.ExpectedDepartureTime).format('ddd d. mmm HH:MM')});
  }
};

exports.show = function(s){
  console.log('Setting station to ', s);
  station = s;
  ajax(
    {
      url: 'http://m.jbv.no/internett1/index.php?t=mobile.api_v3&f=stopMonitoring&StopVisitTypes=Departure&MonitoringRef=' + station.stopPointRef + '&DetailLevel=iphone&MaximumNumberOfCalls=10',
      type: 'json'
    },
    function(data) {
        departures.length = 0;
        departures.push({title: ' ', subtitle: isFavorite() ? 'Fjern som favoritt' : 'Legg til som favoritt'});
        fillDepartures(data);
        stationMenu.show();
      },
      function(error) {
        console.log('Download failed: ' + error);
      }
  );
};
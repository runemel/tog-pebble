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

var setFavoriteText = function(){
  departures[0] = {title: ' ', subtitle: isFavorite() ? 'Fjern favoritt' : 'Legg til favoritt'};
}

var fillDepartures = function(data){
  departures.length = 0;
  setFavoriteText();
  for(var i in data){
    var departure = data[i];
    departures.push({title: departure.DestinationDisplay, subtitle: new Date(departure.ExpectedDepartureTime).format('ddd d. mmm HH:MM'), destination: departure.DestinationName});
  }
};

var colors = require('colors');

var stationMenu = new UI.Menu({
  sections: [{
    title: 'Avganger',
    items: departures
  }],
  backgroundColor: colors.menu.backgroundColor,
  textColor: colors.menu.textColor,
  highlightBackgroundColor: colors.menu.highlightBackgroundColor
});
stationMenu.on('select', function(e) {
  if(e.itemIndex === 0){
    var favorites = Settings.data('favorites');
    if(isFavorite()){
      var indexToRemove = -1;
      for(var i in favorites){
        var favorite = favorites[i];
        if(favorite.stopPointRef === station.stopPointRef){
          indexToRemove = i;
        }
      }
      if(indexToRemove > -1){
        favorites.splice(indexToRemove, 1);
        Settings.data('favorites', favorites);
      }
    }
    else{
      console.log('Adding ', station, ' to ', favorites);
      favorites.push(station);
      Settings.data('favorites', favorites);
    }
    
    setFavoriteText();
    stationMenu.items(0, departures);
  }
});

exports.show = function(s){
  station = s;
  ajax(
    {
      url: 'http://m.jbv.no/internett1/index.php?t=mobile.api_v3&f=stopMonitoring&StopVisitTypes=Departure&MonitoringRef=' + station.stopPointRef + '&DetailLevel=iphone&MaximumNumberOfCalls=10',
      type: 'json'
    },
    function(data) {
        fillDepartures(data);
        stationMenu.show();
      },
      function(error) {
        console.log('Download failed: ' + error);
      }
  );
};
var UI = require('ui');
var Settings = require('settings');

var favorites = [];

var colors = require('colors');

var fillStations = function(savedFavorites){
  favorites.length = 0;
  var location = require('location');
  navigator.geolocation.getCurrentPosition(
    function(position){
      for(var i in savedFavorites){
        var station = savedFavorites[i];
        var proximityResult = location.getProximity(null, {lat: position.coords.latitude, lng: position.coords.longitude}, {lat: station.latitude, lng: station.longitude});
        var distanceInKm = proximityResult.distanceInKm;
        favorites.push({title: station.title, subtitle: distanceInKm + 'km', distance: distanceInKm, stopPointRef: station.stopPointRef, latitude: station.latitude, longitude: station.longitude});
      }
      
      favorites = favorites.sort(
        function(a, b){return a.distance-b.distance;}
      );

      var favoritesMenu = new UI.Menu({
        sections: [{
          title: 'Favoritter',
          items: favorites
        }],
        backgroundColor: colors.menu.backgroundColor,
        textColor: colors.menu.textColor,
        highlightBackgroundColor: colors.menu.highlightBackgroundColor
      });
      favoritesMenu.on('select', function(e) {
        var selectedStation = favorites[e.itemIndex];
        var stationMenu = require('stationMenu');
        stationMenu.show(selectedStation);
      });
      
      favoritesMenu.show();
    },
    function(err){
      console.log('location error (' + err.code + '): ' + err.message);
    }
  );
};

exports.show = function(){
  var savedFavorites = Settings.data('favorites');
  if(!savedFavorites){
    savedFavorites = [];
    Settings.data('favorites', savedFavorites);
  }
  else if(savedFavorites.length > 0){
    fillStations(savedFavorites);
  }
  
  favoritesMenu.show();
};
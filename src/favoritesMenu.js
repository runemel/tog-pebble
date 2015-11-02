var UI = require('ui');
var Settings = require('settings');

var favorites = [];

var favoritesMenu = new UI.Menu({
  sections: [{
    title: 'Favoritter',
    items: favorites
  }]
});
favoritesMenu.on('select', function(e) {
  var selectedStation = favorites[e.itemIndex];
  var stationMenu = require('stationMenu');
  stationMenu.show(selectedStation);
});

var fillStations = function(savedFavorites){
  favorites.length = 0;
  for(var i in savedFavorites){
    var station = savedFavorites[i];
    favorites.push({title: station.title, stopPointRef: station.stopPointRef});
  }
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
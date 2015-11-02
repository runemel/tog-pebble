var Settings = require('settings');
var favorites = Settings.data('favorites');
if(favorites){
  for(var i in favorites){
    var favorite = favorites[i];
    console.log('Removing favorite: ', favorite);
  }
  Settings.data('favorites', []);
}
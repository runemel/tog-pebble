var UI = require('ui');

var successAddFavorite = new UI.Card({
  title: 'Favoritt',
  subtitle: 'Du har lagt til stasjonen som favoritt.',
  body: 'Trykk en knapp.'
});

var successRemoveFavorite = new UI.Card({
  title: 'Favoritt',
  subtitle: 'Du har fjernet stasjonen som favoritt.',
  body: 'Trykk en knapp.'
});

var addClickEvent = function(menu, button){
  menu.on('click', button, function() {
    menu.hide();
  });
};

addClickEvent(successAddFavorite, 'up');
addClickEvent(successAddFavorite, 'select');
addClickEvent(successAddFavorite, 'down');
addClickEvent(successAddFavorite, 'back');
addClickEvent(successRemoveFavorite, 'up');
addClickEvent(successRemoveFavorite, 'select');
addClickEvent(successRemoveFavorite, 'down');
addClickEvent(successRemoveFavorite, 'back');


exports.show = function(added){
  if(added){
    successAddFavorite.show();
  }
  else{
    successRemoveFavorite.show();
  }
};
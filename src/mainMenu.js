var UI = require('ui');

var menuItems = [
  {
    title: 'Stasjoner'
  },
  {
    title: 'I nærheten'
  },
  {
    title: 'Favoritter'
  }
  
];

var colors = require('colors');

var menu = new UI.Menu({
  sections: [{
    title: 'Togtider',
    items: menuItems
  }],
  backgroundColor: colors.menu.backgroundColor,
  textColor: colors.menu.textColor,
  highlightBackgroundColor: colors.menu.highlightBackgroundColor
});
menu.on('select', function(e) {
  if(e.itemIndex === 0){ //Stasjoner
    var alphabetMenu = require('alphabetMenu');
    alphabetMenu.show();
  }
  else if(e.itemIndex === 1){ //I nærheten
    var nearbyMenu = require('nearbyMenu');
    nearbyMenu.show();
  }
  else if(e.itemIndex === 2){ //Favoritter
    var favoritesMenu = require('favoritesMenu');
    favoritesMenu.show();
  }
});

exports.show = function(){
  menu.show();
};
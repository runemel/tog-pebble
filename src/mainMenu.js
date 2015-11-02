var UI = require('ui');

var menuItems = [
  {
    title: 'Stasjoner'
  }
  
];

var menu = new UI.Menu({
  sections: [{
    items: menuItems
  }]
  });
menu.on('select', function(e) {
  if(e.itemIndex === 0){
    var alphabetMenu = require('alphabetMenu');
    alphabetMenu.show();
  }
  else if(e.itemIndex === 1){
  }
});

exports.show = function(){
  menu.show();
};
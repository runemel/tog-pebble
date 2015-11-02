var UI = require('ui');

var alphabetItems = [];
var alphabet = '';

function fillAlphabetList(){
  alphabetItems.length = 0;
  var alphabetString = "abcdefghijklmnopqrstuvwxyzæøå";
  alphabet = (alphabetString.toUpperCase()).split('');

  for(var letter in alphabet){
    alphabetItems.push({title: alphabet[letter]});
  }
}

var colors = require('colors');

var stationsAlphabetMenu = new UI.Menu({
  sections: [{
    title: 'A-Å',
    items: alphabetItems
  }],
  backgroundColor: colors.menu.backgroundColor,
  textColor: colors.menu.textColor,
  highlightBackgroundColor: colors.menu.highlightBackgroundColor
});

stationsAlphabetMenu.on('select', function(e) {
  var letterChosen = alphabet[e.itemIndex];
  var stationsMenu = require('stationsMenu');
  stationsMenu.show(letterChosen);
});
    
exports.show = function(){
  fillAlphabetList();
  stationsAlphabetMenu.show();
};



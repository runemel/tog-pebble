var UI = require('ui');
require('dateFormat');

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

var stationsAlphabetMenu = new UI.Menu({
  sections: [{
    title: 'A-Å',
    items: alphabetItems
  }]
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



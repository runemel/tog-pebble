var UI = require('ui');
var ajax = require('ajax');

var departures = [];

var stationMenu = new UI.Menu({
  sections: [{
    title: 'Avganger',
    items: departures
  }]
});
stationMenu.on('select', function(e) {
});

var fillDepartures = function(data){
  departures.length = 0;
  for(var i in data){
    var departure = data[i];
    departures.push({title: departure.DestinationDisplay, subtitle: new Date(departure.ExpectedDepartureTime).format('ddd d. mmm HH:MM')});
  }
};

exports.show = function(station){
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
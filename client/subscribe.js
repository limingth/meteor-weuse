Deps.autorun(function(){
  if (Session.equals('mapLoaded', 'dom')) {
    initGMaps();
  }

  if (Session.equals('mapLoaded', 'yes')) {
    map.addMarkers(Meteor.users.find().fetch());
  }

});

// Select Geohash if possible
Deps.autorun(function(){
  var gh = Session.get('selectedGeohash');
  if (typeof map !== 'undefined') {
    if (gh)
      map.highlightGeohash(gh); // highlight or add marker
  }
});

GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

Deps.autorun(function(){
  if (Meteor.user()) 
  {
    console.log('User is logged');

    var l = Geolocation.latLng();
    if (l)
    {
      Deps.currentComputation.stop();
      console.log('Geolocation arrived!');

      console.log('lat:', l.lat);
      console.log('lng:', l.lng);
      Meteor.call('set-user-loginpos', l);

      url = GOOGLE_MAPS_API_URL + l.lat + ',' + l.lng;
      console.log ('url: ', url);

      $.getJSON(url, function(res) {
        var a, z;
        if (res.status === 'OK') {
          a = res.results[0].formatted_address;
          z = res.results[2].address_components[0].long_name;

          console.log ('addr: ', a);
          console.log ('zip: ', z);

          Session.set('myaddr', a);
          Session.set('myzip', z);

          Meteor.call('set-user-login-addr', a);
          Meteor.call('set-user-login-zip', z);
        }
      });
    }
  }
  else 
    console.log('User is not logged');
});




// just for testing the account-password package
Accounts.ui.config({
  // requestPermissions: {
  //   github: ['user']
  // },
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
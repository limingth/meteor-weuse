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

Deps.autorun(function(){
  if (Meteor.user()) 
  {
    console.log('User is logged');

    var l = Geolocation.latLng();
    if (l)
    {
      console.log('Geolocation arrived!');
      Session.set('myloc', l);
      console.log('lat:', Session.get('myloc').lat); 
      console.log('lng:', Session.get('myloc').lng); 

      //Meteor.user().loginpos = l;
      Meteor.call('set-user-loginpos', l);

      var selectedGeohash = geohash.encode(l.lat, l.lng, 5);
      Session.set('selectedGeohash', selectedGeohash);

      // as if we have clicked
      Meteor.call('set-user-geohash', Session.get('selectedGeohash'));
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
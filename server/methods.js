Meteor.methods({
  'set-user-geohash': function (geohash) {
    // TODO: test valide geohash
    check(geohash, String);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.geohash":geohash, updatedAt:new Date() }});
  },
  'unset-user-geohash': function () {
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.geohash":undefined}});
  },
  'set-user-login-addr': function(addr) {
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"loginaddr":addr}});
  },
  'set-user-login-zip': function(zip) {
    Meteor.users.update({_id: Meteor.user()._id}, {$set: {"loginzip": zip}});
  },
  'set-user-login-pos': function(pos) {
    var currentGeohash = geohash.encode(pos.lat, pos.lng, 5);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"loginpos":pos, "profile.geohash":currentGeohash, updatedAt:new Date()}});
  }
});
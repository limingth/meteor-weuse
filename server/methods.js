Meteor.methods({
  // 'test':function () {
  //   console.log(Meteor.user().profile);
  // },
  'set-user-geohash': function (geohash) {
    // TODO: test valide geohash
    check(geohash, String);
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.geohash":geohash, updatedAt:new Date() }});
  },

  'unset-user-geohash': function () {
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.geohash":undefined}});
  },

  'set-user-login-pos': function(pos) {
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"loginpos":pos}});
  },

  'set-user-login-addr': function(addr) {
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"loginaddr":addr}});
  },

  'set-user-login-zip': function(zip) {
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"loginzip":zip}});
  }
});
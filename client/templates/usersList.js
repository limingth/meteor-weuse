// small markers icons
icons = {
  'small_yellow':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAi0lEQVR42mNgQIAoIF4NxGegdCCSHAMzEC+NijL7v3p1+v8zZ6rAdGCg4X+g+EyYorS0NNv////PxMCxsRYghbEgRQcOHCjGqmjv3kKQor0gRQ8fPmzHquj27WaQottEmxQLshubopAQI5CiEJjj54N8t3FjFth369ZlwHw3jQENgMJpIzSc1iGHEwB8p5qDBbsHtAAAAABJRU5ErkJggg==',
  'small_red':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAiklEQVR42mNgQIAoIF4NxGegdCCSHAMzEC+NUlH5v9rF5f+ZoCAwHaig8B8oPhOmKC1NU/P//7Q0DByrqgpSGAtSdOCAry9WRXt9fECK9oIUPXwYFYVV0e2ICJCi20SbFAuyG5uiECUlkKIQmOPng3y30d0d7Lt1bm4w301jQAOgcNoIDad1yOEEAFm9fSv/VqtJAAAAAElFTkSuQmCC'
}

// reactive data
Template.usersList.usersNumber = function () {
  return Meteor.users.find().count() || 0;
  //allUsers.find().count() || 0;
}

Template.usersList.isUserInThisGeohash = function () {
  if (Meteor.user() === null)
    return false;

  return Meteor.user().profile.geohash === Session.get('selectedGeohash');
}

Template.usersList.selectedGeohash = function () {
  return Session.get('selectedGeohash');
}

Template.usersList.allUsers = function () {
  
  var cond = Session.get('cond');
  var reponame = Session.get('reponame');

  if (cond == 1)
  {
    if (reponame)
       return Meteor.users.find({'profile.name': reponame}, {limit:1, sort:{updatedAt:1}}); 
    return Meteor.users.find({}, {limit:1, sort:{updatedAt:1}});  
  }  

  if (Session.get('selectedGeohash')) {
    return Meteor.users.find({'profile.geohash':Session.get('selectedGeohash')}, {sort:{}});
  } else {
    return Meteor.users.find({}, {limit:10, sort:{updatedAt:1}});
  }
  
  //return Meteor.users.find();
}

// User events
Template.usersList.events = {
  'click    .js-set-geohash':function () {
    Session.set('selectedGeohash', this.profile.geohash);
  },
  'click    .js-set-user-geohash': function () {
    Meteor.call('set-user-geohash', Session.get('selectedGeohash'));
  },
  'click    .js-unset-user-geohash': function () {
    Meteor.call('unset-user-geohash');
  },
  'click    .js-unset-geohash': function () {
    Session.set('selectedGeohash', undefined);
  },
  'click    .js-highlightId span': function () {
    var selectedId= this._id;
    map.highlightId(selectedId);
  },
  'keypress .js-filter input': function (ev) {
    if (ev.charCode === 13){
      handleFilter();
    }
  },
  'submit .repo-name': function (event) {
    // body...
    console.log ('submit entered');

    //var $input = $(event.target).find('[type=text]');
    var text = event.target.text.value;
      console.log ('input repo name ', text);
    Session.set('cond', 1);   
    Session.set('reponame', text);    
  }
}


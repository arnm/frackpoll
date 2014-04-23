// Collections
Proponents = new Meteor.Collection('proponents');
Opponents = new Meteor.Collection('opponents');
Undecided = new Meteor.Collection('undecided');

if (Meteor.isClient) {

  // Templates
  Template.proponents_list.proponents = function() {
    return Proponents.find({}, {});
  };

  Template.proponents_list.events = {
    'click button': function() {
      console.log('Proponents Vote');
    }
  };

  Template.undecided_list.undecided = function() {
    return Undecided.find({}, {});
  };

  Template.opponents_list.opponents = function() {
    return Opponents.find({}, {});
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

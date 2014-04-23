Votes = new Meteor.Collection('votes');

var SideEnum = {
  PROPONENT: 'proponent',
  UNDECIDED: 'undecided',
  OPPONENT: 'opponent'
};

if (Meteor.isClient) {

  // Proponent
  Template.proponents_template.proponents = function() {
    return Votes.find({side: SideEnum.PROPONENT});
  };

  Template.proponents_template.reasons = [
    {key: 0, value: 'It is financially beneficial for the U.S economy.'},
    {key: 1, value: 'Reduces the U.S dependence of foreign energy.' },
    {key: 2, value: 'Extraction and usage of natural gas is a form "clean" energy.'}
  ];

  Template.proponents_template.events = {
    'click button': function() {
      var radio = $('input[name=proponentReasonRadio]');
      var reason = radio.filter(':checked').val();

      if (reason === 'reason4') {
        var otherReason = $('#proponentOtherReason').val();
      } else {

      }
    }
  };

  // Undecided
  Template.undecided_template.undecided = function() {
    return Votes.find({side: SideEnum.UNDECIDED});
  };

  // Opponent
  Template.opponents_template.opponents = function() {
    return Votes.find({side: SideEnum.OPPONENT});
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

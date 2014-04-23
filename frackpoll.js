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

  // Spacebar templates currently can't provide index in HTML
  Template.proponents_template.reasons = [
    {key: 0, value: 'It is financially beneficial for the U.S economy.'},
    {key: 1, value: 'Reduces the U.S dependence of foreign energy.' },
    {key: 2, value: 'Extraction and usage of natural gas is a form "clean" energy.'}
  ];

  Template.proponents_template.events = {
    'click button': function() {
      var radio = $('input[name=proponentReasonRadio]');
      var choice = parseInt(radio.filter(':checked').val());

      var reason;
      if (choice === Template.proponents_template.reasons.length) {
        reason = $('#otherReasonInput').val();
      }
      else {
        reason = Template.proponents_template.reasons[choice]['value'];
      }

      console.log('Proponent Reason:', reason);
      Votes.insert({side: SideEnum.PROPONENT, reason: reason});
    }
  };

  // Undecided
  Template.undecided_template.undecided = function() {
    return Votes.find({side: SideEnum.UNDECIDED});
  };

  Template.undecided_template.reasons = [
    {key: 0, value: 'I am not informed enough to make an educated decision.'},
    {key: 1, value: 'The evidence presented did not convince me to vote either way.' },
  ];

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

Votes = new Meteor.Collection('votes');

var SideEnum = {
  PROPONENT: 'proponent',
  UNDECIDED: 'undecided',
  OPPONENT: 'opponent'
};

var vote = function(side, reasons) {
  var radio = $('input[name=reasonRadio]');
  var choice = parseInt(radio.filter(':checked').val());

  var reason;
  if (choice === reasons.length) {
    var id = '#' + side+ 'ReasonInput'; // TODO: format string
    reason = $(id).val();
  }
  else {
    reason = reasons[choice]['value'];
  }

  console.log(side, 'reason:', reason);
  Votes.insert({side: side, reason: reason});
};

var reasonSelected = function(side) {
  Session.set('side', side);
  // if necessary enable vote button
  $('#voteButton').removeAttr('disabled');
};

if (Meteor.isClient) {

  // Vote
  Template.voting_template.events = {
    'click button': function() {
      var side = Session.get('side');

      if (side === SideEnum.PROPONENT) {
        vote(side, Template.proponents_template.reasons);
      }
      else if (side === SideEnum.UNDECIDED) {
        vote(side, Template.undecided_template.reasons);
      }
      else if (side === SideEnum.OPPONENT) {
        vote(side, Template.opponents_template.reasons);
      }
    }
  }

  // Proponent
  Template.proponents_template.side = SideEnum.PROPONENT;

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
    'click .reason': function() {
      reasonSelected(SideEnum.PROPONENT);
    }
  };

  // Undecided
  Template.undecided_template.side = SideEnum.UNDECIDED;

  Template.undecided_template.undecided = function() {
    return Votes.find({side: SideEnum.UNDECIDED});
  };

  Template.undecided_template.reasons = [
    {key: 0, value: 'I am not informed enough to make an educated decision.'},
    {key: 1, value: 'The evidence presented did not convince me to vote either way.' },
  ];

  Template.undecided_template.events = {
    'click .reason': function() {
      reasonSelected(SideEnum.UNDECIDED);
    }
  };

  // Opponent
  Template.opponents_template.side = SideEnum.OPPONENT;

  Template.opponents_template.opponents = function() {
    return Votes.find({side: SideEnum.OPPONENT});
  };

  Template.opponents_template.reasons = [
    {key: 0, value: 'Water contamination concerns like methane migration.'},
    {key: 1, value: 'Air quality concerns from large amounts of water transportation and methane emissions.'},
    {key: 2, value: 'Fracking well pads require a lot of land which negatively effects the surrounding habitat.'},
  ];

  Template.opponents_template.events = {
    'click .reason': function() {
      reasonSelected(SideEnum.OPPONENT);
    }
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({

  'players.fetch': function(playerId){
    // Simulates a slow response by sleeping for 1 second.
    Meteor._sleepForMs(1000);
    // Fetch a single player when playerId is given, else fetch all players.
    var options = playerId || {};
    return Players.find(options).fetch();
  },

  'players.update-score': function(playerId){
    // Simulates a slow response by sleeping for 1 second.
    Meteor._sleepForMs(1000);
    // Fail one third of the time.
    if(Math.random()<.33){
      // Send the real score down with the error.
      // Clients can use this information to revert optimistic UI updates.
      var error = new Meteor.Error(500, 'Score error');
      error.details = {score: Players.findOne(playerId).score};
      throw error;
    }
    Players.update({_id: playerId}, {$inc: {score: 5}});
    return Players.findOne(playerId)
  }

})
// signed out user
SafeboxUnlockController = AppController.extend({
  onBeforeAction: function () {
  	Meteor.call('checkSafeboxUnlocked', this.params.safeboxId, function(err, res){
  		if (!res) { Router.go('unauthorized'); }
  	});

  	this.next();
  },
  action: function () {
    this.render('safeboxUnlock');
  }
});

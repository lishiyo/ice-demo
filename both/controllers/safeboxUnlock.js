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

// http://localhost:3000/safeboxes/csEQ2k8tH6EobtdCZ/unlock
// xiaodong =  "3Pitq7cx8FbonWBRB"
// secret =  "haW574KpzoPA" 
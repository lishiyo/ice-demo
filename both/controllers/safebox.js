SafeboxesController = AppController.extend({
  waitOn: function() {
    return [this.subscribe('safeboxesWithEverything', Meteor.userId())];
  },
  data: {
    safeboxes: Safeboxes.find()
  },
  onAfterAction: function () {
    Meta.setTitle('My Safeboxes');
  },
  action: function (){
    this.render();
  }
});

// http://localhost:3000/safeboxes/MiPWKBNQt4bxChtcb
SafeboxController = AppController.extend({
  waitOn: function() {
    return Meteor.subscribe('safebox', this.params.safeboxId);
  },
  data: function () {
    return Safeboxes.findOne({ _id: this.params.safeboxId });
  },
  onBeforeAction: function () {
    // check if safebox owner or allowedId && unlocked
    var safebox = this.data();
    var id = Meteor.userId();
    var unlockedAllowedFull = (safebox.unlocked && safebox.allowedAll.indexOf(id) !== -1 && Roles.userIsInRole(id, ['unlocked']) );
    var unlockedAllowedPending = (safebox.unlocked && safebox.allowedAll.indexOf(id) !== -1 && !Roles.userIsInRole(id, ['unlocked']) );


    if (safebox.owner_id === id || unlockedAllowedFull) {
      this.next();
    } else if (unlockedAllowedPending) {
      Router.go('safebox.unlock', safebox._id);
    } else {
      Router.go('/login');
    }
  },
  action: function () {
    this.render();
  }
});

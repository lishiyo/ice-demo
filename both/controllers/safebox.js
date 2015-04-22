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
  waitOn: function () {
    return [this.subscribe('safeboxesWithEverything', Meteor.userId())];
  },
  data: function () {
    return Safeboxes.findOne({ _id: this.params.safeboxId });
  },
  onBeforeAction: function () {
    // check if safebox owner or allowed && unlocked (both wath)
    var safebox = this.data();
    var id = Meteor.userId();
    var unlockedAllowedBoth = (safebox.unlocked && safebox.allowedAll.indexOf(id) !== -1 && Roles.userIsInRole(id, ['unlocked']) );
    var unlockedAllowedPending = (safebox.unlocked && safebox.allowedAll.indexOf(id) !== -1 && !Roles.userIsInRole(id, ['unlocked']) );

    if (safebox.owner_id === id || unlockedAllowedBoth) {
      this.next();
    } else if (unlockedAllowedPending) {
      Router.go('safebox.unlock', safebox._id);
    } else {
      Router.go('/unauthorized');
    }
  },
  action: function () {
    this.render();
  }
});


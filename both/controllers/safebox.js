SafeboxController = AppController.extend({
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

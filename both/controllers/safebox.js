SafeboxController = AppController.extend({
  template: 'safeboxes',
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

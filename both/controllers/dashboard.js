DashboardController = AppController.extend({
  waitOn: function() {
    return [this.subscribe('itemsAndFiles', Meteor.userId())];
  },
  data: {
    items: Items.find({})
  },
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  }
});

DashboardController.events({

});

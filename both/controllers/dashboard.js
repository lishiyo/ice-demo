DashboardController = AppController.extend({
  waitOn: function() {
    return [this.subscribe('items'), this.subscribe('files')];
  },
  data: {
    items: Items.find({})
  },
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  }
});

DashboardController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});

StepsController = RouteController.extend({
  layoutTemplate: 'appLayout',
   waitOn: function() {
    return [ this.subscribe('dashboardAll', Meteor.userId()) ];
  },
});


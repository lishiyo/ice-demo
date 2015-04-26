AppController = RouteController.extend({
  layoutTemplate: 'appLayout',
  waitOn: function(){
  	return [ this.subscribe('allActionSteps'), this.subscribe("contacts") ];
  },
  data: function(){
  	return Meteor.user();
  }
});

AppController.events({
  'click [data-action=logout]' : function() {
    AccountsTemplates.logout();
  }
});

UserController = AppController.extend({
  // waitOn: function() {
  //   return Meteor.user();
  // },
});

UserProfileController = UserController.extend({
  template: 'profileSetup',
  onAfterAction: function () {
    Meta.setTitle('Setup Your Profile');
  },
  action: function () {
    this.render();
  }
});

/**
called after template events

UserProfileController.events({
  'submit form.profile': function (event, template) {
    event.preventDefault();
    console.log("userController submit");
  }
});
**/

UserController = AppController.extend({

});

UserProfileController = UserController.extend({
  // waitOn: function() {
  //   return Meteor.user();
  // },
  template: 'profileSetup',
  onAfterAction: function () {
    Meta.setTitle('Setup Your Profile');
  },
  action: function () {
    console.log("UserProfileController");

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

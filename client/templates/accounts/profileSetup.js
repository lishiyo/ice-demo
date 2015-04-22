Template.profileSetup.onCreated(function(){

});

Template.profileSetup.helpers({
	currentUser: function(){
		if (Meteor.user()) {
			return Meteor.user();
		}
	}
});

var userProfileHooks = {
	 // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    var profile = Meteor.user().profile;
    var fullName = [profile.firstName.trim(), profile.lastName.trim()].join(" ");
    Meteor.users.update(Meteor.userId(), {$set: { fullName: fullName }});
  	Router.go('/dashboard');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	console.log("error in user profile form submit", error);
  },

}

AutoForm.hooks({
  userProfile: userProfileHooks
});

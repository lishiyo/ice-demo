Template.profileSetup.onCreated(function(){

});

Template.profileSetup.helpers({
	currentUser: function(){
		if (Meteor.user()) {
			return Meteor.user();
		}
	}
});

Template.profileSetup.events({

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

  // Called every time an insert or typeless form
  // is revalidated, which can be often if keyup
  // validation is used.
  formToDoc: function(doc) {
    // alter doc
    // return doc;
  },

  // Called every time an update or typeless form
  // is revalidated, which can be often if keyup
  // validation is used.
  formToModifier: function(modifier) {
    // alter modifier
    console.log("modifier", modifier);
    // return modifier;
  },

}

AutoForm.hooks({
  userProfile: userProfileHooks
});

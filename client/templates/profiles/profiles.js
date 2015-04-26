Template.profilesCreate.onCreated(function(){
  Router.current().render('profile-user', {to: 'content'});
});

Template.profilesCreate.helpers({
	currentUser: function(){
		if (Meteor.user()) {
			return Meteor.user();
		}
	},
  relations: function(){
    var cards = [],
        card = {};

    // var labels = ["Your Spouse or Significant Other", "A Child", "A Parent", "A Sibling", "A Pet", "A Friend"];
    var imgUrls = [
      "/images/icons/spouse.png",
      "/images/icons/child.png",
      "/images/icons/mom_small.png",
      "/images/icons/siblings.svg",
      "/images/icons/dog_small.png",
      "/images/icons/me.png"
    ];

    App.GLOBALS.Profiles.defaultRelations.forEach(function(type, idx){
      card = {};
      card.relationKey = type;
      card.label = App.GLOBALS.Profiles.relationsMap[type];
      card.imgUrl = imgUrls[idx];
      cards.push(card);
    });
    return cards; // array of objects
  }
});

Template.profilesCreate.events({
  'click .add-profile': function(event){
    event.preventDefault();
    var relation = $(event.target).data("relation-id");
    Session.set("relation", relation);
    Session.set("relationLabel", App.GLOBALS.Profiles.relationsMap[relation]);
    console.log($(event.target).data("relation-id"));

    Router.current().render('newProfileForm', {to: 'content'});
  },
  'click .next-step': function(event) {
    Router.go('contacts.create');
  }
});

Template.newProfileForm.helpers({
  userGroups: function(){
    return Groups.find().map(function(group){
      return { label: group.name, value: group._id }
    });
  },
  relation: function(){
    return Session.get("relation");
  },
  relationLabel: function(){
    return Session.get("relationLabel");
  }
});

var newProfileHooks = {
  onSuccess: function(formType, result) {
    Router.current().render('profileSuccess', {to: 'content'});
  },
}

var userProfileHooks = {
	 // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    var profile = Meteor.user().profile;
    var fullName = [profile.firstName.trim(), profile.lastName.trim()].join(" ");
    Meteor.users.update(Meteor.userId(), {$set: { fullName: fullName }});
    Router.current().render('profileSuccess', {to: 'content'});
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	console.log("error in user profile form submit", error);
  },

}

AutoForm.hooks({
  userProfile: userProfileHooks,
  newProfileForm: newProfileHooks
});

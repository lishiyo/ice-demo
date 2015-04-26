Template.contactsCreate.onCreated(function(){
	Router.current().render('contacts', { to: 'contacts' });
  Router.current().render('formWrapper', { to: 'formWrapper'});
  Router.current().render('newContactForm', { to: 'form' });
});

Template.contactsCreate.events({
	'click .next-step': function(event) {
	  Router.go('actions.create');
	}
});

Template.newContactForm.helpers({
	userSafeboxes: function(){
		return Safeboxes.find().map(function(safebox){
			return {label: safebox.name, value: safebox._id };
		});
	},
	userGroups: function(){
		return Groups.find().map(function(group){
			return { label: group.name, value: group._id }
		});
	},
});

Template.contactSuccess.helpers({
	contactsCount: function(){
		return Contacts.find().count();
	}
});

Template.contactSuccess.events({
	'click #add-more': function (event) {
		event.preventDefault();
		Router.current().render('newContactForm', {to: 'form'});
	},
});

Template.existingProfiles.helpers({
	profiles: function(){
		return Contacts.find({ type: "profile" });
	},

});

Template.existingProfiles.events({
	'click .profile-card': function(event) {
		// $('.card').removeClass('active');
		var activeCards = $('.profile-card.active').length;
		var card = $(event.currentTarget);

		if (activeCards === 0) {
			Session.set('profileId', this._id);
			card.addClass('active');
			Router.current().render('newContactProfileForm', {to: 'form'});
		} else if (!card.hasClass('active')) { // I am NOT the active card
			$('.card').removeClass('active');
			Session.set('profileId', this._id);
			card.addClass('active');
			Router.current().render('newContactProfileForm', {to: 'form'});
		} else { // I am the active card
			$('.card').removeClass('active');
			Session.set('profileId', null);
			Router.current().render('newContactForm', { to: 'form' });
		}
	}
});

Template.newContactProfileForm.helpers({
	profile: function(){
		var id = Session.get('profileId');
		var profile = Contacts.findOne({_id: id});
		return profile;S
	}
});

var updateProfileHooks = {
  onSuccess: function(formType, result) {
    Router.current().render('contactSuccess', {to: 'form'});
  },
};

AutoForm.hooks({
  newContactForm: updateProfileHooks,
  newContactProfileForm: updateProfileHooks
});

// Template.contacts.helpers({
// 	contacts: function(){
// 		return Contacts.find();
// 	},
// 	groups: function(){
// 		return Groups.find();
// 	}
// });

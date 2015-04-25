Template.contactsCreate.onCreated(function(){
  Router.current().render('newContactForm', {to: 'form'});
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
	defaultRelations: function(){

	}
});

Template.contactsCreate.helpers({

});

Template.contactsCreate.events({

});

// Template.contacts.helpers({
// 	contacts: function(){
// 		return Contacts.find();
// 	},
// 	groups: function(){
// 		return Groups.find();
// 	}
// });

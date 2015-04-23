

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

Template.contacts.helpers({
	contacts: function(){
		return Contacts.find();
	},
	groups: function(){
		return Groups.find();
	}
});

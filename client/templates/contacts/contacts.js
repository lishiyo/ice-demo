

Template.newContactForm.helpers({
	userSafeboxes: function(){
		return Safeboxes.find().map(function(safebox){
			return {label: safebox.name, value: safebox._id };
		});
	},
	userGroups: function(){
		// var customGroups = Groups.find({ type: 'custom' }).map(function(group){
		// 	return group.name;
		// });
		// var allGroups = defaultGroups.concat(customGroups);

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

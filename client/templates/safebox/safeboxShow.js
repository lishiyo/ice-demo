Template.contactsPanel.helpers({
	contacts: function(){
		return Contacts.find({ _id: { $in: this.allowedAll } });
	}
})

Template.safeboxShow.events({

});

Template.itemsPanel.helpers({
	items: function(){
		return Items.find({ _id: { $in: this.items } });
	}
});

Template.addContactsForm.helpers({
	groups: function(){
		var ids = (this.allowedGroups || []);
		return Groups.find({ _id: { $nin: ids }});
	},
	contacts: function(){
		var ids = (this.allowedContacts || []);
		return Contacts.find({ 
			_id: { $nin: ids }
		});
	}
});

Template.addContactsForm.events({
	'submit form': function(event){
		event.preventDefault();
		var $form = $(event.target);
		var groups = $form.find("select[name='allowedGroups'] option:selected");
		var contacts = $form.find("select[name='allowedContacts'] option:selected");
		var groupIds = [];
		var contactIds = [];
		var safeboxId = $form.data('safebox-id');

		groups.each(function(idx, elem){
			console.log("elem", elem);
			groupIds.push(elem.value);
		});

		contacts.each(function(idx, elem){
			console.log("elem", elem);
			contactIds.push(elem.value);
		});

		Safeboxes.update({_id: safeboxId }, {
			$addToSet: { 
				allowedGroups: { $each: groupIds },
				allowedContacts: { $each: contactIds } 
			},
		}, function(err, numDocs){
			$('.modal').modal('hide');
		});
	}
})
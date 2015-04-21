Template.contactsPanel.helpers({
	contacts: function(){
		console.log("in contacts", this);
		return Contacts.find({ _id: { $in: this.allowedAll } } );
	}
})

Template.safeboxShow.events({

})

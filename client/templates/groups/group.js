
Template.group.helpers({
	contacts: function(){
		var contacts = this.contactIds;
		return Contacts.find({ _id: { $in: contacts } } );
	}
});

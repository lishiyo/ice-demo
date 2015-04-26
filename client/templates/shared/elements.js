
// div row == //
Template.contactsRow.helpers({
	contacts: function(){
		return Contacts.find({type: "contact"});
	}
});

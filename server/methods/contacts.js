Meteor.methods({
  'updateSafeboxesAndGroups': function (safeboxIds, groupIds, contactId) {
  	console.log("contactId", contactId);
  	if (contactId === null) return;

    Safeboxes.update( {_id: { $in: safeboxIds } }, { $addToSet: 
	    { allowedContacts: contactId } 
	  }, { multi: true });

	  Groups.update( {_id: { $in: groupIds } }, { $addToSet: 
	    { contactIds: contactId } 
	  }, { multi: true });
  }
});
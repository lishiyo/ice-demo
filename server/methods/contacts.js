Meteor.methods({
  'updateSafeboxesAndGroups': function (safeboxIds, groupIds, contactId) {

  	if (contactId === null) return;
  	console.log("method", safeboxIds, groupIds);

    Safeboxes.update( {_id: { $in: safeboxIds } }, { $addToSet:
	    { allowedContacts: contactId }
	  }, { multi: true });

	  Groups.update( {_id: { $in: groupIds } }, { $addToSet:
	    { contactIds: contactId }
	  }, { multi: true });
  }
});

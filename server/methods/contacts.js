Meteor.methods({

  "updateSafeboxesAndGroups" : function (safeboxIds, groupIds, contactId) {
  	console.log("updateSafeboxesAndGroups with contactId: ", contactId);
  	if (contactId === null) return;

    Safeboxes.update( {_id: { $in: safeboxIds } }, { $addToSet:
	    { allowedContacts: contactId }
	  }, { multi: true });

	  Groups.update( {_id: { $in: groupIds } }, { $addToSet:
	    { contactIds: contactId }
	  }, { multi: true });
  },

  "updateContactSecret" : function(contactId) {
  	var secret = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(contactId));
  	var contact = Contacts.find({ _id: contactId });
  	console.log("updateContactSecret with contactId: ", contactId, contact );
	  Contacts.update({ _id: contactId }, { $set:
	  	{
	      secret_id: secret
	    }
	  });
  }

});



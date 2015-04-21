Meteor.methods({

  "updateSafeboxesAndGroups" : function (safeboxIds, groupIds, contactId) {
  	if (contactId === null) return;

    Safeboxes.update( {_id: { $in: safeboxIds } }, { $addToSet:
	    {
	    	allowedContacts: contactId,
	    	allowedAll: contactId
	    },
	  }, { multi: true });

	  Groups.update( {_id: { $in: groupIds } }, { $addToSet:
	    { contactIds: contactId }
	  }, { multi: true });

  },

  "updateContactSecret" : function(contactId) {
  	var secret = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(contactId));
  	var contact = Contacts.find({ _id: contactId });

	  Contacts.update({ _id: contactId }, { $set:
	  	{
	      secret_id: secret
	    }
	  });
  },

  'addTagsForContact': function(contact) {
  	var safeboxes = contact.belongedSafeboxes;
  	var secret = Random.secret(12);

  	safeboxes.forEach(function(safeboxId) {
	    var fields = {
	      secret: secret,
	      safebox_id: safeboxId,
	      contact_id: contact._id
	    };

	    Tags.insert(fields, function(err, tagId){
	      console.log("inserted tag for safeboxId: ", safeboxId, tagId);
	    });
	  }.bind(this));

  },

  'removeTagsForContact': function(contact) {

  }

});



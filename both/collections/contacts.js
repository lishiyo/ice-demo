Schema = {};
Contacts = new Mongo.Collection('contacts');

Schema.ContactProfile = new SimpleSchema({
	firstName: {
    type: String,
    regEx: /^[a-zA-Z-]{2,25}$/,
    optional: false
  },
  lastName: {
    type: String,
    regEx: /^[a-zA-Z]{2,25}$/,
    optional: false
  },
  tel: {
  	type: String,
  	optional: true,
  	autoform: {
  		placeholder: "XXX-XXX-XXXX"
  	}
  },
  email: {
   type: String,
   regEx: SimpleSchema.RegEx.Email,
// this must be optional if you also use other login services like facebook,
// but if you use only accounts-password, then it can be required
   optional: true
  },

  createdAt: {
      type: Date,
      autoform: {
      	omit: true
      }
  },
});

Schema.Contact = new SimpleSchema({
	profile: {
    type: Schema.ContactProfile,
    optional: false
  },
	roles: {
    type: [String],
    optional: false,
    blackbox: true,
    autoValue: function(doc) {
    	if (!this.isSet) {
    		return ['locked'];
    	}
    }
  },
  belongedSafeboxes: {
  	type: [String],
  	defaultValue: []
  },
  belongedGroups: {
  	type: [String],
  	defaultValue: []
  	// allowedValues: ['family', 'friends', 'medical', 'legal'],
   //  autoform: {
   //    options: {
   //      family: "Family",
   //      friends: "Friends",
   //      medical: "Medical",
   //      legal: "Legal"
   //    }
   //  }
  }
});

Contacts.attachSchema(Schema.Contact);

Contacts.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.owner_id = Meteor.userId();
  doc.fullName = doc.firstName.trim() + " " + doc.lastName.trim();

  doc.belongedSafeboxes.forEach(function(safebox_id){
  	Safeboxes.update(safebox_id, { $addToSet: { allowedContacts: doc._id } });
  });

  doc.belongedGroups.forEach(function(group_id){
  	Groups.update(group_id, { $addToSet: { contactIds: doc._id } });
  });

  console.log("contactbefore insert", doc);
});

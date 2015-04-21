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
  emails: {
   type: [Object],
// this must be optional if you also use other login services like facebook,
// but if you use only accounts-password, then it can be required
   optional: true
  },
  "emails.$.address": {
      type: String,
      regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
      type: Boolean
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
  console.log("contactbefore insert", doc);
});

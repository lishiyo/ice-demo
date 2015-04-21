Schema = {};
Contacts = new Mongo.Collection('contacts');

Schema.ContactProfile = new SimpleSchema({
	firstName: {
    type: String,
    regEx: /^[a-zA-Z-]{2,25}$/,
    optional: false,
    label: "First Name*"
  },
  lastName: {
    type: String,
    regEx: /^[a-zA-Z]{2,25}$/,
    optional: false,
    label: "Last Name*"
  },
  tel: {
  	type: String,
  	optional: true,
    regEx: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
    label: "Phone Number*",
  	autoform: {
  		placeholder: "XXX-XXX-XXXX"
  	}
  },
  email: {
   type: String,
   // regEx: SimpleSchema.RegEx.Email,
// this must be optional if you also use other login services like facebook,
// but if you use only accounts-password, then it can be required
   optional: true
  },
  relation: {
    type: String,
    optional: true,
    autoform: {
      placeholder: "father, daughter, co-worker, etc.",
    }
  },
});

Schema.Contact = new SimpleSchema({
	profile: {
    type: Schema.ContactProfile,
    optional: true,
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
  createdAt: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  },
  owner_id: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  belongedSafeboxes: {
  	type: [String],
    blackbox: true,
  	defaultValue: []
  },
  belongedGroups: {
  	type: [String],
    blackbox: true,
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
  },
  secret_id: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  }
});

Contacts.attachSchema(Schema.Contact);

// add CreatedAt, owner_id, fullName
Contacts.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.owner_id = Meteor.userId();
  var profile = doc.profile;
  doc.fullName = profile.firstName.trim() + " " + profile.lastName.trim();

  return doc;
});

// add secret_id
// add to Groups and Safeboxes
Contacts.after.insert(function (userId, doc) {
  var safeboxIds = ( doc.belongedSafeboxes || [] );
  var groupIds = ( doc.belongedGroups || [] );
  console.log("contacts inside insert, userId, doc, this: ", userId, doc);

  Meteor.call('updateSafeboxesAndGroups', safeboxIds, groupIds, doc._id);
  Meteor.call('updateContactSecret', doc._id);

  console.log("contacts AFTER insert: doc", doc);

  return doc;
});

Contacts.allow({
  insert: function(fileObj){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
});

Schema = {};
Contacts = new Mongo.Collection('contacts', {idGeneration: 'STRING'});

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
});

Schema.Contact = new SimpleSchema({
	profile: {
    type: Schema.ContactProfile,
    optional: true,
  },
  relation: {
    type: String,
    optional: true,
    autoform: {
      placeholder: "father, daughter, co-worker, etc.",
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
  fullName: {
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
  password: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  }
});

Contacts.attachSchema(Schema.Contact);


// add CreatedAt, owner_id, fullName
Contacts.before.insert(function (userId, doc) {
  if (Meteor.isClient) {
    Contacts.simpleSchema().clean(doc);
    doc.createdAt = moment().toDate();
    doc.owner_id = Meteor.userId();
    var first = doc.profile.firstName.trim(),
        last = doc.profile.lastName.trim();
    doc.fullName = first + " " + last;

    return doc;
  }
});

// add to Groups and Safeboxes
Contacts.after.insert(function (userId, doc) {
  console.log("after insert start", doc);
  if (Meteor.isClient) {
    var safeboxIds = ( doc.belongedSafeboxes || [] );
    var groupIds = ( doc.belongedGroups || [] );
    Meteor.call('updateSafeboxesAndGroups', safeboxIds, groupIds, doc._id);
    Meteor.call('addTagsForContact', doc);
  }

  console.log("contacts AFTER insert: doc", doc._id);
});

Contacts.after.remove(function (userId, doc){
  if (Meteor.isClient) {
    Meteor.call("removeTagsForContact", doc);
  }
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

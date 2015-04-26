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
    optional: true,
    label: "Last Name"
  },
  tel: {
  	type: String,
  	optional: true,
    regEx: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    label: "Primary Phone Number",
  	autoform: {
  		placeholder: "XXX-XXX-XXXX"
  	}
  },
  email: {
   type: String,
   // regEx: SimpleSchema.RegEx.Email,
// this must be optional if you also use other login services like facebook,
// but if you use only accounts-password, then it can be required
   optional: true,
   label: "Contact Email"
  },
  notes: {
    type: String,
    optional: true,
    label: "Personal Notes"
  }
});

Schema.Contact = new SimpleSchema({
	profile: {
    type: Schema.ContactProfile,
    optional: true,
  },
  relation: {
    type: String,
    allowedValues: App.GLOBALS.Profiles.defaultRelations,
    autoform: {
      options: function () {
        return App.GLOBALS.Profiles.defaultRelations.map(function(type){
          return { label: type, value: type };
        });
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
    optional: true,
  	defaultValue: []
  },
  belongedGroups: {
  	type: [String],
    blackbox: true,
    optional: true,
  	defaultValue: []
  },
  allowedInfosetTabs: {
    type: [Number], // [ 0, 2, 3 ]
    optional: true,
    defaultValue: []
  },
  allowedInfoset: {
    type: String, // infoset_id
    optional: true,
    autoValue: function(){
      return Meteor.user().infoset;
    }
  },
  password: { // extraneous - in case upgrade to user
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  },
  type: {
    type: String,
    allowedValues: ["contact", "profile"]
  }

});

Contacts.attachSchema(Schema.Contact);


// add CreatedAt, owner_id, fullName
Contacts.before.insert(function (userId, doc) {
  if (Meteor.isClient) {
    Contacts.simpleSchema().clean(doc);
    doc.createdAt = moment().toDate();
    doc.owner_id = Meteor.userId();
    if (doc.profile.lastName) {
      var first = doc.profile.firstName.trim(),
          last = doc.profile.lastName.trim();
      doc.fullName = first + " " + last;
    } else {
      doc.fullName = doc.profile.firstName;
    }

    return doc;
  }
});

Contacts.before.update(function (userId, doc, fieldNames, modifier) {
  if (Meteor.isClient) {
    modifier.$set = modifier.$set || {};
    doc.profile.lastName = doc.profile.lastName || "";
    var fullName = doc.profile.firstName + " " + doc.profile.lastName;
    console.log("doc fieldNames", doc, fieldNames, fullName);
    modifier.$set.fullName = fullName;
  }
});

// add to Groups and Safeboxes
Contacts.after.insert(function (userId, doc) {
  if (Meteor.isClient) {
    // attach infoset to contact/profile
    doc.allowedInfoset = Meteor.user().infoset;

    var safeboxIds = ( doc.belongedSafeboxes || [] );
    var groupIds = ( doc.belongedGroups || [] );
    Meteor.call('updateSafeboxesAndGroups', safeboxIds, groupIds, doc._id);
    Meteor.call('addContactIdToUser', { contactId: doc._id });
    Meteor.call('addTagsForContact', doc);
    // push into user's contactIds list
    //Meteor.users.update({_id: userId }, { $addToSet: { contactIds: doc._id }});
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

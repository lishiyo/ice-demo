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

  createdAt: {
      type: Date,
      optional: true,
      autoform: {
      	omit: true
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
  belongedSafeboxes: {
  	type: [String],
    optional: true,
    blackbox: true,
  	defaultValue: []
  },
  belongedGroups: {
  	type: [String],
    optional: true,
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
  }
});

Contacts.attachSchema(Schema.Contact);

Contacts.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.owner_id = Meteor.userId();
  var profile = doc.profile;
  doc.fullName = profile.firstName.trim() + " " + profile.lastName.trim();

  var safeboxIds = doc.belongedSafeboxes;
  var groupIds = doc.belongedGroups;


  console.log("contactbefore insert", doc._id, doc);
  
  Meteor.call('updateSafeboxesAndGroups', safeboxIds, groupIds, doc._id);

  // doc.belongedSafeboxes.forEach(function(safebox_id){
  // 	Safeboxes.update({_id: safebox_id }, { $addToSet: 
  //     { allowedContacts: doc._id } 
  //   }, { multi: true });
  // });
  // doc.belongedGroups.forEach(function(group_id){
  // 	Groups.update({_id: group_id }, { $addToSet: 
  //     { contactIds: doc._id } 
  //   });
  // });

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
Safeboxes = new Mongo.Collection('safeboxes');
Schema = {};

Schema.Safebox = new SimpleSchema({
	name: {
		type: String
	},
	unlocked: {
		type: Boolean,
		defaultValue: false,
	},
	description: {
		type: String,
		optional: true,
		autoform: {
			rows: 2
		}
	},
	instructions: {
		type: String,
		optional: true,
		autoform: {
			rows: 4,
			afFieldInput: {
        type: 'summernote',
        class: 'editor', // optional
        height: 200,
        minHeight: 100,
  			maxHeight: null,
      }
		}
	},
	items: {
		type: [String],
		optional: true
	},
	allowedGroups: {
		type: [String],
		defaultValue: []
	},
	allowedContacts: {
		type: [String],
		defaultValue: []
	},
	allowedAll: { // groups + contacts
		type: [String],
		autoValue: function() {
	   	if (!this.isSet) {
	   		return [];
	   	}
	  }
	},
	owner_id: {
		type: String,
		optional: true
	},
	createdAt: {
		type: Date,
		optional: true
	}
});

Safeboxes.attachSchema(Schema.Safebox);

/*
====== HOOKS =======
*/

Safeboxes.before.insert(function(userId, doc){
	if (!doc.allowedGroups.length) doc.allowedGroups = [];
	if (!doc.allowedContacts.length) doc.allowedContacts = [];
	return doc;
});

Safeboxes.after.insert(function (userId, doc) {
	if (Meteor.isServer){
		Meteor.call('mergeGroupContactIds', doc);
	}
});

Safeboxes.after.update(function (userId, doc, fieldNames, modifier) {
	if (Meteor.isServer) {

		var allowedChange = (fieldNames.indexOf('allowedContacts') !== -1 || fieldNames.indexOf('allowedGroups') !== -1);
		// create tags if allowedContacts or allowedGroups updated
		if (allowedChange) {
			console.log("allowedChange", fieldNames);
			Meteor.call('mergeGroupContactIds', doc);
		}
		// create tags if allowedAll updated
		if (fieldNames.indexOf('allowedAll') !== -1) {
			Meteor.call('createTagsForSafebox', doc);
		}
	}
}, {fetchPrevious: false});

Safeboxes.after.remove(function (userId, doc){
	if (Meteor.isServer) {
		Meteor.call('removeTagsForSafebox', doc);
	}
});

Safeboxes.allow({
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

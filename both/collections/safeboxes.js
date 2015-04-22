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
		defaultValue: []
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

Safeboxes.after.insert(function (userId, doc) {
	if (Meteor.isServer){
		Meteor.call('mergeGroupContactIds', doc);
	}
});

Safeboxes.after.update(function (userId, doc, fieldNames, modifier) {
	if (Meteor.isServer) {
		console.log('after update', doc, fieldNames, modifier);
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

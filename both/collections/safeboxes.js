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
	}
});

Safeboxes.attachSchema(Schema.Safebox);

Safeboxes.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.owner_id = Meteor.userId();
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
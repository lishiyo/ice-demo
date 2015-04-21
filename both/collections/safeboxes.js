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
			rows: 4
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
	}
});

Safeboxes.attachSchema(Schema.Safebox);

Safeboxes.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.owner_id = Meteor.userId();

  console.log("safebox before insert", doc);
});

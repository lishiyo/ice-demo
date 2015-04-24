Schema = {};
Actions = new Mongo.Collection('actions');
ActionSteps = new Mongo.Collection('action_steps');

// basic building blocks - one text to selected people
Schema.ActionStep = new SimpleSchema({
	label: {
		type: String,
		optional: true
	},
	content: { // custom text content if type 'message'
		type: String,
		optional: true
	},
	safeboxIds: {
		type: [String],
		autoform: {
			options: function() {
				return Safeboxes.find().map(function(safebox){
					return { label: safebox.name, value: safebox._id };
				})
			}
		}
	},
	action_id: { // action steps belong to an Action
		type: String,
		optional: true
	},
	targets: { // array of contactIds
		type: [String],
		autoform: {
			options: function(){
				return Contacts.find().map(function(contact){
					return { label: contact.fullName, value: contact._id };
				});
			}
		}
	},
	type: {
		type: String,
		allowedValues: App.GLOBALS.Actions.defaultStepTypes,
		autoform: {
      options: function () {
        return App.GLOBALS.Actions.defaultStepTypes.map(function(type, idx){
          return { label: type, value: idx };
        });
      }
    }
	},
	order: { // order in step
		type: Number,
		optional: true
	}
});

// build actions with one or more steps 
Schema.Action = new SimpleSchema({
	label: {
		type: String, // 'find babysitter', 'trigger family safebox'
	},
	owner_id: {
		type: String
	}
});

ActionSteps.attachSchema(Schema.ActionStep);
Actions.attachSchema(Schema.Action);




if (Meteor.isClient) {	
	ActionSteps.before.insert(function (userId, doc) {
	  doc.createdAt = moment().toDate();
	  doc.owner_id = Meteor.userId();
	  return doc;
	});
}
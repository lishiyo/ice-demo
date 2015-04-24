Template.newSafeboxForm.helpers({
	safeboxSchema: function() {
		return Schema.Safebox;
	},
	itemOptions: function() {
		return Items.find().map(function(item){
			console.log("item", item);
			var full = [item.category.toUpperCase(), item.type.toUpperCase(), item.name].join(" - ");
			return { label: full, value: item._id };
		});
	},
	groupOptions: function() {
		return Groups.find().map(function(group){
			return { label: group.type.toUpperCase(), value: group._id };
		});
	},
	contactOptions: function() {
		return Contacts.find().map(function(contact){
			return { label: contact.fullName, value: contact._id };
		});
	}
});

Template.newSafeboxForm.created = function(){
	this.allIds = [];
};

var addOrRemoveGroupIds = function(selected) {
	var currIds = [];

	selected.each(function(idx, elem){
		var groupId = elem.value;
		var group = Groups.findOne({ _id: groupId });
		group.contactIds.forEach(function(id){
			if (id===null) return;
			if (currIds.indexOf(id) === -1) {
				currIds.push(id);
			}
		});
	});

	return currIds;
};

var addOrRemoveContactIds = function(selected) {
	var currIds = [];

	selected.each(function(idx, elem){
		var cId = elem.value;
		if (cId===null) return;
		if (currIds.indexOf(cId) === -1) {
			currIds.push(cId);
		}
	});

	return currIds;
};

Template.newSafeboxForm.events({
	'change select[name="allowedGroups"]': function(event, template) {
		var selectBox = $(event.target);
		var oldArr = _.clone(template.allIds);
		var selected = selectBox.find('option:selected');

		template.allIds = addOrRemoveGroupIds(selected);
		// only render template if changed
		if (!(_.isEqual(oldArr, template.allIds))) {
			Session.set('allIds', template.allIds);
		}

		console.log("allIds in groups", template.allIds);
	},
	'change select[name="allowedContacts"]': function(event, template) {
		var selectBox = $(event.target);
		var oldArr = _.clone(template.allIds);
		var selected = selectBox.find('option:selected');

		template.allIds = addOrRemoveContactIds(selected);
		// only render template if changed
		if (!(_.isEqual(oldArr, template.allIds))){
			Session.set('allIds', template.allIds);
		}

		console.log("allIds in contacts", selected, template.allIds);
	}
});

var newSafeboxHook = {
	onSubmit: function(doc, updateDoc) {
		// add default values and custom values
		Safeboxes.simpleSchema().clean(doc);
		doc.createdAt = moment().toDate();
  	doc.owner_id = Meteor.userId();

		Safeboxes.insert(doc, function(err, id){
			if (err) {
				this.done(err);
			} else {
				this.done();
			}
		}.bind(this));

		console.log("onSubmit", doc, doc.allowedAll);

		return false;
	},
	onSuccess: function(formType, safeboxId) {
  	Router.go('safeboxes');
  },
  onError: function (name, error, template) {
    console.log(name + " error:", error);
  }
};

AutoForm.hooks({
  newSafeboxForm: newSafeboxHook
});

/*
	Small Reactive Canvas to show all currently selected Contacts
 */
Template.ContactsCanvas.created = function(){
	Session.set('allIds', []);
};

Template.ContactsCanvas.helpers({
	ids: function(){
		var ids = Session.get('allIds');
		var users = Contacts.find({ _id: { $in: ids }});
		return users.map(function(user){
			return user.fullName;
		});
	}
})

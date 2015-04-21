
Template.newSafeboxForm.helpers({
	itemOptions: function(){
		return Items.find().map(function(item){
			console.log("item", item);
			var full = [item.category.toUpperCase(), item.type.toUpperCase(), item.name].join(" - ");
			return { label: full, value: item._id };
		});
	},
	groupOptions: function(){
		return Groups.find().map(function(group){
			return { label: group.type.toUpperCase(), value: group._id };
		});
	},
	contactOptions: function(){
		return Contacts.find().map(function(contact){
			return { label: contact.fullName, value: contact._id };
		});
	}
});

Template.newSafeboxForm.created = function(){
	this.allIds = [];
};

Template.newSafeboxForm.events({
	'change select[name="allowedGroups"]': function(event, template) {
		var selectBox = $(event.target);
		var oldArr = _.clone(template.allIds);

		selectBox.find('option:selected').each(function(idx, elem){
			var groupId = elem.value;
			var group = Groups.findOne({ _id: groupId });
			console.log("group", group.contactIds);
			group.contactIds.forEach(function(id){
				if (id===null) return;
				if (template.allIds.indexOf(id) === -1) {
					template.allIds.push(id);
				}
			})
			
		});
		// only render template if changed
		if (!(_.isEqual(oldArr, template.allIds))) {
			console.log("changed group");
			Session.set('allIds', template.allIds);
		}
		
	},
	'change select[name="allowedContacts"]': function(event, template) {
		var selectBox = $(event.target);
		var oldArr = _.clone(template.allIds);

		selectBox.find('option:selected').each(function(idx, elem){
			var cId = elem.value;
			if (cId===null) return;
			if (template.allIds.indexOf(cId) === -1) {
				template.allIds.push(cId);
			}
		});
		// only render template if changed
		if (!(_.isEqual(oldArr, template.allIds))){
			console.log("changed contact");
			Session.set('allIds', template.allIds);
		}
	}
});

var newSafeboxHook = {
	onSubmit: function(insertDocFields, updateDocFields) {
		var allIds = Session.get('allIds');
		insertDocFields.allowedAll = allIds;
		var id = Safeboxes.insert(insertDocFields);
		this.done(null, id);
	},
	onSuccess: function(formType, safeboxId) {
  	Router.go('safeboxes');
  },
};

AutoForm.hooks({
  newSafeboxForm: newSafeboxHook
});


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
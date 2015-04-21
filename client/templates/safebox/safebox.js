Template.NewSafeboxForm.helpers({
	itemOptions: function(){
		return Items.find().map(function(item){
			console.log("item", item);
			var full = [item.category.toUpperCase(), item.type.toUpperCase(), item.name].join(" - ");
			return { label: full, value: item._id };
		});
	},
	groupOptions: function(){
		return Groups.find().map(function(group){
			return { label: group.type, value: group._id };
		});
	},
	contactOptions: function(){
		return Contacts.find().map(function(contact){
			return { label: contact.fullName, value: contact._id };
		});
	}
});

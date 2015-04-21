
Template.safeboxes.helpers({
	safeboxesCount: function(){
		return Safeboxes.find().count();
	},
	safeboxes: function(){
		return Safeboxes.find();
	}
})

Template.safeboxes.events({
	'click #create-safebox': function(){
		Router.go('safeboxes.new');
	}
});

Template.safebox.helpers({
	contacts: function(){
		return Contacts.find({ _id: { $in: this.allowedAll } } );
	}
});


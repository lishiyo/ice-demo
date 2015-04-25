
Template['tabs.safeboxes'].helpers({
	safeboxesCount: function(){
		return Safeboxes.find().count();
	},
	safeboxes: function(){
		return Safeboxes.find();
	}
})

Template['tabs.safeboxes'].events({
	'click #create-safebox': function(){
		Router.go('safeboxes.new');
	}
});

Template.safebox.helpers({
	contacts: function(){
		var contacts = Contacts.find({ _id: { $in: this.allowedAll } } );
		return contacts.fetch();
	},
	getSafebox: function(){
		return { safeboxId: this._id };
	}
});


ActionsController = AppController.extend({
	waitOn: function() {
	  return [ this.subscribe('userActions'), this.subscribe("contacts") ];
	},
	data: function(){
		if (Meteor.isClient) {
			var profile;

			if (typeof Session.get('currProfileId') === 'undefined') {
				profile = Meteor.user();
			} else {
				profile = Contacts.findOne({ _id: Session.get('currProfileId')});
			}

			return {
				profile: profile,
				profiles: Contacts.find({type: "profile"}).fetch()
			}
		}

	}
});

Template.actionsCreate.helpers({
	// stubActions: function () {
	// 	return ["readOnly", "expectResponse", "triggerSafebox"];
	// },
	actions: function () {
		return ActionSteps.find();
	},
	profile: function(){
		return Router.current().data().profile;
	}
});

Template.actionsCreate.events({
	'click .next-step': function(){
		Router.go('/');
	}
});

Template.existingContactsWrapper.helpers({
	profile: function(){
		return Router.current().data().profile;
	}
});


Template.contactsList.helpers({
	currContacts: function(){
		var contacts;
		$('.contact-card').removeClass('active');

		if (typeof Session.get("currContactIds") === 'undefined') {
			// contacts = [Contacts.findOne({ type: "contact" })];
			// Session.set("currContactIds", JSON.stringify([contacts[0]._id]));
			contacts = [];
			Session.set("currContactIds", JSON.stringify([]));
		} else {
			var currIds = JSON.parse(Session.get("currContactIds"));
			contacts = Contacts.find({ _id: {$in: currIds }}).fetch();
		}
		// add class to current contacts
		for (var i = 0; i < contacts.length; i++) {
			$('#'+contacts[i]._id).addClass('active');
		}

		// console.log("contacts", contacts);
		return contacts;
	},
});

Template.contactCard.events({
	'click .contact-card': function(event){
		event.preventDefault();
		var currIds = JSON.parse(Session.get("currContactIds"));

		// either add or remove it from set
		var idx = currIds.indexOf(this._id);
		if (idx === -1) {
			// console.log("pushing")
			currIds.push(this._id);
			$('#'+this._id).addClass('active');
		} else {
			// console.log("splicing");
			currIds.splice(idx, 1);
			$('#'+this._id).removeClass('active');
		}

		Session.set("currContactIds", JSON.stringify(currIds));
	}
});

Template.contactCard.helpers({
	imgUrl: function(){
		var imgPath = App.GLOBALS.Profiles.relationsMap[this.relation].imgPath;
		return imgPath;
	}
});

Template.profileShow.helpers({
	imgUrl: function(){
		var imgPath = App.GLOBALS.Profiles.relationsMap[this.relation].imgPath;
		return imgPath;
	}
});

Template.chooseProfile.helpers({
	profiles: function(){
		return Router.current().data().profiles;
	}
});

Template.chooseProfile.events({
	'click .profile-card': function(event){
		event.preventDefault();
		$('.profile-card').removeClass("active");
		Session.set('currProfileId', this._id);
		$("#"+this._id).addClass("active");
	}
});

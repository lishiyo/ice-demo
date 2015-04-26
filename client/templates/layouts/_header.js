
Template._header.events({

});

Template.activateActionModal.helpers({
	actions: function(){
		return ActionSteps.find().fetch();
	}
});

Template.triggerSuccess.helpers({
	contactName: function(){
		return Session.get('contactName');
	}
})

// ==== SEND TEXT MESSAGE =====

var handleText = function(actionStep) {
	actionStep.targets.forEach(function(id){
		var contact = Contacts.findOne({_id: id});
		Session.set('contactName', contact.fullName);
		Router.current().render('triggerSuccess', {to: 'notifications'});
		console.log("clicked! target, tel", id, contact.profile.tel);

		_.defer(function(){
			Meteor.call("sendMessage", actionStep.content, contact);
		});
	});
};

var _generateTextForContact = function (tag, url) {
	var key = tag.contact_id,
			passcode = tag.secret,
			url = "http:" + url;
	var content = Meteor.user().profile.firstName + " has unlocked a safebox for you at " + url + ". Key: " + key + " & passcode: " + passcode;

	return content;
};

var handleTrigger = function(doc) {
	var sbs = doc.safeboxIds;
	for (var i = 0; i < doc.safeboxIds.length; i++) {
		var url = window.location.host + "/safeboxes/" + sbs[i];
		Meteor.call('unlockSafebox', sbs[i]);
		var tags = Tags.find({ safebox_id: sbs[i] }).fetch();

		for (var j = 0; j < tags.length; j++) {
			var content = _generateTextForContact(tags[j], url);
			var contact = Contacts.findOne({ _id: tags[j].contact_id});
	  	_.defer(function(){
	  		Meteor.call('sendMessage', content, contact);
	  	});
		}
	}
};

Template.action.events({
	'click button': function(event) {
		event.preventDefault();
		var actionStep = this,
				button = $(event.target);

		if (this.type === "message") {
			handleText(actionStep);
		} else if (this.type === "triggerSafebox") {
			handleTrigger(actionStep);
		}
	},

});

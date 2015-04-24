Template.actions.helpers({
	stubActions: function () {
		return ["readOnly", "expectResponse", "triggerSafebox"];
	},
	actions: function () {
		console.log(ActionSteps.find())
		return ActionSteps.find();
	}
});

Template.action.helpers({

});


var handleText = function(actionStep) {
	actionStep.targets.forEach(function(id){
		var contact = Contacts.findOne({_id: id});
		console.log("clicked! target, tel", id, contact.profile.tel);

		_.defer(function(){
			Meteor.call("sendMessage", actionStep.content, contact);
		});
	});
};

var _generateTextForContact = function (tag, url) {
	var key = tag.contact_id,
			passcode = tag.secret,
			url = url;
	var content = Meteor.user().profile.firstName + " has unlocked a safebox for you at " + url + ". Key: " + key + " & passcode: " + passcode;

	return content;
};

var handleTrigger = function(doc) {
	var sbs = doc.safeboxIds;
	for (var i = 0; i < doc.safeboxIds.length; i++) {
		var url = window.location.host + "/safeboxes/" + sbs[i];
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

		if (button.hasClass('0')) {
			handleText(actionStep);
		} else if (button.hasClass('1')) {
			handleTrigger(actionStep);
		}
	},

});

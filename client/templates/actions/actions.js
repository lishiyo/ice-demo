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

var generateSafeboxText = function (doc) {
	var sbs = doc.safeboxIds;
	for (var i = 0; i < doc.safeboxIds.length; i++) {
		var url = window.location.host + "/safeboxes/" + sbs[i];
		var tags = Tags.find({ safebox_id: sbs[i] });
		for (var j = 0; j < tags.length; j++) {
			var key = tags[j].contact_id;
			var passcode = tags[j].secret;
	  	var content = "URGENT: " + Meteor.user().fullName + " has unlocked a digital safebox for you at " + url + ". Access it with key: " + key + " and passcode: " + passcode;
	  		console.log("content", content);
	  	_.defer(Meteor.call('sendMessage', content, tags[j].contact_id));
		}
	}
};

Template.action.events({
	'click button.0': function(event) {
		event.preventDefault();
		var actionStep = this;
		
		actionStep.targets.forEach(function(id){
			var contact = Contacts.findOne({_id: id});
			console.log("clicked! target, tel", id, contact.profile.tel);
			_.defer(function(){
				Meteor.call("sendMessage", actionStep.content, contact);
			});
		});
	} 
});
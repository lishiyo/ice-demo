
// Template.ActionStepForm.events({
// 	'change input[name="type"]': function(event, template) {
// 		event.preventDefault();
// 		var selected = $('input[name=type]:checked').val();

// 		var isSafebox = (selected === "1");

// 		$('#wrap-text').toggleClass('hidden', isSafebox);
// 		$('#wrap-safeboxes').toggleClass('hidden', !isSafebox);
// 	}
// });

var actionStepFormHook = {
  onSuccess: function(formType, actionStepId){
  	console.log("success", actionStepId);
  	Router.current().render('actionSuccess', {to: 'notifications'});
  },
  onError: function(){
  	console.log("something went wrong");
  	Router.current().render('actionError', {to: 'notifications'});
  }
};


// Pass an array of form IDs for multiple forms
AutoForm.addHooks(['actionStepForm'], actionStepFormHook);


Template.addNewAction.helpers({
	currTargets: function(){
		// store array of contact ids in action
		return JSON.parse(Session.get("currContactIds"));
	},
	profile: function(){
		return Router.current().data().profile._id;
	}
});

// show actions
// Template.actionsList.helpers({
// 	currActions: function(){
// 		if (typeof Session.get("currActionNames") !== "undefined") {
// 			console.log("return actions", Session.get("currActionNames"))
// 			return JSON.parse(Session.get("currActionNames"));
// 		} else {
// 			return [];
// 		}
// 	}
// });




Template.ActionStepForm.events({
	'change input[name="type"]': function(event, template) {
		event.preventDefault();
		var selected = $('input[name=type]:checked').val();

		var isSafebox = (selected === "1");

		$('#wrap-text').toggleClass('hidden', isSafebox);
		$('#wrap-safeboxes').toggleClass('hidden', !isSafebox);
	}
});

var actionStepFormHook = {
  onSuccess: function(formType, actionStep){
  	console.log("success", actionStep);
  	$('.modal').modal('hide');
  },
  onError: function(){
  	console.log("something went wrong");
  }
};

// Pass an array of form IDs for multiple forms
AutoForm.addHooks(['actionStepForm'], actionStepFormHook);

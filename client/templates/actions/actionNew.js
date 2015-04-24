Template.ActionStepForm.events({
	'change input[name="type"]': function(event, template) {
		event.preventDefault();
		var selected = $('input[name=type]:checked').val();
		var isSafebox = (selected === "1");

		$('#wrap-text').toggleClass('hidden', isSafebox);
		$('#wrap-safeboxes').toggleClass('hidden', !isSafebox);
	}
});

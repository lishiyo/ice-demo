Template.safeboxUnlocked.helpers({
	items: function () {
		return Items.find();
	}
})

Template.safeboxesUnlocked.helpers({
	safeboxesUnlocked: function () {
		return Safeboxes.find();
	}
})

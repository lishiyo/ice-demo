SafeboxUnlockedController = AppController.extend({
	waitOn: function () {
		return this.subscribe('safeboxPublic', this.params.safeboxId );
	},
	data: function () {
		if(this.ready()) {
			return Safeboxes.findOne({_id: this.params.safeboxId });
		}
	},
  // onBeforeAction: function () {
  // 	this.next();
  // },
  // action: function () {
  //   this.render();
  // }
});

SafeboxesUnlockedController = AppController.extend({
	template: 'safeboxesUnlocked',
	// waitOn: function () {

	// },
});

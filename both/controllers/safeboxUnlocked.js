SafeboxUnlockedController = AppController.extend({
	waitOn: function () {
		return [this.subscribe('safeboxPublic', this.params.safeboxId)];
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
	waitOn: function () {
		if (Meteor.user()) {
			return this.subscribe('safeboxesPublic', Meteor.user());
		}
	},
	data: function (){
		console.log("safeboxes", Safeboxes.find().fetch());
		return Meteor.user();
	},
});

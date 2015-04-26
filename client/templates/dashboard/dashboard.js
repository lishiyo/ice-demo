Template.dashboard.rendered = function() {

};

Template.notifications.helpers({
	profilesWithActions: function(){
		var pros = [];
		var pro;
		var ids = [];
		var actions = ActionSteps.find().fetch();
		var action;

		for (var i = 0; i < actions.length; i++) {
			actionPro = actions[i].profile_id;
			if (actionPro === Meteor.userId()) continue;

			if (ids.indexOf(actionPro) === -1) { // get uniq only
				pro = Contacts.find({_id: actionPro});
				pros.push(pro);
				ids.push(actionPro);
			}
		}

		return pros;
	}
});

Template.profilesDash.helpers({
	profiles: function() {
		return Contacts.find({ type: "profile"});
	}
})

// Template.items.helpers({
// 	allTypes: function(){
// 		return App.GLOBALS.Items.defaultTypesId;
// 	},
// 	getModelFromType: function (str) {
// 		return Items.findOne({ type: str });
// 	},
// 	userHasItem: function(itemType) {
// 		var itemsCount = Items.find({ type: itemType }).count();
// 		return (itemsCount > 0 ? true : false);
// 	},
// 	docTypes: function(){
// 		var arr = App.GLOBALS.Items.defaultTypesDoc;
// 		return arr.map(function(type){
// 			return { type: type };
// 		});
// 	}
// })

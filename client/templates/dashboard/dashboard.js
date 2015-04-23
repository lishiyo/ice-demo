Template.dashboard.rendered = function() {

};

Template.dashboard.helpers({

});

Template.items.helpers({
	// passport: function(){
	// 	return Items.findOne({ type: "passport" });
	// },
	// driversLicense: function(){
	// 	return Items.findOne({ type: "driversLicense"});
	// },
	// socialSecurity: function(){
	// 	return Items.findOne({ type: "socialSecurity"});
	// },
	allTypes: function(){
		return App.GLOBALS.Items.defaultTypesId;
	},
	getModelFromType: function (str) {
		return Items.findOne({ type: str });
	},
	userHasItem: function(itemType) {
		var itemsCount = Items.find({ type: itemType }).count();
		return (itemsCount > 0 ? true : false);
	},
	docTypes: function(){
		var arr = ["personal", "medical", "legal", "other"];
		return arr.map(function(type){
			return { type: type };
		});
	}
})

Template.dashboard.rendered = function() {

};

Template.dashboard.helpers({

});

Template.items.helpers({
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

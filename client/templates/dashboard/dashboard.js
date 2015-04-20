Template.dashboard.rendered = function() {

};

Template.dashboard.helpers({

});

Template.items.helpers({
	passport: function(){
		var passport = Items.findOne({ type: "passport" });
		console.log("passport ", passport);
		return passport;
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
		// return only _id and type fields
		// var docTypes = Items.find({ category: 'document' }, { type: 1 });
		// var arr = docTypes.map(function(elem) {
		// 	return elem.type;
		// });
		// console.log("doctypes", docTypes, arr);
	}
})

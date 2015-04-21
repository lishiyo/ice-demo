// ID items
Template.IdItem.helpers({
	files: function() {
		var file = Files.findOne({_id: this.fileId });
		return (file ? [file] : null);
	},
});

Template.IdItemForm.helpers({
	type: function() {
		return this.type;
	},
});

// documents
Template.DocItemForm.helpers({
	docTypeOptions: function(){
		var arr = ["personal", "medical", "legal", "other"];
		return arr.map(function(type){
			return {label: type, value: type};
		});
	}
});

Template.DocItemRow.helpers({
	docType: function(){
		return this.type;
	},
	documents: function(){
		var rowDocs = Items.find({ category: "document", type: this.type });
		return rowDocs;
	}
});

Template.DocItem.helpers({
	files: function() {
		var file = Files.findOne({_id: this.fileId });
		return (file ? [file] : null);
	},
})

// janky way of adding owner id to the new file
var ItemFormHook = {
  onSuccess: function(formType, itemId){
  	var item = Items.findOne({_id: itemId});
  	Files.files.update(item.fileId, { $set: { owner_id: Meteor.userId() } });
  	$('.modal').modal('hide');
  }
};

// Pass an array of form IDs for multiple forms
AutoForm.addHooks(['IdItemForm', 'DocItemForm'], ItemFormHook);

// AutoForm.hooks({
//   IdItemForm: ItemFormHook,
//   DocItemForm: ItemFormHook
// });


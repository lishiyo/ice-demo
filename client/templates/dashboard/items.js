// id items
Template.IdItem.helpers({
	files: function() {
		var fileId = this.fileId;
		var file = Files.findOne({_id: fileId});
		console.log("files", file);
		return (file ? [file] : null);
	},

	imagePath: function(fileId) {
		var pathUrl = '/cfs/files/file/';
		return pathUrl + fileId;
	}
});



var IdItemFormHook = {
	// before: {
	// 	insert: function(doc) {
	// 		var pathUrl = '/cfs/files/file/';
	// 	  doc.createdAt = moment().toDate();
	// 	  doc.owner_id = Meteor.userId();
	// 	  if (doc.fileId) {
	// 	  	doc.imageUrls = [ pathUrl + doc.fileId];
	// 	  }
	// 	  console.log("before insert", doc);
	// 	}
	// },
	// onSubmit: function(insertDoc, updateDoc, currentDoc) {

	// 	this.done(null, currentDoc);
	// },
  onSuccess: function(formType, itemId){
  	var item = Items.findOne({_id: itemId});
  	Files.files.update(item.fileId, { $set: { owner_id: Meteor.userId() } }, function(err, numDocs){
  		// var file = Files.findOne({_id: item.fileId });
  		// console.log("onSuccess file", file);
  	});

  }
}

AutoForm.hooks({
  IdItemForm: IdItemFormHook
});


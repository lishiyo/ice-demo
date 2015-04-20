// id items
Template.IdItem.helpers({
	imageUrl: function () {
		var fileObj = Files.find({_id: this.fileId});

		console.log("imageUrl fileId", this.fileId, fileObj);

	},

	files: function(){
		console.log("files helper", Files.find())
		return Files.find();
	},

	imagePath: function(fileId) {
		var pathUrl = '/cfs/files/images/';

		return pathUrl + fileId;
	}
});
Items = new Mongo.Collection('items');
Schema = {};

// items - vital ids, vital documents, vital items

Schema.Item = new SimpleSchema({
		name: {
    	type: String,
    	optional: true
	  },
	  fileId: {
	    type: String,
	    optional: true
	  },
    type: {
      type: String,
      regEx: /^[a-zA-Z-]{2,25}$/,
      optional: true
    },
    location: {
      type: String,
      optional: true,
      autoform: {
      	rows: 2,
      	placeholder: "Where is this id stored?"
      }
    },
});

Items.attachSchema(Schema.Item);

Files = new FS.Collection("files", {
  stores: [ new FS.Store.GridFS("filesStore") ],
  filter: {
  	allow: {
  		contentTypes: ['image/*', 'video/*', 'audio/*'],
  		extensions: ['png', 'docx', 'doc', 'ico']
  	}
  },
  beforeWrite: function(fileObj){
  	var owner = { owner_id: Meteor.userId() };
  	fileObj.attachData({ metadata: owner });
  	console.log("beforeWrite", fileObj);
  	return fileObj;
  }
});

Files.allow({
	insert: function(fileObj){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	},
  download: function(userId, fileobj) {
    return true;
  },
  fetch: null
});

Items.helpers({

});



Items.before.insert(function (userId, doc) {
	var pathUrl = '/cfs/files/images/';

  doc.createdAt = moment().toDate();
  doc.owner_id = Meteor.userId();
  // if (doc.fileId) {
  // 	doc.imageUrls = [ pathUrl + doc.fileId];
  // }
});


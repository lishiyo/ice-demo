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
  stores: [new FS.Store.GridFS("filesStore")]
});

Files.allow({
  download: function () {
    return true;
  },
  insert: function(){
  	return true;
  },
  fetch: null
});

Items.helpers({

});

Items.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.owner_id = Meteor.userId();
});


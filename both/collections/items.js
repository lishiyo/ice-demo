Items = new Mongo.Collection('items');
Schema = {};

/*
  ITEMS - vital ids, vital documents, vital items
 */
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
    category: {
      type: String,
      regEx: /^[a-zA-Z-]{2,25}$/,
      optional: false,
      allowedValues: App.GLOBALS.Items.defaultCategories,
    },
    note: {
      type: String,
      optional: true,
      autoform: {
      	rows: 2,
      }
    },
});

Items.attachSchema(Schema.Item);

var fileStore = new FS.Store.GridFS("filesStore", {
  // beforeWrite: function(fileObj){
  //   fileObj.owner_id = Meteor.userId();
  //   console.log("beforeWrite fileObj", fileObj);
  //   return fileObj;
  // }
});

Files = new FS.Collection("files", {
  stores: [ fileStore ],
  filter: {
    allow: {
      contentTypes: ['image/*', 'video/*', 'audio/*', 'application/pdf', 'application/*'],
      extensions: ['png', 'docx', 'doc', 'pdf', 'xlsx', 'icon', 'ico' ]
    }
  },
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

Items.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.owner_id = Meteor.userId();
  console.log("before insert item", doc);
  return doc;
});

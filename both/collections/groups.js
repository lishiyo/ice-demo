Schema = {};
Groups = new Mongo.Collection('groups');

Schema.Group = new SimpleSchema({
  type: {
  	type: String,
  	optional: false,
  	allowedValues: App.GLOBALS.Groups.defaultTypes,
    autoform: {
      options: function () {
        return App.GLOBALS.Groups.defaultTypes.map(function(type){
          return { label: type, value: type };
        });
      }
    }
  },
  name: {
    type: String,
    optional: true,
  },
  contactIds: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  owner_id: {
    type: String,
  }
});

Groups.attachSchema(Schema.Group);

Groups.after.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  console.log("group after insert", doc);
  //if (!doc.owner_id) doc.owner_id = Meteor.userId();
  if (!doc.name) doc.name = doc.type;
});

Groups.allow({
  insert: function(fileObj){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
});

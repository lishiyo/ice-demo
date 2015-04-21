Schema = {};
Groups = new Mongo.Collection('groups');

Schema.Group = new SimpleSchema({
  type: {
  	type: String,
  	optional: false,
  	allowedValues: App.GLOBALS.Groups.defaultTypes,
    autoform: {
      options: {
        family: "Family",
        friends: "Friends",
        medical: "Medical",
        legal: "Financial/Legal",
        custom: "Custom"
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
  }
});

Groups.attachSchema(Schema.Group);

Groups.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  if (!doc.owner_id) doc.owner_id = Meteor.userId();
  if (!doc.name) doc.name = doc.type;

  console.log("group before insert", doc);
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

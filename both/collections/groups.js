Schema = {};
Groups = new Mongo.Collection('groups');

Schema.Group = new SimpleSchema({
  type: {
  	type: String,
  	optional: false,
  	allowedValues: ['family', 'friends', 'medical', 'legal', 'custom'],
    autoform: {
      options: {
        family: "Family",
        friends: "Friends",
        medical: "Medical",
        legal: "Legal"
      }
    }
  },
  name: {
    type: String,
    optional: true
  },
  contactIds: {
    type: [String],
    optional: true
  }
});

Groups.attachSchema(Schema.Group);

Groups.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.owner_id = Meteor.userId();

  console.log("group before insert", doc);
});

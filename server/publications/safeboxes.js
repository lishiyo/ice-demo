Meteor.publish("safeboxesWithEverything", function(userId){
  return [
    Safeboxes.find({ owner_id: userId }),
    Items.find({ owner_id: userId }),
    Groups.find({ owner_id: userId }),
    Contacts.find({ source_id: userId })
  ]
});

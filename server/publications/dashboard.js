Meteor.publish("dashboardAll", function(userId){
  return [
    Safeboxes.find({ owner_id: userId }),
    Items.find({ owner_id: userId }),
    Files.find({ owner_id: userId }),
    Groups.find({ owner_id: userId }),
    Contacts.find({ owner_id: userId })
  ]
});

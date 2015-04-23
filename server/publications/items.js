Meteor.publishComposite("items", function() {
  return {
    find: function() {
      return Items.find({ owner_id: this.userId });
    }
  }
});

Meteor.publish("itemsAndFiles", function(userId){
  return [
    Items.find({ owner_id: userId }),
    Files.find({ owner_id: userId })
  ]
});

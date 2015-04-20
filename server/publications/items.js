Meteor.publishComposite("items", function() {
  return {
    find: function() {
      return Items.find({ owner_id: this.userId });
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});

Meteor.publish("itemsAndFiles", function(userId){
  return [
    Items.find({ owner_id: userId }),
    Files.find({
      $query: {'metadata.owner_id': userId},
    })
  ]
});
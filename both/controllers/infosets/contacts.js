ContactsController = InfosetController.extend({
  // data: function() {
  //   return {
  //     items: Items.find(),
  //     groups: Groups.find()
  //   }
  // },
  onAfterAction: function () {
    Meta.setTitle('My Contacts');
  },
  action: function (){
    // create default groups and safeboxes if none exist
    this.render();
  }
});

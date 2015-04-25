MyWordsController = InfosetController.extend({
  // data: function() {
  //   return {
  //     items: Items.find(),
  //     groups: Groups.find()
  //   }
  // },
  onAfterAction: function () {
    Meta.setTitle('In My Own Words');
  },
  action: function (){
    // create default groups and safeboxes if none exist
    this.render();
  }
});

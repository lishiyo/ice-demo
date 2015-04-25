InfosetController = RouteController.extend({
  waitOn: function() {
    return [ this.subscribe('infosetsAll', Meteor.userId()) ];
  },
  data: function() {
    return Infosets.find();
  },
  onAfterAction: function () {
    Meta.setTitle('Info');
  },
});


InfosetPublicController = RouteController.extend({
  layoutTemplate: 'publicLayout',
  waitOne: function(){
    var contactId = localStorage.getItem("contact_id");
    var contact = Contacts.find( {_id: contactId } );
    var data = this.subscribe('infosetPublic', contact.allowedInfoset, contact.allowedInfosetTabs);
    console.log("infoset public", contactId, contact.allowedInfoset, contact.allowedInfosetTabs);
  }
});

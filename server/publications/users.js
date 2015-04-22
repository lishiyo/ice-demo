// in server/publish.js
Meteor.publish(null, function (){
  return [Meteor.roles.find({}), Meteor.users.find({_id: this.userId })]
});

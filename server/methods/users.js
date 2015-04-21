Accounts.onCreateUser(function(options, user) {
  return user;
});


Meteor.methods({
	// @param user object
	// add more fields to user
	'setProfile': function(userData) {
    // user.roles = [ 'source' ]
    if (userData.roles.length > 0) {
      // Need _id of existing user record so this call must come
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, userData.roles);
    }

    // user.roles = {
		//   'userId': ['source', 'unlocked/locked'],
		// }

  },

  'createDefaultGroups': function(user, defaultTypes) {
    defaultTypes.forEach(function(type){
      Groups.insert(
        {
          owner_id: user._id,
          type: type,
          name: type,
          contactIds: []
        }
      );
    });
  }
});




// Accounts.createUser = _.wrap(Accounts.createUser, function(createUser){
//   // Store the original arguments
//   var args = _.toArray(arguments).slice(1),
//       user = args[0];
//       origCallback = args[1];

//   var newCallback = function(error) {
//       // create default groups for user upon registration
//     if (!Groups.find({owner_id: user._id}).count()) {
//       var defaultTypes = ["family", "friends", "medical", "legal", "custom"];
//       defaultTypes.forEach(function(type){
//         Groups.insert({
//           owner_id: user._id,
//           type: type,
//           name: type,
//           contactIds: []
//         });
//       });
//     }

//     origCallback.call(this, error);
//   };

//   createUser(user, newCallback);
// });

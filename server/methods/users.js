Accounts.onCreateUser(function(options, user) {
  console.log("onreateUser", options, user);
  return user;
});


Meteor.methods({
	// @param user object
	'setProfile': function(userData) {
    // user.roles = [ 'source' ]
    if (userData.roles.length > 0) {
      // Need _id of existing user record so this call must come
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, userData.roles);
    }
  },
  'addContactIdToUser': function (opts) {
    console.log("adding contact id to user with opts: ", opts);
    Users.update({ _id: opts.userId }, { $addToSet: {
      contactIds: [ opts.contactId ]
    }});
  },
  // ==== Convert Contact to User upon Unlock ====
  'convertContactToUser': function(docFields, safeboxId, contactId) {
    newUserId = Accounts.createUser(docFields);
    console.log("converting contact", newUserId);
    // add unlocked to roles
    Roles.addUsersToRoles(newUserId, ['unlocked']);
    // add safeboxId to unlockedSafeboxes
    Users.update({_id: newUserId}, {
      $addToSet: {
        unlockedSafeboxes: [safeboxId],
        contactIds: [contactId]
      }
    });

    // delete tag

    return true;
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

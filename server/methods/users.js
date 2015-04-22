// Accounts.onCreateUser(function(options, user) {
//   console.log("onreateUser", options, user);
//   return user;
// });


Meteor.methods({
	// // @param user object
	// 'setProfile': function(userData) {
 //    // user.roles = [ 'source' ]
 //    if (userData.roles.length > 0) {
 //      // Need _id of existing user record so this call must come
 //      // after `Accounts.createUser` or `Accounts.onCreate`
 //      Roles.addUsersToRoles(id, userData.roles);
 //    }
 //  },
  'addContactIdToUser': function (opts) {
    console.log("adding contact id to user with opts: ", opts);
    Meteor.users.update(opts.userId, { $addToSet: {
      contactIds: opts.contactId
    }});
  },
  // ==== Convert Contact to User upon Unlock ====
  'convertContactToUser': function(docFields, safeboxId, contactId) {
    newUserId = Accounts.createUser(docFields);
    // add unlocked to roles
    Roles.addUsersToRoles(newUserId, ['unlocked']);

    // add safeboxId to unlockedSafeboxes
    Meteor.users.update(newUserId, {
      $addToSet: {
        unlockedSafeboxes: safeboxId,
      }
    });
    Meteor.users.update(newUserId, {
      $addToSet: {
        contactIds: contactId
      }
    });

    // delete tag

    return {
      user: Meteor.users.findOne(newUserId),
      safeboxId: safeboxId
    };
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

Accounts.onCreateUser(function(options, user) {
  // user.firstName = options.firstName;
  // user.lastName = options.lastName;
  // return user;
  return user;
});

Meteor.methods({
	// @param user object  
	// add more fields to user
	setProfile: function(userData) { 
    var newUser;

    // user.roles = [ 'source' ]
    if (userData.roles.length > 0) {
      // Need _id of existing user record so this call must come 
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, userData.roles);
    }

    // user.roles = { 
		//   'awefjaowawef': ['source', 'unlocked/locked'],
		// }

  },
});
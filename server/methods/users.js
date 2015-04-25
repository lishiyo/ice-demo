Accounts.onCreateUser(function(options, user) {
  console.log("onCreateUser", options, user);

  Meteor.call('createDefaultGroups', user, App.GLOBALS.Groups.defaultTypes);
  Meteor.call('createDefaultSafebox', user);
  Meteor.call('createDefaultInfoset', user);
  return user;
});

Meteor.methods({
  'addContactIdToUser': function (opts) {
    console.log("adding contact id to user with opts: ", opts);
    Meteor.users.update(this.userId, { $addToSet: {
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

    // DELETE TAG

    return {
      user: Meteor.users.findOne(newUserId),
      safeboxId: safeboxId
    };
  },

  'createDefaultGroups': function(user, defaultTypes) {
    console.log("creating default groups with userId", user._id);
    if (Groups.find({ owner_id: user._id}).count() > 0) return;

    for (var i = 0; i < defaultTypes.length; i++) {
      (function(){
        console.log("creating group", user._id, i);
        Groups.insert(
          {
            owner_id: user._id,
            type: defaultTypes[i],
            name: defaultTypes[i],
            contactIds: []
          }
        ); // insert
      })();
    }

  },

  'createDefaultSafebox': function(user) {
    console.log("creating default safebox with user", user._id);
    if (user.defaultSafebox) return;

    Safeboxes.insert({
      owner_id: user._id,
      infoset_type: 7,
      unlocked: false
    }, function(err, id){
      if (err) {
        console.log("err default safebox", err);
      } else {
        console.log("success safebox", id);
        Meteor.users.update({ _id: user._id }, { $set: {
          defaultSafebox: id,
        }});
      }
    });
  },

  'createDefaultInfoset': function(user){
    console.log("creating default infoset with user", user._id);
    if (user.infoset) return;

    Infosets.insert({
      owner_id: user._id,
    }, function(err, id) {
      if (err) {
        console.log("err infoset", err);
      } else {
        console.log("success infoset", id);
        Meteor.users.update({ _id: user._id }, { $set: {
          infoset: id,
        }});
      }
    });
  },

});

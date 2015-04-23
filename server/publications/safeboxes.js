Meteor.publish("safeboxesWithEverything", function (userId) {
  return [
    Safeboxes.find({ owner_id: userId }),
    Items.find({ owner_id: userId }),
    Groups.find({ owner_id: userId }),
    Contacts.find({ owner_id: userId }),
    Files.find({ owner_id: userId })
  ]
});

Meteor.publish("safebox", function (safeboxId) {
	if (Roles.userIsInRole(this.userId, ['source', 'unlocked'])) {
		return Safeboxes.find({ _id: safeboxId });
	} else {
		this.stop();
		return;
	}
});

Meteor.publishComposite("safeboxPublic", function (safeboxId) {
  return {
    find: function () {
      if (Roles.userIsInRole(this.userId, ['source', 'unlocked'])) {
        return Safeboxes.find({ _id: safeboxId }, { fields:
            { allowedContacts: 0,
              allowedAll: 0,
              allowedGroups: 0 }});
      } else {
        this.stop();
        return;
      }
    },
    children: [
      {
        find: function(safebox) {
            return Items.find({ _id: { $in: safebox.items } });
        }
      },
    ]
  }
});

Meteor.publishComposite("safeboxesPublic", function (user) {
  return {
    find: function () {
      if (Roles.userIsInRole(user._id, ['source', 'unlocked'])) {
        return Safeboxes.find({ _id: { $in: user.unlockedSafeboxes } }, { fields:
            { allowedContacts: 0,
              allowedAll: 0,
              allowedGroups: 0 }
            });
      } else {
        this.stop();
        return;
      }
    },
    children: [
      {
        find: function(safebox) {
            return Items.find({ _id: { $in: safebox.items } });
        }
      },
    ]
  }
});

// Meteor.publish("safeboxIds", function () {
//   return Safeboxes.find({}, { fields: { _id: 1, unlocked: 1} } );
// });

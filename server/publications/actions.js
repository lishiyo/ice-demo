Meteor.publishComposite("userActions", function () {
  return {
    find: function () {
      if (Roles.userIsInRole(this.userId, ['source', 'unlocked'])) {
        return Actions.find({ owner_id: this.userId });
      } else {
        this.stop();
        return;
      }
    },
    children: [
      {
        find: function(action) {
            return ActionSteps.find({ action_id: action._id });
        },
      },
    ]
  }
});
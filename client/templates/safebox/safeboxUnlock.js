Template.safeboxUnlock.events({
	"submit form#unlock-safebox": function(event){
		event.preventDefault();
		var $form = $(event.target);
		var contact_id = $form.find('input[name="key"]').val();
		var secret = $form.find('input[name="secret"]').val();
		var params = Iron.controller().getParams();

		var opts = {
			safebox_id: params.safeboxId,
			contact_id: contact_id,
			secret: secret
		};

		Meteor.call("checkValidUnlock", opts, function(err, res){
			if (res) { // either user or contact
				if (res.hasAccount) {
					var opts = {
						userId: res.account._id,
						contactId: res.contact_id
					}
					Meteor.call('addContactIdToUser', opts);
					Router.go('signIn'); // already a user
				} else {
					Router.current().state.set('contact', res.account);
					Router.current().render('contactUnlock');
				}
			} else {
				Router.go('unauthorized');
			}
		});
	}
});

Template.contactUnlock.helpers({
	contact: function() {
		return Router.current().state.get('contact');
	},
	safeboxId: function() {
		return Router.current().params.safeboxId;
	}
});

Template.contactUnlock.events({
	// "submit form#unlock-contact": function (event) {
	// 	event.preventDefault();
	// }
});

// xiaodong =  "3Pitq7cx8FbonWBRB"
// secret =  "haW574KpzoPA"

AutoForm.hooks({
  contactConfirm: {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
    	// format doc fields
    	var email = insertDoc.profile.email;
    	delete insertDoc.profile.email;
    	insertDoc.email = email;
    	var safeboxId = Router.current().params.safeboxId;
    	var contactId = Router.current().state.get('contact')._id;

      if (Meteor.call("convertContactToUser", insertDoc, safeboxId, contactId)) {
        this.done();
      } else {
        this.done(new Error("Submission failed"));
      }
      return false;
    },

    onSuccess: function () {

    },
  }
});

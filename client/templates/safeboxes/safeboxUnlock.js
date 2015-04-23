Template.safeboxUnlock.events({
	"submit form#unlock-safebox": function(event){
		event.preventDefault();
		var $form      = $(event.target);
		var contact_id = $form.find('input[name="key"]').val();
		var secret     = $form.find('input[name="secret"]').val();
		var params     = Iron.controller().getParams();

		var opts       = {
			safebox_id: params.safeboxId,
			contact_id: contact_id,
			secret: secret
		};

		Meteor.call("checkValidUnlock", opts, function(err, res){
			if (res) { // either user or contact
				if (res.hasAccount) { // existing user
					var opts = {
						userId: res.account._id,
						contactId: res.contact_id
					}
					Meteor.call('addContactIdToUser', opts);
					Router.go('/sign-in');
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
});

AutoForm.hooks({
  contactConfirm: {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
    	var safeboxId = Router.current().params.safeboxId;
    	var contactId = Router.current().state.get('contact')._id;
    	// format doc fields
    	var email = insertDoc.profile.email;
    	delete insertDoc.profile.email;
    	insertDoc.email = email;
    	Router.current().state.set('password', insertDoc.password);

    	Meteor.call("convertContactToUser", insertDoc, safeboxId, contactId, function(err, data){
    		if (err) {
    			this.done(new Error("Submission failed"));
    		} else {
    			// data = { user, safeboxId }
    			this.done(null, data);
    		}
    	}.bind(this));

      return false;
    },
    // login user upon submission
    onSuccess: function (formType, data) {
    	var password = Router.current().state.get('password');
    	var uId = { id: data.user._id };

    	Meteor.loginWithPassword(uId, password, function(err) {
    		console.log("logged in with err", err);
	    	Router.go('safeboxes.unlocked.show', { safeboxId: data.safeboxId });
    	})
    },

    onError: function (formType, err) {
    	Router.current().render('errors');
    }
  }
});

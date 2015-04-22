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
					Router.go('signIn'); // a user
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
		var contact = Router.current().state.get('contact');
		return contact;
	}
});

Template.contactUnlock.events({
	"submit form#unlock-contact": function (event) {
		event.preventDefault();
	}
});

// xiaodong =  "3Pitq7cx8FbonWBRB"
// secret =  "haW574KpzoPA"

AutoForm.hooks({
  contactConfirm: {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
    	
    	var email = insertDoc.profile.email;
    	delete insertDoc.profile.email;
    	insertDoc.email = email;

    	// var createUser = function(docFields) {
    	// 	return Accounts.createUser(docFields, function(err){
    	// 		if (err) {
    	// 			console.log("err", err);
    	// 			return false;
    	// 		}
    	// 		console.log("created user");
    	// 		Meteor.call("completeUserConversion", docFields);
    	// 		return true;
    	// 	});
    	// };

      if (Meteor.call("convertContact", insertDoc)) {
        this.done();
      } else {
        this.done(new Error("Submission failed"));
      }
      return false;
    }
  }
}); 

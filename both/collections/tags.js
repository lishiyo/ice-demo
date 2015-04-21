/*

Tags represent the link between passcode, contact_id, and safebox_id.
When the safebox is unlocked, the passcode is released to each of its contacts.
The contact inputs client_id && passcode -> search for safebox in Tags.
If the safebox_id matches this.params.safeboxId and safebox.unlocked, then:
	1) redirect to contact setup page to become a full user
	2) upon full user-ship, Roles.addUsersToRoles(id, ['unlocked']);
	3) delete tag doc from Tags

 */

Schema = {};
Tags = new Mongo.Collection('tags');

Schema.Tag = new SimpleSchema({
	contact_id: {
		type: String,
		optional: false
	},
	safebox_id: {
		type: String,
		optional: false
	},
	secret: {
		type: String,
		optional: false
	}
});


Tags.attachSchema(Schema.Tag);

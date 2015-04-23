Schema = {};

Schema.UserAddress = new SimpleSchema({
	street: {
		type: String,
		optional: true
	},
	city: {
		type: String,
		optional: true
	},
	state: {
		type: String,
		optional: true,
		allowedValues: ['NY', 'NJ', 'CA']
	},
	zipcode: {
		type: Number,
		optional: true
	}
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
      type: String,
      regEx: /^[a-zA-Z-]{2,25}$/,
      optional: false,
      label: "First Name*"
    },
    lastName: {
      type: String,
      regEx: /^[a-zA-Z]{2,25}$/,
      optional: false,
      label: "Last Name*"
    },
    dateOfBirth: {
      type: Date,
      optional: true
    },
    gender: {
      type: String,
      allowedValues: ['Male', 'Female'],
      optional: true
    },
    address: {
      type: Schema.UserAddress,
      optional: true
    },
    tel: {
    	type: String,
        label: "Primary Phone Number*",
    	optional: true,
      regEx: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    	autoform: {
    		placeholder: "XXX-XXX-XXXX"
    	}
    }
});


Schema.User = new SimpleSchema({
	emails: {
   type: [Object],
// this must be optional if you also use other login services like facebook,
// but if you use only accounts-password, then it can be required
   optional: true
  },
  "emails.$.address": {
      type: String,
      regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
      type: Boolean
  },
  createdAt: {
      type: Date,
      optional: true,
      autoform: {
      	omit: true
      }
  },
  profile: {
      type: Schema.UserProfile,
      optional: true
  },
  services: {
      type: Object,
      optional: true,
      blackbox: true
  },
  roles: {
      type: [String],
      optional: false,
      blackbox: true,
      autoValue: function(doc) {
      	if (!this.isSet) return ['source'];
      }
  },
  // == For Contact conversion ===
  unlockedSafeboxes: {
    type: [String],
    defaultValue: []
    // autoValue: function(){
    //   if (!this.isSet) return [];
    // }
  },
  contactIds: {
    type: [String],
    defaultValue: []
    // autoValue: function(){
    //   if (!this.isSet) return [];
    // }
  }
});

Meteor.users.attachSchema(Schema.User);

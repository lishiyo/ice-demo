/*
InfoSets: {
		0: "Contacts", // => array of contactIds
		1: "InMyOwnWords",
		2: "Care",
		3: "Medical",
		4: "SubsAccounts",
		5: "Estate",
		6: "Ceremony",
		7: "DocumentSafe" // => array of safeboxIds
	}
 */

Schema = {};
Infosets = new Mongo.Collection('infosets');

// 0: Contacts
Schema.ContactSet = new SimpleSchema({
	contactIds: {
		type: [String],
		optional: true
	}
});
// 1: InMyOwnWords
Schema.MyWordsSet = new SimpleSchema({
	content: {
		type: String
	}
});
// 2: Care
Schema.CareSet = new SimpleSchema({
	content: {
		type: String
	},
});

// 7: Document Safebox Set
Schema.SafeboxSet = new SimpleSchema({
	safeboxIds: {
		type: [String],
		optional: true,
	}
});

Schema.Infoset = new SimpleSchema({
	owner_id: {
		type: String,
	},
	contactSet: {
		type: Schema.ContactSet,
		optional: true
	},
	myWordsSet: {
		type: Schema.MyWordsSet,
		optional: true
	},
	careSet: {
		type: Schema.CareSet,
		optional: true
	},
	safeboxSet: {
		type: Schema.SafeboxSet,
		optional: true
	}
});

Infosets.attachSchema(Schema.Infoset);

Infosets.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
});

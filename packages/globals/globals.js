// Write your package code here!
App = {};

App.GLOBALS = {
	Groups: {
		defaultTypes: ["family", "friends", "medical", "financial/legal", "custom"]
	},
	Items: {
		defaultCategories: ['ID', 'document', 'infoKey'],
		defaultTypesId: ['passport', 'driversLicense', 'socialSecurity'],
		defaultTypesDoc: ['personal', 'medical', 'financial', 'legal', 'other']
	},
	Actions: {
		defaultStepTypes: ['message', 'triggerSafebox'],
		defaultStepCodes: {
			'message': 0,
			'triggerSafebox': 1
		}
	},
	Profiles: {
		relationsMap: {
			"Spouse": "Your Spouse or Significant Other",
			"Child": "A Child",
			"Parent": "An Elderly Parent",
			"Sibling": "A Brother or Sister",
			"Pet": "A Pet",
			"Friend": "A Friend"
		},
		defaultRelations: ["Spouse", "Child", "Parent", "Sibling", "Pet", "Friend"]
	},
	// each contact has access to this User/Profile's ICEPlan's tabs
	// input ID + keycode => identify contact => Session.set => publish set of Models
	// each a safebox
	Infosets: {
		0: "Contacts", // own model,
		1: "InMyOwnWords",
		2: "Care",
		3: "Medical",
		4: "SubsAccounts",
		5: "Estate",
		6: "Ceremony",
		7: "DocumentSafe" // own model
	}
}


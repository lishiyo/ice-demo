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
		defaultStepMap: {
			"message": {
				label: "Send a text message"
			},
			"triggerSafebox": {
				label: "Trigger their safebox"
			}
		}
	},
	Profiles: {
		relationsMap: {
			"Spouse": {
				label: "Your Spouse or Significant Other",
				imgPath: "/images/icons/spouse.png"
			},
			"Child": {
				label:  "A Child",
				imgPath: "/images/icons/child.png"
			},
			"Parent": {
				label: "An Elderly Parent",
				imgPath: "/images/icons/mom_small.png"
			},
			"Sibling": {
				label: "A Brother or Sister",
				imgPath: "/images/icons/siblings.svg",
			},
			"Pet": {
				label: "A Pet",
				imgPath: "/images/icons/dog_small.png",
			},
			"Friend": {
				label: "A Friend",
				imgPath:  "/images/icons/me.png"
			}
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


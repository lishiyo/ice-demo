// Write your package code here!
App = {};

App.GLOBALS = {
	Groups: {
		defaultTypes: ["family", "friends", "medical", "financial/legal", "custom"]
	},
	Items: {
		defaultCategories: ['ID', 'document', 'infoKey'],
		defaultTypesId: ['passport', 'driversLicense', 'socialSecurity'],
		defaultTypesDoc: ['personal', 'medical', 'financial', 'legal']
	},
	Actions: {
		defaultStepTypes: ['message', 'triggerSafebox'],
		defaultStepCodes: {
			'message': 0,
			'triggerSafebox': 1
		}
	}
}


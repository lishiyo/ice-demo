Template.steps.helpers({
	steps: function(){
		var stepOne = {
			label: "Step One",
			imgUrl: "/images/icons/profiles.png",
			tagline: "Create Profiles",
			description: "Profiles are people who will be covered in a crisis.",
			route: "profiles"
		};
		var stepTwo = {
			label: "Step Two",
			tagline: "Create Contacts",
			imgUrl: "/images/icons/contacts.png",
			description: "Contacts are people who will be notified about emergencies.",
			route: "contacts"
		};
		var stepThree = {
			label: "Step Three",
			tagline: "Design Your ICEPlan",
			imgUrl: "/images/icons/design.png",
			description: "Set up what happens in a crisis.",
			route: "actions"
		};
		return [ stepOne, stepTwo, stepThree ];
	}
});

Template.steps.events({
	'click .step': function(event) {
		event.preventDefault();
		var route = ($(event.currentTarget).data("route"));
		console.log("event target", $(event.currentTarget));
		Router.go(this.route + ".create");
	},
	'click button.next-step': function(event) {
		event.preventDefault();
		Router.go('profiles.create');
	}
});

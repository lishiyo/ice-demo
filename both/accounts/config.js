AccountsTemplates.configure({
	confirmPassword: true,
	enablePasswordChange: false,

	// appearance
	showForgotPasswordLink: false,
	showLabels: true,
	showPlaceholders: true,

	// Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Texts
    texts: {
      button: {
          signUp: "Register Now!"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Passwod"
      },
    },
});

// The simplest way is to make the call passing just the route code (available codes are: changePwd, enrollAccount, forgotPwd, resetPwd, signIn, signUp):

// default route name => atSignIn
AccountsTemplates.configureRoute('signIn', {
	path: '/login',
	layoutTemplate: 'appLayout'
});
AccountsTemplates.configureRoute('signUp', {
	layoutTemplate: 'appLayout'
});
AccountsTemplates.configureRoute('ensureSignedIn', {
	layoutTemplate: 'appLayout'
});

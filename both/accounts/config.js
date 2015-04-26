AccountsTemplates.configure({
	confirmPassword: true,
	enablePasswordChange: true,

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
          changePwd: "Change Password",
          enrollAccount: "Enroll",
          forgotPwd: "Forgot Password?",
          resetPwd: "Reset Password",
          signIn: "Sign In",
          signUp: "Sign Up",
      },
      socialSignUp: "Sign Up",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },
});



// The simplest way is to make the call passing just the route code (available codes are: changePwd, enrollAccount, forgotPwd, resetPwd, atSignIn, atSignUp):

// default route name => atSignIn
AccountsTemplates.configureRoute('signIn', {
	layoutTemplate: 'appLayout',
  redirect: '/steps'
});
AccountsTemplates.configureRoute('signUp', {
	layoutTemplate: 'appLayout',
  redirect: '/steps' // onboarding
});
AccountsTemplates.configureRoute('ensureSignedIn', {
	layoutTemplate: 'appLayout'
});

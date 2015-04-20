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

// The simplest way is to make the call passing just the route code (available codes are: changePwd, enrollAccount, forgotPwd, resetPwd, signIn, signUp):

// default route name => atSignIn
AccountsTemplates.configureRoute('signIn', {
	layoutTemplate: 'appLayout',
  redirect: '/setup'
});
AccountsTemplates.configureRoute('signUp', {
	layoutTemplate: 'appLayout',
  redirect: '/setup'
});
AccountsTemplates.configureRoute('ensureSignedIn', {
	layoutTemplate: 'appLayout'
});

// AccountsTemplates.addField({
//     _id: "gender",
//     type: "select",
//     displayName: "Gender",
//     select: [
//         {
//             text: "Male",
//             value: "male",
//         },
//         {
//             text: "Female",
//             value: "female",
//         },
//     ],
// });

// AccountsTemplates.addField({
//     _id: 'phone',
//     type: 'tel',
//     displayName: "Phone",
//     required: true,
//     func: function (number) {
//         if (Meteor.isServer){
//           if (isValidPhone(number))
//               return false; // meaning no error!
//           return true; // Validation error!
//         }
//     },
//     errStr: 'Invalid Phone number!',
// });

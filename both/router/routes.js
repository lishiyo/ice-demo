Router.configure({
  layoutTemplate: 'appLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  // waitOn: function() {
  //   return [Meteor.subscribe('notifications')]
  // }
});

Router.route('/', {
  name: 'home'
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.route('/setup', {
	name: 'user.setup',
	controller: 'UserProfileController',
});

Router.route('/safeboxes', {
  name: 'safeboxes',
  controller: 'SafeboxController'
});

Router.plugin('ensureSignedIn', {
  except: ['home', 'atSignIn', 'atSignUp', 'atForgotPassword']
});

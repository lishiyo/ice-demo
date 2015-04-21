var beforeHooks = {
  isLoggedIn: function(pause) {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      Notify.setError(__('Please login.'));
      this.render('login');
      pause();
    }
  },
}

// Before hooks for specific routes
// Must be equal to the route names of the Iron Router route map
// Router.before(beforeHooks.isLoggedIn, {only: ['userAreaA', 'userAreaB']});

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

// ===== SAFEBOXES =====

Router.route('/safeboxes/new', {
  name: 'safeboxes.new',
  template: 'newSafeboxForm',
  controller: 'SafeboxesController',
});

// UNLOCK
Router.route('/safeboxes/:safeboxId/unlock', {
  name: 'safebox.unlock',
  template: 'safeboxUnlock',
  controller: 'SafeboxController'
});

// SHOW
Router.route('/safeboxes/:safeboxId', {
  name: 'safebox.show',
  template: 'safeboxShow',
  controller: 'SafeboxController'
});

// index
Router.route('/safeboxes', {
  name: 'safeboxes',
  template: 'safeboxes',
  controller: 'SafeboxesController',
});


Router.plugin('ensureSignedIn', {
  except: ['home', 'atSignIn', 'atSignUp', 'atForgotPassword', 'safebox.unlock']
});

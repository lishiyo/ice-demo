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
});

Router.route('/unauthorized', {
  name: 'unauthorized',
  template: 'unauthorized'
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

// UNLOCKED - show page of a safebox I've unlocked
Router.route('/safeboxes/unlocked/:safeboxId', {
  name: 'safeboxes.unlocked.show',
  template: 'safeboxUnlocked',
  controller: 'SafeboxUnlockedController'
});

// UNLOCKED - index of all that have been unlocked for me
Router.route('/safeboxes/unlocked', {
  name: 'safeboxes.unlocked',
  controller: 'SafeboxesUnlockedController'
})

// UNLOCK
Router.route('/safeboxes/:safeboxId/unlock', {
  name: 'safebox.unlock',
  template: 'safeboxUnlock',
  controller: 'SafeboxUnlockController'
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

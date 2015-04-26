// Before hooks for specific routes
// Must be equal to the route names of the Iron Router route map
// Router.before(beforeHooks.isLoggedIn, {only: ['userAreaA', 'userAreaB']});

var beforeHooks = {
  isLoggedIn: function(pause) {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      Notify.setError(__('Please login.'));
      this.render('login');
      pause();
    }
  },
}

Router.plugin('ensureSignedIn', {
  except: ['home', 'atSignIn', 'atSignUp', 'atForgotPassword', 'safebox.unlock']
});

Router.configure({
  layoutTemplate: 'appLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

// Basic routes

Router.route('/unauthorized', {
  name: 'unauthorized',
  template: 'unauthorized'
});

Router.route('/', {
  name: 'home'
});

Router.route('/dashboard', {
  name: 'dashboard',
  controller: 'DashboardController',
  template: 'dashboard'
});

// Router.route('/setup', {
// 	name: 'user.setup',
// 	controller: 'UserProfileController',
// });

// ===== ONBOARDING =====

Router.route('/steps', {
  name: 'steps',
  controller: StepsController,
  template: 'steps'
});

// ===== PROFILES - CONTACTS are in Infosets =====

Router.route('/profiles', {
  name: 'profiles',
  template: 'profiles',
  controller: 'UserProfileController'
});

// Step One
Router.route('/profiles/create', {
  name: 'profiles.create',
  template: 'profilesCreate',
  controller: 'UserProfileController'
});

// Step Two
Router.route('/contacts/create', {
  name: 'contacts.create',
  template: 'contactsCreate',
  controller: 'StepsController'
});

// Step Three
Router.route('/actions/create', {
  name: 'actions.create',
  template: 'actionsCreate',
  controller: 'ActionsController'
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



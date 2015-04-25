// ===== TABS: Contacts, In My Own Words, Care, Medical, etc =====

// ===== PRIVATE (Full account) ==== //

Router.route('/contacts', {
  name: 'contacts',
  template: 'tabs.contacts',
  controller: 'ContactsController'
});

Router.route('/my-words', {
  name: 'myWords',
  template: 'tabs.myWords',
  controller: 'myWordsController'
});


// private safebox index
Router.route('/safeboxes', {
  name: 'tabs.safeboxes',
  template: 'tabs.safeboxes',
  controller: 'SafeboxesController',
});


// ===== PUBLIC (Contact's view) ==== //

Router.route('/public/contacts', {
  name: 'contacts.public',
  layoutTemplate: 'publicLayout',
  template: 'tabs.contacts',
  controller: 'InfosetPublicController'
});

Router.route('/public/my-words', {
  name: 'myWords.public',
  layoutTemplate: 'publicLayout',
  template: 'tabs.myWords',
  controller: 'InfosetPublicController'
});

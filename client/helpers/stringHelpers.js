Template.registerHelper('truncate', function(string, length) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(length);
});

Template.registerHelper('fullNameify', function(profile) {
	return profile.firstName.trim() + " " + profile.lastName.trim();
});

// Takes camelcase `socialSecurity` => Social Security
Template.registerHelper('nameify', function(str){
	var result = str.replace( /([A-Z])/g, " $1" );
	return result.charAt(0).toUpperCase() +  result.slice(1);
});

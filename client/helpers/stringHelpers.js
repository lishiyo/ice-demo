Template.registerHelper('truncate', function(string, length) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(length);
});

Template.registerHelper('fullNameify', function(profile) {
	if (profile.lastName) {
		return profile.firstName.trim() + " " + profile.lastName.trim();
	}
});

// Takes camelcase `socialSecurity` => Social Security
Template.registerHelper('nameify', function(str){
	var result = str.replace( /([A-Z])/g, " $1" );
	return result.charAt(0).toUpperCase() +  result.slice(1);
});

Template.registerHelper('showFirstNames', function(arr){
	var newArr = arr.map(function(contact){
		return contact.profile.firstName;
	});
	if (newArr.length === 1) {
		return newArr[0];
	} else {
		var uptoLast = newArr.slice(0, (newArr.length-1));
		uptoLast = uptoLast.join(", ");
		return (uptoLast + " and " + newArr[newArr.length-1]);
	}
});

Template.registerHelper('showFullNames', function(arr){
	if (!arr.length) return "yourself";

	var newArr = arr.map(function(contact){
		return contact.profile.fullName;
	});

	if (newArr.length === 1) {
		return newArr[0];
	} else {
		var uptoLast = newArr.slice(0, (newArr.length-1));
		uptoLast = uptoLast.join(", ");
		return (uptoLast + " and " + newArr[newArr.length-1]);
	}
});


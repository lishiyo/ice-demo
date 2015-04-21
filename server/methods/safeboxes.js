Meteor.methods({
  'createTagsForSafebox': function(safebox) {
  	var secret = Random.secret(12);

  	safebox.allowedAll.forEach(function(id) {
  		var fields = {
	  		secret: secret,
	  		safebox_id: safebox._id,
	  		contact_id: id
	  	};

	  	Tags.insert(fields, function(err, tagId){
	  		console.log("inserted tag for contact_id: ", id, tagId);
	  	});
  	});
  },

  'removeTagsForSafebox': function(safebox) {
  	console.log("hit remove tags for safebox", safebox);
  },

  // helper function to merge allowedContacts + allowedGroups
  'mergeGroupContactIds': function(safebox) {
  	var ids = Array.prototype.slice(safebox.allowedAll, 0); // []

  	function addGroupIds (groupIds, currIds) {
  		groupIds.forEach(function(groupId){
  			var group = Groups.findOne({ _id: groupId });
  			group.contactIds.forEach(function(id){
  				if (id===null) return;
  				if (currIds.indexOf(id) === -1) {
  					currIds.push(id);
  				}
  			});
  		});
  		return currIds;
  	};

  	function addContactIds (contactIds, currIds) {
  		contactIds.forEach(function(cId){
  			if (currIds.indexOf(cId) === -1) {
  				currIds.push(cId);
  			}
  		});
  		return currIds;
  	};

  	ids = addGroupIds(safebox.allowedGroups, ids);
  	ids = addContactIds(safebox.allowedContacts, ids);

  	Safeboxes.update({ _id: safebox._id }, { $addToSet: {
  		allowedAll: { $each: ids }
  	} }, function(err, numDocs){
  		console.log("successful update", numDocs);
  	});
  },

	// check if secret matches decoded safeboxId.client_id
  'checkSecret': function (safeboxId, secret) {

  },

  'unlockSafebox': function () {
  	// give secret to all allowed contacts
  },


});

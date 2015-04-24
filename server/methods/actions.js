Meteor.methods({
	'sendMessage': function (message, target) {
		var sid = Meteor.settings.development.twilio.SID,
				auth_token = Meteor.settings.development.twilio.AUTH_TOKEN,
				num = Meteor.settings.development.twilio.NUM;
		
		var twilio = Twilio(sid, auth_token);
		var targetNum = target.tel.replace("-", "");
		console.log("targetNum", targetNum);
		// ====== delete after testing ==========
		targetNum = "7575772157";

	  twilio.sendSms({
	    to: targetNum, // Any number Twilio can deliver to
	    from: num, 
	    body: message // body of the SMS message
	  }, function(err, responseData) { 
	  	if (err) {
	  		console.log("err", err);
	  		return false;
	  	} else {
	    	console.log("success body", responseData.body); 
	    	return true;
	    }
		});
	}, 
	// replied back 'yes' or 'no'
	'handleMsgResponse': function (message, target) {

	}
});
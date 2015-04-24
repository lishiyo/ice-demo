Meteor.methods({
	'sendMessage': function (message, target) {
		var sid = process.env.TWILIO_SID,
				auth_token = process.env.TWILIO_TOKEN,
				num = process.env.TWILIO_NUM;
		var twilio = Twilio(sid, auth_token);
		var targetNum = target.profile.tel.replace(/-/g, "");
		console.log("targetNum", targetNum);
		// ====== delete after testing ==========
		//targetNum = "7575772157";

	  twilio.sendSms({
	    to: targetNum, // Any number Twilio can deliver to
	    from: num,
	    body: message // body of the SMS message
	  }, function(err, responseData) {
	  	if (err) {
	  		console.log("err", err);
	  	} else {
	    	console.log("success body", responseData.body);
	    }
		});
	},
	// replied back 'yes' or 'no'
	'handleMsgResponse': function (message, target) {

	}
});

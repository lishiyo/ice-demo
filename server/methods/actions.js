Meteor.methods({
	'sendMessage': function (message, target) {
		var sid = "ACf5775b0227315669a611fcbb99c1b5b1",
				auth_token = "02b4bff5e22c900511b67b22ae8f8f61",
				num = "17573948513";
		
		var twilio = Twilio(sid, auth_token);
		var targetNum = target.profile.tel.replace("-", "");
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
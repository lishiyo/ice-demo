Meteor.publish("infosetsAll", function(){
  return [
    Infosets.find({ owner_id: this.userId }),
  ]
});

Meteor.publish("infosetsPublic", function(infosetId, tabs){ // tabs =>
    var map = {};
    for (var prop in App.GLOBALS.Infoset) { // [0...7]
        if (tabs.indexOf(prop) !== 0) {
            map[prop] = 1;
        } else {
            map[prop] = 0;
        }
    }
    console.log("map", map);
    return [
        Infosets.find({ _id: infosetId }, {
            contactSet: map[0],
            myWordsSet: map[1],
            careSet: map[2],
            safeboxSet: map[7]
        })
    ]
});

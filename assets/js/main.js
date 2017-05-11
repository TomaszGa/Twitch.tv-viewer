
$(document).ready(function () {
	//list of streamers to be displayed
  var streamerList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "BeyondTheSummit", "Kyente", "travelyan", "SpeedGaming", "DreamLeague"];
  var streamCheck = "";
  var dataCheck = "";
  $.ajaxSetup({
    cache: false
	});
	//loop through all names on streamer list
  streamerList.forEach(function (i) {
    var htmlString = "";
    streamCheck = "https://wind-bow.glitch.me/twitch-api/streams/" + i;
		//first get to check stream status
    $.getJSON(streamCheck, function (json) {
			//check if streamer is offline
      if (json.stream === null) {
				htmlString += "<div class='card offline'><div class='card-block'><a href='http://www.twitch.com/" + i +"'><p>" + i + " </a>is offline</p></div>";
			}
				else {
					htmlString += "<div class='card online'><div class='card-block'><a href='http://www.twitch.com/"+ i +"'><p>"+ i +" </a>is streaming:</p><p>" + json.stream.channel.status + "</p></div>";
        }
			dataCheck = "https://wind-bow.glitch.me/twitch-api/channels/" + i;
			//second get for logo url
			$.getJSON(dataCheck, function (json2) {
				console.log(json2.hasOwnProperty("error"));
				if (json2.hasOwnProperty("error")) {
					//if streamer deactivated, wipe htmlString and set placeholder
					htmlString = "<div class='card inactive'><div class='card-block'><p>" + i + " deactivated their account</p></div></div>";
				}
					else {
					htmlString += "<img src='" + json2.logo + "' class='img-fluid card-img-bottom'></div>";
					}
				$("#outputContainer").append(htmlString);
					 
			});

		});

	});

});
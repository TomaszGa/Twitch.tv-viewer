
$(document).ready(function () {
	//list of streamers to be displayed
  var streamerList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
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
				htmlString += "<div class='stream-box row v-center offline'><div class='col'><a href='https://www.twitch.tv/" + i + "'><p>" + i + "</p></a></div><div class='col'><p>is offline</p></div>";
			}
				else {
					htmlString += "<div class='stream-box row v-center'><div class='col'><a href='https://www.twitch.tv/" + i + "'><p>" + i + "</p></a></div><div class='col'><p>" + json.stream.channel.status + "</p></div>";
        }
			dataCheck = "https://wind-bow.glitch.me/twitch-api/channels/" + i;
			//second get for logo url
			$.getJSON(dataCheck, function (json2) {
				console.log(json2.hasOwnProperty("error"));
				if (json2.hasOwnProperty("error")) {
					//if streamer deactivated, wipe htmlString and set placeholder
					htmlString = "<div class='stream-box row v-center inactive'><div class='col'><p>User " + i + " not active</p></div><div class='col-sm-4 avatar'><img src='assets/img/x-mark-4-xxl.png' class='img-fluid'></div></div>";
				}
					else {
						htmlString += "<div class='col-sm-4 avatar'><img src='" + json2.logo + "' class='img-fluid'></div></div>";
					}
				$("#outputContainer").append(htmlString);
					 
			});

		});

	});

});
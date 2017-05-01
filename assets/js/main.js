
$(document).ready(function () {
	//list of streamers to be displayed
  var streamerList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"]
  var streamCheck = "";
  var dataCheck = "";
    $.ajaxSetup({
        cache:false
    });
	//loop through all names on streamer list
   streamerList.forEach(function(i){
       var htmlString = "";
       streamCheck = "https://wind-bow.glitch.me/twitch-api/streams/" + i;
		   //first get to check status
       $.getJSON(streamCheck, function(json){
				 		//check if streamer is offline
           if (json.stream===null){
               htmlString+="<div class='stream-box row v-center offline'><div class='col'><a href='https://www.twitch.tv/" + i + "'><p>" + i + "</p></a></div><div class='col'><p>is offline</p></div>"
           }
           else {
               htmlString+="<div class='stream-box row v-center'><div class='col'><a href='https://www.twitch.tv/" + i + "'><p>" + i + "</p></a></div><div class='col'><p>" + json.stream.channel.status +"</p></div>"
           }
				 dataCheck = "https://wind-bow.glitch.me/twitch-api/channels/" + i;
				 //second get to get logo
				 $.getJSON(dataCheck, function(json2){
					 htmlString+= "<div class='col-sm-4 avatar'><img src='" + json2.logo + "' class='img-fluid'></div></div>"
					 console.log(htmlString);
					 $("body").append(htmlString);
					 
				 });

       });

   });

   });


//htmlString += "<h3><i class=\"fa fa-quote-left\" aria-hidden=\"true\"></i>" + json[0]. + "<i class=\"fa fa-quote-right\" aria-hidden=\"true\"></i></h3>";
const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const url = "https://api.twitch.tv/kraken/streams/" + channels[] + "?client_id=t300383ams5iuxlej34gzwk11qjepn&callback=?";

function callback(data) {
  console.log(data);
}

$.getJSON(url, callback);

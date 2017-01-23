const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
for(let i = 0; i < channels.length; i++) {
  let url = "https://api.twitch.tv/kraken/streams/" + channels[i] + "?client_id=t300383ams5iuxlej34gzwk11qjepn&callback=?";

  function callback(data) {
    console.log(data);
  }

  $.getJSON(url, callback);

}

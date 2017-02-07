const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const streamers = document.getElementById("streamers");

for(let i = 0; i < channels.length; i++) {
  let url = "https://api.twitch.tv/kraken/channels/" + channels[i] + "?client_id=t300383ams5iuxlej34gzwk11qjepn&stream_type=all&callback=?";
  let channel = channels[i];

  function callback(data) {
    console.log(data);
    const a = document.createElement("a");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const img = document.createElement("img");

    a.setAttribute("href", data.url)
    a.setAttribute("target", "blank");
    a.appendChild(li);
    img.setAttribute("src", data.logo);
    li.appendChild(img);
    span.textContent = data.display_name;
    li.appendChild(span);
    streamers.appendChild(a);
  }

  $.getJSON(url, callback);
}

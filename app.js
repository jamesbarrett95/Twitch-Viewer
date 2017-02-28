"use strict";

var channels = ["efragtv", "OgamingSC2", "cretetion", "freecodecamp", "CohhCarnage", "habathcx", "RobotCaleb", "noobs2ninjas"];
var streamers = document.getElementById("streamers");
var getStreamersPromise = Promise.resolve();
var getStreamerInfoPromise = Promise.resolve();

var getStreamers = function(i) {
  var url = "https://api.twitch.tv/kraken/channels/" + channels[i] + "?client_id=t300383ams5iuxlej34gzwk11qjepn&stream_type=all&callback=?";
  var p = $.getJSON(url);
  getStreamersPromise = getStreamersPromise.then(function () {
    return p;
  }).then(getStreamersCallback);
};

var getStreamerInfo = function(i) {
  var url = "https://api.twitch.tv/kraken/streams/" + channels[i] + "?client_id=t300383ams5iuxlej34gzwk11qjepn&stream_type=all&callback=?";
  var p = $.getJSON(url);
  getStreamerInfoPromise = getStreamerInfoPromise.then(function () {
    return p;
  }).then(getStreamerInfoCallback);
}

function getStreamersCallback(data) {
  var a = document.createElement("a");
  var li = document.createElement("li");
  var span = document.createElement("span");
  var img = document.createElement("img");

  a.setAttribute("href", data.url);
  a.setAttribute("target", "blank");
  a.appendChild(li);
  img.setAttribute("src", data.logo);
  li.appendChild(img);
  span.textContent = data.display_name;
  li.appendChild(span);
  streamers.appendChild(a);
}
function getStreamerInfoCallback(data) {
  console.log(data);
}

for (var i = 0; i < channels.length; i++) {
  getStreamers(i);
}

for (var i = 0; i < channels.length; i++) {
  getStreamerInfo(i);
}

"use strict";

const online = document.getElementById("online");
const offline = document.getElementById("offline");
const all = document.getElementById("all");

const offlineUsers = document.getElementsByClassName("offline");
const onlineUsers = document.getElementsByClassName("online");
const allUsers = document.getElementsByClassName("all");

var channels = ["efragtv", "OgamingSC2", "cretetion", "freecodecamp", "CohhCarnage", "habathcx", "RobotCaleb", "noobs2ninjas"];
var streamers = document.getElementById("streamers");
var getStreamersPromise = Promise.resolve();

function appendOfflineUser(data) {
  var row = document.createElement("div");
  var leftCol = document.createElement("div");
  var rightCol = document.createElement("div");
  var a = document.createElement("a");
  var li = document.createElement("li");
  var name = document.createElement("span");
  var offline = document.createElement("small");
  var img = document.createElement("img");

  row.className = "offline all";

  leftCol.className = "leftCol";
  rightCol.className = "rightCol";

  a.setAttribute("href", data.url);
  a.setAttribute("target", "blank");

  img.setAttribute("src", data.logo);

  name.textContent = data.display_name;

  li.appendChild(img);
  li.appendChild(name);
  a.appendChild(li);
  leftCol.appendChild(a);

  offline.textContent = "Offline";

  rightCol.appendChild(offline);

  row.appendChild(leftCol);
  row.appendChild(rightCol);

  streamers.appendChild(row);

}

function getOfflineUser(offlineUser) {
  var url = "https://api.twitch.tv/kraken/channels/" + offlineUser + "?client_id=t300383ams5iuxlej34gzwk11qjepn&stream_type=all&callback=?";
  $.getJSON(url, appendOfflineUser);
}

function getStreamersCallback(data) {
  if(data.stream === null) {
    var offlineUser = data._links.channel.substr(38);
    getOfflineUser(offlineUser);
  } else {
    var onlineUser = data._links.channel.substr(38);
    var url = "https://twitch.tv/" + onlineUser;

    var row = document.createElement("div");
    var leftCol = document.createElement("div");
    var rightCol = document.createElement("div");
    var a = document.createElement("a");
    var li = document.createElement("li");
    var name = document.createElement("span");
    var online = document.createElement("small");
    var img = document.createElement("img");

    row.className = "online all";

    leftCol.className = "leftCol";
    rightCol.className = "rightCol";

    a.setAttribute("href", url);
    a.setAttribute("target", "blank");

    img.setAttribute("src", data.stream.channel.logo);

    name.textContent = data.stream.channel.display_name;

    li.appendChild(img);
    li.appendChild(name);
    a.appendChild(li);
    leftCol.appendChild(a);

    online.textContent = "Online";

    rightCol.appendChild(online);

    row.appendChild(leftCol);
    row.appendChild(rightCol);

    streamers.appendChild(row);
  }
}

function getStreamers(i) {
  var url = "https://api.twitch.tv/kraken/streams/" + channels[i] + "?client_id=t300383ams5iuxlej34gzwk11qjepn&stream_type=all&callback=?";
  var jsonData = $.getJSON(url);
  getStreamersPromise = getStreamersPromise.then(function () {
    return jsonData;
  }).then(getStreamersCallback);
};

for (var i = 0; i < channels.length; i++) {
  getStreamers(i);
}

online.addEventListener("click", () => {
  for (var i = 0; i < offlineUsers.length; i++) {
    offlineUsers[i].style.display = "none";
  }

  for (var i = 0; i < onlineUsers.length; i++) {
    onlineUsers[i].style.display = "inline";
  }
});

offline.addEventListener("click", () => {
  for (var i = 0; i < onlineUsers.length; i++) {
    onlineUsers[i].style.display = "none";
  }

  for (var i = 0; i < offlineUsers.length; i++) {
    offlineUsers[i].style.display = "inline";
  }
});

all.addEventListener("click", () => {
  console.log(allUsers);
  for (var i = 0; i < allUsers.length; i++) {
    allUsers[i].style.display = "inline";
  }
});

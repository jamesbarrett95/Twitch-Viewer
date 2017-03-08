"use strict";

const streamers = document.getElementById("streamers");
const online = document.getElementById("online");
const offline = document.getElementById("offline");
const all = document.getElementById("all");
const input = document.getElementById("input");

const offlineUsers = document.getElementsByClassName("offline");
const onlineUsers = document.getElementsByClassName("online");
const allUsers = document.getElementsByClassName("all");

const channels = ["efragtv", "OgamingSC2", "cretetion", "Orbital_Star", "freecodecamp", "CohhCarnage", "habathcx", "RobotCaleb", "noobs2ninjas"];
let getStreamersPromise = Promise.resolve();

function createElement(elementName, property, attributes, value) {

  const element = document.createElement(elementName);

  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
}

  function setAttributes(element, property, attributes) {
    for(var key in attributes) {
      element[property](key, attributes[key]);
    }
  }

  if(isEmpty(attributes)) {
    if(property !== "") {
      element[property] = value;
    } else {
      return element;
    }
  } else {
    setAttributes(element, property, attributes);
  }
  return element;
}

function appendOfflineUser(data) {

  if(data.status === 404) {
    return;
  }

  const row = createElement("div", "className", {}, "offline all");
  const leftCol = createElement("div", "className", {}, "leftCol");
  const rightCol = createElement("div", "className", {}, "rightCol");
  const a = createElement("a", "setAttribute", {"href" : data.url, "target" : "blank"}, "");
  const li = createElement("li", "", {}, "");
  const name = createElement("span", "textContent", {}, data.display_name);
  const offline = createElement("small", "textContent", {}, "Offline");
  const img = createElement("img", "setAttribute", {"src" : data.logo}, "");

  li.appendChild(img);
  li.appendChild(name);
  a.appendChild(li);
  leftCol.appendChild(a);

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
    let offlineUser = data._links.channel.substr(38);
    getOfflineUser(offlineUser);
  } else {
    var onlineUser = data._links.channel.substr(38);
    var url = "https://twitch.tv/" + onlineUser;

    const row = createElement("div", "className", {}, "online all");
    const leftCol = createElement("div", "className", {}, "leftCol");
    const rightCol = createElement("div", "className", {}, "rightCol");
    const a = createElement("a", "setAttribute", {"href" : url, "target" : "blank"}, "");
    const li = createElement("li", "", {}, "");
    const name = createElement("span", "textContent", {}, data.stream.channel.display_name);
    const online = createElement("small", "textContent", {}, "Online");
    const img = createElement("img", "setAttribute", {"src" : data.stream.channel.logo}, "");

    li.appendChild(img);
    li.appendChild(name);
    a.appendChild(li);
    leftCol.appendChild(a);

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

input.addEventListener("keyup", () => {
  let searchTerm = input.value;
  let targets = channels.join("");
  // Search Functionality to be implemented
});

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
  for (var i = 0; i < allUsers.length; i++) {
    allUsers[i].style.display = "inline";
  }
});

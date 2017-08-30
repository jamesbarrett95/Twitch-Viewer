const streamers = document.getElementById('streamers')
const online = document.getElementById('online')
const offline = document.getElementById('offline')
const all = document.getElementById('all')
const input = document.getElementById('input')

// HTMLCollection containing All, Online and Offline users
const offlineUsers = document.getElementsByClassName('offline')
const onlineUsers = document.getElementsByClassName('online')
const allUsers = document.getElementsByClassName('all')

// Channels to be displayed on the page
const channels = ['efragtv', 'OgamingSC2', 'cretetion', 'Orbital_Star', 'freecodecamp', 'CohhCarnage', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
let getStreamersPromise = Promise.resolve()

// Create a HTML element with supplied propertys and attributes
function createElement (elementName, property, attributes, value) {
  const element = document.createElement(elementName)

  function isEmpty (obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false
    }
    return true
  }

  function setAttributes (element, property, attributes) {
    for (let key in attributes) {
      element[property](key, attributes[key])
    }
  }

  if (isEmpty(attributes)) {
    if (property !== '') {
      element[property] = value
    } else {
      return element
    }
  } else {
    setAttributes(element, property, attributes)
  }
  return element
}

function appendOfflineUser (data) {
  // If the user does not exist, return and skip to the next API call
  if (data.status === 404) return

  // Generate HTML and append to the screen
  const row = createElement('div', 'className', {}, 'offline all')
  row.dataset.streamer = data.display_name.toLowerCase()
  const leftCol = createElement('div', 'className', {}, 'leftCol')
  const rightCol = createElement('div', 'className', {}, 'rightCol')
  const a = createElement('a', 'setAttribute', {'href': data.url, 'target': 'blank'}, '')
  const li = createElement('li', '', {}, '')
  const name = createElement('span', 'textContent', {}, data.display_name)
  const offline = createElement('small', 'textContent', {}, 'Offline')
  const img = createElement('img', 'setAttribute', {'src': data.logo}, '')

  li.appendChild(img)
  li.appendChild(name)
  a.appendChild(li)
  leftCol.appendChild(a)

  rightCol.appendChild(offline)

  row.appendChild(leftCol)
  row.appendChild(rightCol)

  streamers.appendChild(row)
}

// Execute another API call to get offline users
function getOfflineUser (offlineUser) {
  const url = 'https://api.twitch.tv/kraken/channels/' + offlineUser + '?client_id=t300383ams5iuxlej34gzwk11qjepn&stream_type=all&callback=?'
  $.getJSON(url, appendOfflineUser)
}

// Callback function executed after each API call
function getStreamersCallback (data) {
  if (data.stream === null) {
    const offlineUser = data._links.channel.substr(38)
    getOfflineUser(offlineUser)
  } else {
    const onlineUser = data._links.channel.substr(38)
    const url = `https://twitch.tv/${onlineUser}`

    const row = createElement('div', 'className', {}, 'online all')
    row.dataset.streamer = data.stream.channel.display_name.toLowerCase()
    const leftCol = createElement('div', 'className', {}, 'leftCol')
    const rightCol = createElement('div', 'className', {}, 'rightCol')
    const a = createElement('a', 'setAttribute', {'href': url, 'target': 'blank'}, '')
    const li = createElement('li', '', {}, '')
    const name = createElement('span', 'textContent', {}, data.stream.channel.display_name)
    const online = createElement('small', 'textContent', {}, 'Online')
    const img = createElement('img', 'setAttribute', {'src': data.stream.channel.logo}, '')

    li.appendChild(img)
    li.appendChild(name)
    a.appendChild(li)
    leftCol.appendChild(a)

    rightCol.appendChild(online)

    row.appendChild(leftCol)
    row.appendChild(rightCol)

    streamers.appendChild(row)
  }
}

// Send all streamers to the Twitch API in the exact order specified in the channels array
function getStreamers (i) {
  const url = 'https://api.twitch.tv/kraken/streams/' + channels[i] + '?client_id=t300383ams5iuxlej34gzwk11qjepn&stream_type=all&callback=?'
  const jsonData = $.getJSON(url)
  getStreamersPromise = getStreamersPromise.then(function () {
    return jsonData
  }).then(getStreamersCallback)
};

// Iterate over channels array and display their information on the screen
for (let i = 0; i < channels.length; i++) {
  getStreamers(i)
}

// Show all users before filtering
input.addEventListener('focus', () => {
  all.click()
})

// Filter users everytime the user presses a key
input.addEventListener('keyup', () => {
  let searchTerm = input.value.toLowerCase()
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].dataset.streamer.includes(searchTerm)) {
      allUsers[i].style.display = 'inline'
    } else {
      allUsers[i].style.display = 'none'
    }
  }
})

// Filter by online users
online.addEventListener('click', () => {
  for (let i = 0; i < offlineUsers.length; i++) {
    offlineUsers[i].style.display = 'none'
  }

  for (let i = 0; i < onlineUsers.length; i++) {
    onlineUsers[i].style.display = 'inline'
  }
})

// Filter by offline users
offline.addEventListener('click', () => {
  for (let i = 0; i < onlineUsers.length; i++) {
    onlineUsers[i].style.display = 'none'
  }

  for (let i = 0; i < offlineUsers.length; i++) {
    offlineUsers[i].style.display = 'inline'
  }
})

// Show all users
all.addEventListener('click', () => {
  for (let i = 0; i < allUsers.length; i++) {
    allUsers[i].style.display = 'inline'
  }
})

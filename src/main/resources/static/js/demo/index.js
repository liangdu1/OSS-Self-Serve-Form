'use strict';

const Video = Twilio.Video;

var activeRoom;
var previewTracks;
var identity;
var roomName;

//========== attach ==========
// private, Attach the Tracks to the DOM.
function attachTracks(tracks, container) {
  tracks.forEach(function(track) {
    container.appendChild(track.attach());
  });
}

// private, Attach the Participant's Tracks to the DOM.
function attachParticipantTracks(participant, container) {
  var tracks = getTracks(participant);
  attachTracks(tracks, container);
}

//========== detach ==========
// private, Detach the Tracks from the DOM.
function detachTracks(tracks) {
  tracks.forEach(function(track) {
    track.detach().forEach(function(detachedElement) {
      detachedElement.remove();
    });
  });
}

// Detach the Participant's Tracks from the DOM.
function detachParticipantTracks(participant) {
  var tracks = getTracks(participant);
  detachTracks(tracks);
}


// Get the Participant's Tracks.
function getTracks(participant) {
  return Array.from(participant.tracks.values()).filter(function(publication) {
    return publication.track;
  }).map(function(publication) {
    return publication.track;
  });
}


// Successfully connected!
function roomJoined(room) {
  window.room = activeRoom = room;

  log("Joined as '" + identity + "'");
  document.getElementById('button-join').style.display = 'none';
  document.getElementById('button-leave').style.display = 'inline';

  // Attach LocalParticipant's Tracks, if not already attached.
  var previewContainer = document.getElementById('local-media');
  if (!previewContainer.querySelector('video')) {
    attachParticipantTracks(room.localParticipant, previewContainer);
  }

  // Attach the Tracks of the Room's Participants.
  room.participants.forEach(function(participant) {
    log("Already in Room: '" + participant.identity + "'");
    var previewContainer = document.getElementById('remote-media');
    attachParticipantTracks(participant, previewContainer);
  });

  // When a Participant joins the Room, log the event.
  room.on('participantConnected', function(participant) {
    log("Joining: '" + participant.identity + "'");
  });

  // When a Participant's Track is subscribed to, attach it to the DOM.
  room.on('trackSubscribed', function(track, publication, participant) {
    log("Subscribed to " + participant.identity + "'s track: " + track.kind);
    var previewContainer = document.getElementById('remote-media');
    attachTracks([track], previewContainer);
  });

  // When a Participant's Track is unsubscribed from, detach it from the DOM.
  room.on('trackUnsubscribed', function(track, publication, participant) {
    log("Unsubscribed from " + participant.identity + "'s track: " + track.kind);
    detachTracks([track]);
  });

  // When a Participant leaves the Room, detach its Tracks.
  room.on('participantDisconnected', function(participant) {
    log("RemoteParticipant '" + participant.identity + "' left the room");
    detachParticipantTracks(participant);
  });

  // Once the LocalParticipant leaves the room, detach the Tracks
  // of all Participants, including that of the LocalParticipant.
  room.on('disconnected', function() {
    log('Left');
    if (previewTracks) {
      previewTracks.forEach(function(track) {
        track.stop();
      });
    }
    detachParticipantTracks(room.localParticipant);
    room.participants.forEach(detachParticipantTracks);
    activeRoom = null;
    document.getElementById('button-join').style.display = 'inline';
    document.getElementById('button-leave').style.display = 'none';
  });
}

//============ preview function==============
// Preview LocalParticipant's Tracks.
document.getElementById('button-preview').onclick = function() {
  var localTracksPromise = previewTracks
    ? Promise.resolve(previewTracks)
    : Video.createLocalTracks();

  localTracksPromise.then(function(tracks) {
    window.previewTracks = previewTracks = tracks;
    var previewContainer = document.getElementById('local-media');
    if (!previewContainer.querySelector('video')) {
      attachTracks(tracks, previewContainer);
    }
  }, function(error) {
    console.error('Unable to access local media', error);
    log('Unable to access Camera and Microphone');
  });
};

//=========== add log function ==============
// Activity log.
function log(message) {
  var logDiv = document.getElementById('log');
  logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
  logDiv.scrollTop = logDiv.scrollHeight;
}

//=============== before load ================
// When we are about to transition away from this page, disconnect from the room, if joined.
window.addEventListener('beforeunload', leaveRoomIfJoined);
// Leave Room.
function leaveRoomIfJoined() {
  if (activeRoom) {
    activeRoom.disconnect();
  }
}



// Obtain a token from the server in order to connect to the Room.
// $.getJSON('/token', function(data) {
  (function(){
  var data = {"identity":"duo.liang@onespan.com","token":"eyJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJTSzk1NjQ4NWQ4NDIwNDhhZTYyZTM4ZjkzY2QzNGNjZWI1IiwiZXhwIjoxNTM1NTY4ODMxLCJncmFudHMiOnsiaWRlbnRpdHkiOiJkdW8ubGlhbmdAb25lc3Bhbi5jb20iLCJ2aWRlbyI6eyJyb29tIjoiM24tWVB0WFFycnJnVFZzcWd1MG5ZSGdzRUNZPSJ9fSwianRpIjoiU0s5NTY0ODVkODQyMDQ4YWU2MmUzOGY5M2NkMzRjY2ViNS0xNTM1NTY1MTg0Iiwic3ViIjoiQUM0NjFkODA4OGJiZWE5NjAyZThkOGJmNzRlNGZiZTRkYiJ9.i-NYIQn3u_UAO-DTKvBZQEvFSsw1kIV_PzCzDImb6Ro"};
  identity = data.identity;
  document.getElementById('room-controls').style.display = 'block';

  // Bind button to join Room.
  document.getElementById('button-join').onclick = function() {
    roomName = document.getElementById('room-name').value;
    if (!roomName) {
      alert('Please enter a room name.');
      return;
    }

    log("Joining room '" + roomName + "'...");
    var connectOptions = {
      //name: roomName,
      logLevel: 'debug'
    };

    if (previewTracks) {
      connectOptions.tracks = previewTracks;
    }

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    Video.connect(data.token, connectOptions).then(roomJoined, function(error) {
      log('Could not connect to Twilio: ' + error.message);
    });
  };

  // Bind button to leave Room.
  document.getElementById('button-leave').onclick = function() {
    log('Leaving room...');
    activeRoom.disconnect();
  };
})();
// });
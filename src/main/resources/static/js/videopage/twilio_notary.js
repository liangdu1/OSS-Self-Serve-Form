'use strict';

const Video = Twilio.Video;

var activeRoom;
var previewTracks;
var identity;
var roomName;
var inRecord = false;

//========== attach ==========
// private, Attach the Tracks to the DOM.
function attachTracks(tracks, container) {
    tracks.forEach(function (track) {
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
    tracks.forEach(function (track) {
        track.detach().forEach(function (detachedElement) {
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
    return Array.from(participant.tracks.values()).filter(function (publication) {
        return publication.track;
    }).map(function (publication) {
        return publication.track;
    });
}


function enableStartRecord() {
    if(!hasComplete && !isRecord) {
        console.log("enable start record");
        if (room && room.participants.size > 0) {
            $("#startRecord").removeAttr('disabled');
        }
    }
}

// Successfully connected!
function roomJoined(room) {
    window.room = activeRoom = room;


    $("#local-media-status").text("Connected");


    log("Joined as '" + identity + "'");
    //document.getElementById('button-join').style.display = 'none';
    //document.getElementById('button-leave').style.display = 'inline';

    // Attach LocalParticipant's Tracks, if not already attached.
    var previewContainer = document.getElementById('local-media');
    if (!previewContainer.querySelector('video')) {
        attachParticipantTracks(room.localParticipant, previewContainer);
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach(function (participant) {
        log("Already in Room: '" + participant.identity + "'");
        var previewContainer = document.getElementById('remote-media');
        attachParticipantTracks(participant, previewContainer);

        $("#remote-media-status").text("Connected");

        enableStartRecord();

    });

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', function (participant) {
        log("Joining: '" + participant.identity + "'");

        $("#remote-media-status").text("Connected");

        enableStartRecord();
    });

    // When a Participant's Track is subscribed to, attach it to the DOM.
    room.on('trackSubscribed', function (track, publication, participant) {
        log("Subscribed to " + participant.identity + "'s track: " + track.kind);
        var previewContainer = document.getElementById('remote-media');
        attachTracks([track], previewContainer);
    });

    // When a Participant's Track is unsubscribed from, detach it from the DOM.
    room.on('trackUnsubscribed', function (track, publication, participant) {
        log("Unsubscribed from " + participant.identity + "'s track: " + track.kind);
        detachTracks([track]);
    });

    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', function (participant) {
        log("RemoteParticipant '" + participant.identity + "' left the room");
        detachParticipantTracks(participant);

        $("#remote-media-status").text("Disconnected");
    });

    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    room.on('disconnected', function () {
        log('Left');
        if (previewTracks) {
            previewTracks.forEach(function (track) {
                track.stop();
            });
        }
        detachParticipantTracks(room.localParticipant);
        room.participants.forEach(detachParticipantTracks);
        activeRoom = null;
        //document.getElementById('button-join').style.display = 'inline';
        //document.getElementById('button-leave').style.display = 'none';

        $("#local-media-status").text("Disconnected");

    });
}

//============ preview function==============
// Preview LocalParticipant's Tracks.
document.getElementById('button-preview').onclick = function () {
    var localTracksPromise = previewTracks
        ? Promise.resolve(previewTracks)
        : Video.createLocalTracks();

    localTracksPromise.then(function (tracks) {
        window.previewTracks = previewTracks = tracks;
        var previewContainer = document.getElementById('local-media');
        if (!previewContainer.querySelector('video')) {
            attachTracks(tracks, previewContainer);
        }
    }, function (error) {
        console.error('Unable to access local media', error);
        log('Unable to access Camera and Microphone');
    });
};

//=========== add log function ==============
// Activity log.
function log(message) {
    var logDiv = document.getElementById('log');
    logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
    // logDiv.scrollTop = logDiv.scrollHeight;
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

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



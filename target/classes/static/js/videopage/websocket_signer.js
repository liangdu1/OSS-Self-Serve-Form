var stompClient = null;
const STARTRECORD = "STARTRECORD";
const STOPRECORD = "STOPRECORD";
const SENDTRANSACTION = "SENDTRANSACTION";
const CALLBACKEVENT = "CALLBACKEVENT";
const SIGNER_COMPLETE = "SIGNER_COMPLETE";
const STOPROOM = "STOPROOM";

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/oss-enotarydemo-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/' + firstRoomName + '/signer', function (message) {
            showGreeting(message.body);
            responseHandler(JSON.parse(message.body));
            //console.log(message.body);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendSigner(data) {
    stompClient.send("/app/video/" + firstRoomName + "/signer", {}, JSON.stringify(data));
}

function sendNotary(data) {
    stompClient.send("/app/video/" + firstRoomName + "/notary", {}, JSON.stringify(data));
}

function sendBroadcast(data) {
    stompClient.send("/app/video/" + firstRoomName + "/broadcast", {}, JSON.stringify(data));
}


function responseHandler(data) {
    console.log(data.action);
    var action = data.action;
    if (action == STARTRECORD) {
        var jwt = data.data.signerJWT;
        roomName = data.data.roomName;
        roomId = data.data.roomId;
        //document.getElementById("roomNameP").innerHTML = "room: " + roomName;
        //document.getElementById("roomIdP").innerHTML = "room id: " + roomId;
        log("Joining room '" + roomName + "'...");
        var connectOptions = {
            //name: packageId,
            logLevel: 'debug'
        };

        if (previewTracks) {
            connectOptions.tracks = previewTracks;
        }

        Video.connect(jwt, connectOptions).then(roomJoined, function (error) {
            log('Could not connect to Twilio: ' + error.message);
        });

        ShowSuccessMessage_OSS('Start to record!');


    } else if (action == SENDTRANSACTION) {
        $("#signerIframe").attr("src", data.data);
        startSign();

        ShowSuccessMessage_OSS('Transaction received!');

    } else if (action == CALLBACKEVENT) {
        if (data.data.name == SIGNER_COMPLETE) {
            completeSign(() => {
                attachParticipantTracks(activeRoom.localParticipant, local_media_obj);
                room.participants.forEach(function (participant) {
                    attachParticipantTracks(participant, remote_media_obj);
                });

                ShowSuccessMessage_OSS('Transaction is completed!');
            });
        }
    } else if (action == STOPRECORD) {
        log("Record is complete!");
        setTimeout(() => {
            let jwt = data.data.signerJWT;
            let roomName = data.data.roomName;
            let roomId = data.data.roomId;
            log("Joining room '" + roomName + "'...");
            var connectOptions = {
                logLevel: 'debug'
            };

            if (previewTracks) {
                connectOptions.tracks = previewTracks;
            }

            Video.connect(jwt, connectOptions).then(roomJoined, function (error) {
                log('Could not connect to Twilio: ' + error.message);
            });


        }, 1000);

        ShowSuccessMessage_OSS('Record is completed!');

        completeSign();
    }else if (action == STOPROOM) {
        ShowSuccessMessage_OSS('Notary has left room!');
    }


}

function startSign() {
    //change whole layout
    layout1.style.display = "none";
    layout2.style.display = "block";
    local_div.appendTo(col_left);
    remote_div.appendTo(col_left);
    status_div.appendTo(col_left);



    $("#top-banner").css('position','fixed');
    $("#preview-button-div").css('display','none');

    // document.getElementById("preview-button-div").style.display = 'none';
    // document.getElementById("top-banner").style.position = "fixed";
    // document.getElementById("top-banner").style.width = "100%";
    // document.getElementsByTagName('body')[0].style['overflow-y'] = 'hidden';

    changeIframeSize();

    //scroll message box to bottom
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;


    //refresh video
    $("video").remove();
    $("audio").remove();
    attachParticipantTracks(activeRoom.localParticipant, local_media_obj);
    room.participants.forEach(function (participant) {
        attachParticipantTracks(participant, remote_media_obj);
    });


}


function completeSign(callback) {
    layout1.style.display = "block";
    layout2.style.display = "none";

    // document.getElementById("preview-button-div").style.display = 'block';
    local_div.prependTo(layout1_col_right);
    remote_div.appendTo(layout1_col_left);
    status_div.appendTo(layout1_col_left);
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

    $("video").remove();
    $("audio").remove();

    if (callback) {
        callback();
    }



    $("#top-banner").css('position','relative');
    // document.getElementById("top-banner").style.position = "relative";
    // document.getElementById("top-banner").style.width = "100%";
    // document.getElementsByTagName('body')[0].style['overflow-y'] = 'auto';
}


function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

//===== instant function ===
$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function () {
        connect();
    });
    $("#disconnect").click(function () {
        disconnect();
    });
    $("#send").click(function () {
        sendSender(
            {
                'role': $("#role").val(),
                'email': $("#email").val(),
                'action': $("#action").val()
            }
        );
    });
    $("#sendBroadcast").click(function () {
        sendBroadcast(
            {
                'role': $("#role").val(),
                'email': $("#email").val(),
                'action': $("#action").val()
            }
        );
    });


    connect();
});


// //==== test buttons====
// function startSignLocal() {
//     layout2.style.display = "block";
//     local_div.appendTo(col_left);
//     remote_div.appendTo(col_left);
//     status_div.appendTo(col_left);
//
//     messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
//     document.getElementById("top-banner").style.position = "fixed";
//     document.getElementById("top-banner").style.width = "100%";
//     document.getElementsByTagName('body')[0].style['overflow-y'] = 'hidden';
// }
//
// function completeSignLocal() {
//     layout1.style.display = "block";
//     layout2.style.display = "none";
//     local_div.prependTo(layout1_col_right);
//     remote_div.appendTo(layout1_col_left);
//     status_div.appendTo(layout1_col_left);
//
//     messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
//     document.getElementById("top-banner").style.position = "relative";
//     document.getElementById("top-banner").style.width = "100%";
//     document.getElementsByTagName('body')[0].style['overflow-y'] = 'auto';
// }


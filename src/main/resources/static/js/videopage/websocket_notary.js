var stompClient = null;
var roomCustom = null;
const STARTRECORD = "STARTRECORD";
const STOPRECORD = "STOPRECORD";
const SENDTRANSACTION = "SENDTRANSACTION";
const DOWNLOADRECORD = "DOWNLOADRECORD";
const CALLBACKEVENT = "CALLBACKEVENT";
const REQUESTDOWNLOAD = "REQUESTDOWNLOAD";
const TWILIOCALLBACK = "TWILIOCALLBACK";
const REFRESHRECORD = "REFRESHRECORD";
const STOPROOM = "STOPROOM";

var start_record_btn = $("#startRecord");
var stop_record_btn = $("#stopRecord");
var send_transaction_btn = $("#sendTransaction");
var stop_room_btn = $("#stopRoom");

// function setConnected(connected) {
//     $("#connect").prop("disabled", connected);
//     $("#disconnect").prop("disabled", !connected);
//     if (connected) {
//         $("#conversation").show();
//     }
//     else {
//         $("#conversation").hide();
//     }
//     $("#greetings").html("");
// }

function connect() {
    var socket = new SockJS('/oss-enotarydemo-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        // setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/' + firstRoomName + '/notary', function (message) {
            // showGreeting(message.body);
            responseHandler(JSON.parse(message.body));
            //console.log(message.body);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    // setConnected(false);
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


function startRecord() {
    isRecord = true;
    start_record_btn.attr("disabled", "disabled");
    stop_record_btn.attr("disabled", "disabled");
    send_transaction_btn.removeAttr("disabled");


    var data =
        {
            'role': role,
            'email': userEmail,
            'email2': anotherUserEmail,
            'action': STARTRECORD,
            'roomName': roomName,
            'packageId': packageId,
            'roomId': roomId
        };
    sendBroadcast(data);


}


function stopRecord() {

    start_record_btn.attr("disabled", "disabled");
    stop_record_btn.attr("disabled", "disabled");
    send_transaction_btn.attr("disabled", "disabled");
    stop_room_btn.css('display','block');


    var data =
        {
            'role': role,
            'email': userEmail,
            'email2': anotherUserEmail,
            'action': STOPRECORD,
            'roomName': recordRoomName,
            'packageId': packageId,
            'roomId': recordRoomId
        };
    sendBroadcast(data);

    $.ajax({
        url: "/api/oss/addAttribute",
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(data),
        processData: false,
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });



}


function stopRoom() {
    stop_room_btn.attr("disabled", "disabled");


    var data =
        {
            'role': role,
            'email': userEmail,
            'email2': anotherUserEmail,
            'action': STOPROOM,
            'roomName': firstRoomName,
            'packageId': packageId,
            'roomId': roomId
        };
    sendBroadcast(data);
    disconnect();

}

function requestDownload() {
    var data =
        {
            'role': role,
            'email': userEmail,
            'email2': anotherUserEmail,
            'action': REQUESTDOWNLOAD,
            'roomName': recordRoomName,
            'packageId': packageId,
            'roomId': recordRoomId
        };
    sendBroadcast(data);
}


function sendTransaction() {
    start_record_btn.attr("disabled", "disabled");
    stop_record_btn.removeAttr("disabled");
    send_transaction_btn.attr("disabled", "disabled");


    var data =
        {
            'role': role,
            'email': userEmail,
            'email2': anotherUserEmail,
            'action': SENDTRANSACTION,
            'roomName': firstRoomName,
            'packageId': packageId,
            'roomId': recordRoomId
        };

    // sendSigner(data);

    $.ajax({
        url: "/api/oss/sendTransaction",
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(data),
        processData: false,
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });



}

function downloadRecord() {
    var data =
        {
            'role': role,
            'email': userEmail,
            'email2': anotherUserEmail,
            'action': DOWNLOADRECORD,
            'roomName': roomName,
            'packageId': packageId,
            'roomId': roomId
        };

    sendNotary(data);
}


function responseHandler(data) {
    console.log(data.action);
    var action = data.action;


    if (action == STARTRECORD) {
        var jwt = data.data.senderJWT;
        roomName = data.data.roomName;
        roomId = data.data.roomId;
        recordRoomName = roomName;
        recordRoomId = roomId;
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

        ShowSuccessMessage_OSS("Start to record!");

    } else if (action == CALLBACKEVENT) {
        log(data.data.name);
        ossCallbackHandler(data.data);


    } else if (action == TWILIOCALLBACK) {
        log(data.data.sid + " is currently available!");
        twilioCallbackHandler(data.data);


    }


    // else if (action == DOWNLOADRECORD) {
    //     renderDownloadModal(data.data);
    //
    //
    // }
    else if (action == REQUESTDOWNLOAD) {
        roomCustom = data.data;

        document.getElementById("recordDiv").style.display = 'block';
        for (index = 0; index < roomCustom.participants.length; index++) {
            var participant = roomCustom.participants[index];
            dealWithParticipant(participant);
        }


    }
    else if (action == STOPRECORD) {
        let _jwt = data.data.senderJWT;
        // let _roomName = data.data.roomName;
        roomName = data.data.roomName;
        log("Joining room '" + roomName + "'...");
        var connectOptions = {
            logLevel: 'debug'
        };

        if (previewTracks) {
            connectOptions.tracks = previewTracks;
        }

        Video.connect(_jwt, connectOptions).then(roomJoined, function (error) {
            log('Could not connect to Twilio: ' + error.message);
        });

        ShowSuccessMessage_OSS("Complete record! Please want until records are available!");

        //when record is completed, make sure notary can control closing the first room
        $(window).bind("beforeunload", function () {
            stopRoom();
        })

        $("#video_btn_1,#video_btn_2,#video_btn_3,video_btn_4").each(function () {
            $(this).attr('class', 'col-md-3');
            $(this).css('font-size', '10px');
        });

        $("#video_btn_4").css("display", "block");


    } else if (action == REFRESHRECORD) {
        roomCustom = data.data;


        for (index = 0; index < roomCustom.participants.length; index++) {
            var participant = roomCustom.participants[index];
            dealWithParticipant(participant);

            if (participant.composition.mediaLocation) {
                twilioCallbackHandler(participant.composition);
            }
        }


    }else if (action == SENDTRANSACTION) {
        ShowSuccessMessage_OSS('Signer received transaction!');

    }

}


function dealWithParticipant(participant) {
    log(participant.composition.sid);

    var cid = participant.composition.sid;
    var email = participant.email;
    var currentUserName;
    if (email == userEmail) {
        currentUserName = notaryName;
    } else {
        currentUserName = signerName;
    }

    var recordName = currentUserName + "'s record";
    var childHtmlContent = '<div class="document-item" id="' + cid + '">\n' +
        '                        <ul class="details-list">\n' +
        '                            <li class="item-identity"><span class="ossicon-item-record"></span></li>\n' +
        '                            <li class="item-label" id="' + cid + '_name">' + recordName + '</li>\n' +
        '                        </ul>\n' +
        '                        <div class="list-item-toolbar" id="' + cid + '_status">\n' +
        '                            <span class="doc_status_complete" id="' + cid + '_icon">IN PROCESS</span>\n' +
        '                        </div>\n' +
        '                    </div>';


    document.getElementById("recordMessageBody").insertAdjacentHTML('beforeend', childHtmlContent);
}

// function renderDownloadModal(data) {
//     if (data) {
//         console.log(data);
//         var content = data.participants[0].composition.mediaLocation;
//         content += "</br>";
//         content += data.participants[1].composition.mediaLocation;
//
//         $("#download_list").html(content);
//
//
//     }
//
//
// }


function ossCallbackHandler(data) {
    if (data.name == "DOCUMENT_SIGNED") {
        log(data.documentId + "_status");
        $("#" + data.documentId + "_status").text("COMPLETE");
        $("#" + data.documentId + "_status").attr("class", "doc_status_complete");


    } else if (data.name == "SIGNER_COMPLETE") {
        $("#package_status").text("COMPLETE");
    }

}

function twilioCallbackHandler(data) {
    var cid = data.sid;
    document.getElementById(cid + "_icon").remove();
    document.getElementById(cid + "_status").insertAdjacentHTML('beforeend', '<span class="doc_status_complete">AVAILABLE</span>');

    var recordName = $("#" + cid + "_name").text();
    $("#" + cid + "_name").html('<a  href="' + data.mediaLocation + '"  target="_blank"  data="' + cid + '" >' + recordName + '</a>');
// download="' + firstRoomName + recordName + '.mp4"

}


function completeDocument(docId) {
    var docItem = $("#" + docId);
    docItem.attr("class", "ossicon-item-complete");
}

function inprogrssDocument(docId) {
    var docItem = $("#" + docId);
    docItem.attr("class", "ossicon-item-inprogress");
}


// function showGreeting(message) {
//     $("#greetings").append("<tr><td>" + message + "</td></tr>");
// }

function refreshRecord() {

    ShowSuccessMessage_OSS("Refreshing list!");

    var data =
        {
            'role': role,
            'email': userEmail,
            'email2': anotherUserEmail,
            'action': REFRESHRECORD,
            'roomName': recordRoomName,
            'packageId': packageId,
            'roomId': recordRoomId
        };

    sendNotary(data);
    document.getElementById("recordMessageBody").innerHTML = '';
}

$(function () {
    if (twilioRecord) {
        for (i = 0; i < twilioRecord.participants.length; i++) {
            let participant = twilioRecord.participants[i];
            dealWithParticipant(participant);

            if (participant.composition.mediaLocation) {
                twilioCallbackHandler(participant.composition);
            }
        }
    }


    $("#refresh-icon").on('click', function () {
        refreshRecord();

        var buttonId = this.id;

        // $("#refresh-icon").css("pointer-events", "none");
        $("#refresh-icon").css("display", "none");

        window.setTimeout(function () {
            $("#refresh-icon").css("display", "block");
        }, 5000 /* 5 sec */);

    });


    // $("form").on('submit', function (e) {
    //     e.preventDefault();
    // });
    // $("#connect").click(function () {
    //     connect();
    // });
    // $("#disconnect").click(function () {
    //     disconnect();
    // });
    // $("#send").click(function () {
    //     sendSigner(
    //         {
    //             'role': $("#role").val(),
    //             'email': $("#email").val(),
    //             'action': $("#action").val()
    //         }
    //     );
    // });
    // $("#sendBroadcast").click(function () {
    //     sendBroadcast(
    //         {
    //             'role': $("#role").val(),
    //             'email': $("#email").val(),
    //             'action': $("#action").val()
    //         }
    //     );
    // });

    $("#startRecord").click(function () {
        startRecord();
    });
    $("#stopRecord").click(function () {
        stopRecord();
        setTimeout(requestDownload, 3000);
    });
    $("#sendTransaction").click(function () {
        sendTransaction();
    });
    $("#downloadRecord").click(function () {
        downloadRecord();
    });
    $("#stopRoom").click(function () {
        stopRoom();
    });


    connect();
});


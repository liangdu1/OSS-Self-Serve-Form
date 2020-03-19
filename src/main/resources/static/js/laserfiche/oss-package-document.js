// var documentList_OSS = [];
// var documentIdToConfigure_OSS = "";

// $(document).ready(function () {
//     // START - this block is for google drive
//     //var myJsVariable = "[]";
//     //var decoded = $("<textarea/>").html(myJsVariable).text();
//     //var jObjectDoc = JSON.parse(decoded);
//
//     //for (var i = 0; i < jObjectDoc.length; i++) {
//     //    var documentItem = { id: jObjectDoc[i].id, name: jObjectDoc[i].name, documentSource: jObjectDoc[i].documentSource, documntExtraction: jObjectDoc[i].documntExtraction, textTag: jObjectDoc[i].textTag };
//     //    AddDocumentsToList_OSS(documentItem)
//     //}
//     //GenerateDocumentList_OSS();
//     // END - this block is for google drive
//
//     PackageDocumentReady_OSS();
//
// });
//
// function PackageDocumentReady_OSS() {
//
//     PopulateDocumentList_OSS();
//
//     $("#btnAddDocument_OSS").click(function () {
//         $("#divAddDocOption_OSS").show();
//     });
//
//     $("#divOpenGoogleDriveFilePicker_OSS").click(function () {
//         $("#divAddDocOption_OSS").hide();
//         onApiLoad_OSS();
//     });
//
//     $("#divOpenLocalFilePicker_OSS").click(function () {
//         $("#divAddDocOption_OSS").hide();
//         $("#fileUploadFile_OSS").trigger("click");
//     });
//
//     $("#chkDocumentExtraction_OSS").click(function () {
//         if ($(this).prop("checked") == true) {
//             //$("#chkTextTags_OSS").prop('checked', false);
//         }
//     });
//
//     $("#chkTextTags_OSS").click(function () {
//         if ($(this).prop("checked") == true) {
//             //$("#chkDocumentExtraction_OSS").prop('checked', false);
//         }
//     });
//
//     //$("#documentList_OSS").sortable({ handle: ".drag-handle" });
//     $("#divDocumentList_OSS").sortable();
//
//
//     $('#fileUploadFile_OSS').on('change', function (e) {
//
//         console.log("This one fired after upload items selected");
//
//         var files = e.target.files;
//         if (files.length > 0) {
//             if (window.FormData !== undefined) {
//                 var data = new FormData();
//                 for (var x = 0; x < files.length; x++) {
//                     data.append("file" + x, files[x]);
//                     var documentItem = { id: "file" + x, name: GetFileNameWithoutExtension_OSS(files[x].name), documentSource: LOCAL_FILE_OSS, documntExtraction: false, textTag: false };
//                     AddDocumentsToList_OSS(documentItem)
//                 }
//                 GenerateDocumentList_OSS();
//
//
//                 $.ajax({
//                     type: "POST",
//                     url: '/Package/UploadLocalFiles',
//                     contentType: false,
//                     processData: false,
//                     data: data,
//                     success: function (result) {
//                         // this needed to be done to trigger the "change" to event if same file/files are selected next time
//                         // user can select one/more files, then delete those then want to upload it back again.
//                         $('#fileUploadFile_OSS').val("");
//                         //console.log(result);
//                     },
//                     error: function (xhr, status, p3, p4) {
//                         var err = "Error " + " " + status + " " + p3 + " " + p4;
//                         if (xhr.responseText && xhr.responseText[0] == "{")
//                             err = JSON.parse(xhr.responseText).Message;
//                         console.log(err);
//                     }
//                 });
//             } else {
//                 alert("This browser doesn't support HTML5 file uploads!");
//             }
//         }
//     });
// }
//
// function PopulateDocumentList_OSS() {
//     for (var i = 0; i < tempDocumentList_OSS.length; i++) {
//         //var documentItem = { id: jObjectDoc[i].id, name: jObjectDoc[i].name, documentSource: jObjectDoc[i].documentSource, documntExtraction: jObjectDoc[i].documntExtraction, textTag: jObjectDoc[i].textTag };
//         var documentItem = { id: tempDocumentList_OSS[i].id, name: tempDocumentList_OSS[i].name, documentSource: "", documntExtraction: false, textTag: false };
//         AddDocumentsToList_OSS(documentItem)
//     }
//     GenerateDocumentList_OSS();
// }
//
// var LOCAL_FILE_OSS = "LOCAL_FILE";
// var localFileCount_OSS = 0;

// this block of code has been moved to view page acces the ViewBag, it can be improved
//var documentList = [];
//var documentIdToConfigure = "";

//$(document).ready(function () {
//    var myJsVariable = '@ViewBag.JsonString';
//    var decoded = $('<textarea/>').html(myJsVariable).text();
//    var jObjectDoc = JSON.parse(decoded);

//    for (var i = 0; i < jObjectDoc.length; i++) {
//        var documentItem = { id: jObjectDoc[i].id, name: jObjectDoc[i].name, type: jObjectDoc[i].type, documntExtraction: jObjectDoc[i].documntExtraction, textTag: jObjectDoc[i].textTag };
//        AddDocumentsToList(documentItem)
//    }
//    GenerateDocumentList();
//});


// $(document).mouseup(function (e) {
//     var container = $("#divAddDocOption_OSS");
//
//     // if the target of the click isn't the container nor a descendant of the container
//     if (!container.is(e.target) && container.has(e.target).length === 0) {
//         container.hide();
//     }
// });

// function AddDocumentsToList_OSS(documentItem) {
//     documentList_OSS.push(documentItem);
// }
//
// function RemoveDocumentFromList_OSS(documentIdToRemove) {
//     for (i = 0; i < documentList_OSS.length; i++) {
//         if (documentList_OSS[i].id == documentIdToRemove) {
//             documentList_OSS.splice(i, 1);
//             break;
//         }
//     }
// }

function GenerateDocumentList_OSS() {
    var htmlDocumentList = '';

    for (i = 0; i < documentList_OSS.length; i++) {

        htmlDocumentList += '<div class="doc-item-wrapper-oss">';
        htmlDocumentList += '    <div class="doc-item-file-blank-oss"><span class="ossicon-file-blank-oss"></div>';
        htmlDocumentList += '    <div class="doc-item-file-name-oss">' + documentList_OSS[i].name + '</div>';
        htmlDocumentList += '    <div class="doc-item-action-fields-oss">';
        htmlDocumentList += '        <div documentId="' + documentList_OSS[i].id + '" class="ossicon-settings-oss"></div>';
        htmlDocumentList += '        <div documentId="' + documentList_OSS[i].id + '" class="ossicon-close-oss"></div>';
        htmlDocumentList += '        <div class="ossicon-show-more-oss"></div>';
        htmlDocumentList += '        <div style="clear: both;"></div>';
        htmlDocumentList += '    </div>';
        htmlDocumentList += '    <div style="clear: both;"></div>';
        htmlDocumentList += '</div>';
    }

    $("#divDocumentList_OSS").html(htmlDocumentList);
    // GenerateDocumentJSON_OSS();

    $(".doc-item-wrapper-oss").hover(function () {
        $(this).find("div.ossicon-settings-oss").css("display", "inline-block");
        $(this).find("div.ossicon-close-oss").css("display", "inline-block");
        $(this).find("div.ossicon-show-more-oss").css("display", "none");
    }, function () {
        $(this).find("div.ossicon-settings-oss").css("display", "none");
        $(this).find("div.ossicon-close-oss").css("display", "none");
        $(this).find("div.ossicon-show-more-oss").css("display", "inline-block");
    });

    // $(".doc-item-wrapper-oss").find("div.ossicon-settings-oss").click(function () {
    //     documentIdToConfigure_OSS = "";
    //     documentIdToConfigure_OSS = $(this).attr("documentId");
    //
    //     for (i = 0; i < documentList_OSS.length; i++) {
    //         if (documentList_OSS[i].id == documentIdToConfigure_OSS) {
    //             $("#chkDocumentExtraction_OSS").prop('checked', documentList_OSS[i].documntExtraction);
    //             $("#chkTextTags_OSS").prop('checked', documentList_OSS[i].textTag);
    //             break;
    //         }
    //     }
    //
    //     $('#divMyModal_OSS').modal('show');
    // });
    //
    // $(".doc-item-wrapper-oss").find("div.ossicon-close-oss").click(function () {
    //     var documentIdToRemove = $(this).attr("documentId");
    //     RemoveDocumentFromList_OSS(documentIdToRemove);
    //     GenerateDocumentList_OSS();
    // });
}

// function SaveDocumentConfiguration_OSS() {
//     for (i = 0; i < documentList_OSS.length; i++) {
//         if (documentList_OSS[i].id == documentIdToConfigure_OSS) {
//             documentList_OSS[i].documntExtraction = $("#chkDocumentExtraction_OSS").prop("checked");
//             documentList_OSS[i].textTag = $("#chkTextTags_OSS").prop("checked");
//             GenerateDocumentJSON_OSS();
//             break;
//         }
//     }
//
//     //display message
//     ShowSuccessMessage_OSS("The Document Configuration has been successfully saved.");
//     $("#divMyModal_OSS .close").click();
// }
//
// function CancelDocumentConfiguration_OSS() {
//     $("#divMyModal_OSS .close").click();
// }
//
// function GenerateDocumentJSON_OSS() {
//     var jsonDocumentList = '[';
//     for (i = 0; i < documentList_OSS.length; i++) {
//         if (i > 0) {
//             jsonDocumentList += ',';
//         }
//         jsonDocumentList += '{"id" : "' + documentList_OSS[i].id + '", "name" : "' + documentList_OSS[i].name + '", "documentSource" : "' + documentList_OSS[i].documentSource + '", "documntExtraction":' + documentList_OSS[i].documntExtraction + ', "textTag":' + documentList_OSS[i].textTag + ' }';
//     }
//     jsonDocumentList += ']';
//     $("#hydDocumentsList_OSS").val(jsonDocumentList.toString());
// }
//
//
// function GenerateLocalFileId_OSS() {
//     var id = "file" + localFileCount++;
// }
//
// function GetFileNameWithoutExtension_OSS(fileName) {
//     var substrings = fileName.split('.');
//     if (substrings.length == 1) {
//         return fileName;
//     } else {
//         var ext = substrings.pop();
//         var name = substrings.join(".");
//         return name;
//     }
// }

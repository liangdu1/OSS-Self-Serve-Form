// Debug - Start
// var responseObj = JSON.parse('{ "response": { "responseFromAction": "OneSpan", "packages": [ { "id": "Oy1kBjr0AIDWm6dgkoHrhJrCm_Y=", "name": "Test - Create Consent Document REST - 5/30/2018 1:35:09 PM", "status": "COMPLETED", "updated": "2018-07-03T20:28:46Z", "due": "2018-07-28T04:00:00Z", "recipients": [ { "id": "1GnkPewZ60oU", "name": "", "firstName": "Moshiur", "lastName": "Reza" }, { "id": "587e98b6-56ab-4e9c-93f2-781ade93b262", "name": "", "firstName": "4", "lastName": "4" } ] }, { "id": "E6iv5Wgdszy1qt6VD1-iaFggwDw=", "name": "Test - Sign On Mobile - 4/26/2018 4:22:10 PM", "status": "SENT", "updated": "2018-07-03T20:28:46Z", "due": null, "recipients": [ { "id": "1GnkPewZ60oU", "name": "", "firstName": "Moshiur", "lastName": "Reza" }, { "id": "587e98b6-56ab-4e9c-93f2-781ade93b262", "name": "", "firstName": "4", "lastName": "4" } ] }, { "id": "wIuXv-uC7h2EhbDgp2B5M0oV4yI=", "name": "Test Package API", "status": "DRAFT", "updated": "2018-07-03T20:28:46Z", "due": null, "recipients": [ { "id": "1GnkPewZ60oU", "name": "", "firstName": "Moshiur", "lastName": "Reza" }, { "id": "587e98b6-56ab-4e9c-93f2-781ade93b262", "name": "", "firstName": "4", "lastName": "4" } ] } ], "configuration": { }, "createPackageResources": { "templates": [ { "id": "ACirITONGu1OMBUUCR_T2rNOgn0=", "name": "Test - Templates from Package RTEST - 9/7/2017 1:50:43 PM" }, { "id": "Ks1Usbsi4yFp4G_K6yDk8VAbYE8=", "name": "Test - Templates REST - 9/7/2017 12:12:30 PM" }, { "id": "aaaa3", "name": "Template FT" } ], "languages": [ { "code": "en", "name": "English" }, { "code": "fr", "name": "French" } ], "documents": [], "signers": [] } } }');;
// var tempDocumentList_OSS = [];
// var transactionList_Count_OSS = 55;
// var transactionList_CurrentPage_OSS = 1;
// var transactionList_PageSize_OSS = 10;
// var transactionList_OSS = JSON.parse('[{"id":"ylK6Eygr4Aba5F4rwkbgHdQSekc=","name":"test ","status":"DRAFT","updated":"Sep 4th, 2018","due":"","recipients":[{"id":"","name":"sing on","firstName":"sing","lastName":"on"}]},{"id":"YJXfZAb2781WX9Mo7NJHqU5kbK8=","name":"erf","status":"DRAFT","updated":"Aug 30th, 2018","due":"","recipients":[{"id":"","name":"asd asd","firstName":"asd","lastName":"asd"}]},{"id":"sB0M2VsHRu4MLL0GFfWPs2yleRc=","name":"internel demo","status":"COMPLETED","updated":"Aug 30th, 2018","due":"","recipients":[{"id":"","name":"John Smith","firstName":"John","lastName":"Smith"},{"id":"","name":" John2 Smith2","firstName":"","lastName":"John2"}]},{"id":"XeJwnar3QlzkLG3LXXDvAGv31Co=","name":"asdf","status":"DRAFT","updated":"Aug 30th, 2018","due":"","recipients":[{"id":"","name":"asdf asdfa","firstName":"asdf","lastName":"asdfa"}]},{"id":"oKv3epbriMe6VP2iK-IyU5HqXZ4=","name":"SDf","status":"SENT","updated":"Aug 29th, 2018","due":"","recipients":[{"id":"","name":"asdf asdf","firstName":"asdf","lastName":"asdf"}]},{"id":"P96af6dwp26E9B4b9Ud0VGL6mnw=","name":"test package on 4 pm","status":"COMPLETED","updated":"Aug 28th, 2018","due":"","recipients":[{"id":"","name":"test user","firstName":"test","lastName":"user"}]},{"id":"Mk07vG86NUJ6lpmJ1WGbJj78PW0=","name":"est","status":"SENT","updated":"Aug 28th, 2018","due":"","recipients":[{"id":"","name":"ads asdf","firstName":"ads","lastName":"asdf"}]},{"id":"GNtclIcyJ3Z5hyUReMLbrNZy18Y=","name":"est","status":"COMPLETED","updated":"Aug 28th, 2018","due":"","recipients":[{"id":"","name":"ads asdf","firstName":"ads","lastName":"asdf"}]},{"id":"t_IxNjiUZfcokAHpwLD9lOFpW1s=","name":"what about now","status":"SENT","updated":"","due":"","recipients":[{"id":"","name":"a a","firstName":"a","lastName":"a"}]},{"id":"BNJaES3TnAvMLJfNL512UX0Qc2o=","name":"this time ?","status":"COMPLETED","updated":"Aug 28th, 2018","due":"","recipients":[{"id":"","name":"dsa asd","firstName":"dsa","lastName":"asd"}]}]');
// Debug - End

$(document).ready(function () {
    PackageReady_OSS();
});
function PackageReady_OSS() {

    $("#btnSettings_OSS").click(function () {
        $("#divTransactionSettings_OSS").toggle();
    });
    
    $("#txtExpiryDate_OSS").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: "mm/dd/yy",
        minDate: 1,
        showAnim: ""
    }).attr('readonly', 'readonly');

    $("#btnCloseDesignerModal").click(function () {
        // need to cleare the entry form and make the create package read for a new package create

        var onSucceed_PageTransactionList_OSS = function (msg) {

            var response = JSON.parse(msg["response"].toString());

            transactionList_Count_OSS = response.packagesCount;
            transactionList_PageSize_OSS = response.packagesPageSize;
            transactionList_CurrentPage_OSS = response.packagesPageNumber;
            transactionList_OSS = response.packages;

            GenerateTransactionListUI_OSS();
        };

        var onFail_PageTransactionList_OSS = function (msg) {
            alert("Something went wrong");
        };


        webAccessApi.performCustomAction('OneSpan', {
            'requestFrom': 'PageTransactionList',
            'pageTo': '' + 1 + '',
            'pageSize': '' + transactionList_PageSize_OSS + ''
        }, onSucceed_PageTransactionList_OSS, onFail_PageTransactionList_OSS);

        
        ActivaTab_OSS("divSSTTransactions_OSS");
    });

    $("#btnCloseOneSpanPopup").click(function () {
        // removing all the styles added for the for the popup ui
        $('link[href="Content/bootstrap.css"]').remove();
        $('link[href="Content/oss-layout.css"]').remove();
        $('link[href="Content/oss-package.css"]').remove();
        $('link[href="Content/oss-rounded-slider.css"]').remove();
        $('link[href="Content/oss-package-list.css"]').remove();
        // removing all the contents for the popup ui
        $("#myModal").remove();        
    });

    $('input[type=radio][name=rdDownloadLocationPreferenceCreateTran_OSS]').change(function () {
        
        if (this.value == 'sameLocation') {
            $("#divFileExtensionCreateTran_OSS").css("display", "block");
            $("#divDestinationPathCreateTran_OSS").css("display", "none");
        }
        else if (this.value == 'otherLocation') {
            $("#divFileExtensionCreateTran_OSS").css("display", "none");
            $("#divDestinationPathCreateTran_OSS").css("display", "block");
        }
    });


    //$("#txtEmailReminders_OSS").click(function () {        
        
    //});

    $("#divTransactionSettings_OSS").find("span.ossicon-edit-oss").click(function () {
        $('#divEmailReminderModal_OSS').modal('show');
        $('#divEmailReminderModal_OSS').css("z-index", "1500");
    });



    InitializeCreatePackageUI_OSS();
}

// START - input validation

function InitializeCreatePackageUI_OSS() {
    var templateList_OSS = responseObj.response.createPackageResources.templates;

    $('#cbTemplate_OSS').append($('<option>', {
        value: "",
        text: "Select"
    }));

    for (i = 0; i < templateList_OSS.length; i++) {
        $('#cbTemplate_OSS').append($('<option>', {
            value: templateList_OSS[i].id,
            text: templateList_OSS[i].name
        }));
    }

    var languageList_OSS = responseObj.response.createPackageResources.languages;
    for (i = 0; i < languageList_OSS.length; i++) {
        $('#cbLanguage_OSS').append($('<option>', {
            value: languageList_OSS[i].code,
            text: languageList_OSS[i].name
        }));
    }
}

function ProcessTransactionCreateRequest_OSS() {

    var valid = ValidateForm_OSS();

    if (valid == true) {

        StoreTransactionInfo_OSS();

        var onSucceed_CreateTransaction_OSS = function (msg) {
            // here i should get the designer url and the new list of transactinos and reload it

            //alert(msg["response"].toString());
            var response = JSON.parse(msg["response"].toString());           
            //alert(response.url);
            //alert(response.packages);

            var designerURL = response.url            
            $('#iframeDesigner').attr('src', designerURL);
            $('#divDesigner_OSS').modal('show');

            transactionList_OSS = response.packages;
            GenerateTransactionListUI_OSS();
        };

        var onFail_CreateTransaction_OSS = function (msg) {
            alert("Something went wrong");
        };

        //webAccessApi.performCustomAction('OneSpan', {
        //    "requestFrom": "CreateTransaction",
        //    "TransactionInfo": [{ "id": "55555" }, { "id": "333" }, { "id": "4444" }]
        //    }, onSucceed_CreateTransaction_OSS, onFail_CreateTransaction_OSS);

        webAccessApi.performCustomAction('OneSpan', {
            'requestFrom': 'CreateTransaction',
            'transactionInfo': '' + $("#hydTransactionInfo_OSS").val() + '',
            'emailReminderInfo': '' + $("#hydTransactionInfo_OSS").val() + '',
            'documentsList': '' + $("#hydDocumentsList_OSS").val() + '',
            'signerSortOrder': '' + $("#hydSignerSortOrder_OSS").val() + '',
            'signersList': '' + $("#hydSignersList_OSS").val() + ''
        }, onSucceed_CreateTransaction_OSS, onFail_CreateTransaction_OSS);

        //alert($("#hydTransactionInfo_OSS").val());
        //alert($("#hydDocumentsList_OSS").val());
        //alert($("#hydSignerSortOrder_OSS").val());
        //alert($("#hydSignersList_OSS").val());
    }

    return valid;
}

function ValidateForm_OSS() {

    var valid = true;

    var transactionName = document.getElementById("txtTransactionName_OSS");
    if (transactionName.value.length < 1) {
        lblTransactionNameMessage_OSS.style.display = "block";
        lblTransactionNameMessage_OSS.innerText = "This field is required.";

        if (documentList_OSS.length < 1 && signerList_OSS.length < 1) {
            ShowErrorMessage_OSS("Transaction name, a document and a recipient must be added first.");            
        } else if (documentList_OSS.length < 1) {
            ShowErrorMessage_OSS("Transaction name, a document must be added first.");
        } else if (signerList_OSS.length < 1) {
            ShowErrorMessage_OSS("Transaction name, a recipient must be added first.");
        }
        valid = false;
    }
    else {
        if (documentList_OSS.length < 1 && signerList_OSS.length < 1) {
            ShowErrorMessage_OSS("A document and a recipient must be added first.");
            valid = false;
        } else if (documentList_OSS.length < 1) {
            ShowErrorMessage_OSS("A document must be added first.");
            valid = false;
        } else if (signerList_OSS.length < 1) {
            ShowErrorMessage_OSS("A recipient must be added first.");
            valid = false;
        }
    }

    for (i = 0; i < signerList_OSS.length; i++) {
        // Signer Info
        if (signerList_OSS[i].FirstName.length < 1) {
            $("#" + GenSignerFirstNameCntId_OSS(signerList_OSS[i].SignerNumber)).css("border", "1px solid #c71c22");
            $("#" + GenSignerFirstNameErrMsgCntId_OSS(signerList_OSS[i].SignerNumber)).css("display", "block");
            $("#" + GenSignerFirstNameErrMsgCntId_OSS(signerList_OSS[i].SignerNumber)).text("This field is required.");
            valid = false;
        } else {
        }

        if (signerList_OSS[i].LastName.length < 1) {
            $("#" + GenSignerLastNameCntId_OSS(signerList_OSS[i].SignerNumber)).css("border", "1px solid #c71c22");
            $("#" + GenSignerLastNameErrMsgCntId_OSS(signerList_OSS[i].SignerNumber)).css("display", "block");
            $("#" + GenSignerLastNameErrMsgCntId_OSS(signerList_OSS[i].SignerNumber)).text("This field is required.");
            valid = false;
        } else {
        }

        if (signerList_OSS[i].Email.length < 1) {
            $("#" + GenSignerEmailCntId_OSS(signerList_OSS[i].SignerNumber)).css("border", "1px solid #c71c22");
            $("#" + GenSignerEmailErrMsgCntId_OSS(signerList_OSS[i].SignerNumber)).css("display", "block");
            $("#" + GenSignerEmailErrMsgCntId_OSS(signerList_OSS[i].SignerNumber)).text("This field is required.");
            valid = false;
        } else {
        }
    }

    return valid;
}

function StoreTransactionInfo_OSS() {


    // Transaction Info
    var cntTransactionName = document.getElementById("txtTransactionName_OSS");
    var cntTransactionDescription = document.getElementById("txtTransactionDescription_OSS");
    var cntTemplate = document.getElementById("cbTemplate_OSS");

    var cntExpiryDate = document.getElementById("txtExpiryDate_OSS");
    var cntLanguage = document.getElementById("cbLanguage_OSS");
    var cntEnableInPersonSigning = document.getElementById("chkEnableInPersonSigning_OSS");
    var cntReviewBeforeCompletion = document.getElementById("chkReviewBeforeCompletion_OSS");
    var cntEnableNotarization = document.getElementById("chkEnableNotarization_OSS");
    var cntMessageToAll = document.getElementById("txtMessageToAll_OSS");


    var transactionName = cntTransactionName.value;
    var transactionDescription = cntTransactionDescription.value;
    var template = cntTemplate.value;

    var expiryDate = cntExpiryDate.value;
    var language = cntLanguage.value;
    var enableInPersonSigning = cntEnableInPersonSigning.checked;
    var reviewBeforeCompletion = cntReviewBeforeCompletion.checked;
    var enableNotarization = cntEnableNotarization.checked;
    var messageToAll = cntMessageToAll.value;


    // Email Reminder Info
    var cntEnableReminders = document.getElementById("chkEnableReminders_OSS");
    var cntRepeatReminder = document.getElementById("chkRepeatReminder_OSS");
    var cntSendReminderInDays = document.getElementById("txtSendReminderInDays_OSS");
    var cntNumberOfDays = document.getElementById("txtNumberOfDays_OSS");
    var cntTotalReminders = document.getElementById("txtTotalReminders_OSS");

    var enableReminders = cntEnableReminders.checked;
    var repeatReminder = cntRepeatReminder.checked;
    var sendReminderInDays = cntSendReminderInDays.value;
    var numberOfDays = cntNumberOfDays.value;
    var totalReminders = cntTotalReminders.value;


    // Download Configuration
    var cntDownloadEvidenceSummaryCreateTran = document.getElementById("chkDownloadEvidenceSummaryCreateTran_OSS");
    var cntDownloadSignedDocumentsCreateTran = document.getElementById("chkDownloadSignedDocumentsCreateTran_OSS");
    //var cntDownloadLocationPreferenceCreateTranList = document.getElementsByName("rdDownloadLocationPreferenceCreateTran_OSS");
    var cntFileExtensionCreateTran = document.getElementById("cmbFileExtensionCreateTran_OSS");
    var cntDestinationPathCreateTran = document.getElementById("txtDestinationPathCreateTran_OSS");
    
    //console.log(cntDownloadLocationPreferenceCreateTranList);

    var downloadEvidenceSummaryCreateTran = cntDownloadEvidenceSummaryCreateTran.checked;
    var downloadSignedDocumentsCreateTran = cntDownloadSignedDocumentsCreateTran.checked;
    var downloadLocationPreferenceCreateTran = $("input[name='rdDownloadLocationPreferenceCreateTran_OSS']:checked").val();;
    var fileExtensionCreateTran = cntFileExtensionCreateTran.value;
    var destinationPathCreateTran = cntDestinationPathCreateTran.value;



    var jsonTransactionInfo = '{';

    jsonTransactionInfo += '"transactionName" : "' + transactionName + '",';
    jsonTransactionInfo += '"transactionDescription" : "' + transactionDescription + '",';
    jsonTransactionInfo += '"template" : "' + template + '",';
    jsonTransactionInfo += '"expiryDate" : "' + expiryDate + '",';
    jsonTransactionInfo += '"language" : "' + language + '",';
    jsonTransactionInfo += '"enableInPersonSigning" : "' + enableInPersonSigning + '",';
    jsonTransactionInfo += '"reviewBeforeCompletion" : "' + reviewBeforeCompletion + '",';
    jsonTransactionInfo += '"enableNotarization" : "' + enableNotarization + '",';
    jsonTransactionInfo += '"messageToAll" : "' + messageToAll + '",';

    jsonTransactionInfo += '"enableReminders" : "' + enableReminders + '",';
    jsonTransactionInfo += '"repeatReminder" : "' + repeatReminder + '",';
    jsonTransactionInfo += '"startInDaysDelay" : "' + sendReminderInDays + '",';
    jsonTransactionInfo += '"intervalInDays" : "' + numberOfDays + '",';
    jsonTransactionInfo += '"repetitionsCount" : "' + totalReminders + '",';

    jsonTransactionInfo += '"confDownloadEvidenceSummary" : "' + downloadEvidenceSummaryCreateTran + '",';
    jsonTransactionInfo += '"confDownloadSignedDocuments" : "' + downloadSignedDocumentsCreateTran + '",';
    jsonTransactionInfo += '"confDownloadLocationPreference" : "' + downloadLocationPreferenceCreateTran + '",';
    jsonTransactionInfo += '"confFileExtension" : "' + fileExtensionCreateTran + '",';
    jsonTransactionInfo += '"confDestinationPath" : "' + destinationPathCreateTran + '"';

    jsonTransactionInfo += '}';

    console.log(jsonTransactionInfo.toString());
    
    $("#hydTransactionInfo_OSS").val(jsonTransactionInfo.toString());
}


function TransactionName_onblur_OSS() {
    var transactionName = document.getElementById("txtTransactionName_OSS");
    if (transactionName.value.length > 0) {
        lblTransactionNameMessage_OSS.style.display = "none";
        lblTransactionNameMessage_OSS.innerText = "";
    }
    else {
        lblTransactionNameMessage_OSS.style.display = "block";
        lblTransactionNameMessage_OSS.innerText = "This field is required.";
    }
}

function ActivaTab_OSS(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

function SaveEmailReminderConfiguration_OSS() {

    var cntEnableReminders = document.getElementById("chkEnableReminders_OSS");
    var cntRepeatReminder = document.getElementById("chkRepeatReminder_OSS");
    var cntSendReminderInDays = document.getElementById("txtSendReminderInDays_OSS");
    var cntNumberOfDays = document.getElementById("txtNumberOfDays_OSS");
    var cntTotalReminders = document.getElementById("txtTotalReminders_OSS");

    var enableReminders = cntEnableReminders.checked;
    var repeatReminder = cntRepeatReminder.checked;
    var sendReminderInDays = cntSendReminderInDays.value;
    var numberOfDays = cntNumberOfDays.value;
    var totalReminders = cntTotalReminders.value;

    if (enableReminders === true) {
        if(sendReminderInDays === "")
        {
            sendReminderInDays = "1";
            cntSendReminderInDays.value = "1";
        }

        if (numberOfDays === "") {
            numberOfDays = "1";
            cntNumberOfDays.value = "1";
        }

        if (totalReminders === "") {
            totalReminders = "1";
            cntTotalReminders.value = "1";
        }
        var cntEmailReminders = document.getElementById("txtEmailReminders_OSS");
        cntEmailReminders.value = "Send first in " + sendReminderInDays + " day(s), repeat every " + numberOfDays + " day(s), total " + totalReminders;
    }

    $("#divEmailReminderModal_OSS .close").click();
} 

function ClearEmailReminderConfiguration_OSS() {

    var cntEmailReminders = document.getElementById("txtEmailReminders_OSS");

    var cntEnableReminders = document.getElementById("chkEnableReminders_OSS");
    var cntRepeatReminder = document.getElementById("chkRepeatReminder_OSS");
    var cntSendReminderInDays = document.getElementById("txtSendReminderInDays_OSS");
    var cntNumberOfDays = document.getElementById("txtNumberOfDays_OSS");
    var cntTotalReminders = document.getElementById("txtTotalReminders_OSS");

    cntEmailReminders.value = "";

    cntEnableReminders.checked = false;
    cntRepeatReminder.checked = false;
    cntSendReminderInDays.value = "";
    cntNumberOfDays.value = "";
    cntTotalReminders.value = "";    
}

// END - input validation 


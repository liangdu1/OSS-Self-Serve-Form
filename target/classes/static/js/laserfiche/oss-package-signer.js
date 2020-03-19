var signerList_OSS = [];
var newSignerNumber_OSS = 0;
var modalSignerNumber_OSS = 0;
var newAttachmentRequirementNumber_OSS = 0; // this is for all signers

function AddNewSignerToList_OSS() {

    var objSigner = {
        SignerNumber: newSignerNumber_OSS,
        SignerOrder: signerList_OSS.length,
        FirstName: '',
        LastName: '',
        Email: '',
        SignerId: '',
        Title: '',
        Company: '',
        AuthenticationType: 'NONE',
        CountryCode: '',
        MobilePhoneNumber: '',
        Question1: '',
        Answer1: '',
        Answer1Mask: false,
        Question2: '',
        Answer2: '',
        Answer2Mask: false,
        Attachments: [],
        PersonalMessageToRecipient: '',
        ChangeSigner: false,
        EmailDelivery: false
    };

    signerList_OSS.push(objSigner);
}

function RemoveSignerObject_OSS(removeSignerNumber) {

    for (i = 0; i < signerList_OSS.length; i++) {
        if (signerList_OSS[i].SignerNumber == removeSignerNumber) {
            signerList_OSS.splice(i, 1);
            break;
        }
    }
}

function AddAttachmentRequirementToList_OSS() {

    for (i = 0; i < signerList_OSS.length; i++) {
        if (signerList_OSS[i].SignerNumber == modalSignerNumber_OSS) {

            var attachment = {
                AttachmentRequirementNumber: newAttachmentRequirementNumber_OSS,
                Name: '',
                Description: '',
                Required: false
            };
            signerList_OSS[i].Attachments.push(attachment);
            break;
        }
    }
}

function AddAttachmentRequirement_OSS() {
    AddAttachmentRequirementToList_OSS();
    AddNewAttachmentRequirementUI_OSS();
    newAttachmentRequirementNumber_OSS++;
}

function AddNewAttachmentRequirementUI_OSS() {
    var newAttachmentRequirement = '';

    newAttachmentRequirement += '<div id="divAttachmentRequirement' + newAttachmentRequirementNumber_OSS + '_OSS" class="row attachment-requirement-row-oss" style="padding-top: 10px; padding-bottom: 10px;">';
    newAttachmentRequirement += '    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding-left: 0px;">';
    newAttachmentRequirement += '        <input id="txtMSSNameAR' + newAttachmentRequirementNumber_OSS + '_OSS" name="txtMSSNameAR' + newAttachmentRequirementNumber_OSS + '_OSS" placeholder="Name *" type="text" value="" class="textbox-attachment-requirement-oss">';
    newAttachmentRequirement += '    </div>';
    newAttachmentRequirement += '    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">';
    newAttachmentRequirement += '        <input  id="txtMSSDescriptionAR' + newAttachmentRequirementNumber_OSS + '_OSS" name="txtMSSDescriptionAR' + newAttachmentRequirementNumber_OSS + '_OSS" placeholder="Description" type="text" value="" class="textbox-attachment-requirement-oss">';
    newAttachmentRequirement += '    </div>';
    newAttachmentRequirement += '    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">';
    newAttachmentRequirement += '       <div style="float: left; padding-top: 3px;">';
    newAttachmentRequirement += '           <span>Required</span>';
    newAttachmentRequirement += '       </div>';
    newAttachmentRequirement += '       <div style="float: left; padding-top: 3px; padding-left: 15px;">';
    newAttachmentRequirement += '           <label class="switch-oss">';
    newAttachmentRequirement += '               <input type="checkbox" id="chkMSSRequiredAR' + newAttachmentRequirementNumber_OSS + '_OSS" name="chkMSSRequiredAR' + newAttachmentRequirementNumber_OSS + '_OSS" >';
    newAttachmentRequirement += '               <span class="slider-oss round-oss"></span>';
    newAttachmentRequirement += '           </label>';
    newAttachmentRequirement += '       </div>';
    newAttachmentRequirement += '       <div style="clear: both;"></div>';
    newAttachmentRequirement += '    </div>';
    newAttachmentRequirement += '    <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 attachment-requirement-row-item-oss">';
    newAttachmentRequirement += '          <div style="float: right;">';
    newAttachmentRequirement += '              <div attachmentRequirementNumber="' + newAttachmentRequirementNumber_OSS + '" class="ossicon-close-oss"></div>';
    newAttachmentRequirement += '              <div class="ossicon-show-more-oss"></div>';
    newAttachmentRequirement += '              <div style="clear: both;"></div>';
    newAttachmentRequirement += '          </div>';
    newAttachmentRequirement += '          <div style="clear: both;"></div>';
    newAttachmentRequirement += '    </div>';
    newAttachmentRequirement += '</div>';

    $("#divAttachmentList_OSS").append(newAttachmentRequirement);

    RegisterAttachmentRequirementEvents_OSS();
}

function GenerateAttachmentRequirementUI_OSS() {
    var attachmentRequirementsHtml = '';

    for (i = 0; i < signerList_OSS.length; i++) {
        if (signerList_OSS[i].SignerNumber == modalSignerNumber_OSS) {
            for (j = 0; j < signerList_OSS[i].Attachments.length; j++) {
                attachmentRequirementsHtml += '<div id="divAttachmentRequirement' + signerList_OSS[i].Attachments[j].AttachmentRequirementNumber + '_OSS" class="row attachment-requirement-row-oss" style="padding-top: 10px; padding-bottom: 10px;">';
                attachmentRequirementsHtml += '    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding-left: 0px;">';
                attachmentRequirementsHtml += '        <input  id="txtMSSNameAR' + signerList_OSS[i].Attachments[j].AttachmentRequirementNumber + '_OSS" name="txtMSSNameAR' + signerList_OSS[i].Attachments[j].AttachmentRequirementNumber + '_OSS" placeholder="Name *" type="text" value="' + signerList_OSS[i].Attachments[j].Name + '">';
                attachmentRequirementsHtml += '    </div>';
                attachmentRequirementsHtml += '    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">';
                attachmentRequirementsHtml += '        <input  id="txtMSSDescriptionAR' + signerList_OSS[i].Attachments[j].AttachmentRequirementNumber + '_OSS" name="txtMSSDescriptionAR' + signerList_OSS[i].Attachments[j].AttachmentRequirementNumber + '_OSS" placeholder="Description" type="text" value="' + signerList_OSS[i].Attachments[j].Description + '">';
                attachmentRequirementsHtml += '    </div>';
                attachmentRequirementsHtml += '    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">';
                attachmentRequirementsHtml += '       <div style="float: left; padding-top: 3px;">';
                attachmentRequirementsHtml += '           <span>Required</span>';
                attachmentRequirementsHtml += '       </div>';
                attachmentRequirementsHtml += '       <div style="float: left; padding-top: 3px; padding-left: 15px;">';
                attachmentRequirementsHtml += '           <label class="switch-oss">';
                attachmentRequirementsHtml += '               <input type="checkbox" id="chkMSSRequiredAR' + signerList_OSS[i].Attachments[j].AttachmentRequirementNumber + '_OSS" name="chkMSSRequiredAR' + signerList_OSS[i].Attachments[j].AttachmentRequirementNumber + '_OSS" ';
                if (signerList_OSS[i].Attachments[j].Required == true) {
                    attachmentRequirementsHtml += ' checked ';
                }
                attachmentRequirementsHtml += '          >';
                attachmentRequirementsHtml += '               <span class="slider-oss round-oss"></span>';
                attachmentRequirementsHtml += '           </label>';
                attachmentRequirementsHtml += '       </div>';
                attachmentRequirementsHtml += '       <div style="clear: both;"></div>';
                attachmentRequirementsHtml += '    </div>';
                attachmentRequirementsHtml += '    <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 attachment-requirement-row-item-oss">';
                attachmentRequirementsHtml += '          <div style="float: right;">';
                attachmentRequirementsHtml += '              <div attachmentRequirementNumber="' + signerList_OSS[i].Attachments[j].AttachmentRequirementNumber + '" class="ossicon-close-oss"></div>';
                attachmentRequirementsHtml += '              <div class="ossicon-show-more-oss"></div>';
                attachmentRequirementsHtml += '              <div style="clear: both;"></div>';
                attachmentRequirementsHtml += '          </div>';
                attachmentRequirementsHtml += '          <div style="clear: both;"></div>';
                attachmentRequirementsHtml += '    </div>';
                attachmentRequirementsHtml += '</div>';
            }
            break;
        }
    }

    $("#divAttachmentList_OSS").html(attachmentRequirementsHtml);

    RegisterAttachmentRequirementEvents_OSS();
}

function RegisterAttachmentRequirementEvents_OSS() {
    $(".attachment-requirement-row-oss").hover(function () {
        $(this).find("div.ossicon-close-oss").css("display", "inline-block");
        $(this).find("div.ossicon-show-more-oss").css("display", "none");
    }, function () {
        $(this).find("div.ossicon-close-oss").css("display", "none");
        $(this).find("div.ossicon-show-more-oss").css("display", "inline-block");
    });

    //REMOVE SIGNER
    $(".attachment-requirement-row-oss").find("div.ossicon-close-oss").click(function () {
        var removeAttachmentRequirementNumber = $(this).attr("attachmentRequirementNumber");
        RemoveAttachmentRequirementObject_OSS(removeAttachmentRequirementNumber);
        $("#divAttachmentRequirement" + removeAttachmentRequirementNumber + "_OSS").remove();
    });
}

function RemoveAttachmentRequirementObject_OSS(removeAttachmentRequirementNumber) {
    for (i = 0; i < signerList_OSS.length; i++) {
        if (signerList_OSS[i].SignerNumber == modalSignerNumber_OSS) {
            for (j = 0; j < signerList_OSS[i].Attachments.length; j++) {
                if (signerList_OSS[i].Attachments[j].AttachmentRequirementNumber == removeAttachmentRequirementNumber) {
                    signerList_OSS[i].Attachments.splice(j, 1);
                    break;
                }
            }
            break;
        }
    }
}

function SaveSigner_OSS() {
    for (i = 0; i < signerList_OSS.length; i++) {
        if (signerList_OSS[i].SignerNumber == modalSignerNumber_OSS) {
            // Signer Info
            signerList_OSS[i].FirstName = $("#txtMSSFirstNameSD_OSS").val();
            signerList_OSS[i].LastName = $("#txtMSSLastNameSD_OSS").val();
            signerList_OSS[i].Email = $("#txtMSSEmailSD_OSS").val();
            signerList_OSS[i].SignerId = $("#txtMSSSignerIdSD_OSS").val();
            signerList_OSS[i].Title = $("#txtMSSTitleSD_OSS").val();
            signerList_OSS[i].Company = $("#txtMSSCompanySD_OSS").val();


            // Authentication
            signerList_OSS[i].AuthenticationType = $("input[name=rdMSSAuthenticationTypeAuth_OSS]:checked").val();
            
            signerList_OSS[i].MobilePhoneNumber = $("#txtMSSPhoneNumnerAuth_OSS").val();

            signerList_OSS[i].Question1 = $("#txtMSSQuestion1Auth_OSS").val();
            signerList_OSS[i].Answer1 = $("#txtMSSAnswer1Auth_OSS").val();
            signerList_OSS[i].Answer1Mask = $("#chkMSSMaskAnswer1Auth_OSS").prop('checked');

            signerList_OSS[i].Question2 = $("#txtMSSQuestion2Auth_OSS").val();
            signerList_OSS[i].Answer2 = $("#txtMSSAnswer2Auth_OSS").val();
            signerList_OSS[i].Answer2Mask = $("#chkMSSMaskAnswer2Auth_OSS").prop('checked');

            // Attachment Requirement
            for (j = 0; j < signerList_OSS[i].Attachments.length; j++) {
                signerList_OSS[i].Attachments[j].Name = $("#txtMSSNameAR" + signerList_OSS[i].Attachments[j].AttachmentRequirementNumber + "_OSS").val();
                signerList_OSS[i].Attachments[j].Description = $("#txtMSSDescriptionAR" + signerList_OSS[i].Attachments[j].AttachmentRequirementNumber + "_OSS").val();
                signerList_OSS[i].Attachments[j].Required = $("#chkMSSRequiredAR" + signerList_OSS[i].Attachments[j].AttachmentRequirementNumber + "_OSS").prop('checked');
                console.log($("#chkMSSRequiredAR" + signerList_OSS[i].Attachments[j].AttachmentRequirementNumber + "_OSS").prop('checked'));
                console.log(signerList_OSS[i].Attachments[j].Required);
            }

            //Advanced
            signerList_OSS[i].PersonalMessageToRecipient = $("#txtMMSPersonalMessageAdv_OSS").val();
            signerList_OSS[i].ChangeSigner = $("#chkMSSChangeSignerAdv_OSS").prop('checked');
            signerList_OSS[i].EmailDelivery = $("#chkMSSEmailDeliveryAdv_OSS").prop('checked');


            // Set back the signer row
            $("#txtFirstName" + modalSignerNumber_OSS + "_OSS").val(signerList_OSS[i].FirstName);
            $("#txtLastName" + modalSignerNumber_OSS + "_OSS").val(signerList_OSS[i].LastName);
            $("#txtEmail" + modalSignerNumber_OSS + "_OSS").val(signerList_OSS[i].Email);
            $("#txtSignerId" + modalSignerNumber_OSS + "_OSS").val(signerList_OSS[i].SignerId);
            $("#txtTitle" + modalSignerNumber_OSS + "_OSS").val(signerList_OSS[i].Title);
            $("#txtCompany" + modalSignerNumber_OSS + "_OSS").val(signerList_OSS[i].Company);

            break;
        }
    }

    GenerateRecipientJSON_OSS();

    ShowSuccessMessage_OSS("The Signer information has been successfully saved.");

    $("#divSignerModal_OSS .close").click();
}

function CancelSignerConfiguration_OSS() {
    $("#divSignerModal_OSS .close").click();
}

function GenerateRecipientJSON_OSS() {

    var jsonRecipientList = '[';
    for (i = 0; i < signerList_OSS.length; i++) {
        if (i > 0) {
            jsonRecipientList += ',';
        }
        jsonRecipientList += '{';
        jsonRecipientList += '"SignerOrder" : "' + signerList_OSS[i].SignerOrder + '",';
        jsonRecipientList += '"FirstName" : "' + signerList_OSS[i].FirstName + '",';
        jsonRecipientList += '"LastName" : "' + signerList_OSS[i].LastName + '",';
        jsonRecipientList += '"Email" : "' + signerList_OSS[i].Email + '",';
        jsonRecipientList += '"SignerId" : "' + signerList_OSS[i].SignerId + '",';
        jsonRecipientList += '"Title" : "' + signerList_OSS[i].Title + '",';
        jsonRecipientList += '"Company" : "' + signerList_OSS[i].Company + '",';
        jsonRecipientList += '"AuthenticationType" : "' + signerList_OSS[i].AuthenticationType + '",';
        jsonRecipientList += '"CountryCode" : "' + signerList_OSS[i].CountryCode + '",';
        jsonRecipientList += '"MobilePhoneNumber" : "' + signerList_OSS[i].MobilePhoneNumber + '",';
        jsonRecipientList += '"Question1" : "' + signerList_OSS[i].Question1 + '",';
        jsonRecipientList += '"Answer1" : "' + signerList_OSS[i].Answer1 + '",';
        jsonRecipientList += '"Answer1Mask" : ' + signerList_OSS[i].Answer1Mask + ',';
        jsonRecipientList += '"Question2" : "' + signerList_OSS[i].Question2 + '",';
        jsonRecipientList += '"Answer2" : "' + signerList_OSS[i].Answer2 + '",';
        jsonRecipientList += '"Answer2Mask" : ' + signerList_OSS[i].Answer2Mask + ',';
        jsonRecipientList += '"Attachments" : [';
        for (j = 0; j < signerList_OSS[i].Attachments.length; j++) {
            if (j > 0) {
                jsonRecipientList += ',';
            }
            jsonRecipientList += '{';
            jsonRecipientList += '"Name" : "' + signerList_OSS[i].Attachments[j].Name + '",';
            jsonRecipientList += '"Description" : "' + signerList_OSS[i].Attachments[j].Description + '",';
            jsonRecipientList += '"Required" : ' + signerList_OSS[i].Attachments[j].Required + '';
            jsonRecipientList += '}';
        }
        jsonRecipientList += '],';
        jsonRecipientList += '"PersonalMessageToRecipient" : "' + signerList_OSS[i].PersonalMessageToRecipient + '",';
        jsonRecipientList += '"ChangeSigner" : ' + signerList_OSS[i].ChangeSigner + ',';
        jsonRecipientList += '"EmailDelivery" : ' + signerList_OSS[i].EmailDelivery + '';
        jsonRecipientList += '}';
    }
    jsonRecipientList += ']';
    $("#hydSignersList_OSS").val(jsonRecipientList.toString());
}

function SignerOnBlur_OSS(sender) {
    if (sender != undefined) {
        var signerNumber = sender.getAttribute("signerNumber");
        var signerInfo = sender.getAttribute("signerInfo");
        var textValue = sender.value;
        var container = document.getElementById("container");
        SaveSignerPartialInfo_OSS(signerNumber, signerInfo, textValue);
        //ShowSuccessMessage_OSS(signerNumber + "." + signerInfo + " : " + textValue);
    }
}

function SaveSignerPartialInfo_OSS(signerNumber, signerInfo, textValue) {
    for (i = 0; i < signerList_OSS.length; i++) {
        if (signerList_OSS[i].SignerNumber == signerNumber) {

            switch (signerInfo) {
                case "FirstName":
                    var val = $("#" + GenSignerFirstNameCntId_OSS(signerNumber)).val();
                    signerList_OSS[i].FirstName = val;
                    if (ValidateNotEmpty_OSS(val) == true) {                        
                        $("#" + GenSignerFirstNameCntId_OSS(signerNumber)).css("border", "1px solid white");
                        $("#" + GenSignerFirstNameErrMsgCntId_OSS(signerNumber)).css("display", "none");
                        $("#" + GenSignerFirstNameErrMsgCntId_OSS(signerNumber)).text("");
                    } else {
                        $("#" + GenSignerFirstNameCntId_OSS(signerNumber)).css("border", "1px solid #c71c22");
                        $("#" + GenSignerFirstNameErrMsgCntId_OSS(signerNumber)).css("display", "block");
                        $("#" + GenSignerFirstNameErrMsgCntId_OSS(signerNumber)).text("This field is required.");
                        ShowErrorMessage_OSS("First name cannot be empty.");
                    }                   

                    break;
                case "LastName":
                    var val = $("#" + GenSignerLastNameCntId_OSS(signerNumber)).val();
                    signerList_OSS[i].LastName = val;
                    if (ValidateNotEmpty_OSS(val) == true) {
                        $("#" + GenSignerLastNameCntId_OSS(signerNumber)).css("border", "1px solid white");
                        $("#" + GenSignerLastNameErrMsgCntId_OSS(signerNumber)).css("display", "none");
                        $("#" + GenSignerLastNameErrMsgCntId_OSS(signerNumber)).text("");
                    } else {
                        $("#" + GenSignerLastNameCntId_OSS(signerNumber)).css("border", "1px solid #c71c22");
                        $("#" + GenSignerLastNameErrMsgCntId_OSS(signerNumber)).css("display", "block");
                        $("#" + GenSignerLastNameErrMsgCntId_OSS(signerNumber)).text("This field is required.");
                        ShowErrorMessage_OSS("Last name cannot be empty.");
                    }
                    
                    break;
                case "Email":
                    var val = $("#" + GenSignerEmailCntId_OSS(signerNumber)).val();                    
                    signerList_OSS[i].Email = val;
                    if (ValidateNotEmpty_OSS(val) == true) {
                        if (ValidateEmailAddress_OSS(val) == false) {
                            $("#" + GenSignerEmailCntId_OSS(signerNumber)).css("border", "1px solid #c71c22");
                            $("#" + GenSignerEmailErrMsgCntId_OSS(signerNumber)).css("display", "block");
                            $("#" + GenSignerEmailErrMsgCntId_OSS(signerNumber)).text("Invalid email.");
                            ShowErrorMessage_OSS("Invalid email.");
                        } else {
                            console.log("valid Email");
                            $("#" + GenSignerEmailCntId_OSS(signerNumber)).css("border", "1px solid white");
                            $("#" + GenSignerEmailErrMsgCntId_OSS(signerNumber)).css("display", "none");
                            $("#" + GenSignerEmailErrMsgCntId_OSS(signerNumber)).text("");
                        }                        
                    } else {
                        $("#" + GenSignerEmailCntId_OSS(signerNumber)).css("border", "1px solid #c71c22");
                        $("#" + GenSignerEmailErrMsgCntId_OSS(signerNumber)).css("display", "block");
                        $("#" + GenSignerEmailErrMsgCntId_OSS(signerNumber)).text("This field is required.");
                        ShowErrorMessage_OSS("Email cannot be empty.");
                    }
                    break;
                case "SignerId":
                    signerList_OSS[i].SignerId = $("#txtSignerId" + signerNumber + "_OSS").val();
                    break;
                case "Title":
                    signerList_OSS[i].Title = $("#txtTitle" + signerNumber + "_OSS").val();
                    break;
                case "Company":
                    signerList_OSS[i].Company = $("#txtCompany" + signerNumber + "_OSS").val();
                    break;                
            }
            
            break;
        }
    }

    GenerateRecipientJSON_OSS();
}

function GenSignerFirstNameCntId_OSS(i) {
    return "txtFirstName" + i.toString() + "_OSS";
}

function GenSignerLastNameCntId_OSS(i) {
    return "txtLastName" + i.toString() + "_OSS";
}

function GenSignerEmailCntId_OSS(i) {
    return "txtEmail" + i.toString() + "_OSS";
}

function GenSignerSignerIdCntId_OSS(i) {
    return "txtSignerId" + i.toString() + "_OSS";
}

function GenSignerTitleCntId_OSS(i) {
    return "txtTitle" + i.toString() + "_OSS";
}

function GenSignerCompanyCntId_OSS(i) {
    return "txtCompany" + i.toString() + "_OSS";
}

function GenSignerFirstNameErrMsgCntId_OSS(i) {
    return "lblFirstNameMessage" + i.toString() + "_OSS";
}

function GenSignerLastNameErrMsgCntId_OSS(i) {
    return "lblLastNameMessage" + i.toString() + "_OSS";
}

function GenSignerEmailErrMsgCntId_OSS(i) {
    return "lblEmailMessage" + i.toString() + "_OSS";
}

function GenSignerRowOrderDivId_OSS(i) {
    return "divSignerRowOrder" + i.toString() + "_OSS";
}

function ValidateNotEmpty_OSS(val) {
    var valid = true;
    if (val.length < 1) {
        valid = false;
    }
    return valid;
}

// has some issues
function ReOrderSignerOrderNumber_OSS() {

    var sortedIDs = $("#divSigners_OSS").sortable("toArray");
    console.log(sortedIDs);
    for (j = 0; j < sortedIDs.length; j++) {

        var signerNumber = $("#" + sortedIDs[j]).attr("signerNumber");
        console.log(signerNumber);
        // UI update
        $("#" + GenSignerRowOrderDivId_OSS(signerNumber) + " span").text((j + 1));

        // object update
        for (i = 0; i < signerList_OSS.length; i++) {
            if (signerList_OSS[i].SignerNumber == signerNumber) {
                signerList_OSS[i].SignerOrder = j;
                break;
            }
        }
    }
}

$(document).ready(function () {
    PackageSignerReady_OSS();
});
function PackageSignerReady_OSS() {

    $("#btnAddSigner_OSS").click(function () {

        AddNewSignerToList_OSS();

        var showOrderColumn = false;
        if ($("#chkSetSigningOrder_OSS").prop("checked") == true) {
            showOrderColumn = true;
        }

        var newSigner = '';
        newSigner += '<div id="divSignerRow' + newSignerNumber_OSS + '_OSS" signerNumber="' + newSignerNumber_OSS + '" class="row padding-bottom-oss signer-row-oss">';
        newSigner += '	<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">';
        newSigner += '	    <div class="drag-handle-oss" style="float: left;">';
        newSigner += '	        ';
        newSigner += '	    </div>';
        newSigner += '	    <div id="' + GenSignerRowOrderDivId_OSS(newSignerNumber_OSS) + '" class="signerRowOrderDiv-oss" style="float: left; padding-left: 5px; padding-top: 12px; display: ' + (showOrderColumn == true ? "block" : "none") + ';">';
        newSigner += '	        <span>' + (signerList_OSS.length) + '</span>';
        newSigner += '	    </div>';
        newSigner += '	    <div style="float: left; padding-left: 15px; padding-right: 20px; padding-top: 12px;">';
        newSigner += '	        <span class="ossicon-user-oss"></span>';
        newSigner += '	    </div>';
        newSigner += '	    <div style="float: left;" class="signer-row-item-oss">';
        newSigner += '          <input id="' + GenSignerFirstNameCntId_OSS(newSignerNumber_OSS) + '" name="' + GenSignerFirstNameCntId_OSS(newSignerNumber_OSS) + '" placeholder="First Name *" type="text" value="" signerNumber="' + newSignerNumber_OSS + '" signerInfo="FirstName" onblur="SignerOnBlur_OSS(this)">';
        newSigner += '          <span class="requireMessage-oss" id="' + GenSignerFirstNameErrMsgCntId_OSS(newSignerNumber_OSS) + '"></span>';
        newSigner += '	    </div>';
        newSigner += '      <div style="clear: both;"></div>';
        newSigner += '	</div>';
        newSigner += '	<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">';
        newSigner += '		<div class="row">';
        newSigner += '			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 signer-row-item-oss">';
        newSigner += '              <input id="' + GenSignerLastNameCntId_OSS(newSignerNumber_OSS) + '" name="' + GenSignerLastNameCntId_OSS(newSignerNumber_OSS) + '" placeholder="Last Name *" type="text" value="" signerNumber="' + newSignerNumber_OSS + '" signerInfo="LastName" onblur="SignerOnBlur_OSS(this)">';
        newSigner += '              <span class="requireMessage-oss" id="' + GenSignerLastNameErrMsgCntId_OSS(newSignerNumber_OSS) + '"></span>';
        newSigner += '			</div>';
        newSigner += '			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 signer-row-item-oss">';
        newSigner += '              <input id="' + GenSignerEmailCntId_OSS(newSignerNumber_OSS) + '" name="' + GenSignerEmailCntId_OSS(newSignerNumber_OSS) + '" placeholder="email@example.com *" type="text" value="" signerNumber="' + newSignerNumber_OSS + '" signerInfo="Email" onblur="SignerOnBlur_OSS(this)">';
        newSigner += '              <span class="requireMessage-oss" id="' + GenSignerEmailErrMsgCntId_OSS(newSignerNumber_OSS) + '"></span>';
        newSigner += '			</div>';
        newSigner += '			<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 signer-row-item-oss">';
        newSigner += '              <input id="' + GenSignerSignerIdCntId_OSS(newSignerNumber_OSS) + '" name="' + GenSignerSignerIdCntId_OSS(newSignerNumber_OSS) + '" placeholder="SignerId" type="text" value="" signerNumber="' + newSignerNumber_OSS + '" signerInfo="SignerId" onblur="SignerOnBlur_OSS(this)">';
        newSigner += '			</div>';
        newSigner += '			<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 signer-row-item-oss">';
        newSigner += '              <input id="' + GenSignerTitleCntId_OSS(newSignerNumber_OSS) + '" name="' + GenSignerTitleCntId_OSS(newSignerNumber_OSS) + '" placeholder="Title" type="text" value="" signerNumber="' + newSignerNumber_OSS + '" signerInfo="Title" onblur="SignerOnBlur_OSS(this)">';
        newSigner += '			</div>';
        newSigner += '			<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 signer-row-item-oss">';
        newSigner += '              <input id="' + GenSignerCompanyCntId_OSS(newSignerNumber_OSS) + '" name="' + GenSignerCompanyCntId_OSS(newSignerNumber_OSS) + '" placeholder="Company" type="text" value="" signerNumber="' + newSignerNumber_OSS + '" signerInfo="Company" onblur="SignerOnBlur_OSS(this)">';
        newSigner += '			</div>';
        newSigner += '		</div>';
        newSigner += '	</div>';
        newSigner += '	<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 signer-row-item-oss">';
        newSigner += '          <div style="float: right;">';
        newSigner += '              <div signerNumber="' + newSignerNumber_OSS + '" class="ossicon-settings-oss"></div>';
        newSigner += '              <div signerNumber="' + newSignerNumber_OSS + '" class="ossicon-close-oss"></div>';
        newSigner += '              <div class="ossicon-show-more-oss"></div>';
        newSigner += '              <div style="clear: both;"></div>';
        newSigner += '          </div>';
        newSigner += '          <div style="clear: both;"></div>';
        newSigner += '	</div>';
        newSigner += '</div>';

        $("#divSigners_OSS").append(newSigner);

        RegisterSigner_OSS();

        newSignerNumber_OSS++;
    });

    function RegisterSigner_OSS() {
        $(".signer-row-oss").hover(function () {
            $(this).find("div.ossicon-settings-oss").css("display", "inline-block");
            $(this).find("div.ossicon-close-oss").css("display", "inline-block");
            $(this).find("div.ossicon-show-more-oss").css("display", "none");
        }, function () {
            $(this).find("div.ossicon-settings-oss").css("display", "none");
            $(this).find("div.ossicon-close-oss").css("display", "none");
            $(this).find("div.ossicon-show-more-oss").css("display", "inline-block");
        });

        // SIGNER SETTINGS
        $(".signer-row-oss").find("div.ossicon-settings-oss").click(function () {
            modalSignerNumber_OSS = $(this).attr("signerNumber");
            for (i = 0; i < signerList_OSS.length; i++) {
                if (signerList_OSS[i].SignerNumber == modalSignerNumber_OSS) {

                    signerList_OSS[i].FirstName = $("#txtFirstName" + modalSignerNumber_OSS + "_OSS").val();
                    signerList_OSS[i].LastName = $("#txtLastName" + modalSignerNumber_OSS + "_OSS").val();
                    signerList_OSS[i].Email = $("#txtEmail" + modalSignerNumber_OSS + "_OSS").val();
                    signerList_OSS[i].SignerId = $("#txtSignerId" + modalSignerNumber_OSS + "_OSS").val();
                    signerList_OSS[i].Title = $("#txtTitle" + modalSignerNumber_OSS + "_OSS").val();
                    signerList_OSS[i].Company = $("#txtCompany" + modalSignerNumber_OSS + "_OSS").val();

                    // Initialize signer modal tabs
                    $("#divMSSModalTitle_OSS").html(signerList_OSS[i].FirstName + ' ' + signerList_OSS[i].LastName);


                    // Signer Info
                    $("#txtMSSFirstNameSD_OSS").val(signerList_OSS[i].FirstName);
                    $("#txtMSSLastNameSD_OSS").val(signerList_OSS[i].LastName);
                    $("#txtMSSEmailSD_OSS").val(signerList_OSS[i].Email);
                    $("#txtMSSSignerIdSD_OSS").val(signerList_OSS[i].SignerId);
                    $("#txtMSSTitleSD_OSS").val(signerList_OSS[i].Title);
                    $("#txtMSSCompanySD_OSS").val(signerList_OSS[i].Company);


                    // Authentication
                    $('input[name=rdMSSAuthenticationTypeAuth_OSS][value=' + signerList_OSS[i].AuthenticationType + ']').prop('checked', true);                    
                    if (signerList_OSS[i].AuthenticationType == "NONE") {    
                        $("#rdMSSAuthenticationTypeAuthEmail_OSS").tab('show');
                    } else if (signerList_OSS[i].AuthenticationType == "SMS") {
                        $("#rdMSSAuthenticationTypeAuthSMS_OSS").tab('show');
                    } else if (signerList_OSS[i].AuthenticationType == "CHALLENGE") {
                        $("#rdMSSAuthenticationTypeAuthChallenge_OSS").tab('show');                   
                    }
                    

                    $("#txtMSSPhoneNumnerAuth_OSS").val(signerList_OSS[i].MobilePhoneNumber);

                    $("#txtMSSQuestion1Auth_OSS").val(signerList_OSS[i].Question1);
                    $("#txtMSSAnswer1Auth_OSS").val(signerList_OSS[i].Answer1);
                    $("#chkMSSMaskAnswer1Auth_OSS").prop('checked', signerList_OSS[i].Answer1Mask);

                    $("#txtMSSQuestion2Auth_OSS").val(signerList_OSS[i].Question2);
                    $("#txtMSSAnswer2Auth_OSS").val(signerList_OSS[i].Answer2);
                    $("#chkMSSMaskAnswer2Auth_OSS").prop('checked', signerList_OSS[i].Answer2Mask);

                    // Attachment Requirement
                    GenerateAttachmentRequirementUI_OSS();


                    //Advanced
                    $("#txtMMSPersonalMessageAdv_OSS").val(signerList_OSS[i].PersonalMessageToRecipient);
                    $("#chkMSSChangeSignerAdv_OSS").prop('checked', signerList_OSS[i].ChangeSigner);
                    $("#chkMSSEmailDeliveryAdv_OSS").prop('checked', signerList_OSS[i].EmailDelivery);

                    break;
                }
            }

            // Open the modal popup
            $('#divSignerModal_OSS').modal('show');
            // Set the first tab to showup as the modal popup opens
            $('#divSignerModal_OSS a:first').tab('show');
            // Set the first tab of the authentication tabs
            //$('#rdMSSAuthenticationTypeAuthEmail_OSS').tab('show').click();
        });

        //REMOVE SIGNER
        $(".signer-row-oss").find("div.ossicon-close-oss").click(function () {
            var removeSignerNumber = $(this).attr("signerNumber");
            RemoveSignerObject_OSS(removeSignerNumber);
            $("#divSignerRow" + removeSignerNumber + "_OSS").remove();
            ReOrderSignerOrderNumber_OSS(); // this line needs to be after "RemoveSignerObject(removeSignerNumber)" and "$("#signerRow" + removeSignerNumber).remove()"
            GenerateRecipientJSON_OSS();
        });
    }   
    
    // START - Radio button as control of tab 
    $('input[name="rdMSSAuthenticationTypeAuth_OSS"]').click(function () {
        $(this).tab('show');
    });
    // END - Radio button as control of tab 

        //<input type="hidden" id="hSignerSortOrder" name="hSignersList" value="false" />
    $("#chkSetSigningOrder_OSS").click(function () {
        if ($(this).prop("checked") == true) {
            $(".signerRowOrderDiv-oss").each(function () {
                $(this).css("display", "block")
            });
            $("#hydSignerSortOrder_OSS").val("true");
        } else {
            $(".signerRowOrderDiv-oss").each(function () {
                $(this).css("display", "none")
            });
            $("#hydSignerSortOrder_OSS").val("false");
        }
    });

    $("#divSigners_OSS").sortable({ handle: ".drag-handle-oss" });   

    $("#divSigners_OSS").on("sortstop", function (event, ui) {
        ReOrderSignerOrderNumber_OSS();
        GenerateRecipientJSON_OSS();
    });
}

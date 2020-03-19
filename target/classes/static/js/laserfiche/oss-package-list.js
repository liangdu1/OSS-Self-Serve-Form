
//var transactionList_OSS = [];

// this function needs to be moved to a js where we do all startup staffs for this pop up.
$(document).ready(function () {
    //var responseJSONString = "{ \"response\": { \"responseFromAction\": \"OneSpan\", \"packages\": [ { \"id\": \"Oy1kBjr0AIDWm6dgkoHrhJrCm_Y = \", \"name\": \"Test - Create Consent Document REST - 5 / 30 / 2018 1:35:09 PM\", \"status\": \"COMPLETED\", \"updated\": \"2018 - 07 - 03T20: 28:46Z\", \"due\": \"2018 - 07 - 28T04: 00:00Z\", \"recipients\": [ { \"id\": \"1GnkPewZ60oU\", \"name\": \"\", \"firstName\": \"Moshiur\", \"lastName\": \"Reza\" }, { \"id\": \"587e98b6 - 56ab - 4e9c - 93f2 - 781ade93b262\", \"name\": \"\", \"firstName\": \"4\", \"lastName\": \"4\" } ] }, { \"id\": \"E6iv5Wgdszy1qt6VD1 - iaFggwDw = \", \"name\": \"Test - Sign On Mobile -4 / 26 / 2018 4:22:10 PM\", \"status\": \"SENT\", \"updated\": \"2018 - 07 - 03T20: 28:46Z\", \"due\": null, \"recipients\": [ { \"id\": \"1GnkPewZ60oU\", \"name\": \"\", \"firstName\": \"Moshiur\", \"lastName\": \"Reza\" }, { \"id\": \"587e98b6 - 56ab - 4e9c - 93f2 - 781ade93b262\", \"name\": \"\", \"firstName\": \"4\", \"lastName\": \"4\" } ] }, { \"id\": \"wIuXv - uC7h2EhbDgp2B5M0oV4yI = \", \"name\": \"Test Package API\", \"status\": \"DRAFT\", \"updated\": \"2018 - 07 - 03T20: 28:46Z\", \"due\": null, \"recipients\": [ { \"id\": \"1GnkPewZ60oU\", \"name\": \"\", \"firstName\": \"Moshiur\", \"lastName\": \"Reza\" }, { \"id\": \"587e98b6 - 56ab - 4e9c - 93f2 - 781ade93b262\", \"name\": \"\", \"firstName\": \"4\", \"lastName\": \"4\" } ] } ], \"configuration\": { }, \"createPackageResources\": { \"templates\": [ { \"id\": \"ACirITONGu1OMBUUCR_T2rNOgn0 = \", \"name\": \"Test - Templates from Package RTEST -9 / 7 / 2017 1:50:43 PM\" }, { \"id\": \"Ks1Usbsi4yFp4G_K6yDk8VAbYE8 = \", \"name\": \"Test - Templates REST - 9 / 7 / 2017 12:12:30 PM\" }, { \"id\": \"aaaa3\", \"name\": \"Template FT\" } ], \"languages\": [ { \"code\": \"en\", \"name\": \"English\" }, { \"code\": \"fr\", \"name\": \"French\" } ], \"documents\": [], \"signers\": [] } } }";
    //var responseObj = JSON.parse(responseJSONString);
    //transactionList_OSS = responseObj.response.packages;

    PackageListReady_OSS();
});

function PackageListReady_OSS() {
    GenerateTransactionListUI_OSS();
}

function GenerateTransactionListUI_OSS() {

    var count = parseInt(transactionList_Count_OSS);
    var currentPage = parseInt(transactionList_CurrentPage_OSS);
    var size = parseInt(transactionList_PageSize_OSS);


    var numberofpages = Math.floor((count + (size - 1)) / size);

    var htmlTransactionList = '';

    for (i = 0; i < transactionList_OSS.length; i++) {
        var temlRecipientNames = "";
        for (j = 0; j < transactionList_OSS[i].recipients.length; j++) {
            if (j > 0) {
                temlRecipientNames += ", ";
            }
            temlRecipientNames += transactionList_OSS[i].recipients[j].firstName + " " + transactionList_OSS[i].recipients[j].lastName;
        }

        var strStatus = "";
        var srtStatusCSSClass = "";        
        if (transactionList_OSS[i].status.toUpperCase() == "COMPLETED".toUpperCase()) {
            strStatus = "Completed";
            srtStatusCSSClass = "content-status-completed-oss";
        } else if (transactionList_OSS[i].status.toUpperCase() == "SENT".toUpperCase()) {
            strStatus = "In Progress";
            srtStatusCSSClass = "content-status-inprogress-oss";
        } if (transactionList_OSS[i].status.toUpperCase() == "DRAFT".toUpperCase()) {
            strStatus = "Draft";
            srtStatusCSSClass = "content-status-draft-oss";            
        }

        htmlTransactionList += '<div class="row list-table-row-oss">';
        htmlTransactionList += '    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 list-table-cell-oss">';
        htmlTransactionList += '        <span class="list-table-cell-content-oss list-table-row-cell-content-oss content-transaction-name-oss">' + transactionList_OSS[i].name + '</span>';
        htmlTransactionList += '    </div>';
        htmlTransactionList += '    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 list-table-cell-oss">';
        htmlTransactionList += '        <span class="list-table-cell-content-oss list-table-row-cell-content-oss">' + temlRecipientNames + '</span>';
        htmlTransactionList += '    </div>';
        htmlTransactionList += '    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 list-table-cell-oss">';
        htmlTransactionList += '        <span class="list-table-cell-content-oss list-table-row-cell-content-oss">' + transactionList_OSS[i].updated + '</span>';
        htmlTransactionList += '    </div>';
        htmlTransactionList += '    <div class="col-xs-1 col-sm-1 hidden-md col-lg-1 list-table-cell-oss">';
        htmlTransactionList += '        <span class="list-table-cell-content-oss list-table-row-cell-content-oss ' + srtStatusCSSClass + '">' + strStatus + '</span>';
        htmlTransactionList += '    </div>';
        htmlTransactionList += '    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 list-table-cell-oss">';
        htmlTransactionList += '        <span class="list-table-cell-content-oss list-table-row-cell-content-oss">' + transactionList_OSS[i].due + '</span>';
        htmlTransactionList += '    </div>';
        htmlTransactionList += '    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 list-table-cell-oss">';
        htmlTransactionList += '          <div style="margin-left: auto; width: 130px; padding-top: 7px;">';
        if (transactionList_OSS[i].status.toUpperCase() == "COMPLETED".toUpperCase()) {
            htmlTransactionList += '              <div transactionId="' + transactionList_OSS[i].id + '" transactionStatus="' + transactionList_OSS[i].status + '" class="ossicon-trash-oss"></div>';
            htmlTransactionList += '              <div transactionId="' + transactionList_OSS[i].id + '" transactionStatus="' + transactionList_OSS[i].status + '" class="ossicon-archive-oss"></div>';
        }
        else if (transactionList_OSS[i].status.toUpperCase() == "SENT".toUpperCase()) {
            htmlTransactionList += '              <div transactionId="' + transactionList_OSS[i].id + '" transactionStatus="' + transactionList_OSS[i].status + '" class="ossicon-trash-oss"></div>';
            htmlTransactionList += '              <div transactionId="' + transactionList_OSS[i].id + '" transactionStatus="' + transactionList_OSS[i].status + '" class="ossicon-archive-oss"></div>';
            htmlTransactionList += '              <div transactionId="' + transactionList_OSS[i].id + '" transactionStatus="' + transactionList_OSS[i].status + '" class="ossicon-edit-oss"></div>';
        }
        else if (transactionList_OSS[i].status.toUpperCase() == "DRAFT".toUpperCase()) {
            htmlTransactionList += '              <div transactionId="' + transactionList_OSS[i].id + '" transactionStatus="' + transactionList_OSS[i].status + '" class="ossicon-trash-oss"></div>';
            htmlTransactionList += '              <div transactionId="' + transactionList_OSS[i].id + '" transactionStatus="' + transactionList_OSS[i].status + '" class="ossicon-edit-oss"></div>';                        
        }        
        htmlTransactionList += '              <div style="clear: both;"></div>';
        htmlTransactionList += '          </div>';
        htmlTransactionList += '          <div style="margin-left: auto; width: 68px; padding-top: 7px;">';
        htmlTransactionList += '              <div class="ossicon-show-more-oss"></div>';
        htmlTransactionList += '              <div style="clear: both;"></div>';
        htmlTransactionList += '          </div>';
        htmlTransactionList += '    </div>';
        htmlTransactionList += '</div>';
    }

    htmlTransactionList += '<br class="pagination-padding" />';
    htmlTransactionList += '<ul class="pagination">';
    for (var ic = 0; ic < numberofpages; ic++) {

        if ((ic + 1) == currentPage) {
            htmlTransactionList += '    <li class="active">';
        } else {
            htmlTransactionList += '    <li>';
        }        
        htmlTransactionList += '    <a href="#" onclick="TransactinoListPageTo_OSS(' + (ic + 1) + ');return false;">' + (ic + 1) + '</a>';
        htmlTransactionList += '    </li>';
    }
    htmlTransactionList += '</ul>';    
    htmlTransactionList += '<br class="pagination-padding" />';
    
    $(".list-table-row-oss").remove();
    $(".pagination").remove();
    $(".pagination-padding").remove();
    $("#divTransactionList_OSS").append(htmlTransactionList);


    $(".list-table-row-oss").hover(function () {
        $(this).find("div.ossicon-edit-oss").css("display", "inline-block");
        $(this).find("div.ossicon-archive-oss").css("display", "inline-block");
        $(this).find("div.ossicon-trash-oss").css("display", "inline-block");
        $(this).find("div.ossicon-show-more-oss").css("display", "none");
    }, function () {
        $(this).find("div.ossicon-edit-oss").css("display", "none");
        $(this).find("div.ossicon-archive-oss").css("display", "none");
        $(this).find("div.ossicon-trash-oss").css("display", "none");
        $(this).find("div.ossicon-show-more-oss").css("display", "inline-block");
        });


    //EDIT PACKAGE
    $(".list-table-row-oss").find("div.ossicon-edit-oss").click(function () {
        var transactionId = $(this).attr("transactionId");
        var transactionStatus = $(this).attr("transactionStatus");

        var proceed = true;
        if (transactionStatus.toUpperCase() == "SENT".toUpperCase()) {
            proceed = confirm("Transaction will be updated to draft for editing. Are you sure ?");
        }
        if (proceed === true) {

            var onSucceed_OpenPackageDesignerFromList_OSS = function (msg) {
                var response = JSON.parse(msg["response"].toString());
                var designerURL = response.url
                $('#iframeDesigner').attr('src', designerURL);
                $('#divDesigner_OSS').modal('show');

                TransactinoListPageTo_OSS(transactionList_CurrentPage_OSS);
            };

            var onFail_OpenPackageDesignerFromList_OSS = function (msg) {
                alert("Something went wrong");
            };

            webAccessApi.performCustomAction('OneSpan', {
                'requestFrom': 'OpenPackageDesignerFromList',
                'id': '' + transactionId + '',
                'status': '' + transactionStatus + ''
            }, onSucceed_OpenPackageDesignerFromList_OSS, onFail_OpenPackageDesignerFromList_OSS);
        }
    });

    //ARCHIVE PACKAGE
    $(".list-table-row-oss").find("div.ossicon-archive-oss").click(function () {
        var transactionId = $(this).attr("transactionId");

        var onSucceed_OpenPackageDesignerFromList_OSS = function (msg) {
            var response = JSON.parse(msg["response"].toString());
            var result = response.result;
            if (result === "successful") {
                TransactinoListPageTo_OSS(transactionList_CurrentPage_OSS);
            } else {
                alert("Something went wrong");
            }
        };

        var onFail_OpenPackageDesignerFromList_OSS = function (msg) {
            alert("Something went wrong");
        };

        webAccessApi.performCustomAction('OneSpan', {
            'requestFrom': 'ArchivePackageFromList',
            'id': '' + transactionId + ''
        }, onSucceed_OpenPackageDesignerFromList_OSS, onFail_OpenPackageDesignerFromList_OSS);
    });


    //TRASH PACKAGE
    $(".list-table-row-oss").find("div.ossicon-trash-oss").click(function () {
        var transactionId = $(this).attr("transactionId");

        var proceed = true;
        proceed = confirm("Transaction will be trashed. Are you sure ?");

        if (proceed === true) {
            var onSucceed_TrashPackageFromList_OSS = function (msg) {
                var response = JSON.parse(msg["response"].toString());
                var result = response.result;
                if (result === "successful") {
                    TransactinoListPageTo_OSS(transactionList_CurrentPage_OSS);
                } else {
                    alert("Something went wrong");
                }
            };

            var onFail_TrashPackageFromList_OSS = function (msg) {
                alert("Something went wrong");
            };

            webAccessApi.performCustomAction('OneSpan', {
                'requestFrom': 'TrashPackageFromList',
                'id': '' + transactionId + ''
            }, onSucceed_TrashPackageFromList_OSS, onFail_TrashPackageFromList_OSS);
        }
    });


}

function TransactinoListPageTo_OSS(pageTo) {

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
        'pageTo': '' + pageTo + '',
        'pageSize': '' + transactionList_PageSize_OSS + ''        
    }, onSucceed_PageTransactionList_OSS, onFail_PageTransactionList_OSS);
}


function OpenPackageDesignerFromList_OSS(id) {
    var onSucceed_OpenPackageDesignerFromList_OSS = function (msg) {
        var response = JSON.parse(msg["response"].toString());        
        var designerURL = response.url
        $('#iframeDesigner').attr('src', designerURL);
        $('#divDesigner_OSS').modal('show');

        TransactinoListPageTo_OSS(transactionList_CurrentPage_OSS);
    };

    var onFail_OpenPackageDesignerFromList_OSS = function (msg) {
        alert("Something went wrong");
    };

    webAccessApi.performCustomAction('OneSpan', {
        'requestFrom': 'OpenPackageDesignerFromList',
        'id': '' + id + ''
    }, onSucceed_OpenPackageDesignerFromList_OSS, onFail_OpenPackageDesignerFromList_OSS);
}
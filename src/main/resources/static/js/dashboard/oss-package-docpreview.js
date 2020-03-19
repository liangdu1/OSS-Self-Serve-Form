$(function () {
    $("#close-doc-modal").on('click',function () {
        $("#doc-preview-modal").modal('hide');
        $("body").css("overflow","auto");
        //in order to return scroll bar to top
        $("#doc-preview-content").html("");
    });

    $(".ossicon-preview-oss").on('click', function (e) {

        var documentId = $(e.target).attr("documentId");
        var documentName = $(e.target).attr("documentName");
        var pageNum = parseInt($(e.target).attr("pageNum"));

        $("#doc-name").text(documentName);

        var htmlPagesList = '';
        for (i = 0; i < pageNum; i++) {
            var docUrl = "/a/image/packages/" + packageId + "/documents/" + documentId + "/pages/" + i;

            htmlPagesList += '     <div id="div-page-' + i + '" style="position: relative;    width: 100%;    height: 0;    padding-bottom: calc(100% * 991/766 + 18px);     margin-top: 0;">';
            htmlPagesList += '    <img id="img-page-' + i + '"  style="width: 100%;border: 1px solid black;   " src="' + docUrl + '"   />';
            htmlPagesList += '    </div>';


        }

        $("#doc-preview-content").html(htmlPagesList);

        $("body").css("overflow","hidden");

        $("#doc-preview-modal").modal({backdrop: 'static', keyboard: false});

    });

});
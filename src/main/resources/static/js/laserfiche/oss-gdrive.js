var GOOGLE_DRIVE_FILE_PICKER = "GOOGLE_DRIVE_FILE_PICKER";
// The Browser API key obtained from the Google API Console.
var developerKey = 'AIzaSyBxs8kk2GTHj4iiVg7w4yAzu68IAPGRi1U';

// The Client ID obtained from the Google API Console. Replace with your own Client ID.
var clientId = "583188685218-fijo9g0t4cv1ggq8ifv8cbslu7e6q7bl.apps.googleusercontent.com"

// Scope to use to access user's photos.
var scope = ['https://www.googleapis.com/auth/photos'];

var pickerApiLoaded = false;
var oauthToken;

var authApiLoaded = false;
// Use the API Loader script to load google.picker and gapi.auth.
function onApiLoad() {
    if (authApiLoaded == false) {
        gapi.load('auth', { 'callback': onAuthApiLoad });
    }

    if (pickerApiLoaded == false) {
        gapi.load('picker', { 'callback': onPickerApiLoad });
    } else {
        createPicker();
    }
}

function onAuthApiLoad() {
    window.gapi.auth.authorize(
        {
            'client_id': clientId,
            'scope': scope,
            'immediate': false
        },
        handleAuthResult);

    authApiLoaded = true;
}

function onPickerApiLoad() {
    pickerApiLoaded = true;
    createPicker();
}

function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPicker();
    }
}

// Create and render a Picker object for picking user Photos.
function createPicker() {
    if (pickerApiLoaded && oauthToken) {
        var picker = new google.picker.PickerBuilder().
            addView(google.picker.ViewId.PDFS).
            enableFeature(google.picker.Feature.MULTISELECT_ENABLED).
            setOAuthToken(oauthToken).
            setDeveloperKey(developerKey).
            setCallback(pickerCallback).
            build();
        picker.setVisible(true);
    }
}

// A simple callback implementation.
function pickerCallback(data) {
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        for (i = 0; i < data[google.picker.Response.DOCUMENTS].length; i++) {
            var doc = data[google.picker.Response.DOCUMENTS][i];
            var document_id = doc[google.picker.Document.ID];
            var document_name = doc[google.picker.Document.NAME];
            var documentItem = { id: document_id, name: GetFileNameWithoutExtension(document_name), documentSource: GOOGLE_DRIVE_FILE_PICKER, documntExtraction: false, textTag: false };
            AddDocumentsToList(documentItem);
        }
        GenerateDocumentList();
    }
}
console.log(window.origin);
function fetchUrl() {
    $('#share-url').val(window.location.href);
}
fetchUrl();
$("#copy-btn").click((e) => {
    fetchUrl();
    $('#share-url').select();
    document.execCommand("copy");
    $("#copy-btn").text('COPIE :)')
});



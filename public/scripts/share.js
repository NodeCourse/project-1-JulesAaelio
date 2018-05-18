console.log(window.origin);
function fetchUrl() {
    $('#share-url').val(window.location.href);
}
fetchUrl();
$(".share-tool #copy-btn").click((e) => {
    fetchUrl();
    $('#share-url').select();
    document.execCommand("copy");
    $("#copy-btn").text('COPIE :)')
});


$(".copy-toggle").click((e) => {
    let id = e.target.getAttribute('id').match(/[0-9]+/);
    if(id[0]){
        let linkInput = $('#survey-link-'+id);
        linkInput.val(window.origin + linkInput.val());
        linkInput.select();
        console.log(linkInput.val());
        document.execCommand("copy");
        $(e.target).text('COPIE :)');
    }
});

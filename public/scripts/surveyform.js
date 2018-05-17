

$('#answer-new').keyup((e)=> {
    console.log('pressed');
    console.log(e.target.value);
    if(e.target.value) {
        createNewAnswerField();
    }
});

function createNewAnswerField(){
    let newToggle = $('#answer-new');

    let newAnswer = $('.answer').last().clone();
    let newIndex = parseInt(newAnswer.attr('data-answer-index'))+1;
    newAnswer.attr('data-answer-index',parseInt(newIndex));
    newAnswer.attr('id',(newAnswer.attr('id').replace(/[0-9]+/,newIndex)));
    newAnswer.attr('name',newAnswer.attr('name').replace(/[0-9]+/,newIndex));
    newAnswer.attr('placeholder',newAnswer.attr('placeholder').replace(/[0-9]+/,newIndex));
    newAnswer.val(newToggle.val());
    newToggle.val('');
    $('#answers').append(newAnswer);
    newAnswer[0].focus();

}
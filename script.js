var titleInputField = $('.title-input');
var bodyInputField = $('.body-input');
var saveButton = $('.save-button');
var searchInputField = $('.search-input');
var ideaDisplay = $('.idea-display');

saveButton.on('click', createIdea);

function createIdea(e){
  e.preventDefault();
  ideaDisplay.prepend(`<div class="idea-box"> 
    <div class="box-title">${titleInputField.val()}<img src="images/delete.svg"></div>
    <div class="box-body">${bodyInputField.val()}</div>
    <div class="box-quality"><img src="images/upvote.svg" class="upvote"><img src="images/downvote.svg" class="downvote">quality:</div>
    </div>`)
  clearInputFields();
}

function clearInputFields(){
  titleInputField.val('');
  bodyInputField.val('');
  searchInputField.val('');
}
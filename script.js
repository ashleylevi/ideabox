var titleInputField = $('.title-input');
var bodyInputField = $('.body-input');
var saveButton = $('.save-button');
var searchInputField = $('.search-input');
var ideaDisplay = $('.idea-display');

saveButton.on('click', createIdea);

function createIdea(e){
  e.preventDefault();
  ideaDisplay.prepend(`<div class="idea-box"> 
    <h2> ${titleInputField.val()} </h2>
    <p>   ${bodyInputField.val()} </p>
    </div>
    <hr/>`)
  clearInputFields();
}

function clearInputFields(){
  titleInputField.val('');
  bodyInputField.val('');
  searchInputField.val('');
}
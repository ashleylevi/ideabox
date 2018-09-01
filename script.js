var titleInputField = $('.title-input');
var bodyInputField = $('.body-input');
var saveButton = $('.save-button');
var searchInputField = $('.search-input');
var ideaDisplay = $('.idea-display');
var upvoteButton = $('.upvote-button');
var downvoteButton = $('.downvote-button');
var ideaCount = 0;

saveButton.on('click', createIdea);
ideaDisplay.on('click', deleteIdea);
ideaDisplay.on('click', upvoteIdea);
ideaDisplay.on('click', downvoteIdea);
titleInputField.on('keyup', enableSubmitButton);
bodyInputField.on('keyup', enableSubmitButton);

function createIdea(e){
  e.preventDefault();
  ideaDisplay.prepend(`<div class="idea-box"> 
    <div class="box-title" contenteditable="true">${titleInputField.val()} <button class="delete-button" ></button></div>
    <div class="box-body" contenteditable="true">${bodyInputField.val()}</div>
    <div class="box-quality"><button class="upvote-button"> </button> <button class="downvote-button"> </button> quality: <span class="quality-setting">swill<span></div>
    </div>`)
  clearInputFields();
}

function clearInputFields(){
  titleInputField.val('');
  bodyInputField.val('');
  searchInputField.val('');
}

function deleteIdea(e) {
  if (e.target.className === 'delete-button') {
  $(e.target).parent().parent().remove();
}
}

function upvoteIdea(e){
  if (e.target.className === 'upvote-button') {
    if ($('.quality-setting').text() ==='swill') {
  
      $('.quality-setting').text('plausible');
     }

    else {
      $('.quality-setting').text('genius');
    }
  }
};

function downvoteIdea(e){
  if (e.target.className === 'downvote-button') {
    if ($('.quality-setting').text() ==='genius') {
  
      $('.quality-setting').text('plausible');
     }

    else {
      $('.quality-setting').text('swill');
    }
  }
};

function enableSubmitButton() {
  if (bodyInputField.val() === '' || titleInputField.val() === '') {
    saveButton.prop('disabled', true);
  } else {
    saveButton.prop('disabled', false);
  }

}




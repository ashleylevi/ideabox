var titleInputField = $('.title-input');
var bodyInputField = $('.body-input');
var saveButton = $('.save-button');
var searchInputField = $('.search-input');
var ideaDisplay = $('.idea-display');
var upvoteButton = $('.upvote-button');
var downvoteButton = $('.downvote-button');


saveButton.on('click', createIdea);
ideaDisplay.on('click', deleteIdea);
ideaDisplay.on('click', upvoteIdea);

function createIdea(e){
  e.preventDefault();
  ideaDisplay.prepend(`<div class="idea-box"> 
    <div class="box-title">${titleInputField.val()} <button class="delete-button" ></button></div>
    <div class="box-body">${bodyInputField.val()}</div>
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
      console.log('button');
     }

    else {
      $('.quality-setting').text('genius');
      console.log('hi');
    }
  }
};





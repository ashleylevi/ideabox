var titleInputField = $('.title-input');
var bodyInputField = $('.body-input');
var saveButton = $('.save-button');
var searchInputField = $('.search-input');
var ideaDisplay = $('.idea-display');
var upvoteButton = $('.upvote-button');
var downvoteButton = $('.downvote-button');
var ideaCount = 0;
var myArray = [];

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
  storeIdeaBox();
  clearInputFields();
  ideaCount++;
}

function clearInputFields(){
  titleInputField.val('');
  bodyInputField.val('');
  searchInputField.val('');
  enableSubmitButton();
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

function storeIdeaBox(){
  var firstIdeaBox = {'title': titleInputField.val(),'body': bodyInputField.val()};
  var timeStamp = $.now()
  localStorage.setItem(timeStamp, JSON.stringify(firstIdeaBox));
}

function displayIdeas(){
var retrievedIdeaBox = localStorage.getItem(timeStamp);
var parsedObject = JSON.parse(retrievedIdeaBox);
}




// function IdeaBox(title, body, quality){
//   this.title = title;
//   this.body = body;
//   this.quality = swill;
//   this.id = 0;
// }




$(document).ready(getIdeaFromLocalStorage);
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
ideaDisplay.on('click', downvoteIdea);
titleInputField.on('keyup', enableSubmitButton);
bodyInputField.on('keyup', enableSubmitButton);
searchInputField.on('keyup', searchIdeas);

function createIdea(e) {
  e.preventDefault();
  var timeStamp = $.now();
  ideaDisplay.prepend(`
    <div class="idea-box" id="${timeStamp}"> 
      <div class="box-title">
      <p class="ideaTitle" aria-label="idea title output" contenteditable="true" onfocusout="updateIdeaTitle(event)">${titleInputField.val()}</p>
        <button class="delete-button" aria-label="delete idea button">
        </button>
      </div>
      <div class="box-body" aria-label="idea body output" contenteditable="true" onfocusout="updateIdeaBody(event)">${bodyInputField.val()}
      </div>
      <div class="box-quality">
        <button class="upvote-button" aria-label="upvote idea button"> </button> 
        <button class="downvote-button" aria-label="downvote idea button"> </button> 
        <p> quality:<span class="quality-setting" aria-label="display quality">swill<span></p>
      </div>
    </div>`)
  storeIdea(timeStamp);
  clearInputFields();
}

function getIdeaFromLocalStorage() {
  for (var i=0; i < localStorage.length; i++) {
    var timeStamp = localStorage.key(i);
    var stringifiedIdea = localStorage.getItem(timeStamp)
    var parsedIdeaToDisplay= JSON.parse(stringifiedIdea);
    ideaDisplay.prepend(`
      <div class="idea-box" id="${parsedIdeaToDisplay.id}"> 
        <div class = "box-title">
          <p class="ideaTitle" contenteditable="true" onfocusout="updateIdeaTitle(event)">
            ${parsedIdeaToDisplay.title}
          </p>
          <button class="delete-button"></button>
        </div>
        <div class="box-body" contenteditable="true" onfocusout="updateIdeaBody(event)">
          ${parsedIdeaToDisplay.body}</div>
        <div class="box-quality">
          <button class="upvote-button"> </button> 
          <button class="downvote-button"> </button>
          <p>quality: <span class="quality-setting">${parsedIdeaToDisplay.quality}<span></p>
         </div>
      </div>`)
  }
}

function clearInputFields() {
  titleInputField.val('');
  bodyInputField.val('');
  searchInputField.val('');
  enableSubmitButton();
}

function deleteIdea(e) {
  if (e.target.className === 'delete-button') {
    $(e.target).parent().parent().remove();
    deleteIdeaFromStorage(e)
  }
}

function deleteIdeaFromStorage(e) {
  var timeStampParent = $(e.target).parent().parent().attr('id');
  localStorage.removeItem(timeStampParent);
}

function upvoteIdea(e) {
  if (e.target.className === 'upvote-button') {
    var qualitySpan = ($($(e.target).siblings('p')[0]).children('.quality-setting'));
    if (qualitySpan.text() === 'swill') {
      qualitySpan.text('plausible');
      updateStoredQuality(e);
    } else {
      qualitySpan.text('genius');
      updateStoredQuality(e);
    }
  }
}

function downvoteIdea(e) {
  if (e.target.className === 'downvote-button') {
    var qualitySpan = ($($(e.target).siblings('p')[0]).children('.quality-setting'));
    if (qualitySpan.text() ==='genius') {
      qualitySpan.text('plausible');
      updateStoredQuality(e);
    } else {
      qualitySpan.text('swill');
      updateStoredQuality(e);
    }
  }
}

function enableSubmitButton() {
  if (bodyInputField.val() === '' || titleInputField.val() === '') {
    saveButton.prop('disabled', true);
  } else {
    saveButton.prop('disabled', false);
  }
}

function storeIdea(timeStamp) {
  var ideaToStore = {'title': titleInputField.val(),'body': bodyInputField.val(), 'id': timeStamp, 'quality': 'swill'};
  var stringifiedIdea= JSON.stringify(ideaToStore);
  localStorage.setItem(timeStamp, stringifiedIdea);
}

function updateStoredQuality(e) {
  var timeStamp = $(e.target).parent().parent().attr('id');
  var storedIdea = JSON.parse(localStorage.getItem(timeStamp));
  var pTagSibling = $(e.target).siblings('p')[0];
  var spanQuality = $(pTagSibling).children('.quality-setting')[0];
  storedIdea.quality = $(spanQuality).text();
  var stringifiedStoredIdea = JSON.stringify(storedIdea);
  localStorage.setItem(timeStamp, stringifiedStoredIdea);
}

function updateIdeaTitle(event) {
  var currentTimeStamp = $(event.target).parent().parent().attr('id');
  var updatedTitle = $(event.target).text();
  var storedIdea = JSON.parse(localStorage.getItem(currentTimeStamp));
  storedIdea.title = updatedTitle;
  var stringifiedStoredIdea = JSON.stringify(storedIdea);
  localStorage.setItem(currentTimeStamp, stringifiedStoredIdea);
}

function updateIdeaBody(event){
  var currentTimeStamp = $(event.target).parent().attr('id');
  var updatedBody = $(event.target).text();
  var storedIdea = JSON.parse(localStorage.getItem(currentTimeStamp));
  storedIdea.body = updatedBody;
  var stringifiedStoredIdea = JSON.stringify(storedIdea);
  localStorage.setItem(currentTimeStamp, stringifiedStoredIdea);
}

function searchIdeas() {
  var searchValue = searchInputField.val().toLowerCase();
  var allIdeas = $('.idea-box');
  for (var i=0; i < allIdeas.length; i++) {
    var ideaTitle = $(allIdeas[i]).children('.box-title').text().toLowerCase();
    var ideaBody = $(allIdeas[i]).children('.box-body').text().toLowerCase();
    if (ideaTitle.includes(searchValue) || ideaBody.includes(searchValue)) {
      $(allIdeas[i]).removeClass('hidden');
    } else {
      $(allIdeas[i]).addClass('hidden')
    }
  }
}

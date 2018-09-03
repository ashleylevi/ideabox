//document will run the getIdeaFromLocalStorage function when the page loads
// this function will grab all of the ideas stored in local storage and prepend them
// back onto the page as if they were always there. 
$(document).ready(getIdeaFromLocalStorage);

var titleInputField = $('.title-input');
var bodyInputField = $('.body-input');
var saveButton = $('.save-button');
var searchInputField = $('.search-input');
var ideaDisplay = $('.idea-display');
var upvoteButton = $('.upvote-button');
var downvoteButton = $('.downvote-button');
// var timeStamp = $.now();


saveButton.on('click', createIdea);
ideaDisplay.on('click', deleteIdea);
ideaDisplay.on('click', upvoteIdea);
ideaDisplay.on('click', downvoteIdea);
titleInputField.on('keyup', enableSubmitButton);
bodyInputField.on('keyup', enableSubmitButton);


// whenever someone submits an idea, first a timeStamp of the current time is called
// using the .now method and set into a variable called timeStamp. the idea renders
// on the page with an id of the timeStamp, the value of the titleinput and the value 
// of the body input. After this, the storeIdeaBox function is called which
// takes a parameter of the timestamp (which is the id of the current idea) in order
// to store the idea into local storage 
function createIdea(e){
  e.preventDefault();
  var timeStamp = $.now();
  ideaDisplay.prepend(`<div class="idea-box" id="${timeStamp}"> 
    <div class="box-title" contenteditable="true">${titleInputField.val()} <button class="delete-button" ></button></div>
    <div class="box-body" contenteditable="true">${bodyInputField.val()}</div>
    <div class="box-quality"><button class="upvote-button"> </button> <button class="downvote-button"> </button> quality: <span class="quality-setting">swill<span></div>
    </div>`)
  storeIdea(timeStamp);
  clearInputFields();
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
    if ($(e.target).siblings('.quality-setting').text() ==='swill') {
     $(e.target).siblings('.quality-setting').text('plausible');
     } else {
      $(e.target).siblings('.quality-setting').text('genius');
    }
  }
};

function downvoteIdea(e){
  if (e.target.className === 'downvote-button') {
    if ($(e.target).siblings('.quality-setting').text() ==='genius') {
    $(e.target).siblings('.quality-setting').text('plausible');
     }else {
       $(e.target).siblings('.quality-setting').text('swill');
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

// after an idea is posted to the browser, this function runs to store the newly 
// created idea in localStorage. First we take the value of the title input,
// the value of the body input and the value of the id (the timestamp) and store 
// this information in an object, which is then stored in a variable called ideaToStore.
// then we stringify the ideaToStore and store the new string verion of the idea in 
// a variable called stringifiedIdea. Then we store the stringifiedIea into local storage
// using set item which takes two parameters (a key, and it's value). Here, the key is 
// the timeStamp for the idea and its value is the stringified object. 
function storeIdea(timeStamp){
  var ideaToStore = {'title': titleInputField.val(),'body': bodyInputField.val(), 'id': timeStamp};
  var stringifiedIdea= JSON.stringify(ideaToStore);
  localStorage.setItem(timeStamp, stringifiedIdea);
}


// after an idea is stored in local storage, we need to get the idea from storage
// and keep it on the page when the broswer reloads. When this function is called
// on page load, it is going to loop through the entire list of ideas that 
// are stored in the window and grab each idea by it's key(the timeStamp) which stores
// the rest of the idea object's information (the title, the body, the quality, etc). We store
// the key back into a variable called timeStamp. We get the timeStamp from local storage
// and store it into stringifiedIdea since it is still a string. Then we parse
// the idea back into an object so it can be available to display on the page. 
// Then we take the id, title, and body of the idea object that was stored and place it back into
// the html and prepend it to the idea display so it stays whenever the page reloads.
function getIdeaFromLocalStorage(){
  for (var i=0; i < localStorage.length; i++) {
  var timeStamp= localStorage.key(i);
  var stringifiedIdea = localStorage.getItem(timeStamp)
  var parsedIdeaToDisplay= JSON.parse(stringifiedIdea);
   ideaDisplay.prepend(`<div class="idea-box" id="${parsedIdeaToDisplay.id}"> 
    <div class="box-title" contenteditable="true">${parsedIdeaToDisplay.title} <button class="delete-button" ></button></div>
    <div class="box-body" contenteditable="true">${parsedIdeaToDisplay.body}</div>
    <div class="box-quality"><button class="upvote-button"> </button> <button class="downvote-button"> </button> quality: <span class="quality-setting">swill<span></div>
    </div>`)
  }
}




// function IdeaBox(title, body, quality){
//   this.title = title;
//   this.body = body;
//   this.quality = swill;
//   this.id = 0;
// }




"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, deletebtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

// this checks if the story is a favorite or not

  let favorite = false;
  if(currentUser){
    if (currentUser.favorites.some(e => e.storyId === story.storyId)){
      favorite = true;
    }
  }

  // a seperate markup for adding a delete button. this will only show when they user clicks "my stories"

  if(deletebtn === true){
    return $(`
    <li id="${story.storyId}">
      <span class="trash-can">
        <i class="fas fa-trash-alt">
        </i>
      </span>
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `);
  }
  
  // if the story is a favorite then it will make sure the star is filled in when the page is loaded
  // otherwise it will default to unfilled star
  // if no user is logged in then it will not show any stars on the page.

  if(favorite){
    return $(`
    <li id="${story.storyId}">
      <span class="star">
        <i class="fas fa-star">
        </i>
      </span>
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `);
  } else if(currentUser){
    return $(`
    <li id="${story.storyId}">
      <span class="star">
        <i class="far fa-star">
        </i>
      </span>
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `); } else {
    return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
  }

}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// this is called from a callback function when a user clicks on the favorites link
// it will repopulate the page with favorites only

function putFavoritesListOnPage() {
  console.debug("putFavoritesListOnPage");

  // loop through all of our stories and generate HTML for them
  for (let favorite of currentUser.favorites) {
    const $story = generateStoryMarkup(favorite);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// this function is trigged when a user submits a new story
// the new stroy will be added to the top of the page

async function addNewStory(evt) {
  console.debug('addNewStory');
  evt.preventDefault();
  const author = $('#author').val();
  const title = $('#title').val();
  const url = $('#url').val();
  const username = currentUser.username;



  const story = await storyList.addStory(currentUser, {title, author, url, username});
  const finishedStory = generateStoryMarkup(story);
  $allStoriesList.prepend(finishedStory);

  $storyForm.hide();
}

$storyForm.on('submit', addNewStory);

// this function will update if the story is a favorite or not and will update the star

async function toggleFavorite(evt) {
  const tar = $(this).children().eq(0);
  const $closestLi = tar.closest("li");
  const storyId = $closestLi.attr('id');
  const story = storyList.stories.find(s => s.storyId === storyId)
  if(tar.hasClass('far')){
    await currentUser.addFavorite(story);
  } else if (tar.hasClass('fas')){
    await currentUser.removeFavorite(story);
  }
  tar.toggleClass('far');
  tar.toggleClass('fas');
}

$body.on('click', '.star', toggleFavorite);

// this function is called from a callback function that is triggered when a user clicks "my stories"
// it will populate the page with only the users submitted stories

function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage");

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story, true);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// this is the function that triggers when a user clicks on the delete button
// it will delete a story from the API and repopulate the page to show the updated stories list

async function deleteStory(evt) {
  console.debug('deleteStory');
  const tar = $(this).children().eq(0);
  const $closestLi = tar.closest('li');
  const storyId = $closestLi.attr('id');
  const story = storyList.stories.find(s => s.storyId === storyId)
  await currentUser.removeStory(story); 

  $allStoriesList.empty();
  putMyStoriesOnPage();
}

$body.on('click', '.trash-can', deleteStory);
"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $storyForm.hide();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// When a user clicks submit they can fill out a form to submit a article 

function navSubmitStory() {
  console.debug('navSubmitStory');
  $storyForm.show();
}

$body.on('click', '#nav-submit-story', navSubmitStory);

function navShowFavorites() {
  $allStoriesList.empty();
  putFavoritesListOnPage();
  $storyForm.hide();
}

$body.on('click', '#nav-favorites', navShowFavorites);

function navShowStories() {
  console.debug('navShowStories');
  $allStoriesList.empty();
  putMyStoriesOnPage();
  $storyForm.hide();
}

$body.on('click', '#nav-my-stories', navShowStories);
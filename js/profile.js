import { methodWithToken } from "/js/functions.js";
import { createHtml } from "/js/functions.js";
import { getOptions } from "/js/functions.js";
import { profileUrl } from "/js/functions.js";
import { userToken } from "/js/functions.js";
import { profileUrlAuthor } from "/js/functions.js";

const loadProfile = document.querySelector("#load-profile");

function createProfile(profile) {
  const {
    name,
    avatar: { url },
    email,
  } = profile;

  const avatarElement = document.createElement("img");
  avatarElement.src = url;
  avatarElement.classList.add(
    "col-8",
    "col-sm-6",
    "col-md-12",
    "col-xl-9",
    "col-xxl-8",
    "profile-img"
  );
  avatarElement.alt = "Profile Picture";
  loadProfile.appendChild(avatarElement);

  const usernameElement = document.createElement("h3");
  usernameElement.classList.add("mt-3");
  usernameElement.innerText = name;
  loadProfile.appendChild(usernameElement);

  const emailElement = document.createElement("p");
  emailElement.classList.add("text-muted");
  emailElement.innerText = email;
  loadProfile.appendChild(emailElement);

  const followButton = document.createElement("button");
  followButton.classList.add("btn", "btn-primary");
  followButton.innerText = "Follow";
  loadProfile.appendChild(followButton);

  const badgesContainer = document.createElement("div");
  badgesContainer.classList.add("mt-3");
  loadProfile.appendChild(badgesContainer);

  const followersBadge = document.createElement("span");
  followersBadge.classList.add("badge", "badge-pill", "badge-primary");
  followersBadge.innerText = `3 Followers`;
  badgesContainer.appendChild(followersBadge);

  const followingBadge = document.createElement("span");
  followingBadge.classList.add(
    "badge",
    "badge-pill",
    "badge-secondary",
    "ms-2"
  );
  followingBadge.innerText = `10 Following`;
  badgesContainer.appendChild(followingBadge);
}

async function renderProfile() {
  try {
    const json = await methodWithToken(profileUrl, getOptions);
    const posts = json.data;

    createProfile(posts);
  } catch (error) {
    console.log(error);
  }
}

async function renderProfilePosts() {
  try {
    const json = await methodWithToken(profileUrlAuthor, getOptions);
    const posts = json.data;

    createHtml(posts);
  } catch (error) {
    console.log(error);
  }
}

renderProfile();

renderProfilePosts();

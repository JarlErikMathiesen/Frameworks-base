import { postsUrl } from "/js/functions.js";
import { postsUrlAuthor } from "/js/functions.js";
import { htmlParent } from "/js/functions.js";
import { createHtml } from "/js/functions.js";
import { methodWithToken } from "/js/functions.js";
import { getOptions } from "/js/functions.js";
import { API_KEY } from "/js/functions.js";
import { token } from "/js/functions.js";

async function renderPosts() {
  try {
    const json = await methodWithToken(postsUrlAuthor, getOptions);
    const posts = json.data;
    createHtml(posts);
  } catch (error) {
    console.log(error);
  }
}

renderPosts();

async function searchPosts() {
  const json = await methodWithToken(postsUrlAuthor, getOptions);

  const searchBar = document.querySelector("#search-posts");

  const posts = json.data;
  searchBar.onkeyup = function () {
    const searchValue = event.target.value.trim().toLowerCase();

    const searchedPosts = posts.filter(function (post) {
      if (post.title.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });
    console.log(searchedPosts);
    htmlParent.innerHTML = "";
    createHtml(searchedPosts);
  };
}

searchPosts();

async function filterPosts() {
  const json = await methodWithToken(postsUrlAuthor, getOptions);
  const posts = json.data;

  const filterButton = document.querySelectorAll(".filter-button");

  filterButton.forEach(function (button) {
    button.onclick = function () {
      const buttonFilteredId = button.id;

      const filteredPosts = posts.filter(function (post) {
        if (post.tags && post.tags.includes(buttonFilteredId)) {
          return true;
        }
      });
      htmlParent.innerHTML = "";
      createHtml(filteredPosts);
    };
  });
}

filterPosts();

const postButton = document.querySelector("#post-button");

postButton.onclick = async function (event) {
  event.preventDefault();

  const postTitle = document.querySelector("#post-title").value;
  const postText = document.querySelector("#post-content").value;
  const postMedia = document.querySelector("#post-media").value;
  const tagHumour = document.querySelector("#tag-humour").checked;
  const tagHelp = document.querySelector("#tag-help").checked;
  const tagWork = document.querySelector("#tag-work").checked;
  const tagInfo = document.querySelector("#tag-info").checked;

  let tags = [];
  if (tagHumour) tags.push("humour");
  if (tagHelp) tags.push("help");
  if (tagWork) tags.push("work");
  if (tagInfo) tags.push("info");

  let data = {
    ...(postTitle !== "" && { title: postTitle }),
    ...(postText !== "" && { body: postText }),
    ...(postMedia !== "" && { media: { url: postMedia } }),
    ...(tags.length > 0 && { tags }),
  };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(data),
  };

  try {
    await methodWithToken(postsUrl, postOptions);
    console.log(postText);
    console.log(postTitle);
    location.reload();
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

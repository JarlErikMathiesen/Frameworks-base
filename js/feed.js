import { postsUrl } from "/js/functions.js";
import { htmlParent } from "/js/functions.js";
import { createHtml } from "/js/functions.js";
import { methodWithToken } from "/js/functions.js";
import { getOptions } from "/js/functions.js";

async function renderPosts() {
  try {
    const json = await methodWithToken(postsUrl, getOptions);
    const posts = json.data;

    createHtml(posts);
  } catch (error) {
    console.log(error);
  }
}

renderPosts();

async function searchPosts() {
  const json = await methodWithToken(postsUrl, getOptions);
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
  const json = await methodWithToken(postsUrl, getOptions);
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

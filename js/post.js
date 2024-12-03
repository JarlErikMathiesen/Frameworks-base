import { postsUrl } from "/js/functions.js";
import { createPost } from "/js/functions.js";
import { fetchHeader } from "/js/functions.js";
import { methodWithToken } from "/js/functions.js";
import { getOptions } from "/js/functions.js";

const urlPar = new URLSearchParams(document.location.search);
const id = urlPar.get("id");

const postsUrlId = postsUrl + "/" + id;

async function renderPosts(url) {
  try {
    const json = await methodWithToken(url, getOptions);
    const posts = json.data;

    createPost(posts);
  } catch (error) {
    console.log(error);
  }
}

const authorTrue = "?_author=true";
const postsUrlIdAuthor = postsUrlId + authorTrue;
renderPosts(postsUrlIdAuthor);

const editButton = document.querySelector("#edit-button");

editButton.onclick = async function () {
  const postTitle = document.querySelector("#post-title").value;
  const postMedia = document.querySelector("#post-media").value;
  const postContent = document.querySelector("#post-content").value;

  let data = {
    ...(postTitle !== "" && { title: postTitle }),
    ...(postContent !== "" && { body: postContent }),
    ...(postMedia !== "" && { media: { url: postMedia } }),
  };

  const putOptions = {
    method: "PUT",
    headers: fetchHeader,
    body: JSON.stringify(data),
  };

  try {
    await methodWithToken(postsUrlId, putOptions);
    location.reload();
  } catch (error) {
    console.error("Error editing post:", error);
  }
};

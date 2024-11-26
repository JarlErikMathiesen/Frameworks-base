import { postWithToken } from "/js/functions.js";
import { deleteWithToken } from "/js/functions.js";
import { API_KEY } from "/js/functions.js";
import { getWithToken } from "/js/functions.js";
import { htmlParent } from "/js/functions.js";

/* const API_KEY = "a5f097d9-248c-4c77-b031-072c2064a6a3"; */
const API_BASE_URL = "https://v2.api.noroff.dev";
const API_AUTH = "/auth";
const API_REGISTER = "/register";
const API_LOGIN = "/login";
const API_KEY_URL = "/create-api-key";
const token = localStorage.getItem("accessToken");
const postsUrl = `${API_BASE_URL}/social/posts`;
const registerUrl = API_BASE_URL + API_AUTH + API_REGISTER;
const loginUrl = API_BASE_URL + API_LOGIN;
/* const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"; */

const deleteOptions = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": API_KEY,
  },
};

const putOptions = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": API_KEY,
  },
};

/* const htmlParent = document.querySelector("#loadedPosts"); */

async function renderPosts() {
  try {
    const json = await getWithToken(postsUrl);
    const posts = json.data;

    console.log(posts);

    posts.forEach((post) => {
      const postId = post.id;
      const postTitle = post.title;
      const postText = post.body;
      let postImage =
        post.media && post.media.url ? post.media.url : "images/noimage.webp";

      const wrapperElement = document.createElement("div");
      wrapperElement.classList.add("col-md-4", "col-lg-3");
      htmlParent.appendChild(wrapperElement);

      const cardElement = document.createElement("div");
      cardElement.classList.add("card", "card-post", "mb-4");
      wrapperElement.appendChild(cardElement);

      const imageElement = document.createElement("img");
      imageElement.classList.add("card-post-img");
      imageElement.src = postImage;
      imageElement.onerror = function () {
        this.src = "images/noimage.webp";
      };
      cardElement.appendChild(imageElement);

      const cardBodyElement = document.createElement("div");
      cardBodyElement.classList.add("card-body");
      cardElement.appendChild(cardBodyElement);

      const titleElement = document.createElement("h5");
      titleElement.classList.add("card-title");
      titleElement.innerText = postTitle;
      cardBodyElement.appendChild(titleElement);

      const textElement = document.createElement("p");
      textElement.classList.add("card-text", "text-truncate");
      textElement.innerText = postText;
      cardBodyElement.appendChild(textElement);

      const spanButtonElement = document.createElement("div");
      spanButtonElement.classList.add("d-flex-column");
      cardBodyElement.appendChild(spanButtonElement);

      const postButtonElement = document.createElement("a");
      postButtonElement.classList.add("btn", "btn-primary", "m-2");
      postButtonElement.id = `post-button`;
      postButtonElement.innerText = "View details";
      postButtonElement.href = `post.html?id=${postId}`;
      spanButtonElement.appendChild(postButtonElement);

      const deleteButtonElement = document.createElement("btn");
      deleteButtonElement.classList.add(
        "btn",
        "btn-primary",
        "m-2",
        "delete-button"
      );
      deleteButtonElement.innerText = "Delete post";
      spanButtonElement.appendChild(deleteButtonElement);

      deleteButtonElement.onclick = async () => {
        try {
          await deleteWithToken(postId);
          location.reload();
        } catch (error) {
          console.error("Error adding post:", error);
        }
      };
    });
  } catch (error) {
    console.log(error);
  }
}

renderPosts();

const postButton = document.querySelector("#post-button");

postButton.onclick = async function (event) {
  event.preventDefault();

  const postTitle = document.querySelector("#post-title").value;
  const postText = document.querySelector("#post-content").value;
  const postMedia = document.querySelector("#post-media").value;

  let data = {
    ...(postTitle !== "" && { title: postTitle }),
    ...(postText !== "" && { body: postText }),
    ...(postMedia !== "" && { media: { url: postMedia } }),
  };

  try {
    await postWithToken(postsUrl, data);
    console.log(postText);
    console.log(postTitle);
    /* location.reload(); */
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

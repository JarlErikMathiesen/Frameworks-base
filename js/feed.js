import { getWithToken } from "/js/functions.js";
import { postsUrl } from "/js/functions.js";
import { htmlParent } from "/js/functions.js";

async function renderPosts() {
  try {
    const json = await getWithToken(postsUrl);
    const posts = json.data;

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

      deleteButtonElement.onclick = () => {
        deleteWithToken(postId);
      };
    });
  } catch (error) {
    console.log(error);
  }
}

renderPosts();

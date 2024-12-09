export const API_KEY = "a5f097d9-248c-4c77-b031-072c2064a6a3";
const API_BASE_URL = "https://v2.api.noroff.dev";
const API_AUTH = "/auth";
const API_REGISTER = "/register";
const API_LOGIN = "/login";
const API_SOCIAL = "/social/posts";
const authorTrue = "?_author=true";
const profileEndpoint = "/social/profiles";

export const userToken = localStorage.getItem("userToken");
export const token = localStorage.getItem("accessToken");
export const htmlParent = document.querySelector("#loadedPosts");

export const postsUrl = API_BASE_URL + API_SOCIAL;
export const postsUrlAuthor = API_BASE_URL + API_SOCIAL + authorTrue;
export const registerUrl = API_BASE_URL + API_AUTH + API_REGISTER;
export const loginUrl = API_BASE_URL + API_AUTH + API_LOGIN;

export const profileUrl = API_BASE_URL + profileEndpoint + "/" + userToken;
export const profileUrlAuthor = profileUrl + "/posts";

export function createHtml(posts) {
  posts.forEach((post) => {
    const { id, title, body, author, media } = post;

    let name = author?.name;
    let avatarUrl = author?.avatar?.url;
    let postImage = media && media.url ? media.url : "images/noimage.webp";

    const cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-post", "mb-4");
    htmlParent.appendChild(cardElement);

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

    if (author) {
      const spanUserElement = document.createElement("span");
      spanUserElement.classList.add("d-flex");
      cardBodyElement.appendChild(spanUserElement);

      const avatarElement = document.createElement("img");
      avatarElement.classList.add("card-post-avatar");
      avatarElement.src = avatarUrl;
      spanUserElement.appendChild(avatarElement);

      const nameElement = document.createElement("h5");
      nameElement.classList.add("card-post-name");
      nameElement.innerText = `posted by ${name}`;
      spanUserElement.appendChild(nameElement);
    }

    const titleElement = document.createElement("h5");
    titleElement.classList.add("card-title");
    titleElement.innerText = title;
    cardBodyElement.appendChild(titleElement);

    const textElement = document.createElement("p");
    textElement.classList.add("card-text", "text-truncate");
    textElement.innerText = body;
    cardBodyElement.appendChild(textElement);

    const spanButtonElement = document.createElement("div");
    spanButtonElement.classList.add("d-flex-column");
    cardBodyElement.appendChild(spanButtonElement);

    const postButtonElement = document.createElement("a");
    postButtonElement.classList.add("btn", "btn-primary", "m-2");
    postButtonElement.id = `post-button`;
    postButtonElement.innerText = "View details";
    postButtonElement.href = `post.html?id=${id}`;
    spanButtonElement.appendChild(postButtonElement);
  });
}

export const fetchHeader = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
  "X-Noroff-API-Key": API_KEY,
};

export const getOptions = {
  method: "GET",
  headers: fetchHeader,
};

const deleteOptions = {
  method: "DELETE",
  headers: fetchHeader,
};

/**
 * Function that uses the fetch method with a token attached to the
 * fetchoptions and sends different HTTP-requests depending on the argument
 *
 *
 * @param {string} postsUrl The url for the fetch request
 * @param {object} fetchOptions The HTTP-method and header with the token and API-key
 * @returns
 */
export async function methodWithToken(postsUrl, fetchOptions) {
  try {
    const response = await fetch(postsUrl, fetchOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export function createPost(posts) {
  const { id, title, body, author, media } = posts;
  const postsUrlId = postsUrl + "/" + id;

  let name = author?.name;
  let avatarUrl = author?.avatar?.url;

  let postImage = media && media.url ? media.url : "images/noimage.webp";

  const imageElement = document.createElement("img");
  imageElement.classList.add("card-post-img-id");
  imageElement.src = postImage;
  imageElement.onerror = function () {
    this.src = "images/noimage.webp";
  };

  const cardElement = document.createElement("div");
  cardElement.classList.add("card", "card-post-id", "mb-4");
  htmlParent.appendChild(cardElement);

  cardElement.appendChild(imageElement);

  const cardBodyElement = document.createElement("div");
  cardBodyElement.classList.add("card-body");
  cardElement.appendChild(cardBodyElement);

  if (author) {
    const spanUserElement = document.createElement("span");
    spanUserElement.classList.add("d-flex");
    cardBodyElement.appendChild(spanUserElement);

    const avatarElement = document.createElement("img");
    avatarElement.classList.add("card-post-avatar");
    avatarElement.src = avatarUrl;
    spanUserElement.appendChild(avatarElement);

    const nameElement = document.createElement("h5");
    nameElement.classList.add("card-post-name");
    nameElement.innerText = `posted by ${name}`;
    spanUserElement.appendChild(nameElement);
  }

  const titleElement = document.createElement("h5");
  titleElement.classList.add("card-title");
  titleElement.innerText = title;
  cardBodyElement.appendChild(titleElement);

  const textElement = document.createElement("p");
  textElement.classList.add("card-text");
  textElement.innerText = body;
  cardBodyElement.appendChild(textElement);

  if (author.name === userToken) {
    const spanButtonElement = document.createElement("div");
    spanButtonElement.classList.add("d-flex-column");
    cardBodyElement.appendChild(spanButtonElement);

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
      methodWithToken(postsUrlId, deleteOptions);
      window.location.href = "feed.html";
    };

    const editWrapper = document.createElement("div");
    editWrapper.classList.add("card");
    cardBodyElement.appendChild(editWrapper);

    const editFormHeader = document.createElement("h4");
    editFormHeader.innerText = "Edit post";
    editWrapper.appendChild(editFormHeader);

    const titleGroup = document.createElement("span");
    titleGroup.classList.add("form-group");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "post-title");
    titleLabel.innerText = "Title";

    const titleInput = document.createElement("input");
    titleInput.setAttribute("id", "post-title");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("placeholder", "Title");
    titleInput.classList.add("form-control");

    titleGroup.appendChild(titleLabel);
    titleGroup.appendChild(titleInput);
    editWrapper.appendChild(titleGroup);

    const mediaLabel = document.createElement("label");
    mediaLabel.setAttribute("for", "post-media");
    mediaLabel.innerText = "Add image";

    const mediaInput = document.createElement("input");
    mediaInput.setAttribute("id", "post-media");
    mediaInput.setAttribute("type", "text");
    mediaInput.setAttribute("placeholder", "Add image URL");
    mediaInput.setAttribute("name", "upload");

    editWrapper.appendChild(mediaLabel);
    editWrapper.appendChild(mediaInput);

    const contentGroup = document.createElement("div");
    contentGroup.classList.add("form-group");

    const contentLabel = document.createElement("label");
    contentLabel.setAttribute("for", "post-content");
    contentLabel.innerText = "Content";

    const contentInput = document.createElement("input");
    contentInput.setAttribute("id", "post-content");
    contentInput.setAttribute("type", "text");
    contentInput.setAttribute("placeholder", "Post content");
    contentInput.classList.add("form-control");

    const editButton = document.createElement("button");
    editButton.setAttribute("id", "edit-button");
    editButton.setAttribute("type", "submit");
    editButton.classList.add("btn", "btn-primary", "mt-2");
    editButton.innerText = "Edit";

    contentGroup.appendChild(contentLabel);
    contentGroup.appendChild(contentInput);
    contentGroup.appendChild(editButton);

    editWrapper.appendChild(contentGroup);

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
  }
}

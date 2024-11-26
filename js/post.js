const API_KEY = "a5f097d9-248c-4c77-b031-072c2064a6a3";
const API_BASE_URL = "https://v2.api.noroff.dev";
const API_AUTH = "/auth";
const API_REGISTER = "/register";
const API_LOGIN = "/login";
const API_KEY_URL = "/create-api-key";
const API_SOCIAL = "/social/posts";

const registerUrl = API_BASE_URL + API_AUTH + API_REGISTER;

const token = localStorage.getItem("accessToken");

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

async function methodWithToken(postId, fetchOptions) {
  try {
    const postsUrl = `${API_BASE_URL}/social/posts`;
    const postsUrlId = postsUrl + "/" + postId;
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const response = await fetch(postsUrlId, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function deleteWithToken(postId) {
  try {
    const postsUrl = `${API_BASE_URL}/social/posts`;
    const postsUrlId = postsUrl + "/" + postId;
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };
    const response = await fetch(postsUrlId, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

const postsUrl = `${API_BASE_URL}/social/posts`;

async function getWithToken(url) {
  try {
    console.log(url);
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };
    const response = await fetch(url, fetchOptions);
    console.log(response);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

const htmlParent = document.querySelector("#loadedPosts");

const urlPar = new URLSearchParams(document.location.search);
const id = urlPar.get("id");

console.log(id);
const postsUrlId = postsUrl + "?id=" + id;

console.log(postsUrlId);

async function renderPosts() {
  try {
    const json = await getWithToken(`${API_BASE_URL}/social/posts/${id}`);
    const posts = json.data;

    function createPost(posts) {
      const postId = posts.id;
      const postTitle = posts.title;
      const postText = posts.body;
      let postImage =
        posts.media && posts.media.url
          ? posts.media.url
          : "images/noimage.webp";

      console.log(postId);

      const cardElement = document.createElement("div");
      cardElement.classList.add("card", "card-post-id", "mb-4");
      htmlParent.appendChild(cardElement);

      const imageElement = document.createElement("img");
      imageElement.classList.add("card-post-img-id");
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
      textElement.classList.add("card-text");
      textElement.innerText = postText;
      cardBodyElement.appendChild(textElement);

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
        methodWithToken(postId, deleteOptions);
      };
    }
    createPost(posts);
  } catch (error) {
    console.log(error);
  }
}

renderPosts();

async function putWithToken(url, data) {
  try {
    console.log(url);
    const token = localStorage.getItem("accessToken");
    const postsUrl = `${API_BASE_URL}/social/posts`;
    const postsUrlId = postsUrl + "/" + id;
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(postsUrlId, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

const editButton = document.querySelector("#edit-button");

editButton.onclick = async function () {
  const postTitle = document.querySelector("#post-title").value;
  const postMedia = document.querySelector("#post-media").value;
  const postContent = document.querySelector("#post-content").value;

  let data = {
    ...(postContent !== "" && { title: postContent }),
    ...(postTitle !== "" && { title: postTitle }),
    ...(postMedia !== "" && { media: { url: postMedia } }),
  };

  putWithToken(postsUrlId, data);
};

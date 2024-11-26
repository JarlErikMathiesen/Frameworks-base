const API_BASE_URL = "https://api.noroff.dev";

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

const postsUrl = `${API_BASE_URL}/api/v1/social/posts`;

/* getWithToken(postsUrl); */

async function deleteWithToken(postId) {
  try {
    const postsUrl = `${API_BASE_URL}/api/v1/social/posts/${postId}`;
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(postsUrl, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

const htmlParent = document.querySelector("#loadedPosts");

async function renderPosts() {
  try {
    const posts = await getWithToken(postsUrl);
    console.log(posts);

    posts.forEach((post) => {
      const postId = post.id;
      const postTitle = post.title;
      const postText = post.body;
      const postAuthor = post._author;
      let postImage = post.media || "images/noimage.webp";

      console.log(postAuthor);

      const wrapperElement = document.createElement("div");
      wrapperElement.classList.add("col-md-4", "col-lg-3");
      htmlParent.appendChild(wrapperElement);

      const cardElement = document.createElement("div");
      cardElement.classList.add("card", "card-post", "mb-4");
      wrapperElement.appendChild(cardElement);

      const imageElement = document.createElement("img");
      imageElement.classList.add("card-post-img");
      imageElement.src = postImage;
      imageElement.alt = "Post Thumbnail";
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

      const postButtonElement = document.createElement("btn");
      postButtonElement.classList.add("btn", "btn-primary", "m-2");
      postButtonElement.id = `post-button`;
      postButtonElement.innerText = "View details";
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

/* postWithToken(postsUrl, data); */

/* deleteWithToken(postId); */

async function postWithToken(url, data) {
  try {
    console.log(url);
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

const postButton = document.querySelector("#post-button");

postButton.onclick = async function (event) {
  event.preventDefault();

  const postTitle = document.querySelector("#post-title").value;
  const postContent = document.querySelector("#post-content").value;
  const postMedia = document.querySelector("#post-media").value;

  console.log(postMedia);

  const data = {
    title: postTitle,
    body: postContent,
    media: postMedia,
  };

  postWithToken(postsUrl, data);
};

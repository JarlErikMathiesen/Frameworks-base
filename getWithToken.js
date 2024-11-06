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
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

const postsUrl = `${API_BASE_URL}/api/v1/social/posts`;

/* getWithToken(postsUrl); */

const htmlParent = document.querySelector("#loadedPosts");

async function renderPosts() {
  try {
    const posts = await getWithToken(postsUrl);
    console.log(posts);

    posts.forEach((post) => {
      const postTitle = post.title;
      const postText = post.body;
      const postImage = post.media;

      const wrapperElement = document.createElement("div");
      wrapperElement.classList.add("col-md-4", "col-lg-3");

      const cardElement = document.createElement("div");
      cardElement.classList.add("card", "card-post", "mb-4");

      const imageElement = document.createElement("img");
      imageElement.classList.add("card-post-img");
      imageElement.src = postImage;
      imageElement.alt = "Post Thumbnail";

      const cardBodyElement = document.createElement("div");
      cardBodyElement.classList.add("div");

      const titleElement = document.createElement("h5");
      titleElement.classList.add("card-title");
      titleElement.innertext = postTitle;

      htmlParent.innerHTML += `<div class="col-md-4 col-lg-3">
            <div class="card card-post mb-4">
              <img
                src="${postImage}"
                class="card-post-img"
                alt="Post Thumbnail"
              />
              <div class="card-body">
                <h5 class="card-title">${postTitle}</h5>
                <p class="card-text text-truncate">
                  ${postText}
                </p>
                <a href="#" class="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>`;
    });
  } catch (error) {
    console.log(error);
  }
}

renderPosts();

/* async function displayBlogPosts() {
  try {
      const posts = await getBlogPosts(`${baseUrl}${urlEmbed}&per_page=${perPage}`);
      blogPosts.innerHTML = "";
      
      posts.forEach(function(post){
          const postTitle = post.title.rendered;
          const postId = post.id;
          const postExcerpt = post.excerpt.rendered;
          const postDate = post.date;
          const postAuthor = post._embedded.author[0].name;
          const postDateClean = postDate.replace(/T/g, ' ');


          IfBlogCardHasImage(post);

          blogPosts.innerHTML += `
              <a href="blog.html?id=${postId}" class="blog-card blog-card-main">
                      ${imageHtml}
                      <h2>${postTitle}</h2>
                      <span>${postDateClean}</span>
                      <span>${postAuthor}</span>
                      ${postExcerpt}
              </a>`;

          const blogCardMain = document.querySelectorAll(".blog-card-main");
          addHoverEffect(blogCardMain);
      });

      handleScrolling();
      
  } catch (error) {
      blogPosts.innerHTML = `<h2 class="error">An error has occurred while loading the page</h2>`;
  }
} */

function createHtmlObject() {
  const element = document.createElement("div");
  element.classList.add("user");
  element.innertext = user.contact.email;
  return element;
}

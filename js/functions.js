export const API_KEY = "a5f097d9-248c-4c77-b031-072c2064a6a3";
export const API_BASE_URL = "https://v2.api.noroff.dev";
export const token = localStorage.getItem("accessToken");
export const htmlParent = document.querySelector("#loadedPosts");
export const postsUrl = `${API_BASE_URL}/social/posts`;

export async function postWithToken(url, data) {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
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

export async function deleteWithToken(postId) {
  try {
    const postsUrl = `${API_BASE_URL}/social/posts`;
    const postsUrlId = postsUrl + "/" + postId;
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

export async function getWithToken(url) {
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

/* async function getAPIkey() {
  const response = await fetch(API_BASE_URL + API_AUTH + API_KEY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: "Test key",
    }),
  });

  if (response.ok) {
    return await response.json();
  }
  console.error(await response.json());

  throw new Error("Could not register for an API key!");
} */

//getAPIkey();

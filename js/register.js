import { registerUrl } from "/js/functions.js";

// End-points:
// Register: /api/v1/social/auth/register

//  ----------------- Registers user

/**
 * API call that registers the user
 * @param {string} url
 * @param {any} data
 *  ``` js
 *  registerUser(registerUrl, user);
 *  ```
 */

const userName = document.querySelector("#name");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");
const formButton = document.querySelector("#form-button");
const loadedHtml = document.querySelector("#loaded-html");
const closeButton = document.querySelector("#data-close-modal");
const modal = document.querySelector("#data-modal");

formButton.onclick = function (event) {
  event.preventDefault();

  const userNameValue = userName.value;
  const userEmailValue = userEmail.value;
  const userPasswordValue = userPassword.value;

  const userToRegister = {
    name: userNameValue,
    email: userEmailValue,
    password: userPasswordValue,
  };

  registerUser(registerUrl, userToRegister);
};

//  ------------ Login User

async function registerUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    loadedHtml.innerHTML = "";

    if (response.ok) {
      const appendedHtml = document.createElement("div");
      const loginButton = document.createElement("button");
      appendedHtml.innerText = "Registry successful";
      loginButton.innerText = "Login";
      loadedHtml.append(appendedHtml);
      loadedHtml.append(loginButton);
      modal.showModal();
      loginButton.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    } else {
      json.errors.forEach((error) => {
        console.log(error.message);
        const appendedHtml = document.createElement("div");
        appendedHtml.innerText = error.message;
        loadedHtml.append(appendedHtml);
        modal.showModal();
      });
    }
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

closeButton.addEventListener("click", () => {
  modal.close();
});

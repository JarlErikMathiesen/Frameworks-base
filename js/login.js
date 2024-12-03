import { API_KEY } from "/js/functions.js";
import { loginUrl } from "/js/functions.js";

const loadedHtml = document.querySelector("#loaded-html");
const closeButton = document.querySelector("#data-close-modal");
const modal = document.querySelector("#data-modal");

async function loginUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    const json = await response.json();
    loadedHtml.innerHTML = "";

    if (response.ok) {
      const accessToken = json.data.accessToken;
      const userToken = json.data.name;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userToken", userToken);
      window.location.href = "profile.html";
      console.log(json);
      console.log(json.data.accessToken);
      console.log(json.data.name);
    } else {
      console.log(json);
      json.errors.forEach((error) => {
        console.log(error.message);
        const appendedHtml = document.createElement("div");
        appendedHtml.innerText = error.message;
        loadedHtml.append(appendedHtml);
        modal.showModal();
      });
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

const formButton = document.querySelector("#form-button");

formButton.onclick = function (event) {
  event.preventDefault();

  const userEmail = document.querySelector("#email").value;
  const userPassword = document.querySelector("#password").value;

  const userToLogin = {
    email: userEmail,
    password: userPassword,
  };

  loginUser(loginUrl, userToLogin);
};

closeButton.addEventListener("click", () => {
  modal.close();
});

const API_BASE_URL = "https://api.noroff.dev";
const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`;

const loadedHtml = document.querySelector("#loaded-html");
const closeButton = document.querySelector("#data-close-modal");
const modal = document.querySelector("#data-modal");

async function loginUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    const json = await response.json();
    loadedHtml.innerHTML = "";

    if (response.ok) {
      const accessToken = json.accessToken;
      localStorage.setItem("accessToken", accessToken);
      window.location.href = "profile.html";
      console.log(json);
    } else {
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

/* const userToRegister = {
  name: "catzy_account_b",
  email: "dogzy-account-b@noroff.no",
  password: "your-password",
}; */

closeButton.addEventListener("click", () => {
  modal.close();
});

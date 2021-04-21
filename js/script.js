//To target the div where profile information will appear.
const overview = document.querySelector(".overview");

const username = "ElizabethRomig";

const fetchInfo = async function(){
    const info = await fetch(`https://api.github.com/users/${username}`);
    const response = await info.json();
    console.log(response);
    displayUser(response);
}

fetchInfo();

const displayUser = function(data) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = 
        `<figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>`
    overview.appendChild(newDiv);
}


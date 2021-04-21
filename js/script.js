//To target the div where profile information will appear.
const overview = document.querySelector(".overview");

//to target the ul for repo display
const repoDisplay = document.querySelector(".repo-list");

const username = "ElizabethRomig";

//Retrieves user data
const fetchUser = async function(){
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    displayUser(data);
}

//Displays user profile information
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

//Retrieves repos
const fetchRepos = async function (){
    const response = await fetch(`https://api.github.com/users/${username}/repos?type=public&sort=updated&per_page=100`);
    const repos = await response.json();
    displayRepos(repos);
}

const displayRepos = function(repos){
    repos.forEach(function(repo) {
        const listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = repo.name;
        repoDisplay.appendChild(listItem);
    })
}

fetchUser();
fetchRepos();


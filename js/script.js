//To target the div where profile information will appear.
const overview = document.querySelector(".overview");

//to target the ul for repo display
const repoDisplay = document.querySelector(".repo-list");

//Selects the section with a class of "repos" where all repo information appears
const repoInformation = document.querySelector(".repos");

//Selects the section with a class of "repo-data" where the individual repo data will appear
const repoData = document.querySelector(".repo-data");

const viewRepos = document.querySelector(".view-repos");



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
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoDisplay.appendChild(listItem);
    })
}

fetchUser();
fetchRepos();

repoDisplay.addEventListener("click", function(e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        selectedRepo(repoName);
    }
})

const selectedRepo = async function (repoName){
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await response.json();
    console.log (repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    let languages = [];
    for (let language in languageData){
        languages.push(language)
    };
    //console.log (languages)
    displaySelectedRepo(repoInfo, languages);
}

const displaySelectedRepo = function(repoInfo, languages) {
    repoData.innerHTML = null;
    const newDiv = document.createElement("div");
    newDiv.innerHTML = 
    `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.appendChild(newDiv);
    repoData.classList.remove("hide");
    repoInformation.classList.add("hide");
    viewRepos.classList.remove("hide");
}
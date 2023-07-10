const t0 = performance.now();
const searchInput = document.getElementById("search-input")
const searchIcon = document.querySelector(".search-icon");
const collectionPaletteDiv = document.querySelector(".collection-palette-div");
const copyNotifDiv = document.querySelector(".copy-notif-div");
const copyNotif = document.querySelector(".copy-notif");
const cardsDiv = document.querySelector(".cards-div");
const moreButton = document.querySelector(".more-button");
const cpaletteCreate = `
let cpaletteDiv = document.createElement("div");
collectionPaletteDiv.appendChild(cpaletteDiv);
for (let i = 0; i < 4; i++){
    let cp = document.createElement("div")
    cp.classList.add("cp" + i, "cplace")
    cp.style.backgroundColor = 
    cpaletteDiv.appendChild(cp);
}
`
let copiedText = "";
let palettesShowCount = 12;
let paletteColors = []
document.addEventListener("click", activeCheck);

for (let i = 0; i < palettesShowCount; i++){
    genrate4colors();
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    let paletteDiv = document.createElement("div");
    paletteDiv.classList.add("palette-div");
    cardContainer.appendChild(paletteDiv)
    for (let i = 1; i < 5; i++){
        let place = document.createElement("div");
        place.classList.add(`c${i}`, "place");
        place.style.backgroundColor = `rgb(${genrate4colors()})`
        paletteDiv.appendChild(place);
        let tagSpan = document.createElement("span");
        tagSpan.classList.add("color-tag", `tag${i}`);
        let colorTag = place.style.backgroundColor;
        colorTag = colorTag.replace("rgb", ""); colorTag = colorTag.replace("(", ""); colorTag = colorTag.replace(")", "");
        tagSpan.innerText = colorTag
        place.appendChild(tagSpan)
    }
    let cardInfoDiv = document.createElement("div");
    cardInfoDiv.classList.add("card-info-div");
    cardContainer.appendChild(cardInfoDiv);
    let buttonLike = document.createElement("button");
    buttonLike.classList.add("like-button");
    cardInfoDiv.appendChild(buttonLike);
    let likeIcon = document.createElement("img");
    likeIcon.src = "./Assets/heart.svg";
    likeIcon.classList.add("like-icon");
    buttonLike.appendChild(likeIcon);
    let likeNumber = document.createElement("p");
    likeNumber.classList.add("like-number");
    likeNumber.innerText = Math.round(Math.random() * 500);
    buttonLike.appendChild(likeNumber);
    let publishDate = document.createElement("p");
    publishDate.classList.add("publish-date");
    publishDate.innerText = "Today";
    cardInfoDiv.appendChild(publishDate)
    cardsDiv.appendChild(cardContainer)
}

function genrate4colors(){
    for (let i=0; i < 4; i++){
        const randomNumber = Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255);
        return randomNumber;
        paletteColors.push(randomNumber);
        paletteColors = [];
    }
}


function activeCheck(){
    if(searchInput.matches(':focus')){
        searchInput.toggleAttribute("focused");
    }else {
        searchInput.removeAttribute("focused");
    }
    if(searchInput.hasAttribute("focused")){
        searchIcon.style.opacity = "0%";
        searchInput.style.paddingLeft = "1rem"
    }else{
        searchIcon.style.opacity = "100%";
        searchInput.style.paddingLeft = "2.5rem"
    }
}
// --------------------------------------------------------
const ColorTags = document.querySelectorAll(".color-tag");
for (let i of ColorTags){
    i.addEventListener("click", () => {
    copiedText = ColorTags.innerText;
    navigator.clipboard.writeText(i.innerText).then(() => {
        copyNotifDiv.style.display = 'block';
        copyNotif.style.animation = `copy-notif-start .7s ease 1`
        setTimeout(() =>{
            copyNotif.style.animation = `copy-notif-end .7s ease 1`
            setTimeout(() => {
                copyNotifDiv.style.display = 'none'
            }, 500)
        }, 3000)
    }, () => {
        console.error("Failed")
    });
});
}
const likeButtons = document.querySelectorAll(".like-button");
for (let i of likeButtons){
    i.addEventListener("click", (e) => {
        console.log(paletteColors)
        e.target.toggleAttribute("liked");
        if (e.target.hasAttribute("liked")){
            e.target.style.backgroundColor = "rgb(236, 236, 236)"
            e.target.querySelector(".like-icon").src = "./Assets/heart-fill.svg";
            let likeCount = Number(e.target.querySelector(".like-number").innerText);
            likeCount++;
            e.target.querySelector(".like-number").innerText = likeCount;
            console.log(e.target.parentElement.parentElement.querySelector(".palette-div").querySelector(`.c${1}`).style.backgroundColor);
            let cpaletteDiv = document.createElement("div");
            cpaletteDiv.classList.add("cpalette-div");
            collectionPaletteDiv.appendChild(cpaletteDiv);
            for (let i = 1; i < 5; i++){
                let cp = document.createElement("div")
                cp.classList.add(`cp${i}`, "cplace")
                let bgColor = e.target.parentElement.parentElement.querySelector(`.c${i}`).style.backgroundColor;
                let newBgColor = bgColor.replace(/\s/g, '');;
                cpaletteDiv.classList.add(newBgColor);
                cp.style.backgroundColor = bgColor;
                cpaletteDiv.appendChild(cp);
            }
        }else{
            e.target.querySelector(".like-icon").src = "./Assets/heart.svg";
            e.target.style.backgroundColor = "rgb(255, 255, 255)"
            let likeCount = Number(e.target.querySelector(".like-number").innerText);
            likeCount--;
            e.target.querySelector(".like-number").innerText = likeCount;
            let bgColor = e.target.parentElement.parentElement.querySelector(`.c${1}`).style.backgroundColor;
            let newBgColor = bgColor.replace(/\s/g, '');
            if(collectionPaletteDiv.getElementsByClassName(`${newBgColor}`)){
                let targetElement = collectionPaletteDiv.getElementsByClassName(`${newBgColor}`)
                targetElement[0].remove()
            }
        }
    })
}
moreButton.addEventListener("click", () => {
    moreButton.toggleAttribute("extended")
    if (moreButton.hasAttribute("extended")){
        document.querySelector(".more-logo").src = "./Assets/more-fill.svg"
        document.querySelector(".menu-div").style.display = "block"
        document.querySelector(".menu-div").style.visibility = "visible"
    }else {
        document.querySelector(".more-logo").src = "./Assets/more.svg"
        document.querySelector(".menu-div").style.display = "none"
        document.querySelector(".menu-div").style.visibility = "hidden"
    }
})
const t1 = performance.now();
console.log(`Time it takes to run the function: ${t1 - t0} ms`)






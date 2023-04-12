const container = document.querySelector(".content");
const baseURL = "https://source.unsplash.com/random/";
const  rows = 8;

for (let i = 0; i < rows * 4; i++) {
    const img = document.createElement("img");
    img.src = `${baseURL}${randomSize()}`;
    container.appendChild(img);    
}

function randomSize(){
    return `${randomNumber()}x${randomNumber()}`;
}
function randomNumber(){
    return Math.floor(Math.random()*10) + 300;
}


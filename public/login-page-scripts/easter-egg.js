const weatherEmojis = ["☀️", "☁️", "⛅", "🌦️", "🌤️"];
var compt = 0;

function switchEmojis() {
    const emojis = document.getElementById("emoji_icon");
    if (compt === weatherEmojis.length){
        compt = 0;
    }
    else {
        emojis.textContent = weatherEmojis[compt];
        compt++;
    }
}
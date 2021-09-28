//const text = document.getElementsByClassName('captions-display--captions-cue-text--ECkJu')[0].innerText;
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#start").addEventListener("click", start);
});

function start() {
    const text = "Language of the text to be translated. Options currently available";
    const api_key = config.apiKey;
    let method = "POST";
    let headers = {
    "Content-type": "application/x-www-form-urlencoded; utf-8"
    };

    let body = { auth_key: api_key, text: text, target_lang: "JA" };
    let data = new URLSearchParams(body);
    Object.keys(body).forEach((key) => data.append(key, body[key]));
    var request = new Request("https://api-free.deepl.com/v2/translate", );

    fetch("https://api-free.deepl.com/v2/translate", {"method":method, "headers":headers, "body":data})
    .then((res) => console.log(res.json()))
    .catch(console.error);
}
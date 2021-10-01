document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#start").addEventListener("click", clickStart);
});

const callBack = (mutationList, observer) => {
  
  mutationList.forEach((mutation) => {
    switch(mutation.type) {
      case 'childList':
        console.log("aaa");
        console.log(mutation.addedNodes[0].textContent);
        console.log(mutation.removedNodes[0].textContent);
        chrome.i18n.detectLanguage(mutation.addedNodes[0].textContent, (result) => {
          if (result.languages[0].language != 'JP') {
            translate(mutation.addedNodes[0].textContent);
          }
        });
        break;
    }
  });
}

const clickStart = () => {
  // const targetNode = document.getElementsByClassName('captions-display--captions-cue-text--ECkJu')[0];
  // const targetNode = document.getElementsByClassName('test')[0];
  const targetNode = document.querySelector('.test');
  // const targetNode = document.querySelector('.captions-display--captions-cue-text--ECkJu');
  const observerOptions = {
    childList: true,
    subtree: true,
  }
  
  const observer = new MutationObserver(callBack);
  observer.observe(targetNode, observerOptions);
}



const translate = (text) => {
  const api_key = config.apiKey;
  const method = "POST";
  const headers = {
    "Content-type": "application/x-www-form-urlencoded; utf-8",
  };

  let recBody = { auth_key: api_key, text: text, target_lang: "JA" };
  // let data = new URLSearchParams(recBody);
  // Object.keys(recBody).forEach((key) => data.append(key, recBody[key]));
  var request = new Request("https://api-free.deepl.com/v2/translate");

  fetch("https://api-free.deepl.com/v2/translate", {
    method: method,
    headers: headers,
    body: recBody,
  })
    .then((res) => {
      console.log(res.json())
    })
    .catch(console.error);
}


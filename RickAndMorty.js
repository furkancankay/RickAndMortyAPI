var link = "https://rickandmortyapi.com/api/character?page=1";
var who = "";
var pageNumber = 1;
var totalPage = 42;


function prevPage() {
  var pageId = document.getElementById("pageId");

  if (pageNumber != 1) {
    fetch(link, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("HTTP hata kodu: " + response.status);
        }
      })
      .then((data) => {

        pageNumber = parseInt(data.results[0].id/20);
        pageId.textContent=pageNumber.toString();

        console.log(pageNumber);
        link = link.substring(0, 47) + pageNumber.toString();
        console.log(link);
        getCharactersData(who);

      });
  }
}
function nextPage() {
  var pageId = document.getElementById("pageId");
  if (pageNumber != totalPage) {
    fetch(link, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("HTTP hata kodu: " + response.status);
        }
      })
      .then((data) => {
        pageNumber = parseInt(data.results[0].id/20)+2;
        if(data.results[0].id != 1){
          pageId.textContent=pageNumber.toString();
        }
        else{
          pageId.textContent ='2'
        }
        console.log(pageNumber);
        link = link.substring(0, 47) + pageNumber.toString();
        console.log(link);
        getCharactersData(who);
      });
  }
}

function getCharactersData(isAlive) {
  fetch(link, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("HTTP hata kodu: " + response.status);
      }
    })
    .then((data) => {
      totalPage = data.info.pages;
      if (isAlive == "all") {
        var characters = document.getElementById("characters");
        characters.innerHTML = "";
        for (let i = 0; i < data.results.length; i++) {
          var card = document.createElement("div");
          card.classList.add("card");

          var cardImg = document.createElement("img");
          cardImg.src = data.results[i].image;
          cardImg.className = "char-img";

          var cardTitle = document.createElement("h2");
          cardTitle.textContent = data.results[i].name;

          var cardContent = document.createElement("p");
          if (data.results[i].gender == "Male") {
            var charGender = "He";
          } else if (data.results[i].gender == "Female") {
            var charGender = "She";
          } else if (data.results[i].gender == "unknown") {
            var charGender = "It";
          }
          var content =
            charGender + " is living in " + data.results[i].location.name;
          cardContent.textContent = content;

          card.appendChild(cardImg);
          card.appendChild(cardTitle);
          card.appendChild(cardContent);

          characters.appendChild(card);
        }
      } else if (isAlive == "Alive") {
        var characters = document.getElementById("characters");
        characters.innerHTML = "";
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].status == "Alive") {
            var card = document.createElement("div");
            card.classList.add("card");

            var cardImg = document.createElement("img");
            cardImg.src = data.results[i].image;
            cardImg.className = "char-img";

            var cardTitle = document.createElement("h2");
            cardTitle.textContent = data.results[i].name;

            var cardContent = document.createElement("p");
            if (data.results[i].gender == "Male") {
              var charGender = "He";
            } else if (data.results[i].gender == "Female") {
              var charGender = "She";
            } else if (data.results[i].gender == "unknown") {
              var charGender = "It";
            }
            var content =
              charGender + " is living in " + data.results[i].location.name;
            cardContent.textContent = content;

            card.appendChild(cardImg);
            card.appendChild(cardTitle);
            card.appendChild(cardContent);

            characters.appendChild(card);
          }
        }
      } else if (isAlive == "Dead") {
        var characters = document.getElementById("characters");
        characters.innerHTML = "";
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].status == "Dead") {
            var characters = document.getElementById("characters");

            var card = document.createElement("div");
            card.classList.add("card");

            var cardImg = document.createElement("img");
            cardImg.src = data.results[i].image;
            cardImg.className = "char-img";

            var cardTitle = document.createElement("h2");
            cardTitle.textContent = data.results[i].name;

            var cardContent = document.createElement("p");
            if (data.results[i].gender == "Male") {
              var charGender = "He";
            } else if (data.results[i].gender == "Female") {
              var charGender = "She";
            } else if (data.results[i].gender == "unknown") {
              var charGender = "It";
            }
            var content =
              charGender + " is living in " + data.results[i].location.name;
            cardContent.textContent = content;

            card.appendChild(cardImg);
            card.appendChild(cardTitle);
            card.appendChild(cardContent);

            characters.appendChild(card);
          }
        }
      }
    });
}

function getAll() {
  who = "all";
  getCharactersData(who);
}

function getAlive() {
  who = "Alive";
  getCharactersData(who);
}

function getDead() {
  who = "Dead";
  getCharactersData(who);
}

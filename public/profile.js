<<<<<<< Updated upstream
let libraryAPI = "a43ed984fb61ab1511e6e2a65cb66cbd";
let topics = [document.getElementById("topic1").value, document.getElementById("topic2").value, document.getElementById("topic3").value]
=======
let topics = [document.getElementById("topic1").value, document.getElementById("topic2").value, document.getElementById("topic3").value]

>>>>>>> Stashed changes
let cleanTopics = topics.map((topic) => {
  return cleanTopic(topic)
})

function cleanTopic(topic){
  return topic.toLowerCase().replace("-", "")
}

<<<<<<< Updated upstream
fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${cleanTopics[2]}&filter=ebooks&orderBy=relevance&printType=books&startIndex=0&maxResults=40`)
  .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then(response => {
    response.items.map(({volumeInfo}) => {
      if (volumeInfo.language == "en" && volumeInfo.averageRating > 3){
      console.log(volumeInfo,
        volumeInfo.ratingsCount,
        volumeInfo.language,
        volumeInfo.averageRating,
        volumeInfo.previewLink,
        volumeInfo.infoLink,
        volumeInfo.title,
        volumeInfo.authors,
        volumeInfo.categories)
      }
    })
  })
  .catch(err => {
      console.log(`error ${err}`)
    })

=======
let btn = document.querySelectorAll('.genreCount')
btn.forEach((element) => {
  element.addEventListener('click', () => {
    let genre = element.parentNode.parentNode.parentNode.nextElementSibling.childNodes[1].children[0].innerText
    let genreTitle = genre.toLowerCase()
    fetch("genreCount", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'genreTitle': genreTitle,
      })
    }).then(function(response) {
      console.log(response);
      // window.location.reload()
    });

  })
})
let btnLeftGenre = document.querySelectorAll('.genreCountLeft')
  btnLeftGenre.forEach((element) => {
    element.addEventListener('click', () => {
      // console.log(document.querySelector('.topic'))
      let genre = element.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].firstElementChild.innerText
      let genreTitle = genre.toLowerCase()
      fetch("genreCount", {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'genreTitle': genreTitle,
        })
      }).then(function(response) {
        console.log(response);
        // window.location.reload()
      });

    })
  })

fetch(
  `https://www.googleapis.com/books/v1/volumes?q=subject:${cleanTopics[0]}orderBy=relevance&printType=books&startIndex=0&maxResults=2`
)
  .then((res) => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then((response) => {
    // let randomBook = Math.random
    // console.log(response.items[0].volumeInfo)
    document.getElementById('imgBook1').dataset.category = response.items[0].volumeInfo.industryIdentifiers[0].identifier
    document.getElementById('imgBook1').parentElement.href = "/bookpage?isbn=" + response.items[0].volumeInfo.industryIdentifiers[0].identifier
    document.getElementById('imgBook2').dataset.category = response.items[1].volumeInfo.industryIdentifiers[0].identifier
    document.getElementById('imgBook2').parentElement.href = "/bookpage?isbn=" + response.items[1].volumeInfo.industryIdentifiers[0].identifier

    document.getElementById('imgBook1').src = `${response.items[0].volumeInfo.imageLinks.thumbnail}`
    document.getElementById('imgBook2').src = `${response.items[1].volumeInfo.imageLinks.thumbnail}`

  })
  .catch((err) => {
    console.log(`error ${err}`);
  });
fetch(
  `https://www.googleapis.com/books/v1/volumes?q=subject:${cleanTopics[1]}&filter=ebooks&orderBy=relevance&printType=books&startIndex=0&maxResults=2`
)
  .then((res) => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then((response) => {
    document.getElementById('imgBook3').dataset.category = response.items[0].volumeInfo.industryIdentifiers[0].identifier
    document.getElementById('imgBook3').parentElement.href = "/bookpage?isbn=" + response.items[0].volumeInfo.industryIdentifiers[0].identifier
    document.getElementById('imgBook3').src = `${response.items[0].volumeInfo.imageLinks.thumbnail}`

    document.getElementById('imgBook4').dataset.category = response.items[1].volumeInfo.industryIdentifiers[0].identifier
    document.getElementById('imgBook4').parentElement.href = "/bookpage?isbn=" + response.items[1].volumeInfo.industryIdentifiers[0].identifier
    document.getElementById('imgBook4').src = `${response.items[1].volumeInfo.imageLinks.thumbnail}`
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

fetch(
  `https://www.googleapis.com/books/v1/volumes?q=subject:${cleanTopics[2]}&filter=ebooks&orderBy=relevance&printType=books&startIndex=0&maxResults=2`
)
  .then((res) => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then((response) => {
    // console.log(response.items[0].volumeInfo.imageLinks.thumbnail)
    document.getElementById('imgBook5').dataset.category = response.items[0].volumeInfo.industryIdentifiers[0].identifier
    document.getElementById('imgBook5').parentElement.href = "/bookpage?isbn=" + response.items[0].volumeInfo.industryIdentifiers[0].identifier
    document.getElementById('imgBook5').src = `${response.items[0].volumeInfo.imageLinks.thumbnail}`



    document.getElementById('imgBook6').dataset.category = response.items[0].volumeInfo.industryIdentifiers[0].identifier
    document.getElementById('imgBook6').parentElement.href = "/bookpage?isbn=" + response.items[0].volumeInfo.industryIdentifiers[0].identifier
    document.getElementById('imgBook6').src = `${response.items[1].volumeInfo.imageLinks.thumbnail}`
    document.querySelector('.title').innerText =
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });


// Edit options every 30 days
function genreResetPrompt() {
  let ask = window.confirm("Would you like to edit your genres?");
  if (ask) {
      window.location.href = "/interests";
  }
}

// Need to insert description of each genre
// Do something similar to display tags - not sure if I need .value for the topics
function genreOverview(){
  if (topics.value == "Romance"){
    document.getElementById("genreOverview1").innerHTML = "Testing this out"
  }
}








// let libraryAPI = "a43ed984fb61ab1511e6e2a65cb66cbd";
// let topics = [document.getElementById("topic1").value, document.getElementById("topic2").value, document.getElementById("topic3").value]
// let cleanTopics = topics.map((topic) => {
//   return cleanTopic(topic)
// })
//
// function cleanTopic(topic){
//   return topic.toLowerCase().replace("-", "")
// }
//
// fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${cleanTopics[2]}&filter=ebooks&orderBy=relevance&printType=books&startIndex=0&maxResults=40`)
//   .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
//   .then(response => {
//     response.items.map(({volumeInfo}) => {
//       if (volumeInfo.language == "en" && volumeInfo.averageRating > 3){
//       console.log(volumeInfo,
//         volumeInfo.ratingsCount,
//         volumeInfo.language,
//         volumeInfo.averageRating,
//         volumeInfo.previewLink,
//         volumeInfo.infoLink,
//         volumeInfo.title,
//         volumeInfo.authors,
//         volumeInfo.categories)
//       }
//     })
//   })
//   .catch(err => {
//       console.log(`error ${err}`)
//     })
//
>>>>>>> Stashed changes



// fetch(`www.librarything.com/api_getdata.php?userid=timspalding&key=537686719&max=10&reviewsOnly&showReviews=1&showTags=1&tagList=romance&responseType=json`)
//   .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
//   .then(response => {
//     console.log(response)
//
//   })
//   .catch(err => {
//       console.log(`error ${err}`)
//     })

// average rating, categories, ratingsCount,
// let goodreadsAPI = "pkPx0CaPv5dLSjiSVwWexA"
// const convert = import('xml-js')
// const fetch = require('node-fetch')
//
//
// fetch(`https://www.goodreads.com/search.xml?key=${goodreadsAPI}&q=Ender%27s+Game`)
//   .then(res => res.text()) // parse response as JSON (can be res.text() for plain response)
//   .then(response => {
//     let options = {
//       compact: true,
//       nativeType: true,
//       ignoreDeclaration: true,
//       ignoreInstruction: true,
//       ignoreComment: true,
//       ignoreDoctype: true,
//       ignoreCdata: true
//     }
//     let xmlResponse = convert.xml2json(response, options)
//     console.log(xmlResponse)
//     // return JSON.parse(xmlResponse)
//
//   })
//   .catch(err => {
//       console.log(`error ${err}`)
//   })

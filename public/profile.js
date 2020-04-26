
fetch('/genreStats')
  .then((res) => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then(async (response) => {
    let sortedCategories = Object.keys(response).sort(function(a,b){return response[a]-response[b]}).reverse()
    console.log(response, sortedCategories)
    for(let i = 0; i < sortedCategories.length; i++){
      let res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${sortedCategories[i]}&filter=ebooks&orderBy=relevance&printType=books&startIndex=0&maxResults=2`
      )
      let response = await res.json()
      let sectionTemplate = document.getElementById('sectionTemplate').innerHTML
      let newSection = document.createElement('div')
      newSection.innerHTML = sectionTemplate

      newSection.getElementsByClassName('imgBook1')[0].parentElement.href = "/bookpage?isbn=" + response.items[0].volumeInfo.industryIdentifiers[0].identifier
      newSection.getElementsByClassName('imgBook1')[0].src = `${response.items[0].volumeInfo.imageLinks.thumbnail}`
      newSection.getElementsByClassName('title1')[0].innerText = `${response.items[0].volumeInfo.title}`
      newSection.getElementsByClassName('author1')[0].innerText = `${response.items[0].volumeInfo.authors}`

      newSection.getElementsByClassName('imgBook2')[0].parentElement.href = "/bookpage?isbn=" + response.items[1].volumeInfo.industryIdentifiers[0].identifier
      newSection.getElementsByClassName('imgBook2')[0].src = `${response.items[1].volumeInfo.imageLinks.thumbnail}`
      newSection.getElementsByClassName('title2')[0].innerText = `${response.items[1].volumeInfo.title}`
      newSection.getElementsByClassName('author2')[0].innerText = `${response.items[1].volumeInfo.authors}`
      newSection.getElementsByClassName('favGenreHeader')[0].innerHTML = sortedCategories[i]
      newSection.getElementsByClassName('imgBook1')[0].dataset.category = sortedCategories[i]
      newSection.getElementsByClassName('imgBook2')[0].dataset.category = sortedCategories[i]
      newSection.getElementsByClassName('genreOverview1')[0].innerText = genreDescriptions[sortedCategories[i]]

      let btn = newSection.querySelectorAll('.genreCount')
      btn.forEach((element) => {
        element.addEventListener('click', () => {
          let genre = element.dataset.category
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
          })
        })
      })
      document.getElementsByClassName('hero')[0].appendChild(newSection)
  }
})

let genreDescriptions = {
  romance: "According to the Romance Writers of America, 'Two basic elements comprise every romance novel: a central love story and an emotionally-satisfying and optimistic ending.'",
  fiction: "Fiction is the telling of stories which are not real. More specifically, fiction is an imaginative form of narrative, one of the four basic rhetorical modes.",
  nonFiction: "Nonfiction is an account or representation of a subject which is presented as fact. This presentation may be accurate or not; that is, it can give either a true or a false account of the subject in question.",
  thriller: "Thrillers are characterized by fast pacing, frequent action, and resourceful heroes who must thwart the plans of more-powerful and better-equipped villains. ",
  juvenile: "Young-adult fiction, whether in the form of novels or short stories, has distinct attributes that distinguish it from the other age categories of fiction.",
  mystery: "Mystery fiction is a loosely-defined term that is often used as a synonym of detective fiction — in other words a novel or short story in which a detective (either professional or amateur) solves a crime.",
  sciencefiction: "Science fiction (abbreviated SF or sci-fi with varying punctuation and capitalization) is a broad genre of fiction that often involves speculations based on current or future science or technology."
}// let cleanTopics = topics.map((topic) => {
//   return cleanTopic(topic)
// })






// Edit options every 30 days


// Need to insert description of each genre
// Do something similar to display tags - not sure if I need .value for the topics









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
let libraryAPI = "a43ed984fb61ab1511e6e2a65cb66cbd";
let topics = [document.getElementById("topic1").value, document.getElementById("topic2").value, document.getElementById("topic3").value]
let cleanTopics = topics.map((topic) => {
  return cleanTopic(topic)
})

function cleanTopic(topic){
  return topic.toLowerCase().replace("-", "")
}

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

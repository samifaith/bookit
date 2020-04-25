
let form = document.getElementById("listInput")

form.addEventListener('submit', function (e){
  e.preventDefault()
  let genres = {};
  let favGenres = []
  let inputs = document.querySelectorAll("input")
    for (let i = 0; i<inputs.length; i++){
      let input = inputs[i];
      if (input.checked){
        genres[input.value] = true
        favGenres.push(input.value)
      } else{
        genres[input.value] = false
      }
      console.log(favGenres)
    }
    fetch('/interests', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        genres: genres,
        favGenres : favGenres

      })
    })
    .then(function (response) {
      // console.log(response)
        window.location.href= '/profile'
    })
  })


  // let topics = [document.getElementById("topic1").value, document.getElementById("topic2").value, document.getElementById("topic3").value]
  // console.log(topics)
  //
  // let cleanTopics = topics.map((topic) => {
  //   return cleanTopic(topic)
  // })
  //
  // function cleanTopic(topic){
  //   return topic.toLowerCase().replace("-", "")
  // }
  //
  // fetch(
  //   `https://www.googleapis.com/books/v1/volumes?q=subject:${cleanTopic[0]}&filter=ebooks&orderBy=relevance&printType=books&startIndex=0&maxResults=40`
  // )
  //   .then((res) => res.json()) // parse response as JSON (can be res.text() for plain response)
  //   .then((response) => {
  //     console.log(response.items[0].volumeInfo.imageLinks.thumbnail)
  //     document.getElementById('imgBook1').src = `${response.items[0].volumeInfo.imageLinks.thumbnail}`
  //     document.getElementById('imgBook2').src = `${response.items[1].volumeInfo.imageLinks.thumbnail}`
  //   })
  //   .catch((err) => {
  //     console.log(`error ${err}`);
  //   });

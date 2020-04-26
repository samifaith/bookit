var searchParams = new URLSearchParams(window.location.search)
let isbn = searchParams.get('isbn')
fetch(
  `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
)
  .then((res) => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then((response) => {
    document.getElementById('bookimage').src = `${response.items[0].volumeInfo.imageLinks.thumbnail}`
    document.querySelector('.bTitle').innerText = `${response.items[0].volumeInfo.title}`
    document.querySelector('.bAuthor').innerText = `${response.items[0].volumeInfo.authors}`
    console.log(response)
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });


  let fave = document.querySelectorAll('.fave')

    Array.from(fave).forEach((images) => {
      images.addEventListener('click', (e) => {
        // console.log(e.target.parentNode.childNodes[1].innerText)
        // console.log(e.target.parentNode.childNodes[3].innerText)
        // console.log(e.target.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].src)

        let bookTitle = e.target.parentNode.childNodes[1].innerText
        let bookAuthor = e.target.parentNode.childNodes[3].innerText
        let bookImg = e.target.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].src

        console.log(bookTitle, bookAuthor, bookImg)
        // console.log(bookTitle)

        fetch('/fave', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            bookTitle : bookTitle,
            bookAuthor : bookAuthor,
            bookImg : bookImg
          })
        })
        .then(function (response) {
          // console.log(response)
          window.location.reload(true)
        })
      })
    })

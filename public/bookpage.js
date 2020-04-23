var searchParams = new URLSearchParams(window.location.search)
let isbn = searchParams.get('isbn')
console.log(isbn, "random")

console.log(isbn)

fetch(
  `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
)
  .then((res) => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then((response) => {
    console.log(response)
    document.getElementById('bookimage').src = `${response.items[0].volumeInfo.imageLinks.thumbnail}`
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

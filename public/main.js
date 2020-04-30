
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
        window.location.href= '/profile'
    })
  })

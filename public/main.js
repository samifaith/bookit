let form = document.querySelector("#listInput")

form.addEventListener('submit', function (e){
  e.preventDefault()
  let genres = {};
  let inputs = document.querySelectorAll("input")
    for (let i = 0; i<inputs.length; i++){
      let input = inputs[i];
      if (input.checked){
        genres[input.value] = true
      } else{
        genres[input.value] = false
      }
    }
    fetch('/interests', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        genres: genres
      })
    })
    .then(function (response) {
      console.log(response)
      window.location.href= '/profile'
    })
  })

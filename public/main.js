<<<<<<< HEAD
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
=======
var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
let remove = document.getElementsByClassName("fa-times-circle");

Array.from(remove).forEach(function(element) {
      element.addEventListener('click', function(){
        const genre = this.parentNode.parentNode.childNodes[1].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'genre': genre
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         console.log(thumbUp)
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//           console.log(response)
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
//
// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         console.log(thumbUp)
//         fetch('messagesDown', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
>>>>>>> f0d2bb74fce955e301d6415c111117868cb0e9b6

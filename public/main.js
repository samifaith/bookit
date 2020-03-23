var update = document.getElementById('update')
var del = document.getElementById('delete')


//UPDATE BUTTON  fetch request
update.addEventListener('click', function () {
  fetch('quotes', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': 'Darth Vader',
    'quote': 'I find your lack of faith disturbing.'
  })
})
.then(res => {
  if (res.ok) return res.json()
}).
then(data => {
  console.log(data)
  window.location.reload()
})
})


// DELETE BUTTON fetch request
del.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})

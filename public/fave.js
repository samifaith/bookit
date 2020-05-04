let trash = document.getElementsByClassName("fa fa-times-circle")

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const postId = this.parentNode.parentNode.childNodes[7].innerHTML
    fetch('faveDelete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId: postId
      })
    }).then(function (response) {
      window.location.reload()
    })
  })
});

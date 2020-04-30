let trash = document.getElementsByClassName("fa fa-times-circle")

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    // const bookImg = this.parentNode.parentNode.childNodes[1].src
    // const bookTitle = this.parentNode.parentNode.childNodes[3].innerHTML
    // const bookAuthor = this.parentNode.parentNode.childNodes[5].innerHTML
    const postId = this.parentNode.parentNode.childNodes[7].innerHTML
    // console.log(this.parentNode.parentNode.childNodes[7].innerHTML)
    // console.log(bookTitle, bookAuthor, 'test')
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

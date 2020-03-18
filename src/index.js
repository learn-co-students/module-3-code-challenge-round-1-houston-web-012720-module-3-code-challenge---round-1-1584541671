document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4842 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const img = document.querySelector("#image")
  const h4 = document.querySelector("#name")
  const span =  document.querySelector("#likes")
  const ul = document.querySelector("#comments")
  const likeBtn = document.querySelector("#like_button")
  const form = document.querySelector("#comment_form")

  fetch(imageURL)
  .then(resp => resp.json())
  .then(image => {
    console.log(image)
    showImage(image)
  })

  
  function showImage(image){
    img.src = image.url
    h4.innerText = image.name
    span.innerText = image.like_count
    image.comments.forEach(comment => showComment(comment))

    likeBtn.addEventListener("click", () => {
      // ++span.innerText <-- optimistic rendering
      fetch('https://randopic.herokuapp.com/likes', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          image_id: image.id
        })
      })
      .then(resp => resp.json())
      .then(like => ++span.innerText )
    })

    form.addEventListener("submit", () => {
      event.preventDefault()
      const commentVal = document.querySelector("#comment_input").value 
      fetch(commentsURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: image.id,
          content: commentVal
        })
      })
      .then (resp => resp.json())
      .then(newComment => {
        showComment(newComment)
        form.reset()
        // // DELETE BUTTON ONLY ON NEW COMMENTS ADDED 
        // const dltBtn = document.createElement("button")
        // dltBtn.innerText = "delete"
        // const newLi = [].slice.call(document.querySelectorAll("li")).pop()
        // newLi.append(dltBtn)
        // dltBtn.addEventListener("click", ()=>{
        //   fetch(commentsURL + newComment.id, {
        //     method: "DELETE"
        //   })
        //   .then(resp => resp.json())
        //   .then(idk => {
        //     newLi.remove()
        //   })
        // })
      })
    })

    function showComment(comment){
      const li = document.createElement("li")
      li.innerText = comment.content
      ul.append(li)
      const dltBtn = document.createElement("button")
      dltBtn.innerText = "delete"
      li.append(dltBtn)
      dltBtn.addEventListener("click", ()=>{
        fetch(commentsURL + comment.id, {
          method: "DELETE"
        })
        .then(resp => resp.json())
        .then(idk => {
          li.remove()
        })
      })
    }

  }


})

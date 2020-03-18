document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4850
  const imageURL = `https://randopic.herokuapp.com/images/4850`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(response => response.json())
  .then(imgData => updateImageCard(imgData))

  function updateImageCard(image){
    let img = document.querySelector("img#image")
    img.src = image.url

    let imgName = document.querySelector("h4#name")
    imgName.innerText = image.name
    
    let imgLikes = document.querySelector("span#likes")
    imgLikes.innerText = image.like_count

    let commentList = document.querySelector("ul#comments")
    
    let deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Delete"
    // deleteBtn.addEventListener("click", () => {
    //   fetch()
    // }    
    // )

    let form = document.querySelector("form")
    form.addEventListener("submit", () => {
      event.preventDefault()
      fetch(commentsURL, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image_id: 4850,
          content: event.target[0].value
        })
      })
      let commentLi = document.createElement("li")
      commentLi.innerText = event.target[0].value
      commentList.append(commentLi)
    })

    image.comments.forEach(comment => {
      let commentLi = document.createElement("li")
      commentLi.innerText = comment.content
      commentList.append(commentLi)

    });

  }
  
  let likeBtn = document.querySelector("button#like_button")
  
  likeBtn.addEventListener("click", () => {
    fetch(likeURL, {
      method: "POST",
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        image_id: 4850
      })
    })
    .then(res => res.json())
    .then(console.log)
    let imgLikes = document.querySelector("span#likes")
    imgLikes.innerText = parseInt(imgLikes.innerText, 10) + 1
  })



})


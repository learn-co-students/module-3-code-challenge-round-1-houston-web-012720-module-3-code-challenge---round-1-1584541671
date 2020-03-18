document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 4845 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const img = document.querySelector("img#image")
  const title = document.querySelector("h4#name")
  const comments = document.querySelector("ul#comments")
  const likes = document.querySelector("span#likes")
  const likeBtn = document.querySelector("button#like_button")
  const commentForm = document.querySelector("form#comment_form")

  fetch(imageURL).then(resp => resp.json()).then(data => renderData(data))
  likeBtn.addEventListener("click", () => {
    params = {
      method: "POST",
      headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({image_id: parseInt(img.getAttribute("data-id"))})
    }
    fetch(likeURL, params).then(++likes.innerText)
  })
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    params ={
      method: "POST",
      headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({
        image_id: parseInt(img.getAttribute("data-id")), 
        content: commentForm.elements["comment"].value
      })
    }
    fetch(commentsURL, params).then(resp => resp.json()).then(newComment => displayComment(newComment))
  })

  function renderData(data){
    img.src = data.url
    img.setAttribute("data-id", data.id)
    title.innerText = data.name
    likes.innerText = data.like_count
    if (!!data.comments){
      data.comments.forEach(comment => displayComment(comment))
    }
  }

  function displayComment(comment){
    const li = document.createElement("li")
    li.innerText = comment.content
    const dltBtn = document.createElement("button")
    dltBtn.innerText = "Delete"
    dltBtn.addEventListener("click", () => {
      fetch(`https://randopic.herokuapp.com/comments/${comment.id}`, {method: "DELETE"}).then(li.remove())
    })
    li.append(dltBtn)
    comments.append(li)
  }
})

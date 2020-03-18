// document.addEventListener('DOMContentLoaded', () => {
//   console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

//   let imageId = 1 //Enter the id from the fetched image here

//   const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

//   const likeURL = `https://randopic.herokuapp.com/likes/`

//   const commentsURL = `https://randopic.herokuapp.com/comments/`

// })
let imageId = 4848 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

fetch(imageURL)
.then(res => res.json())
.then(image_obj => display_data(image_obj))


const display_data = (data) => {
  let img = document.querySelector("img")
  img.src = data.url

  let h4 = document.querySelector("h4#name")
  h4.textContent = data.name 

  let like_span = document.querySelector("span#likes")
  like_span.textContent = data.like_count

  let ul = document.querySelector("ul#comments")

  data.comments.forEach(comment => {
    ul.append(make_new_comment(comment))
  })

  let like_btn = document.querySelector("#like_button")

  like_btn.addEventListener("click", () => {
    fetch(likeURL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: data.id 
      })
    })
    .then(res => res.json())
    .then(data => {
      like_span.textContent = parseInt(like_span.innerText) + 1
    })
  })

  let form = document.querySelector("form#comment_form")
  form.addEventListener("submit",()=>{
    event.preventDefault()
    fetch(commentsURL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: event.target[0].value,
        image_id: data.id
      })
    })
    .then(res => res.json())
    .then(new_data => {
      form.reset()
      ul.append(make_new_comment(new_data))
    })
  })
}

const make_new_comment = (comment_obj) => {
  let edit_status = false
  let div = document.createElement("div")
  div.style.display = "flex"
  div.style.margin = "5px"

  let li = document.createElement("li")
  li.innerText = comment_obj.content 

  let delete_btn = document.createElement("button")
  delete_btn.innerText = "Delete"
  delete_btn.style.marginLeft = "4px"

  delete_btn.addEventListener("click", ()=>{
    fetch(`${commentsURL}${comment_obj.id}`,{
      method: "DELETE"
    })
    .then(res => res.json())
    .then(delete_data => {
      div.remove()
    })
  })

  div.append(li,delete_btn)
  return div 
}
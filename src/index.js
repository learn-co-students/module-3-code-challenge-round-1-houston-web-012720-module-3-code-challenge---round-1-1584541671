


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4843 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/4843`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(res => res.json())
  .then(image => {showImage(image)})

  function showImage(image){
    
    const img = document.getElementById("image") // if you name this variable image it messes you all up for like half the code challenge!!!
    img.src =  image.url
   
    const h4 = document.getElementById("name")
    h4.innerText = image.name
    
    const comments = document.getElementById("comments")

    const span = document.getElementById('likes')
    span.innerText = image.like_count

    const form = document.getElementById("comment_form")

    form.addEventListener("submit", () =>{
      event.preventDefault()

      let comment = event.target[0].value

      fetch(commentsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image_id: image.id,
          comment: comment
        })
      })
    })



    likeBtn = document.getElementById("like_button")

    likeBtn.addEventListener("click", () => {
      fetch(likeURL, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image_id: image.id,
          likes: image.like_count += 1
        })
      })
      .then(span.innerText++)
    })

  }

})

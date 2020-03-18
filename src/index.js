document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4841 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const getImage = () => {
    fetch(imageURL)
      .then(res => res.json())
      .then(image => {createImage(image)})
  }


  const likeImage = (image) => {
    const image_likes = document.querySelector("#likes")

    fetch(likeURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_id: image.id })
    })
      .then(res => res.json())
      .then(like => {
        image.like_count++
        image_likes.innerHTML = image.like_count
      })
  }


  const commentOnImage = (image, new_comment) => {
    fetch(commentsURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_id: image.id, content: new_comment.comment.value })
    })
      .then(res => res.json())
      .then(comment => {
        createComment(comment)
        addDeleteBtn(comment)
      })
  }


  const addDeleteBtn = (comment) => {
    const comment_element = document.getElementById(comment.id)

    const delete_btn = document.createElement("button")

    delete_btn.innerText = "Delete Comment"
    delete_btn.style.marginLeft = "16px"

    delete_btn.addEventListener("click", () => { deleteComment(comment, comment_element)} )

    comment_element.append(delete_btn)
  }


  const deleteComment = (comment, element) => {
    fetch(commentsURL + comment.id, { method: "DELETE" })
      .then(res => res.json())
      .then(comment => {
        element.remove()
      })
  }


  const createComment = (comment) => {
    const image_comments = document.querySelector("#comments")
    const comment_element = document.createElement("li")
    comment_element.id = comment.id
    comment_element.innerHTML = comment.content
    image_comments.append(comment_element)
  }


  const createImage = (image) => {
    const image_element = document.createElement("img")
    const image_card = document.querySelector("#image_card")
    const image_name = document.querySelector("#name")
    const image_likes = document.querySelector("#likes")

    const like_btn = document.querySelector("#like_button")
    const new_comment = document.querySelector("#comment_form")

    image.comments.map(comment => {
      createComment(comment)
      addDeleteBtn(comment)
    })

    like_btn.addEventListener("click", () => {
      likeImage(image)
    })

    new_comment.addEventListener("submit", () => {
      event.preventDefault()
      commentOnImage(image, new_comment)
    })

    image_element.src = image.url
    image_name.innerHTML = image.name
    image_likes.innerHTML = image.like_count

    image_card.prepend(image_element)
  }

  getImage()

})

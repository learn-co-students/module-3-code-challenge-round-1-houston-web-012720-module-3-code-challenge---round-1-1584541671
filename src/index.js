// As a user, when the page loads, I should see:

// an image
// any comments that image has
// the number of likes that image has
// As a user, I can click a button to like an image. When I click, the number of likes the image has should increase by one without the page refreshing.

// As a user, I can enter text in an input field, and submit the form that the input is in. When I do, the app should add comment to the image without the page refreshing. I should see my new comment below any previous comments.

// As a user, when I refresh the page, any comments or likes I have added should still be there. When a user adds a like or a comment, make sure their changes are sent to the backend API.

const imageCard = document.getElementById('image_card')
const likeBtn = document.getElementById('like_button')
const commentsUl = document.getElementById('comments')
const commentForm = document.getElementById('comment_form')

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4844 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(r => r.json())
  .then(data => updateIndex(data, imageId, imageURL, likeURL, commentsURL))

})

let updateIndex = (data, imageId, imageURL, likeURL, commentsURL) => {
  // Step 1
  // the image url -OK
  // the image name -OK
  // the number of likes -OK
  // any comments in an unordered list -OK
  console.log(data)
  document.getElementById('image').src = data.url
  document.getElementById('name').innerText = data.name
  document.getElementById('likes').innerHTML = data.like_count
  showComments(data.comments, commentsURL)

  addLikeEvent(data, likeURL, imageId)
  addCommentEvent(data, commentsURL, imageId)
}

let showComments = (comments, commentsURL) => {
  comments.forEach(comment => {
    const li = document.createElement('li')
    li.innerText = (comment.content)
    addDltBtn(li, comment.id, commentsURL)

    commentsUl.append(li)
  })
}

let addLikeEvent = (data, likeURL, imageId) => {
  // Step 2
  likeBtn.addEventListener('click', () => {
    document.getElementById('likes').innerHTML = ++data.like_count
    //Step 3
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
    // .then(r => r.json())
    // .then(console.log) // nothings needs to be done here
  })
}

let addCommentEvent = (data, commentsURL, imageId) => {
  // Step 4
  // The next feature to approach is the functionality to add comments to a picture. First, get this working in the browser only, without worrying about persistence.
  // Filling out the input and clicking 'Submit' should append your new comment as an <li> to the comments unordered list element. You should also clear out the text in the comment input, so it's empty and ready for the next comment to be added.
  commentForm.addEventListener('submit', () => {
    event.preventDefault()
    const commentLi = document.createElement('li')
    const newComment = document.getElementById('comment_input').value
    commentLi.innerText = newComment
    commentsUl.append(commentLi)
    commentForm.reset()

    //Step 5
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: newComment
      })
    })
    .then(r => r.json())
    .then(newComment => {
      addDltBtn(commentLi, newComment.id, commentsURL)
    })
  })
}

// Step 6
let addDltBtn = (comment, commentId, commentsURL) => {
  const dltBtn = document.createElement('button')
  dltBtn.innerText = 'Delete'
  dltBtn.addEventListener('click', () => {
    // console.log(comment, commentId)
    fetch(commentsURL + commentId, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(deletedComment => comment.remove())
  })

  comment.append(dltBtn)
}
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4846 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${4846}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

fetch(`https://randopic.herokuapp.com/images/${4846}`)
.then(res => res.json())
.then(img => showImg(img))

function showImg(img){

const div = document.createElement("div")
div.className = "card"
div.setAttribute("data-id", imageId)

const imgSrc = document.querySelector("img")
imgSrc.src = imageURL

const h4 = document.querySelector("h4")
h4.innerText = "Turing Tables"

}

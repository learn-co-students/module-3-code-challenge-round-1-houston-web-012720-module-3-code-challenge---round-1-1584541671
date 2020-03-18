document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4840 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const div = document.querySelector('#image_card')
  const img = document.querySelector('img')
  const h4 = document.querySelector('#name')
  const span = document.querySelector('span')
  const span_id = document.querySelector('#likes')
  const ul  = document.querySelector('#comments')
  const likeBtn = document.querySelector('#like_button')
  fetch(imageURL)
  .then(resp=>resp.json())
  .then(image=>showImage(image))



  const showImage = (image) =>{
 
  img.src = image.url
  h4.innerText = image.name
  span_id.innerText = image.like_count
  image.comments.forEach(comment=>{
    const li = document.createElement('li')
    li.innerText = comment.content
    ul.append(li)

  })
  likeBtn.addEventListener('click',()=>{
   
   fetch('https://randopic.herokuapp.com/likes',{
     method: "POST",
     headers: {
       'Content-Type': 'application/json'

     },
     body: JSON.stringify({
       image_id: imageId
    
     })

   })
   .then(resp=>resp.json())
   .then(imageID => {
    let likes= ++image.like_count
    span_id.innerText = likes
   })
  })






   const form = document.querySelector('#comment_form')
   form.addEventListener('submit',()=>{
     event.preventDefault()
     const newComment = document.querySelector('#comment_input').value
     fetch('https://randopic.herokuapp.com/comments',{
       method: "POST",
       headers:{
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         image_id: imageId,
         content: newComment

       })

     })
     .then(resp=>resp.json())
     .then(newComment=> {
      const li = document.querySelector('li')
      li.innerText = newComment.content
      form.reset()
     })
   })
      
  
  span_id.append(likeBtn)
  span.append(span_id)
  div.append(img,h4,span,ul,form)
  
  }


})


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4849

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  
  const form = document.querySelector('#comment_form')
  const ul = document.querySelector('#comments')
  const div = document.querySelector('#image_card')




  
  fetch('https://randopic.herokuapp.com/images/4849')
  .then(res => res.json())
  .then(image => {viewImage(image)})

  function viewImage(image){
   
    const img = document.querySelector('#image')
      img.src = image.url
      img.setAttribute('data-id', image.id)

    const h4 = document.querySelector('#name')
    h4.innerText = image.name

    const span = document.querySelector('#likes')
    span.innerText = image.like_count
    
    const li = document.createElement('li')
    li.innerText = image.comments 

    const button = document.querySelector('#like_button')
    
    button.addEventListener('click', () =>{
    //   fetch('https://randopic.herokuapp.com/likes/4849', {
    //     method: 'PATCH',
    //     headers: 'Content-Type': 'application/json',
    //     body: JSON.stringify({
    //       likes: image.like += 1
    //     })
    //   })
    //   .then(res => res.json())
    //   .then(likeImage => {
    //     span.innerText = `${likeImage.likes} Likes`
    //   })
    // })

    div.append(img, h4, span)
    ul.append(li)



  }

  

})

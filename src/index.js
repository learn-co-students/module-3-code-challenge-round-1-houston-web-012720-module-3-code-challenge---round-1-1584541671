
  let imageId = 4847 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const div = document.querySelector("div#image_card")
  const img = document.querySelector("img#image")
  const h4 = document.querySelector("h4#name")
  const span = document.querySelector("span#likes")
  const button = document.querySelector("button#like_button")
  const form = document.querySelector("form#comment_form")
  const ul = document.querySelector("ul#comments")

  fetch(imageURL)
    .then(resp => resp.json())
    .then(image => {
      makeImage(image)
    });

    function makeImage(image){
      // debugger
      img.src = image.url
      h4.innerText = image.name
      span.innerText = image.like_count

      let li = document.createElement("li")
      li.innerText = image.comments[0].content

      button.addEventListener("click", ()=> {

        ++image.like_count;

        fetch(likeURL, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            imageId: image.id 
          })
        })
        .then(resp => resp.json())
        .then(updateLike => { // keep getting error 422 (unprocessable Entity)
          debugger
        })
      })

      ul.append(li)
      
    }

    // button.addEventListener("click", ()=> {
    //   image
    //   fetch(likeURL, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       imageId: image.id 
    //     })
    //   })
    //   .then(resp => resp.json())
    //   .then(updateLike => {
    //     debugger
    //   })
    // })


    form.addEventListener("submit", () =>{
      fetch(imageURL, {
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: event.target.value
        })
      })
      .then(resp => resp.json())
      .then(newComment => {
        // no effin clue casue you cant plug it in to the makeImage function cause its juqaweg o;aiewhjg ;qo3anhg'poi9k ht
      })
    })


/// remote sucks.
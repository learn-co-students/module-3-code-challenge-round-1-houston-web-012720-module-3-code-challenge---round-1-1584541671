document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

    let imageId = 4808

    const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

    const likeURL = `https://randopic.herokuapp.com/likes/`

    const commentsURL = `https://randopic.herokuapp.com/comments/`

    fetch(imageURL)
        .then(function(res) {
            return res.json()
        }).then(function(img) {
            setimg(img)
        })

    function setimg(img) {
        let imgtag = document.querySelector('img')
        imgtag.src = img.url
        let h4 = document.getElementById("name")
        h4.innerText = img.name
        let span = document.getElementById('likes')
        span.innerText = img.like_count
        let ul = document.getElementById('comments')
        img.comments.forEach(function(comment) {
            let li = document.createElement('li')
            li.innerText = comment.content
            ul.append(li)
            displaydeletebtn(li, comment)
        })

        let likebtn = document.getElementById("like_button")
        likebtn.addEventListener('click', function() {
            span.innerText = img.like_count += 1
            fetch('https://randopic.herokuapp.com/likes', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image_id: img.id
                })
            }).then(function(res) {
                return res.json()
            }).then(function(object) {
                console.log(object)
            })
        })
    }

    let form = document.getElementById("comment_form")
    form.addEventListener('submit', function(event) {
        event.preventDefault()
        let com = event.target[0].value
        let ul1 = document.getElementById('comments')
        let li = document.createElement('li')
        li.innerText = com
        ul1.append(li)
        fetch('https://randopic.herokuapp.com/comments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image_id: 4808,
                content: com
            })
        }).then(function(res) {
            return res.json()
        }).then(function(object) {
            //form.reset()
            // let ul1 = document.getElementById('comments')
            // let li = document.createElement('li')
            // li.innerText = object.content
            displaydeletebtn(li, object)
                //  ul1.append(li)
        })
        form.reset()
    })

    function displaydeletebtn(li, comment) {
        let deletebtn = document.createElement('button')
        deletebtn.innerText = "Delete comment"
        li.append(deletebtn)
        deletebtn.addEventListener('click', function() {
            fetch(`https://randopic.herokuapp.com/comments/${comment.id}`, {
                method: 'DELETE'
            }).then(function(res) {
                return res.json()
            }).then(function(message) {
                li.remove()
            })
        })
    }

})
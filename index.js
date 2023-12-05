let posts=[]

function renderposts(){
    let html=""
    for(let post of posts){
        html+=`
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr/>
        `
    }
    document.getElementById("blog-list").innerHTML=html
}
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
.then(res=>res.json())
.then(data=>{
    posts=data.slice(0,5)
    renderposts()
})

document.getElementById("new-post").addEventListener("submit",function(e){
    e.preventDefault()
    //add the newly-input item in json
    const Title=document.getElementById("title").value
    const Body=document.getElementById("body").value

    const newdata={
        title:Title,
        body:Body
    }
    //mimic the form of json 
    // dont need id and user id because they are not really 'added' to json. json does not really change
    
    //why {} here?
    const options={
        method:"POST",
        // the following is to make json-form data really usable as json data
        body:JSON.stringify(newdata),
        headers:{
            "Content-Type":"application/json"
        }
    }
    fetch("https://apis.scrimba.com/jsonplaceholder/posts",options)//only choose the newly entered ones
    .then(res=>res.json())
    .then(newpost=>{
        posts.unshift(newpost)
        renderposts()

    })
})
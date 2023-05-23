{
    //method to submitt the form using ajax
    let createPost = function(){
        //console.log('hello');
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);

                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });

    }

    //method to create in DOM
    let newPostDom = function(post){
        return $(`<li id ="post-${post._id}">
        <p class = "table">
           
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
                </small>
                
            
        <div class="postl">
        ${post.content}<br>
            <small id="b1">${post.user.name}</small>
        </div>
        
    </p>
    <div class="post-comments">
        
            <form action="/comments/create" method="post" id="action-comment">
                <input type="text" name="content" placeholder="Type here to add comment..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit"value="Add comment">
            </form>
    
            
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                 
                    
                </ul>
            </div>
    
    
    </div>
        
        
    </li>`)
    }
    createPost();
}
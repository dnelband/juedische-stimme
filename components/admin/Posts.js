import React from 'react'
import axios from 'axios'

function Posts({posts}) {

    function deletePost(post){

        console.log(post.postId,"post")

        axios({
            method: 'delete',
            url: `/api/posts/${post.postId}`,
            body:{
                categoryId:post.categoryId
            }
        }).then((response) => {
            window.location.reload()
            console.log(response,"response on delete post");
            console.log('NOW NEEDS TO REFRESH POSTS LIST!');
        }, (error) => {
            console.log(error, "ERROR on delete post");
            console.log('NOW NEEDS TO DISPLAY ERROR')
        });
    }

    let postsDisplay;
    if (posts){
        postsDisplay = posts.map((post,index)=>(
            <div key={index}>
                <h3><a href={"/admin/posts/" + post.post_name}>{post.post_title}</a></h3>
                <span>AUTHOR: {post.username}</span>
                <span>DATE PUBLISHED:{new Date(post.post_date).toLocaleString('de')}</span>
                <button onClick={() => deletePost(post)}>
                    DELETE POST
                </button>
            </div>
        ))
    }

    return (
        <div>
            {postsDisplay}
        </div>
    )
}

export default Posts
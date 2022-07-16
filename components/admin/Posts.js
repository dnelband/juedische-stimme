import React from 'react'
import axios from 'axios'

function Posts({posts}) {

    function deletePost(post){

        console.log(post)
        
        let deleteRequests = [];
        if (post.tagIds !== null){
          let tagIds = post.tagIds.split(',')
          tagIds.forEach(function(tagId,index){
            const deleteTagPostRelationShipUrl = `/api/tags/${post.postId}/${tagId}`;
            const deleteTagPostRelationShipRequest = axios.delete(deleteTagPostRelationShipUrl)
            deleteRequests.push(deleteTagPostRelationShipRequest);
          })
        }

        const deletePostUrl = `/api/posts/${post.postId}`
        const deletePostRequest = axios.delete(deletePostUrl)
        deleteRequests.push(deletePostRequest);
        
        axios.all([...deleteRequests]).then(axios.spread((...responses) => {
            // console.log(responses)
            window.location.reload()
        })).catch(errors => {
            console.log(errors, " ERRORS")
            // react on errors.
        })

        /* 
        axios({
            method: 'delete',
            url: `/api/tags/${props.postId}/${tag.term_id}`,
        }).then((response) => {
            console.log(response,"response on remove tag from post");
            getPostTags()
        }, (error) => {
            console.log(error, "ERROR on remove tag from post");
        });
        
        axios.delete(`/api/posts/${post.postId}`, {
            data: {
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
        */
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
import React from 'react'
function Posts(props) {

    let postsDisplay;
    if (props.posts){
        postsDisplay = props.posts.map((post,index)=>(
            <div key={index}>
                <h3><a href={"/admin/posts/" + post.post_name}>{post.post_title}</a></h3>
                <span>AUTHOR: {post.post_author}</span>
                <span>DATE PUBLISHED: {post.post_date_gmt}</span>
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
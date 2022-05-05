import React from 'react'

function Post({ post }) {

    return (
        <div>
            <h1>{post.post_title}</h1>
            <div dangerouslySetInnerHTML={{__html:post.post_content}}></div>
        </div>
    )
}

export default Post
import React from 'react'
function Posts(props) {
  return (
    <div>
        {props.posts.map((post,index)=>(
        <article key={index}>
          <h2>{post.post_title}</h2>
          <div dangerouslySetInnerHTML={{__html:post.post_content}}></div>
        </article>
        ))}
    </div>
  )
}

export default Posts
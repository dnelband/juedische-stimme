import React from 'react'
function Posts(props) {
  
  return (
    <div>
        {props.posts.map((post,index)=>(
        <article key={index}>
          <h2><a href={'/' + post.post_name}>{post.post_title}</a></h2>
          <div dangerouslySetInnerHTML={{__html:post.post_content.substring(0,600)}}></div>
        </article>
        ))}
    </div>
  )
}

export default Posts
import React from 'react'

function Posts(props) {

  return (
    <div>
        {props.posts.map((post,index)=>{
          
          let content = post.post_content
          const textLength = 600;
          let startIndex = 0, endIndex = textLength;
          
          // if we have a phrase - search phrase, i.e if this is search page, we will search for the phrase inside the content
          if (props.phrase){
            
            content = content.replace(/<\/?[^>]+(>|$)/g, "")

            const phraseIndexInText = post.post_content.indexOf(props.phrase);
            
            if (phraseIndexInText > -1){
              
              startIndex = phraseIndexInText - (textLength / 2)
              if (startIndex < 0) startIndex = 0;
              
              endIndex = phraseIndexInText + (textLength / 2)
              if (endIndex > post.post_content.length - 1) endIndex = post.post_content.length
              
              content = "..." + content.toLowerCase().split(props.phrase).join(`<b>${props.phrase}</b>`) + "..."
            }
          }
          content = content.substring(startIndex,endIndex)

          return (
            <article key={index}>
              <h2><a href={'/' + post.post_name}>{post.post_title}</a></h2>
              <div dangerouslySetInnerHTML={{__html:content}}></div>
            </article>
          )
        })}
    </div>
  )
}
export default Posts
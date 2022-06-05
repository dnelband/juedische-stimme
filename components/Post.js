import React, { useEffect } from 'react'

function Post({ post }) {

    let postDisplay;
    if (post && post !== null){
        postDisplay = (
            <React.Fragment>
                <h1>{post.post_title}</h1>
                <p>
                    {post.tags && post.tags.length > 0 
                        ?
                        post.tags.map((tag,index) => (<a key={index} href={"/tag/"+tag.slug}>{' <' + tag.name + '> '}</a>))
                        :
                        ""
                    }
                </p>
                <div dangerouslySetInnerHTML={{__html:post.post_content}}></div>
            </React.Fragment>
        )
    } else {
        postDisplay = (
            <div>
                <h1>No Post Found!</h1>
            </div>
        )
    }

    return (
        <div>
            {postDisplay}
        </div>
    )
}

export default Post
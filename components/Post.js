import React from 'react'

function Post({ post }) {

    let postDisplay;
    if (post && post !== null){

        let tagsDisplay;
        if (post.tagNames && post.tagNames.length > 0 ){
            let tagsArray = [post.tagNames];
            if (post.tagNames.indexOf(',') > -1) tagsArray = post.tagNames.split(',')
            tagsDisplay = tagsArray.map((tag,index) => (<a key={index} href={"/tag/"+tag}>{' <' + tag + '> '}</a>))
        }

        postDisplay = (
            <React.Fragment>
                <h1>{post.post_title}</h1>
                <p>{tagsDisplay}</p>
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
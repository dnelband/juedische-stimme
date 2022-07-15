import React from 'react'

const AdminTags = ({tags}) => {

    function onDeleteTag(){
        console.log('now delete the tag + ALL OF ITS RELATIONSHIP, TAXONOMY USW')
    }

    return (
        <div>
            {tags.map((tag,index) => (
                <li key={Date.now()}>
                    <h3>{tag.name} <small>({tag.count})</small></h3>
                    <a href={`/admin/tags/${tag.term_id}`}>
                        edit
                    </a>
                    <br/>
                    <a href={`/tags/${tag.slug}/page/1`}>
                        view on live site
                    </a>
                    <br/>
                    <a onClick={onDeleteTag}>
                        DELETE TAG
                    </a>
                </li>
            ))}
        </div>
    )
}

export default AdminTags
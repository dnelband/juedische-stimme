
// select an x number of latest

export function selectPosts(numberOfPosts,pageNum,showUnpublished,postType){
    const query =   `SELECT wp_posts.ID as postId, wp_posts.* 
                    FROM wp_posts 
                    INNER JOIN wp_users
                    ON wp_posts.post_author=wp_users.ID
                    ${showUnpublished === true ? '' : `WHERE post_status='publish'`}
                    ${postType ?( showUnpublished === true ? " WHERE" : " AND") + " post_type='"+postType+"'" : ''}
                    ORDER BY post_date DESC
                    LIMIT ${numberOfPosts}
                    OFFSET ${pageNum ? (pageNum - 1)  * 10 : 0}
                    `
    return query
}

// select a single post by name

export function selectPostByName(name,showUnpublished){
    const query =   `SELECT * 
                    FROM wp_posts 
                    INNER JOIN wp_users
                    ON wp_posts.post_author=wp_users.ID
                    WHERE post_name='${name}'
                    ${showUnpublished === true ? "" : "AND post_status='publish'"}
                    `
    return query
}

// select nav items

export function selectNavItems(){
    const query =   `SELECT * 
                    FROM wp_posts
                    WHERE menu_type='main'
                    AND post_status='publish'
                    ORDER BY post_date DESC
                    `
    return query
}

// select posts by tag slug

export function selectPostsByTag(slug){
    const query =   `SELECT *
                    FROM wp_terms
                    INNER JOIN wp_term_relationships
                    ON wp_terms.term_id=wp_term_relationships.term_taxonomy_id
                    INNER JOIN wp_posts
                    ON wp_term_relationships.object_id=wp_posts.ID
                    WHERE slug='${slug}'
                    `
    // const query =   `SELECT wp_posts.*, wp_term_relationships.object_id, wp_term_relationships.term_taxonomy_id, GROUP_CONCAT(wp_terms.name separator ', ') wp_terms
    //                 FROM wp_posts
    //                 JOIN wp_term_relationships ON wp_posts.ID = wp_term_relationships.object_id
    //                 JOIN wp_terms ON wp_term_relationships.term_taxonomy_id = wp_terms.term_id
    //                 WHERE wp_terms.slug='${slug}'
    //                 GROUP BY wp_posts.ID
    //                 `
    return query;
}

// select x number of comments

export function selectComments(numberOfComments,pageNum){
    const query =   `SELECT *
                    FROM wp_comments 
                    ORDER BY comment_ID DESC
                    LIMIT ${numberOfComments}
                    OFFSET ${pageNum ? (pageNum - 1)  * numberOfComments : 0}
                    `

    return query;
}

// select x number of media items

export function selectMediaItems(numberOfMediaItems,pageNum){
    const query =   `SELECT *
                    FROM wp_postmeta 
                    WHERE meta_key="_wp_attached_file"
                    ORDER BY meta_id DESC
                    LIMIT ${numberOfMediaItems}
                    OFFSET ${pageNum ? (pageNum - 1)  * numberOfMediaItems : 0}
                    `
    return query
}

// select x number of users

export function selectUsers(numberOfUsers,pageNum){
    const query =   `SELECT *
                    FROM wp_users 
                    ORDER BY ID DESC
                    LIMIT ${numberOfUsers}
                    OFFSET ${pageNum ? (pageNum - 1)  * numberOfUsers : 0}
                    `
    return query
}
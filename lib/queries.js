
// select an x number of latest posts

export function selectPosts(numberOfPosts,pageNum,showUnpublished,postType){

    console.log("SELECT POSTS")

    // ID, post_title, post_name, post_status, comment_status, post_date, post_date, post_modified, post_type, post_author, post_parent

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
    
    console.log(query, " QUERY ")

    return query
}

// select a single post by name

export function selectPostByName(name, showUnpublished){

    const query =   `SELECT * 
                    FROM wp_posts 
                    INNER JOIN wp_users
                    ON wp_posts.post_author=wp_users.ID
                    WHERE post_name='${name}'
                    ${showUnpublished === true ? "" : "AND post_status='publish'"}
                    `
    return query
}

// select a list of 10 latest posts by page number (offset)

export function selectPostsByPageNumber(pageNum){
    const query  =  `SELECT * 
                    FROM wp_posts 
                    INNER JOIN wp_users
                    ON wp_posts.post_author=wp_users.ID
                    WHERE post_status='publish'
                    ORDER BY post_date DESC
                    LIMIT 10
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

// (admin) select a list of 50 latest posts by page number (offset)

export function adminSelectPostsByPageNumber(pageNum){
    
    // select different fields from wp_posts & wp_users. ap_posts.ID as post_id -> 
    // the reason we use this is because both tables have the ID column, 
    // which will result in an error if not specified an alias

    const query =   `SELECT wp_posts.ID as post_id, post_title, post_name, post_status, comment_status, post_date, post_date, post_modified, post_type, post_author, post_parent, user_nicename
                    FROM wp_posts 
                    INNER JOIN wp_users
                    ON wp_posts.post_author=wp_users.ID
                    WHERE post_status='publish'
                    ORDER BY post_date DESC
                    LIMIT 50
                    OFFSET ${(pageNum - 1)  * 50}
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
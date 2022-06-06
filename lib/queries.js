/* POSTS */

    // select an x number of latest

    export function selectPosts(numberOfPosts,pageNum,showUnpublished,postType,fieldsList){

        let postFields = ' wp_posts.* ,';
        if (fieldsList && fieldsList.length > 0){
            postFields = '';
            fieldsList.forEach(function(field,index){
                postFields += `wp_posts.${field} ,`
            })
        }

        const query =   `SELECT wp_posts.ID as postId, ${postFields} wp_users.user_nicename as username
                        FROM wp_posts 
                        LEFT JOIN wp_users
                        ON wp_posts.post_author=wp_users.ID
                        ${showUnpublished === true ? '' : `WHERE post_status='publish'`}
                        ${postType && postType !== null ? ( showUnpublished === true ? " WHERE" : " AND") + " post_type='"+postType+"'" : ''}
                        ORDER BY post_date DESC
                        LIMIT ${numberOfPosts}
                        OFFSET ${pageNum ? (pageNum - 1)  * 10 : 0}
                        `
        return query
    }

    // select a single post by name

    export function selectPostByName(name,showUnpublished){
        const query =   `SELECT wp_posts.ID as postId, wp_posts.*, wp_users.*, GROUP_CONCAT(wp_term_relationships.term_taxonomy_id separator ', ') as tagIds
                        FROM wp_posts 
                        LEFT JOIN wp_users ON wp_posts.post_author=wp_users.ID
                        LEFT JOIN wp_term_relationships ON wp_posts.ID = wp_term_relationships.object_id
                        WHERE post_name='${name}'
                        ${showUnpublished === true ? "" : "AND post_status='publish'"}
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

    // insert into posts ( create new post)

    export function insertPost(body){

        const {
            post_author,
            post_date,
            post_date_gmt,
            post_content,
            post_title,
            post_excerpt,
            post_status,
            comment_status,
            ping_status,
            post_password,
            post_name,
            to_ping,
            pinged,
            post_modified,
            post_modified_gmt,
            post_content_filtered,
            post_parent,
            guid,
            menu_order,
            post_type,
            post_mime_type,
            comment_count,
            menu_type
        } = body;

        console.log(post_content, "POST CONTENT FROM BODY")


        const query =   `INSERT INTO wp_posts 
                        (
                            post_author,
                            post_date,
                            post_title,
                            post_content,
                            post_excerpt,
                            post_name,
                            to_ping,
                            pinged,
                            post_content_filtered
                        )
                        VALUES 
                        (
                            '${post_author}',
                            '${post_date}',
                            '${post_title}',
                            '${post_content}',
                            '${post_excerpt}',
                            '${post_name}',
                            '${to_ping}',
                            '${pinged}',
                            '${post_content_filtered}'
                        );`

        console.log(query)

        return query;   
        
    }

/* /POSTS */

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

export function insertMediaItem(body){
    const { post_id, meta_key, meta_value} = body
    const query = `INSERT INTO wp_postmeta ( post_id, meta_key, meta_value ) VALUES ('${post_id}', '${meta_key}', '${meta_value}' );`
    return query;
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

/* TO DO - MOVE THE SELECT TAGS QUERY TO THE POSTS QUERIES! it should not be two seperate db calls! */

export function selectTagsByIds(idsString){
    const query =   `SELECT *
                    FROM wp_terms
                    WHERE wp_terms.term_id IN (${idsString})
                    `
    return query
}

// facebook feed

export function insertFbFeed(body){
    const { content, date_updated } = body
    const query = `INSERT INTO fb_feed ( content, date_updated ) VALUES ('${content}', '${date_updated}' );`
    return query;
}
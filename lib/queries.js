/* POSTS */

    const selectPostSubQueries =  `(
                                    SELECT wp_term_taxonomy.term_id
                                    FROM wp_term_relationships
                                    INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id=wp_term_relationships.term_taxonomy_id
                                    WHERE wp_term_relationships.object_id=wp_posts.ID AND wp_term_taxonomy.taxonomy='category'
                                ) as categoryId, 
                                (
                                    SELECT wp_terms.name 
                                    FROM wp_terms 
                                    WHERE wp_terms.term_id=categoryId
                                ) as categoryName,
                                (
                                    SELECT GROUP_CONCAT(wp_terms.slug separator ',')
                                    FROM wp_term_relationships
                                    INNER JOIN wp_terms ON wp_terms.term_id = wp_term_relationships.term_taxonomy_id
                                    WHERE wp_term_relationships.object_id = wp_posts.ID AND wp_term_relationships.term_taxonomy_id != categoryId
                                ) as tagNames`

    // select an x number of latest

    

    export function selectPosts(args){

        const { numberOfPosts,pageNum,showUnpublished,postType,fieldsList } = args

        let postFields = ' wp_posts.* ,';
        if (fieldsList && fieldsList.length > 0){
            postFields = '';
            fieldsList.forEach(function(field,index){
                postFields += `wp_posts.${field} ,`
            })
        }

        let whereCondition = "", isAnd = false;
        if (!showUnpublished){
            whereCondition += `WHERE post_status='publish' `
            isAnd = true;
        }
        if (postType && postType !== null){
            whereCondition += `${isAnd ? "AND" : "WHERE"} post_type='${postType}'`
            isAnd = true;
        }

        const query =   `SELECT wp_posts.ID as postId, ${postFields} wp_users.user_nicename as username,
                        ${selectPostSubQueries}
                        FROM wp_posts 
                        LEFT JOIN wp_users ON wp_posts.post_author=wp_users.ID
                        ${whereCondition}
                        ORDER BY post_date DESC
                        LIMIT ${numberOfPosts}
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfPosts : 0}
                        `
        return query
    }

    // select a single post by name

    export function selectPostByName(name,showUnpublished){
        const query =   `SELECT wp_posts.ID as postId, wp_posts.*, wp_users.user_nicename as username,
                        ${selectPostSubQueries}
                        FROM wp_posts 
                        LEFT JOIN wp_users ON wp_posts.post_author=wp_users.ID
                        WHERE post_name='${name}'
                        ${showUnpublished === true ? "" : "AND post_status='publish'"}
                        `

        return query
    }

    // select posts by tag slug

    export function selectPostsByTag(slug,numberOfPosts,pageNum){
        const query =   `SELECT wp_posts.ID as postId, wp_posts.*, wp_users.user_nicename as username,
                        ${selectPostSubQueries}
                        FROM wp_terms
                        INNER JOIN wp_term_relationships ON wp_terms.term_id=wp_term_relationships.term_taxonomy_id
                        INNER JOIN wp_posts ON wp_term_relationships.object_id=wp_posts.ID
                        LEFT JOIN wp_users ON wp_posts.post_author=wp_users.ID
                        WHERE slug='${slug}'
                        LIMIT ${numberOfPosts}
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfPosts : 0}
                        `
        return query;
    }

    export function selectPostsBySearchPhrase(phrase,numberOfPosts,pageNum){
        const query =   `SELECT wp_posts.ID as postId, wp_posts.*, wp_users.user_nicename as username,
                        ${selectPostSubQueries}
                        FROM wp_posts 
                        LEFT JOIN wp_users ON wp_posts.post_author=wp_users.ID
                        WHERE post_status='publish' AND wp_posts.post_content LIKE '%${phrase}%'
                        OR post_status='publish' AND wp_posts.post_title LIKE '%${phrase}%'
                        ORDER BY post_date DESC
                        LIMIT ${numberOfPosts}
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfPosts : 0}`

        return query

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

        return query;   
        
    }

    // update post
    export function updatePost(body,postId){
        const {
            ID,
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
        
        const query =   `UPDATE wp_posts
                        SET post_title='${post_title}',
                            post_content='${post_content}',
                            post_excerpt='${post_excerpt}',
                            post_status='${post_status}',
                            comment_status='${comment_status}',
                            ping_status='${ping_status}',
                            post_name='${post_name}',
                            to_ping='${to_ping}',
                            pinged='${pinged}',
                            post_modified='${post_modified}',
                            post_content_filtered='${post_content_filtered}',
                            post_parent='${post_parent}',
                            guid='${guid}',
                            menu_order='${menu_order}',
                            post_type='${post_type}',
                            post_mime_type='${post_mime_type}',
                            menu_type='${menu_type}'
                        WHERE ID='${postId}'
                        `
        return query
    }

    // delete post 
    export function deletePost(postId){
        const query = `DELETE FROM wp_posts WHERE ID='${postId}';`
        return query
    }

/* /POSTS */

/* GALLERIES */

export function selectGalleries(numberOfGalleries,pageNum){
    const query =   `SELECT * 
                    FROM js_galleries 
                    LIMIT ${numberOfGalleries ? numberOfGalleries : "100"} 
                    OFFSET ${pageNum ? (pageNum - 1)  * numberOfGalleries : 0}`
    return query
}

export function insertGallery(body){
    const { gallery_name, gallery_description } = body
    const query = `INSERT INTO js_galleries (gallery_name, gallery_description) VALUES ('${gallery_name}','${gallery_description}');`
    return query
}

export function selectGalleryById(id){
    const query =   `SELECT js_galleries.*, GROUP_CONCAT(js_gallery_images.image_src separator ',') as imageSrcs
                    FROM js_galleries 
                    LEFT JOIN js_gallery_images ON js_gallery_images.image_gallery=js_galleries.gallery_id
                    WHERE js_galleries.gallery_id='${id}'`
    return query
}

export function updateGallery(body,galleryId){
    const { gallery_name, gallery_description } = body
    const query =   `UPDATE js_galleries
                    SET gallery_name='${gallery_name}', gallery_description='${gallery_description}' WHERE gallery_id='${galleryId}'`
    return query;
}

export function inserGalleryImage(body){
    const {image_src, image_title, image_description, image_gallery} = body
    const query =   `INSERT INTO js_gallery_images (image_src,image_title,image_description,image_gallery) 
                    VALUES ('${image_src}','${image_title}','${image_description}','${image_gallery}');`

    console.log(query, " IMAGE GALLERY FORM QUERY")

    return query
}

export function selectGalleryImagesByGalleryId(galleryId){
    const query =   `SELECT js_gallery_images.* FROM js_gallery_images WHERE js_gallery_images.image_gallery='${galleryId}'`
    return query
}

/* /GALLERIES */

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

// facebook feed

export function insertFbFeed(body){
    const { content, date_updated, type } = body
    const query = `INSERT INTO fb_feed ( content, date_updated, type ) VALUES ('${content}', '${date_updated}', '${type}');`
    return query;
}
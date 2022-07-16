/* POSTS */

    const selectPostSubQueries =    `(
                                        SELECT wp_term_taxonomy.term_id
                                        FROM wp_term_relationships
                                        INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id=wp_term_relationships.term_taxonomy_id
                                        WHERE wp_term_relationships.object_id=wp_posts.ID AND wp_term_taxonomy.taxonomy='category'
                                        LIMIT 1
                                    ) as categoryId, (
                                        SELECT wp_terms.name 
                                        FROM wp_terms 
                                        WHERE wp_terms.term_id=categoryId
                                        LIMIT 1
                                    ) as categoryName, (
                                        SELECT GROUP_CONCAT(wp_terms.slug separator ',')
                                        FROM wp_term_relationships
                                        INNER JOIN wp_terms ON wp_terms.term_id = wp_term_relationships.term_taxonomy_id
                                        WHERE wp_term_relationships.object_id = wp_posts.ID AND wp_term_relationships.term_taxonomy_id != categoryId
                                    ) as tagNames, (
                                        SELECT GROUP_CONCAT(wp_terms.term_id separator ',')
                                        FROM wp_term_relationships
                                        INNER JOIN wp_terms ON wp_terms.term_id = wp_term_relationships.term_taxonomy_id
                                        WHERE wp_term_relationships.object_id = wp_posts.ID AND wp_term_relationships.term_taxonomy_id != categoryId
                                    ) as tagIds`

    // select posts by args
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
                        LEFT JOIN js_maxids ON js_maxids.table='posts'
                        WHERE post_name='${name}'
                        ${showUnpublished === true ? "" : "AND post_status='publish'"}
                        `

        return query
    }

    // select posts by tag slug

    export function selectPostsByTag(slug,numberOfPosts,pageNum,isCategory){

        const query =   `SELECT wp_posts.ID as postId, wp_posts.*, wp_users.user_nicename as username,
                        ${selectPostSubQueries}
                        FROM wp_terms
                        INNER JOIN wp_term_relationships ON wp_terms.term_id=wp_term_relationships.term_taxonomy_id
                        INNER JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
                        INNER JOIN wp_posts ON wp_term_relationships.object_id=wp_posts.ID
                        LEFT JOIN wp_users ON wp_posts.post_author=wp_users.ID
                        WHERE wp_terms.slug='${slug}' ${isCategory === true ? " AND wp_term_taxonomy.taxonomy='category' " : ""}
                        ORDER BY wp_posts.ID DESC
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

    export function selectPostNamesBySearchPhrase(phrase){
        const query = `SELECT wp_posts.ID as postId, wp_posts.post_title, wp_posts.post_name FROM wp_posts WHERE post_status='publish' AND wp_posts.post_title LIKE '%${phrase}%'`
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
        const query =   `SELECT * ,
                        (
                            SELECT GROUP_CONCAT(js_gallery_images.image_src separator ',')
                            FROM js_gallery_images
                            WHERE js_gallery_images.image_gallery = js_galleries.gallery_id
                        ) as imageSrcs,
                        (
                            SELECT GROUP_CONCAT(js_gallery_images.image_id separator ',')
                            FROM js_gallery_images
                            WHERE js_gallery_images.image_gallery = js_galleries.gallery_id
                        ) as imageIds
                        FROM js_galleries 
                        ORDER BY gallery_id DESC
                        LIMIT ${numberOfGalleries ? numberOfGalleries : "100"} 
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfGalleries : 0}
                        `
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

    export function deleteGallery(galleryId){
        const query = `DELETE FROM js_galleries WHERE js_galleries.gallery_id=${galleryId}`
        return query
    }

    export function inserGalleryImage(body){
        const {image_src, image_title, image_description, image_gallery} = body
        const query =   `INSERT INTO js_gallery_images (image_src,image_title,image_description,image_gallery) 
                        VALUES ('${image_src}','${image_title}','${image_description}','${image_gallery}');`
        return query
    }

    export function selectGalleryImagesByGalleryId(galleryId){
        const query =   `SELECT js_gallery_images.* FROM js_gallery_images WHERE js_gallery_images.image_gallery='${galleryId}'`
        return query
    }

    export function deleteGalleryImage(galleryImageId){
        const query = `DELETE FROM js_gallery_images WHERE js_gallery_images.image_id='${galleryImageId}'`
        return query
    }

/* /GALLERIES */

/* CATEGORIES */

    export function selectCategories(numberOfCategories,pageNum){
        const query =   `SELECT *
                        FROM wp_terms
                        INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id=wp_terms.term_id
                        WHERE wp_term_taxonomy.taxonomy='category'
                        ORDER BY wp_terms.term_id DESC
                        LIMIT ${numberOfCategories}
                        OFFSET ${pageNum ? (pageNum - 1)  * numberOfCategories : 0}
                        `
        return query
    }

    export function selectCategoryById(categoryId){
        const query =   `SELECT * 
                        FROM wp_terms 
                        INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id=wp_terms.term_id
                        WHERE wp_terms.term_id='${categoryId}'`
        return query;
    }

    export function updateTerm(body){
        const { termId, name, slug } = body
        const query =   `UPDATE wp_terms 
                        SET name='${name}', slug='${slug}'
                        WHERE term_id='${termId}'`
        return query;
    }

    export function updateTermTaxonomy(body){
        const { term_id, description, count } = body
        const query =   `UPDATE wp_term_taxonomy 
                        SET description='${description}', count='${count}'
                        WHERE term_id='${term_id}'`
        return query;
    }

    export function incrementTermTaxonomyCount(termId){
        const query = `UPDATE wp_term_taxonomy SET count=count+1 WHERE term_id='${termId}'`
        return query;
    }

    export function decreaseTermTaxonomyCount(termId){
        const query = `UPDATE wp_term_taxonomy SET count=count-1 WHERE term_id='${termId}'`
        return query
    }

    export function updateTermRelationship(catId,previousCatId,postId){
        const query = `UPDATE wp_term_relationships SET term_taxonomy_id='${catId}' WHERE object_id='${postId}' AND term_taxonomy_id='${previousCatId}'`
        return query
    }

    export function deleteTerm(termId){
        const query = `DELETE FROM wp_terms WHERE wp_terms.term_id='${termId}'`
        return query;
    }

    export function deleteTermTaxonomy(termId){
        const query = `DELETE FROM wp_term_taxonomy WHERE wp_term_taxonomy.term_id='${termId}'`
        return query;
    }


/* /CATEGORIES */

/* TAGS */

    export function selectTags(){
        const query =   `SELECT wp_terms.*, wp_term_taxonomy.*
                        FROM wp_terms
                        INNER JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
                        WHERE wp_term_taxonomy.taxonomy='post_tag'
                        `
        return query
    }

    export function selectTagById(tagId){
        const query =   `SELECT wp_terms.*, wp_term_taxonomy.*
                        FROM wp_terms
                        INNER JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
                        WHERE wp_terms.term_id=${tagId}`
        return query
    }

    export function updateTag(body){
        const { term_id, description } = body;
        const query = `UPDATE wp_term_taxonomy SET description="${description}" WHERE wp_term_taxonomy.term_id=${term_id}`
        return query;
    }

    export function updateTagSlug(body){
        const { term_id, name, slug } = body;
        const query = `UPDATE wp_terms SET name="${name}", slug="${slug}" WHERE wp_terms.term_id=${term_id}`
        return query;
    }

    export function decreaseTagCount(termId){
        const query = `UPDATE wp_term_taxonomy SET count=count-1 WHERE wp_term_taxonomy.term_id=${termId}`
        return query;
    }

    // select tags ( wp_terms table ) by search phrase. note that we need to varify that wp_terms row is in face a "post_tag", 
    // we achieve this by inner joining the wp_term_taxonomy table and check if its taxonomy column is "post_tag"
    export function selectTagsBySearchPhrase(phrase){
        const query =   `SELECT wp_terms.*
                        FROM wp_terms
                        INNER JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
                        WHERE wp_term_taxonomy.taxonomy='post_tag' AND wp_terms.name LIKE '%${phrase}%'
                        `
        return query
    }

    export function selectTagsByPostId(postId){
        const query =  `SELECT wp_terms.*
                        FROM wp_terms
                        INNER JOIN wp_term_taxonomy ON wp_terms.term_id=wp_term_taxonomy.term_id
                        INNER JOIN wp_term_relationships ON wp_term_relationships.term_taxonomy_id=wp_terms.term_id
                        WHERE wp_term_taxonomy.taxonomy='post_tag' AND wp_term_relationships.object_id='${postId}'
                        `
        return query;
    }

    export function insertTerm(body){
        const { name, slug } = body
        const query = `INSERT INTO wp_terms ( name, slug, term_group) VALUES ( '${name}', '${slug}', '0')`
        return query;
    }

    export function insertTermTaxonomy(body){
        const { term_id, taxonomy, description, parent, count } = body
        const query =  `INSERT INTO wp_term_taxonomy (term_taxonomy_id, term_id, taxonomy, description, parent, count ) VALUES ('${term_id}', '${term_id}','${taxonomy}','${description}','${parent}','${count}');`
        return query;
    }

    // insert term relationship, IE add a tag to a post
    export function insertTermRelationship(termId,postId){
        const query = `INSERT INTO wp_term_relationships ( object_id, term_taxonomy_id, term_order ) VALUES ('${postId}','${termId}','0');`
        console.log(query)
        return query;
    }

    export function deleteTermRelationship(termId,postId){
        const query = `DELETE FROM wp_term_relationships WHERE object_id='${postId}' AND term_taxonomy_id='${termId}'`
        return query
    }


    export function deleteTermRelationships(termId){
        const query = `DELETE FROM wp_term_relationships WHERE term_taxonomy_id='${termId}'`
        return query
    }

/* /TAGS */

    // select menu items

    export function selectMenuItems(){
        const query =   `SELECT wp_posts.post_title, wp_posts.post_name, wp_posts.ID, wp_term_taxonomy.taxonomy, wp_term_taxonomy.term_id
                        FROM wp_posts
                        INNER JOIN wp_term_relationships ON wp_term_relationships.object_id=wp_posts.ID
                        INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id=wp_term_relationships.term_taxonomy_id 
                        WHERE wp_term_taxonomy.taxonomy='footer_menu' OR  wp_term_taxonomy.taxonomy='main_menu'`
        return query
    }

    export function selectMenuItemById(termId){
        const query =   `SELECT wp_posts.post_title, wp_posts.post_name, wp_posts.ID, wp_term_taxonomy.taxonomy, wp_term_taxonomy.term_id
                        FROM wp_posts
                        INNER JOIN wp_term_relationships ON wp_term_relationships.object_id=wp_posts.ID
                        INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id=wp_term_relationships.term_taxonomy_id 
                        WHERE wp_term_taxonomy.term_id='${termId}'`
        return query
    }

    // select nav items

    export function selectNavItems(type){
        const query =   `SELECT wp_posts.post_title, wp_posts.post_name, wp_posts.ID as postId
                        FROM wp_posts
                        INNER JOIN wp_term_relationships ON wp_term_relationships.object_id=wp_posts.ID
                        INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id=wp_term_relationships.term_taxonomy_id 
                        WHERE wp_term_taxonomy.taxonomy='${type ? type : 'main_menu'}'
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

    export function selectCommentsByPostId(postId){
        const query = `SELECT * FROM wp_comments WHERE comment_post_ID='${postId}'`
        return query
    }

    // select x number of media items

    export function selectMediaItems(numberOfMediaItems,pageNum){
        const query =   `SELECT wp_postmeta.meta_key, wp_postmeta.meta_value, wp_postmeta.post_id, wp_postmeta.meta_id, wp_posts.post_title, wp_posts.post_name
                        FROM wp_postmeta 
                        LEFT JOIN wp_posts ON wp_posts.ID=wp_postmeta.post_id
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

    export function insertFbToken(body){
        const { token, date_updated } = body
        const query = `INSERT INTO fb_token ( token, date_updated ) VALUES ('${token}','${date_updated}');`
        return query;
    }

    export function updateFbToken(body,fbTokenId){
        const { token, date_updated } = body
        const query = `UPDATE fb_token SET token='${token}', date_updated='${date_updated}' WHERE ID='${fbTokenId}'`
        return query
    }
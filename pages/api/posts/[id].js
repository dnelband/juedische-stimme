import excuteQuery from '../../../lib/db'

export default async (req, res) => {
    try {
        if (req.method === 'PUT') {

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
            } = req.body;

            const result = await excuteQuery({

                query: `UPDATE wp_posts
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
                        WHERE ID='${req.query.id}'
                        `
            });

            // console.log(result,"result on put / update")
            res.json(result)
            
        }
        else if (req.method === 'DELETE'){
            
            const result = await excuteQuery({
                query: `DELETE FROM wp_posts WHERE ID='${req.query.id}';`
            });

            // console.log(result,"result")
            res.json(result)
        }
        else {
            // Handle any other HTTP method
                console.log('not post request')
                res.json({message:'no GET here!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};


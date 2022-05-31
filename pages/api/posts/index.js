import excuteQuery from '../../../lib/db'

export default async (req, res) => {
    try {
        if (req.method === 'POST') {

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
                } = req.body;

                const result = await excuteQuery({
                    query: `INSERT INTO wp_posts (
                                    post_date,
                                    post_title,
                                    post_content,
                                    post_excerpt,
                                    post_name,
                                    to_ping,
                                    pinged,
                                    post_content_filtered
                            )
                            VALUES (
                                    '${post_date}',
                                    '${post_title}',
                                    '${post_content}',
                                    '${post_excerpt}',
                                    '${post_name}',
                                    '${to_ping}',
                                    '${pinged}',
                                    '${post_content_filtered}'
                            );
                            `
                });

                console.log(result,"result")
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


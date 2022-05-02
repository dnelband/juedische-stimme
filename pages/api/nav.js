import excuteQuery from '../../lib/db'

export default async (req, res) => {
    try {
        // console.log("req params", req.params)
        const result = await excuteQuery({
            query: `SELECT * 
                    FROM wp_posts
                    WHERE post_type='page'
                    AND post_status='publish'
                    ORDER BY post_date DESC
                    `
        });
        // console.log( "result:",result);
        res.json(result)
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
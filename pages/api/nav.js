import excuteQuery from '../../lib/db'

export default async (req, res) => {
    try {
        // console.log("req params", req.params)
        const result = await excuteQuery({
            query: `SELECT * 
                    FROM wp_posts
                    WHERE menu_type='main'
                    AND post_status='publish'
                    ORDER BY post_date DESC
                    `
        });
        res.json(result)
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
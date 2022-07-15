import excuteQuery from 'lib/db'
import { updateTag, updateTagSlug } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST'){ 

        } if (req.method === 'PUT'){
            console.log(req.body)
            const updateTagResult = await excuteQuery({
                query:updateTag(req.body)
            })
            const updateTagSlugResult = await excuteQuery({
                query:updateTagSlug(req.body)
            })
            res.json({message:"tag updated"})
        } else if (req.method === 'DELETE'){
            // const result = await excuteQuery({
            //     query: `DELETE FROM wp_postmeta WHERE meta_id='${req.query.id}';`
            // });
            // console.log(result,"result")
            // res.json(result)
        } else {
            // Handle any other HTTP method
            console.log('not post request')
            res.json({message:'no GET here!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};

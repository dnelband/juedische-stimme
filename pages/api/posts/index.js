import excuteQuery from 'lib/db'
import { incrementTermTaxonomyCount, insertPost, insertTermRelationship } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST') {

            const result = await excuteQuery({
                query: insertPost(req.body)
            });
            console.log(result,"result")

            console.log(req.body.categoryId, " REQ BODY CATEGORY ID")

            const insertTermRelationshipResult = await excuteQuery({
                query: insertTermRelationship(req.body.categoryId, result.insertId)
            })
            console.log(insertTermRelationshipResult, " INSERT TERM RELATIONSHIP RESULT")            

            const incrementCategoryCountResult = await excuteQuery({
                query:incrementTermTaxonomyCount(req.body.categoryId)
            })
            console.log(incrementCategoryCountResult," incrementCategoryCountResult")
            
            
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


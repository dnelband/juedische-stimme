import excuteQuery from '../../lib/db'
import { selectNavItems } from '../../lib/queries';

export default async (req, res) => {
    try {
        // console.log("req params", req.params)
        const result = await excuteQuery({
            query: selectNavItems()
        });
        res.json(result)
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
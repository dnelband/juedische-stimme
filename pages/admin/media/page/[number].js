import { useContext, useEffect } from 'react'
import { Context } from "../../../../context";
import { selectMediaItems } from '../../../../lib/queries'
import excuteQuery from '../../../../lib/db'
import styles from '../../../../styles/Home.module.css'

export default function AdminMediaPage(props) {
  
  const { state, dispatch } = useContext(Context);

    useEffect(() => {
        dispatch({type:"SET_MEDIA_ITEMS",payload:JSON.parse(props.mediaItems)})
    },[])

    let mediaItemsDisplay;
    if (state.mediaItems){
      /* 
        TO DO
        none of the pages should have data - render logic. 
        mapping of media items should be handled by a dedicated AdminMediaItems component 
        ( we will not display media items as a component to the users, they will be included in the post content)
      */

        mediaItemsDisplay = state.mediaItems.map((mediaItem,index) => (
            <li key={index}>{mediaItem.meta_value}</li>
        ))
    }

    return (
        <div className={styles.container}>
            <h2>Media</h2>
            <hr/>
            <ul>
                {mediaItemsDisplay}
            </ul>
        </div>
    )
}

AdminMediaPage.layout = "admin"

export const getServerSideProps = async (context) => {
    
    const mediaResponse = await excuteQuery({
      query:selectMediaItems(50,context.query.number)
    });
    console.log(mediaResponse)
    const mediaItems = JSON.stringify(mediaResponse);
    return {
      props:{
        mediaItems:mediaItems
      }
    }
  }
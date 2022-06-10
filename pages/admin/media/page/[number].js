import { useContext, useEffect } from 'react'
import { Context } from "context";
import { selectMediaItems } from 'lib/queries'
import excuteQuery from 'lib/db'
import styles from 'styles/Home.module.css'
import MediaItems from 'components/admin/MediaItems';

export default function AdminMediaPage({mediaItems}) {
  
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
      dispatch({type:"SET_MEDIA_ITEMS",payload:JSON.parse(mediaItems)})
  },[])

  let mediaItemsDisplay;
  if (state.mediaItems){
      mediaItemsDisplay = <MediaItems mediaItems={state.mediaItems} />
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
  const mediaItems = JSON.stringify(mediaResponse);
  console.log(mediaItems)
  return {
    props:{
      mediaItems:mediaItems
    }
  }
}
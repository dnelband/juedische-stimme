import Head from 'next/head'
import Image from 'next/image'
 
import { useContext, useEffect } from 'react'

import styles from '../../../../styles/Home.module.css'
import excuteQuery from '../../../../lib/db'

import { Context } from "../../../../context";

export default function AdminMediaPage(props) {
  
  const { state, dispatch } = useContext(Context);
  
    console.log()

    useEffect(() => {
        dispatch({type:"SET_MEDIA_ITEMS",payload:JSON.parse(props.mediaItems)})
    },[])

    let mediaItemsDisplay;
    if (state.mediaItems){
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
      query: `SELECT *
              FROM wp_postmeta 
              WHERE meta_key="_wp_attached_file"
              ORDER BY meta_id DESC
              LIMIT 50
              OFFSET ${(context.query.number - 1)  * 50}
              `
    });
    const mediaItems = JSON.stringify(mediaResponse);
    return {
      props:{
        mediaItems:mediaItems
      }
    }
  }
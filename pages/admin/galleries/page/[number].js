import { useContext, useEffect } from 'react'
import { Context } from "context";
import excuteQuery from 'lib/db'
import { selectGalleries } from 'lib/queries'
import styles from 'styles/Home.module.css'

export default function AdminCommentsPage(props) {
  
  const { state, dispatch } = useContext(Context);

    useEffect(() => {
        dispatch({type:"SET_GALLERIES",payload:JSON.parse(props.galleries)})
    },[])

    let galleriesDisplay;
    if (state.galleries){
      /* 
        TO DO
        none of the pages should have data - render logic. 
        mapping of galleries should be handled by a dedicated Galleries or AdminGalleries component 
      */
        galleriesDisplay = state.galleries.map((gallery,index) => (
            <li key={index}><a href={`/admin/galleries/${gallery.gallery_id}`}>{gallery.gallery_name}</a></li>
        ))
    } else galleriesDisplay = <h3>NO GALLERIES FOUND</h3>

    return (
        <div className={styles.container}>
            <h2>Galleries</h2>
            <hr/>
            <ul>{galleriesDisplay}</ul>
        </div>
    )
}

AdminCommentsPage.layout = "admin"

export const getServerSideProps = async (context) => {
  const galleriesResponse = await excuteQuery({
    query: selectGalleries(50,context.query.number)
  });
  const galleries = JSON.stringify(galleriesResponse);
  return {
    props:{
        galleries,
        pageNum:context.query.number
    }
  }
}
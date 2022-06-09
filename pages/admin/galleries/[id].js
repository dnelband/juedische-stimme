import { useContext, useEffect } from 'react'
import { Context } from "context"
import excuteQuery from 'lib/db'
import { selectGalleryById, selectGalleryImagesByGalleryId } from 'lib/queries'
import GalleryForm from 'components/admin/GalleryForm'
import styles from 'styles/Home.module.css'

export default function EditGalleryPage(props) {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    dispatch({type:'SET_GALLERY',payload:{gallery:JSON.parse(props.gallery)[0],images:JSON.parse(props.galleryImages)}})
  },[])

  return (
    <div className={styles.container}>
      {state.gallery ? <GalleryForm gallery={state.gallery} /> : ''}
    </div>
  )
}

EditGalleryPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const galleryResponse = await excuteQuery({
    query: selectGalleryById(context.query.id)
  });
  const gallery = JSON.stringify(galleryResponse);
  const galleryImagesResponse = await excuteQuery({
    query: selectGalleryImagesByGalleryId(context.query.id)
  });  
  const galleryImages = JSON.stringify(galleryImagesResponse);
  return {
    props:{
      gallery,
      galleryImages
    }
  }
}
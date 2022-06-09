import GalleryForm from 'components/admin/GalleryForm';
import styles from 'styles/Home.module.css'

export default function CreateGalleryPage() {
  return (
    <div className={styles.container}>
        <GalleryForm/>
    </div>
  )
}

CreateGalleryPage.layout = "admin";
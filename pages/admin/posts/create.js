import styles from '../../../styles/Home.module.css'
import PostForm from '../../../components/admin/PostForm'

export default function CreatePostPage() {
  return (
    <div className={styles.container}>
      <PostForm />
    </div>
  )
}

CreatePostPage.layout = "admin";
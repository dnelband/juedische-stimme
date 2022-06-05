import excuteQuery from '../../../lib/db'
import styles from '../../../styles/Home.module.css'
import PostForm from '../../../components/admin/PostForm'

export default function CreatePostPage({maxId}) {
  const nextPostId = JSON.parse(maxId)[0]['MAX( ID )'] + 1
  return (
    <div className={styles.container}>
      <PostForm 
        nextPostId={nextPostId}
      />
    </div>
  )
}

CreatePostPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const maxIdResponse = await excuteQuery({
    query: ` SELECT MAX( ID ) FROM wp_posts;`
  });
  const maxId = JSON.stringify(maxIdResponse);
  return {
    props:{
      maxId
    }
  }
}
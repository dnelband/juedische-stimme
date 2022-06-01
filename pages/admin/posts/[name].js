 // import { useContext, useEffect } from 'react'
import styles from '../../../styles/Home.module.css'
import excuteQuery from '../../../lib/db'
// import { Context } from "../../../context"
import PostForm from '../../../components/admin/PostForm'
import { selectPostByName } from '../../../lib/queries'

export default function EditPostPage(props) {
  // const { state, dispatch } = useContext(Context);
  const post = JSON.parse(props.post)[0];
  return (
    <div className={styles.container}>
      <PostForm
        post={post}
      />
    </div>
  )
}

EditPostPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const postsResponse = await excuteQuery({
    query: selectPostByName(context.query.name)
  });
  const post = JSON.stringify(postsResponse);
  return {
    props:{
      post:post
    }
  }
}
import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'
import Post from 'components/Post'
import { selectCommentsByPostId, selectPostByName } from 'lib/queries'

export default function ContentPage(props) {
  let page = JSON.parse(props.page)[0];
  page.comments = JSON.parse(props.comments)
  return (
    <div className={styles.container}>
      <Post post={page}/>
    </div>
  )
}

ContentPage.layout = "main";

export const getServerSideProps = async (context) => {
  const pageResponse = await excuteQuery({
    query: selectPostByName(context.query.name)
  });
  const page = JSON.stringify(pageResponse);
  let comments;
  if (pageResponse.length > 0){
    const commentsReponse = await excuteQuery({
      query: selectCommentsByPostId(pageResponse[0].ID)
    }); 
    comments = JSON.stringify(commentsReponse);
  }
  console.log(comments)
  return {
    props:{
        page,
        comments
    }
  }
}
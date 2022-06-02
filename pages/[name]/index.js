//  import { useContext, useEffect } from 'react'

import styles from '../../styles/Home.module.css'
import excuteQuery from '../../lib/db'

// import { Context } from "../../context"
import Post from '../../components/Post'
import { selectPostByName, selectTagsByIds } from '../../lib/queries'

export default function ContentPage(props) {
  
  // const { state, dispatch } = useContext(Context);

  let page = JSON.parse(props.page)[0];
  page.tags = JSON.parse(props.tags)

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
  
  const tagsResponse = await excuteQuery({
    query: selectTagsByIds(JSON.parse(page)[0].tagIds)
  })
  const tags = JSON.stringify(tagsResponse);

  return {
    props:{
        page,
        tags
    }
  }
}
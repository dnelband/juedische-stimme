//  import { useContext, useEffect } from 'react'

import styles from '../../styles/Home.module.css'
import excuteQuery from '../../lib/db'

// import { Context } from "../../context"
import Post from '../../components/Post'
import { selectPostByName } from '../../lib/queries'

export default function ContentPage(props) {
  
  // const { state, dispatch } = useContext(Context);

  const page = JSON.parse(props.page)[0];

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
  return {
    props:{
        page:page
    }
  }
}
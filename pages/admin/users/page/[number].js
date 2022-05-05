import Head from 'next/head'
import Image from 'next/image'
 
import { useContext, useEffect } from 'react'

import styles from '../../../../styles/Home.module.css'
import excuteQuery from '../../../../lib/db'

import { Context } from "../../../../context";

export default function AdminUserPage(props) {
  
  const { state, dispatch } = useContext(Context);
  
    console.log()

    useEffect(() => {
        dispatch({type:"SET_USERS",payload:JSON.parse(props.users)})
    },[])

    let usersDisplay;
    if (state.users){
        usersDisplay = state.users.map((user,index) => (
            <li key={index}>{user.user_login}</li>
        ))
    }

    return (
        <div className={styles.container}>
            <h2>Users</h2>
            <hr/>
            <ul>
                {usersDisplay}
            </ul>
        </div>
    )
}

AdminUserPage.layout = "admin"

export const getServerSideProps = async (context) => {
    
    const usersResponse = await excuteQuery({
      query: `SELECT *
              FROM wp_users 
              ORDER BY ID DESC
              LIMIT 10
              OFFSET ${(context.query.number - 1)  * 10}
              `
    });
    const users = JSON.stringify(usersResponse);
    return {
      props:{
        users:users
      }
    }
  }
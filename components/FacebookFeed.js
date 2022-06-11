import React, {useEffect, useState, useContext } from 'react'
import { Context } from 'context';

import dateTimeHelper from 'helpers/dateTimeHelper'
import axios from 'axios'
import renderToString from 'helpers/renderToString'

const FacebookFeed = (props) => {

    const { state, dispatch } = useContext(Context)

    const [ feed, setFeed ] = useState()
    
    useEffect(() => {
            if (state.facebook.token){
                initFacebookFeed()
            }
    }, [state.facebook])
    
    async function initFacebookFeed(){
        if (!state.facebook.feed){
            fetchFacebookFeed()
        } else {
            setFeed(JSON.parse(state.facebook.feed.content))
            
            const fbFeedUpdatedMonth = parseInt(state.facebook.feed.date_updated.split('-')[1]);
            const fbFeedUpdatedDay = parseInt(state.facebook.feed.date_updated.split('-')[2])

            console.log(fbFeedUpdatedMonth, fbFeedUpdatedDay)

            const today = new Date();
            const month = today.getMonth() + 1;
            const day = today.getDate();

            console.log(day !== fbFeedUpdatedDay || month !== fbFeedUpdatedMonth)

            console.log(month, day)
            if (day !== fbFeedUpdatedDay || month !== fbFeedUpdatedMonth) fetchFacebookFeed()
        }
    }

    async function fetchFacebookFeed(){
        
        const res  = await fetch(`https://graph.facebook.com/1297004353776035/feed?limit=3&fields=full_picture,story,message&access_token=${state.facebook.token}`)
        const fetchedFeed = await res.json()
        // remove all the weird characters from the content to avoid mySql errors
        if (fetchedFeed.data && fetchedFeed.data.length > 0){
            const renderedFeed = renderToString(fetchedFeed.data);
            console.log(renderedFeed)
            axios({
                method: 'post',
                url: `/api/fbfeed`,
                data: {
                    content:renderedFeed,
                    date_updated:dateTimeHelper(new Date()),
                    type:'posts'
                }
            }).then((response) => {
                setFeed(fetchedFeed.data)
                console.log(response,"response on create fb feed record");
                // window.location.href = "/admin/posts/page/1" // BETTER FETCH THE POSTS THEN REFRESH PAGE
            }, (error) => {
                console.log(error, "ERROR on create fb feed record");
                // console.log('NOW NEEDS TO DISPLAY ERRORS!')
            });
        }
    }

    let feedDisplay;
    if (feed && feed.length > 0){
        feedDisplay = feed.map((fbPost, index) => {
            if (index <= 2){
                return (
                    <div key={index} style={{width: "33%", float: "left",padding:"5px"}}>
                        <h2>{fbPost.story}</h2>
                        <img src={fbPost.full_picture} width={"100%"}/>
                        <p>{fbPost.message}</p>
                    </div>
                )
            }
        })
    }

    return (
        <div style={{overflow:"auto", backgroundColor: "#efefef"}}>
            <h1>FACEBOOK FEED</h1>
            <div>{feedDisplay}</div>
        </div>
    )
}

export default FacebookFeed
import React, {useEffect } from 'react'

import dateTimeHelper from 'helpers/dateTimeHelper'
import axios from 'axios'
import renderToString from 'helpers/renderToString'

import { setFeed  } from 'store/fbdata/fbDataSlice'
import { useDispatch, useSelector } from 'react-redux'

const FacebookFeed = (props) => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.fbData.token)
    const feed = useSelector(state => state.fbData.feed);

    useEffect(() => {
            if (token){
                initFacebookFeed()
            }
    }, [token])
    
    async function initFacebookFeed(){
        if (!feed){
            fetchFacebookFeed()
        } else {
            const fbFeedUpdatedMonth = parseInt(feed.date_updated.split('-')[1]);
            const fbFeedUpdatedDay = parseInt(feed.date_updated.split('-')[2])
            const today = new Date();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            if (day !== fbFeedUpdatedDay || month !== fbFeedUpdatedMonth) fetchFacebookFeed()
        }
    }

    async function fetchFacebookFeed(){
        
        // const pageTokenRes = await fetch(`https://graph.facebook.com/PAGE-ID?fields=access_token&access_token=${token}`)
        // const pageToken = await pageTokenRes.json()

        const res  = await fetch(`https://graph.facebook.com/1297004353776035/feed?limit=3&fields=full_picture,story,message&access_token=${token}`)
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
                dispatch(setFeed(fetchedFeed.data))
                console.log(response,"response on create fb feed record");
                // window.location.href = "/admin/posts/page/1" // BETTER FETCH THE POSTS THEN REFRESH PAGE
            }, (error) => {
                console.log(error, "ERROR on create fb feed record");
                // console.log('NOW NEEDS TO DISPLAY ERRORS!')
            });
        }
    }

    let feedDisplay;
    if (feed && feed.content && feed.content.length > 0){
        const feedArray = JSON.parse(feed.content)
        feedDisplay = feedArray.map((fbPost, index) => {
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

import React, {useEffect, useState} from 'react'
import dateTimeHelper from 'helpers/dateTimeHelper'
import axios from 'axios'

const FacebookFeed = (props) => {

    const [ feed, setFeed ] = useState()
    
    useEffect(() => {
        initFacebookFeed()
    }, [])
    
    async function initFacebookFeed(){
        if (!props.fbFeed){
            fetchFacebookFeed()
        } else {
            const fbFeedUpdatedMonth = parseInt(props.fbFeed.date_updated.split('-')[1]);
            const fbFeedUpdatedDay = parseInt(props.fbFeed.date_updated.split('-')[2])
            const today = new Date();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            console.log(month,day)
            if (day !== fbFeedUpdatedDay || month !== fbFeedUpdatedMonth) fetchFacebookFeed()
            else setFeed(JSON.parse(props.fbFeed.content))            
        }
    }

    async function fetchFacebookFeed(){
        console.log('FETCHING FACEBOOK FEED')
        const res  = await fetch('https://graph.facebook.com/1297004353776035/feed?access_token=EAAHrdtxIrIsBAAGN4txgdsfvF4Dj1GZAU0ZB24dFDnRIpQ0ZB3fVRQYeVYix7HnfZBaGkHPXhZAKYrYG28MpVbSirNllWATPRZA0byH3Xpqv0N2o3BZBSwhBzOoeK3zOmZCBgVpei2satOYlTOgrflxOZBy2ZC65RLDc5CusR5SHkc8FMxHoY7RAl2hUwuZBQqkNVh0PwPGacev7T9omokdBWgd')
        const feed = await res.json()
        // remove all the weird characters from the content to avoid mySql errors
        const renderedFeed = JSON.stringify(feed.data).split('’').join('').split('\\n').join('').split("'").join('')
        if (feed.data && feed.data.length > 0){
            axios({
                method: 'post',
                url: `/api/fbfeed`,
                data: {
                    content:renderedFeed,
                    date_updated:dateTimeHelper(new Date())
                }
            }).then((response) => {
                setFeed(feed.data)
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
                    <div style={{width: "33%", float: "left",padding:"5px"}}>
                        <h2>{fbPost.story}</h2>
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
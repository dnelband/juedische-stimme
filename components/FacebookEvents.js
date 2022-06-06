

import React, {useEffect, useState, useContext } from 'react'
import { Context } from 'context';
import dateTimeHelper from 'helpers/dateTimeHelper'
import axios from 'axios'
import renderToString from 'helpers/renderToString';

const FacebookEvents = (props) => {
    
    const { state, dispatch } = useContext(Context)
    const [ events, setEvents ] = useState()

    useEffect(() => {
        if (state.facebook.token) initFacebookEvents()
    }, [state.facebook])
    
    async function initFacebookEvents(){
        if (!state.facebook.events){
            fetchFacebookEvents()
        } else {
            setEvents(JSON.parse(state.facebook.events.content))
            
            const fbEventsUpdatedMonth = parseInt(state.facebook.events.date_updated.split('-')[1]);
            const fbEventsUpdatedDay = parseInt(state.facebook.events.date_updated.split('-')[2])
            const today = new Date();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            if (day !== fbEventsUpdatedDay || month !== fbEventsUpdatedMonth) fetchFacebookEvents()
        }
    }

    async function fetchFacebookEvents(){
        const res  = await fetch(`https://graph.facebook.com/1297004353776035/events?limit=3&access_token=${state.facebook.token}`)
        const fetchedEvents = await res.json()
        // remove all the weird characters from the content to avoid mySql errors
        if (fetchedEvents.data && fetchedEvents.data.length > 0){
            const renderedEvents = renderToString(fetchedEvents.data)
            axios({
                method: 'post',
                url: `/api/fbfeed`,
                data: {
                    content:renderedEvents,
                    date_updated:dateTimeHelper(new Date()),
                    type:'events'
                }
            }).then((response) => {
                setEvents(fetchedEvents.data)
                console.log(response,"response on create fb feed record");
                // window.location.href = "/admin/posts/page/1" // BETTER FETCH THE POSTS THEN REFRESH PAGE
            }, (error) => {
                console.log(error, "ERROR on create fb feed record");
                // console.log('NOW NEEDS TO DISPLAY ERRORS!')
            });
        }
    }

    let eventsDisplay;
    if (events && events.length > 0){
        eventsDisplay = events.map((fbEvent, index) => {
            if (index <= 2){
                return (
                    <div style={{width: "33%", float: "left",padding:"5px"}}>
                        <p>{fbEvent.description}</p>
                    </div>
                )
            }
        })
    }

    return (
        <div style={{overflow:"auto", backgroundColor: "#efefef"}}>
            <h1>FACEBOOK EVENTS</h1>
            <div>{eventsDisplay}</div>
        </div>
    )
}

export default FacebookEvents
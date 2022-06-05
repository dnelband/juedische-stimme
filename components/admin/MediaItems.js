import React from 'react'
import axios from 'axios'

const MediaItems = ({mediaItems}) => {

    function deleteMediaItem(mediaItem){

        const deleteFileUrl = `${window.location.protocol}//${window.location.hostname}:4000/media/${mediaItem.meta_value.split('/').join('+++')}`;
        const deleteFileRequest = axios.delete(deleteFileUrl)
        const deleteMediaItemUrl = `/api/media/${mediaItem.meta_id}`
        const deleteMediaItemRequest = axios.delete(deleteMediaItemUrl)

        axios.all([deleteFileRequest, deleteMediaItemRequest]).then(axios.spread((...responses) => {
            const deleteFileResponse = responses[0]
            const deleteMediaItemResponse = responses[1]
            console.log(deleteFileResponse)
            console.log(deleteMediaItemResponse)
            window.location.reload()
            // use/access the results 
          })).catch(errors => {
              console.log(errors, " ERRORS")
            // react on errors.
          })

        axios({
            method: 'delete',
            url:deleteFileUrl
        }).then((response) => {
            // window.location.reload()
            console.log(response,"response on delete FILE");
        }, (error) => {
            console.log(error.response, "ERROR on delete FILE");
        });

        // axios({
        //     method: 'delete',
        //     url: `/api/media/${mediaItem.meta_id}`
        // }).then((response) => {
        //     // window.location.reload()
        //     console.log(response,"response on delete media item");
        //     console.log('NOW NEEDS TO REFRESH media items LIST!');
        // }, (error) => {
        //     console.log(error, "ERROR on delete media item");
        //     console.log('NOW NEEDS TO DISPLAY ERROR')
        // });
    }

    let mediaItemsDisplay;
    if (mediaItems){
        mediaItemsDisplay = mediaItems.map((mediaItem,index) => (
            <li key={index}>
                <img width={'100px'} src={`/wp-content/uploads/${mediaItem.meta_value}`}/>
                <button onClick={() => deleteMediaItem(mediaItem)}>
                    DELETE MEDIA ITEM
                </button>
            </li>
        ))
    }

    return (
        <div>
            {mediaItemsDisplay}
        </div>
    )
}

export default MediaItems
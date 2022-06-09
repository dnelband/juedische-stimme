import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'styles/Form.module.css';
import TiptapEditor from '../tiptap/TipTapEditor';
import GalleryImageForm from './GalleryImageForm';

function GalleryForm({gallery}){

    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            gallery_name: gallery ? gallery.gallery_name : '',
            gallery_description: gallery ? gallery.gallery_description : ''
        },
        onSubmit: values => {
            
            axios({
                method: gallery ? 'put' : 'post',
                url: `/api/galleries${gallery ? "/" + gallery.gallery_id : ''}`,
                data: { ...values }
            }).then((response) => {
                console.log(response,"response on gallery (put or post)");
                if (response.data){
                    window.location.href = `/admin/galleries/${gallery ? gallery.gallery_id : response.data.insertId}` // BETTER FETCH THE POSTS THEN REFRESH PAGE
                }
            }, (error) => {
                console.log(error, "ERROR on post");
                console.log('NOW NEEDS TO DISPLAY ERRORS!')
            });

        },
    });

    let galleryImagesDisplay = 'no images in gallery YET!';
    if (gallery && gallery.images){
        galleryImagesDisplay = gallery.images.map((galleryImage,index) => (
            <div key={index} className='gallery-form-image'>
                <img src={`/wp-content/uploads/${galleryImage.image_src}`} width="300" />
            </div>
        ))
    }
    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles['form-row']}>
                    <label htmlFor="gallery_name">GALLERY NAME</label>
                    <input
                        id="gallery_name"
                        name="gallery_name"
                        type="gallery_name"
                        onChange={formik.handleChange}
                        value={formik.values.gallery_name}
                    />
                </div>
                <div className={styles['form-row']}>
                    <label htmlFor='gallery_description'>GALLERY DESCRIPTION</label>
                    <TiptapEditor 
                        id="gallery_description"
                        name="gallery_description"
                        type="gallery_description"
                        onChange={val => formik.setFieldValue('gallery_description',val,true)}
                        value={formik.values.gallery_description}
                    />
                </div>
                <div className={styles['form-row']}>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <h2>Add Image</h2>
            <GalleryImageForm 
                galleryId={gallery ? gallery.gallery_id : ""}
            />
            <h2>Gallery Images</h2>
            {galleryImagesDisplay}
        </div>
    )
}

export default GalleryForm;
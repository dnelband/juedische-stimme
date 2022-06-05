import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import dateTimeHelper from '../../helpers/dateTimeHelper';
import styles from '../../styles/Form.module.css';
import TiptapEditor from '../tiptap/TipTapEditor';

const PostForm = ({post,nextPostId}) => {
  
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
        post_author: post ? post.post_author : 2, // '' --> CHANGE THIS BACK!!!!,
        post_date: post ? post.post_date : '',
        post_date_gmt:post ? post.post_date_gmt : '',
        post_content:post ? post.post_content : '',
        post_title:post ? post.post_title : '',
        post_excerpt: post ? post.post_excerpt : '',
        post_status: post ? post.post_status : '',
        comment_status: post ? post.comment_status : '',
        ping_status: post ? post.ping_status : '',
        post_password: post ? post.post_password : '',
        post_name: post ? post.post_name : '',
        to_ping: post ? post.to_ping : '',
        pinged: post ? post.pinged : '',
        post_modified: post ? post.post_modified : '',
        post_modified_gmt: post ? post.post_modified_gmt : '',
        post_content_filtered: post ? post.post_content_filtered : '',
        post_parent: post ? post.post_parent : '',
        guid: post ? post.guid : '',
        menu_order: post ? post.menu_order : '',
        post_type: post ? post.post_type : '',
        post_mime_type:  post ? post.post_mime_type : '',
        comment_count: post ? post.comment_count : '',
        menu_type: post ? post.menu_type : ''
    },
    onSubmit: values => {

        // alert(JSON.stringify(values, null, 2));

        console.log(values.post_content)

        axios({
            method: post ? 'put' : 'post',
            url: `/api/posts${post ? "/" + post.postId : ''}`,
            data: {
                ...values,
                post_date:post ? post.post_date : dateTimeHelper(new Date()),
                // post_date_gmt: like post_date but one hour less
                post_name:values.post_title.replace(/\s+/g, '-').toLowerCase().replace(),
                post_modified_date: dateTimeHelper(new Date())
            }
        }).then((response) => {
            console.log(response,"response on post");
            window.location.href = "/admin/posts/page/1" // BETTER FETCH THE POSTS THEN REFRESH PAGE
        }, (error) => {
            console.log(error, "ERROR on post");
            console.log('NOW NEEDS TO DISPLAY ERRORS!')
        });

    },
  });

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles['form-row']}>
          <label htmlFor="post_title">POST TITLE</label>
          <input
            id="post_title"
            name="post_title"
            type="post_title"
            onChange={formik.handleChange}
            value={formik.values.post_title}
          />
        </div>
        <div className={styles['form-row']}>
          <label htmlFor='post_content'>Post Content</label>
          <TiptapEditor 
              id="post_content"
              name="post_content"
              type="post_content"
              onChange={val => formik.setFieldValue('post_content',val,true)}
              value={formik.values.post_content}
              postId={post ? post.postId : nextPostId}   
          />
        </div>
        <div className={styles['form-row']}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
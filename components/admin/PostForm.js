import React from 'react';
import { useForm } from 'react-hook-form';

export default function PostForm({post}) {
  
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);
    console.log(errors);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Post Title" {...register("post_title", {required: true, maxLength: 80,value: post ? post.post_title : "" })} />
            <textarea style={{width:"100%", height:"600px"}} {...register("post_content", {required: true, maxLength: 100,value:post ? post.post_content : ""})}/>
            <input type="submit" value={"publish"} />
        </form>
    );
}
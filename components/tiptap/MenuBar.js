import React, { useRef } from 'react'
import styles from '../../styles/tiptap.module.css'
import axios from 'axios'

const MenuBar = ({ editor, postId }) => {

    const fileInputRef = useRef();

    if (!editor) {
      return null
    }

    function onUpladImageClick(){
      fileInputRef.current.click();
    }
  
    const onImageInputChangeHanlder = (event) => {
      if (!event.target.files?.length) {
        return;
      }
      const formData = new FormData();
      let fileName = event.target.files[0].name;
      Array.from(event.target.files).forEach((file) => {
        formData.append(event.target.name, file);
      });
      uploadImage(formData,fileName);
      console.log(fileInputRef);
    //   fileInputRef.current?.reset();

    };
  
    const uploadImage = async (formData,fileName) => {
        const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
            console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
        };
        const response = await axios.post('/api/uploads', formData, config);
        
        console.log('response:', response.data);

        const today = new Date();
        let month = today.getMonth();
        month += 1;
        month = month < 10 ? "0" + month : month;

        const meta_value = `${today.getFullYear()}/${month}/${fileName}`;

        axios({
            method:'post',
            url: `/api/media`,
            data: {
                post_id:postId,
                meta_key:'_wp_attached_file',
                meta_value
            }
        }).then((response) => {
            console.log(response,"response on insert media item");
            insertImage(`/wp-content/uploads/${meta_value}`)
        }, (error) => {
            console.log(error, "ERROR on insert media item");
            console.log('NOW NEEDS TO DISPLAY ERRORS!')
        });
    };

    const insertImage = (url) => {
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    let imageButtonDisplay;
    if (uploadImage){
        imageButtonDisplay = (
            <a onClick={onUpladImageClick}>
                image
                <input
                accept={'.*'}
                multiple={false}
                name={"theFiles"}
                onChange={onImageInputChangeHanlder}
                ref={fileInputRef}
                style={{ display: 'none' }}
                type="file"
                />
            </a>
        )
    }

    return (
      <div className={styles.menu}>
        <a
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? styles.isActive : ''}
        >
          bold
        </a>
        <a
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? styles.isActive : ''}
        >
          italic
        </a>
        <a
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? styles.isActive : ''}
        >
          strike
        </a>
        <a
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? styles.isActive : ''}
        >
          code
        </a>
        <a onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          clear marks
        </a>
        <a onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </a>
        <a
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? styles.isActive : ''}
        >
          paragraph
        </a>
        <a
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? styles.isActive : ''}
        >
          h1
        </a>
        <a
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? styles.isActive : ''}
        >
          h2
        </a>
        <a
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? styles.isActive : ''}
        >
          h3
        </a>
        <a
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? styles.isActive : ''}
        >
          h4
        </a>
        <a
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? styles.isActive : ''}
        >
          h5
        </a>
        <a
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? styles.isActive : ''}
        >
          h6
        </a>
        <a
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? styles.isActive : ''}
        >
          bullet list
        </a>
        <a
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? styles.isActive : ''}
        >
          ordered list
        </a>
        <a
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? styles.isActive : ''}
        >
          code block
        </a>
        <a
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? styles.isActive : ''}
        >
          blockquote
        </a>
        <a onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          horizontal rule
        </a>
        <a onClick={() => editor.chain().focus().setHardBreak().run()}>
          hard break
        </a>
        {imageButtonDisplay}
        <a onClick={() => editor.chain().focus().undo().run()}>
          undo
        </a>
        <a onClick={() => editor.chain().focus().redo().run()}>
          redo
        </a>
      </div>
    )
}

export default MenuBar;
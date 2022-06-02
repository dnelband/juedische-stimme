import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from '../../styles/tiptap.module.css'

const MenuBar = ({ editor }) => {

  if (!editor) {
    return null
  }

  const fileInputRef = React.useRef();

  function onUpladImageClick(){
    fileInputRef.current.click();
  }

  const onImageInputChangeHanlder = (event) => {
    if (!event.target.files?.length) {
      return;
    }
    const formData = new FormData();
    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });
    uploadImage(formData);
    // formRef.current?.reset();
  };

  const uploadImage = async (formData) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };
    const response = await axios.post('/api/uploads', formData, config);
    console.log('response', response.data);
    // create a new post_meta table row with the uploaded image data!!!!
    // then 
    /* 
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    */
  };

  return (
    <div className={styles.menu}>
      <a
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </a>
      <a
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </a>
      <a
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </a>
      <a
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
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
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </a>
      <a
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </a>
      <a
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </a>
      <a
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </a>
      <a
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </a>
      <a
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </a>
      <a
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </a>
      <a
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </a>
      <a
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </a>
      <a
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </a>
      <a
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </a>
      <a onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </a>
      <a onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </a>

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

      <a onClick={() => editor.chain().focus().undo().run()}>
        undo
      </a>
      <a onClick={() => editor.chain().focus().redo().run()}>
        redo
      </a>
    </div>
  )
}

export default (props) => {

    const editor = useEditor({
        extensions: [
          StarterKit,
        ],
        content: props.value,
        onUpdate:({editor}) => {
            const rawHtml = editor.getHTML()
            props.onChange(rawHtml)
        }
    })

    return (
        <div className={styles.container}>
            <MenuBar editor={editor} />
            <div className={styles.body}>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
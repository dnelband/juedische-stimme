import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import styles from '../../styles/tiptap.module.css'
import MenuBar from './MenuBar'

const TipTapEditor = ({value, onChange, postId}) => {

    const editor = useEditor({
        extensions: [
          StarterKit,Image
        ],
        content: value,
        onUpdate:({editor}) => {
            const rawHtml = editor.getHTML()
            onChange(rawHtml)
        }
    })

    return (
        <div className={styles.container}>
            <MenuBar 
              editor={editor} 
              postId={postId}
            />
            <div className={styles.body}>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default TipTapEditor;
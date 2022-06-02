import React from 'react';
import axios from 'axios';

const UploadFilePage = (props) => {
  
    console.log(' UPLODA FILE PAGE')

    const fileInputRef = React.useRef();
    const formRef = React.useRef();

    const onChange = async (formData) => {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      };
  
      const response = await axios.post('/api/uploads', formData, config);
  
      console.log('response', response.data);
    };
  
    const onClickHandler = () => {
      fileInputRef.current?.click();
    };

    const onChangeHandler = (event) => {
      if (!event.target.files?.length) {
        return;
      }
      const formData = new FormData();
      Array.from(event.target.files).forEach((file) => {
        formData.append(event.target.name, file);
      });
      onChange(formData);
      formRef.current?.reset();
    };

    return (
      <form ref={formRef}>
        <button type="button" onClick={onClickHandler}>
          upload multiple files
        </button>
        <input
          accept={'.*'}
          multiple={true}
          name={"theFiles"}
          onChange={onChangeHandler}
          ref={fileInputRef}
          style={{ display: 'none' }}
          type="file"
        />
      </form>
    );
};

UploadFilePage.layout = "admin"

export default UploadFilePage;
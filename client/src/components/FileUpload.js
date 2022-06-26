import React , { Fragment, useState } from 'react';
import axios from 'axios';

function FileUpload () {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({})
    
    const onChange = event => {
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
    }

    const onSubmit = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try{
            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            const { fileName, filePath } = res.data;
            setUploadedFile ({ fileName, filePath });

        } catch(err){
            if(err.response.status === 500){
                console.log('There was a problem in the server');
            } else {
                console.log(err.response.data.msg)
            }
        }
    }

    return(
    <Fragment>
        <form onSubmit={onSubmit}>
            <div className="input-group">
                <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    onChange={onChange}
                />
            </div>

            <div className="form-floating mt-4">
                <textarea
                    className="form-control" 
                    placeholder="Leave a comment here" 
                    id="floatingTextarea2" 
                    style={{height: '100px'}}>
                </textarea>
                <label htmlFor="floatingTextarea2">
                    Comments
                </label>
            </div>

            <input
                type="submit"
                value="Upload"
                className ="btn btn-primary btn-block mt-4"
            />
        </form>
    </Fragment>
    );
}


export default FileUpload;
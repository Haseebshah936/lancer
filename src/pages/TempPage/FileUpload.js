import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function FileUpload() {
    const [imageURL, setImageURL] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    useEffect(() => {
        // console.log("imageURL", imageURL);
        setImageURL(imageURL);
    }, [imageURL]);
    const handelSelectedFile = async (e) => {
        const file = e.target.files[0];
        console.log(file);

        //upload_presets: 'stk6afcr'
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "stk6afcr");
        formData.append("api_key", '831188957921584');
        formData.append("api_secret", 'YHchbF1DTkcbSet6iAybxFpndvQ');
        setIsUploading(true);
        await axios.post('https://api.cloudinary.com/v1_1/dzjxjg8xv/image/upload', formData).then((res) => {
            // console.log(res.data.secure_url);
            setImageURL(res.data.secure_url);
            setIsUploading(false);

        }).catch((err) => {
            console.log(err);
        }
        );
        console.log(imageURL);
    }

    return (
        <div>
            <h1>Image Upload </h1>
            <div>
                <input type="file" name="file" accept='image/*' onChange={(e) => {
                    handelSelectedFile(e);
                }} />
            </div>
            <div>
                <img src={imageURL} alt="image" width="200px" height={"200px"} />
            </div>
        </div>
    )
}

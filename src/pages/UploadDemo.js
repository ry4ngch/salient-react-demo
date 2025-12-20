import React, {useState} from "react";
import Upload from "../utils/Salient/UI/Upload/Upload";
import Banner, {BannerContent} from '../utils/Salient/UI/Banner/Banner';

const UploadDemo = () => {
    const supportedExtensions = ['.png', '.jpg', '.docx', '.pdf'];
    const [errorMsg, setErrorMsg] = useState(null);

    const fileChangeHandler = (response) => {
        console.log(response);
    }

    const errorHandler = (error) => {
        setErrorMsg(error);
    }

    return (
        <React.Fragment>
            {errorMsg && 
                <Banner theme="cancel" allowBannerDismiss={true}>
                    <BannerContent>
                        {errorMsg}
                    </BannerContent>
                </Banner>
            }
            <Upload supportedExtensions={supportedExtensions} onFilesChange={fileChangeHandler} validationErrorCallback={errorHandler}/>
        </React.Fragment>

    )
}

export default UploadDemo;
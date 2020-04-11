import { Picture } from 'react-responsive-picture';
import React from "react";
import MobileLogo from "../../../image/Logo-mobile.png";
import DesktopLogo from "../../../site_media/Logo_Horizontal_No_Tagline.png";
import "./RegisterComponenet.css";

function RegisterBannerImage() {
    return (
        <Picture
            className="banner-image"
            sources = {[
                {
                    srcSet: MobileLogo,
                    media: "(max-width: 520px)",
                },
                {
                    srcSet: DesktopLogo,
                }
            ]}
        />
    );
}

export default RegisterBannerImage;
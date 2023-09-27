'use client'

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import '../index.css'

import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import { baseApi } from '@/utils/constants';

type Props = {
    imageId: string
}

export default function ImageTitleTop({ imageId }: Props) {
    const [openFSrc, setOpenFScr] = useState<boolean>(false);

    const listImage = [{ src: `${baseApi}/file-service/api/v1/images/download/${imageId}` }]
    return (
        <div>
            <Lightbox
                slides={listImage}
                open={openFSrc}
                close={() => setOpenFScr(false)}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
            <div>
                <img
                    onClick={() => setOpenFScr(true)}
                    src={`${baseApi}/file-service/api/v1/images/download/${imageId}`}
                    className='image-news-top'
                />
            </div>
        </div>
    );
}

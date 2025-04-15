import React from "react";
import gallery1 from '../review/utils/img/gallery1.jpg';
import gallery2 from '../review/utils/img/gallery2.jpg';
import gallery3 from '../review/utils/img/gallery3.jpg';
import gallery4 from '../review/utils/img/gallery4.jpg';
import gallery5 from '../review/utils/img/gallery5.jpg';
import gallery6 from '../review/utils/img/gallery6.jpg';

export function ImageGallery() {
    return (
        <div className="container py-5">
            <h2 className="text-center fs-1 mb-5 text-uppercase fw-bold">Image Gallery</h2>
            <div className="row">
                <div className="col-md-4 px-2">
                    <div className="my-3">
                        <img src={gallery1} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={gallery2} className="img-fluid" alt="" />
                    </div>
                </div>
                <div className="col-md-4 px-2">
                    <div className="my-3">
                        <img src={gallery3} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={gallery4} className="img-fluid" alt="" />
                    </div>
                </div>
                <div className="col-md-4 px-2">
                    <div className="my-3">
                        <img src={gallery5} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={gallery6} className="img-fluid" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
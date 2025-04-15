import React from "react";
import { Card, CardBody, CardText, CardFooter, CardTitle } from 'react-bootstrap';
import './Reviews.css';
import person1 from '../review/utils/img/person1.jpg';
import person2 from '../review/utils/img/person2.jpg';
import person3 from '../review/utils/img/person3.jpg';
import person4 from '../review/utils/img/person4.jpg';

export function Reviews() {
    return (
        <div className="reviews-section container">
            <h2 className="text-center mb-5 text-uppercase fw-bold fs-1">Reviews</h2>
            <div className="row g-4">
                <div className="col-lg-6">
                    <Card className="h-100 shadow">
                        <CardBody>
                            <div className="p-4">
                                <CardText>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi iste culpa perspiciatis. Magnam, explicabo cumque.
                                </CardText>
                            </div>
                        </CardBody>
                        <CardFooter className="d-flex align-items-center">
                            <img src={person1} className="img-fluid rounded-circle mx-3 shadow" alt="" />
                            <CardTitle className="text-success">John Mike</CardTitle>
                        </CardFooter>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card className="h-100 shadow">
                        <CardBody>
                            <div className="p-4">
                                <CardText>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, mollitia?
                                </CardText>
                            </div>
                        </CardBody>
                        <CardFooter className="d-flex align-items-center">
                            <img src={person2} className="img-fluid rounded-circle mx-3 shadow" alt="" />
                            <CardTitle className="text-success">Maria Cruz</CardTitle>
                        </CardFooter>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card className="h-100 shadow">
                        <CardBody>
                            <div className="p-4">
                                <CardText>
                                    I once asked my boyfriend if we could visit this new restaurant in town and since he is a picky eater its suprising he enjoyed every dish we ordered. Ever since if we wanted to have a romantic evening ,we would just reserve a table from their website.
                                </CardText>
                            </div>
                        </CardBody>
                        <CardFooter className="d-flex align-items-center">
                            <img src={person3} className="img-fluid rounded-circle mx-3 shadow" alt="" />
                            <CardTitle className="text-success">Anna Gold</CardTitle>
                        </CardFooter>
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card className="h-100 shadow">
                        <CardBody>
                            <div className="p-4">
                                <CardText>
                                    My mom has a habit of visiting every new restaurant put here because she says that she is the best at rating restaurant. The moment she tried out the english breakfast, my bill has just added continous. Mom has always being like "Add it to Mitch's Tab".
                                </CardText>
                            </div>
                        </CardBody>
                        <CardFooter className="d-flex align-items-center">
                            <img src={person4} className="img-fluid rounded-circle mx-3 shadow" alt="" />
                            <CardTitle className="text-success">Mitch Kamau</CardTitle>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
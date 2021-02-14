import * as React from "react";
import { Carousel } from "react-bootstrap";

export default function TestimonialsCarousel() {

    return (
        <Carousel
            controls={false}
            indicators={false}
            interval={10000}
            pause={false}
            style={{ zIndex: 3 }}
        >
            <Carousel.Item>
                <div className="py-3">
                    <div className="ff-font-awesome-solid fs-small">
                        &#xf10d;
                    </div>
                    <p className="fs-medium text-justify">
                        Great understanding of what was required. Very pro-active in making sure the solution
                        received was exactly what was needed. Excellent service and great aftercare service.
                    </p>
                    <div className="text-right fs-small mt-2">
                        Anthony Walters
                    </div>
                    <div className="text-right fs-small">
                        Owner of Walinger Systems Ltd
                    </div>
                    <div className="text-right fs-small">
                        Doncaster, United Kingdom
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="py-3">
                    <div className="ff-font-awesome-solid fs-small">
                        &#xf10d;
                    </div>
                    <p className="fs-medium text-justify">
                        Great work; I like how Volodymyr is able to work out issues and come up with great solutions.
                        Great attention to detail and always willing to be helpful. Very quick turnaround.
                    </p>
                    <div className="text-right fs-small mt-2">
                        Owen Gunter
                    </div>
                    <div className="text-right fs-small">
                        Director at Square Root Software Ltd
                    </div>
                    <div className="text-right fs-small">
                        Nottingham, United Kingdom
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="py-3">
                    <div className="ff-font-awesome-solid fs-small">
                        &#xf10d;
                    </div>
                    <p className="fs-medium text-justify">
                        I have been very impressed with Volod&apos;s work, very easy to work with and always to a
                        high standard. Response on feedback is outstanding. Very knowledgeable and always happy to help.
                    </p>
                    <div className="text-right fs-small mt-2">
                        Kenneth Cox
                    </div>
                    <div className="text-right fs-small">
                        Owner of Snapwire Software
                    </div>
                    <div className="text-right fs-small">
                        Rochester, United Kingdom
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}
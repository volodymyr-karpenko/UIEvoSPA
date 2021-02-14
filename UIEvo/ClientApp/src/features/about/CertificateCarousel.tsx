import * as React from "react";
import { Carousel, CardImg } from "react-bootstrap";

export default function CertificateCarousel() {

    return (
        <Carousel
            controls
            nextIcon={<i className="material-icons md-accent">arrow_forward_ios</i>}
            prevIcon={<i className="material-icons md-accent">arrow_back_ios</i>}
            indicators={false}
            interval={7000}
            pause={"hover"}
            style={{ zIndex: 3 }}
        >
            <Carousel.Item>
                <CardImg
                    src="/img/Diploma_1.jpg"
                    className="d-block w-100"
                    alt="WEB Frontend Developer Diploma (side 1)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/Diploma_2.jpg"
                    className="d-block w-100"
                    alt="WEB Frontend Developer Diploma (side 2)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/HTML_CSS_1.jpg"
                    className="d-block w-100"
                    alt="HTML, CSS Certificate (side 1)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/HTML_CSS_2.jpg"
                    className="d-block w-100"
                    alt="HTML, CSS Certificate (side 2)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/HTML5_CSS3_1.jpg"
                    className="d-block w-100"
                    alt="HTML5, CSS3 Certificate (side 1)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/HTML5_CSS3_2.jpg"
                    className="d-block w-100"
                    alt="HTML5, CSS3 Certificate (side 2)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/JS_Es_1.jpg"
                    className="d-block w-100"
                    alt="JavaScript Essential Certificate (side 1)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/JS_Es_2.jpg"
                    className="d-block w-100"
                    alt="JavaScript Essential Certificate (side 2)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/JS_Adv_1.jpg"
                    className="d-block w-100"
                    alt="JavaScript Advanced Certificate (side 1)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/JS_Adv_2.jpg"
                    className="d-block w-100"
                    alt="JavaScript Advanced Certificate (side 2)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/jQuery_1.jpg"
                    className="d-block w-100"
                    alt="jQuery Certificate (side 1)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/jQuery_2.jpg"
                    className="d-block w-100"
                    alt="jQuery Certificate (side 2)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/Angular_1.jpg"
                    className="d-block w-100"
                    alt="Angular JS Certificate (side 1)"
                />
            </Carousel.Item>
            <Carousel.Item>
                <CardImg
                    src="/img/Angular_2.jpg"
                    className="d-block w-100"
                    alt="Angular JS Certificate (side 2)"
                />
            </Carousel.Item>
        </Carousel>
    );
}
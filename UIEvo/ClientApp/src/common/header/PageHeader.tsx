import * as React from "react";
import { Row, Col } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import "./PageHeaderStyles.scss";

export default class PageHeader extends React.PureComponent<{ header: string; }> {

    public constructor(props: { header: string; }) {
        super(props);
        this.props = props;
        this.arrowContainerRef = React.createRef<HTMLDivElement>();
        this.handleInterval = this.handleInterval.bind(this);
    }

    public props: { header: string; };

    private arrowContainerRef: React.RefObject<HTMLDivElement>;

    private interval: any;

    public componentDidMount() {
        this.interval = setInterval(this.handleInterval, 500);
    }

    public componentWillUnmount() {
        clearInterval(this.interval);
    }

    private handleInterval(): void {
        if (this.arrowContainerRef.current) {
            this.arrowContainerRef.current.classList.toggle("down");
        }
    }

    public render() {
        return (
            <Row className="vh-100 justify-content-center align-items-center">
                <Col
                    xs="auto"
                    className="text-justify"
                >
                    <CSSTransition
                        classNames="header"
                        timeout={1000}
                        appear
                        in
                    >
                        <h1 className="ff-quicksand-dash txt-light-color fs-huge">
                            {this.props.header}
                        </h1>
                    </CSSTransition>
                    <CSSTransition
                        classNames="underline"
                        timeout={1300}
                        appear
                        in
                    >
                        <div></div>
                    </CSSTransition>
                </Col>
                <Col xs="auto">
                    <div
                        ref={this.arrowContainerRef}
                        className="arrow-container"
                    >
                        <CSSTransition
                            classNames="arrowPartOne"
                            timeout={1600}
                            appear
                            in
                        >
                            <div></div>
                        </CSSTransition>
                        <CSSTransition
                            classNames="arrowPartTwo"
                            timeout={1900}
                            appear
                            in
                        >
                            <div></div>
                        </CSSTransition>
                        <CSSTransition
                            classNames="arrowPartThree"
                            timeout={2200}
                            appear
                            in
                        >
                            <div></div>
                        </CSSTransition>
                    </div>
                </Col>
            </Row>
        );
    }
}
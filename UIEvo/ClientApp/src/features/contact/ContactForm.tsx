import * as React from "react";
import { Form, Col, Button, FormFile, Image } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import {
    EReCaptchaV2Size,
    EReCaptchaV2Theme,
    ReCaptchaProvider,
    ReCaptchaV2,
    TReCaptchaV2Callback
} from "react-recaptcha-x";
import { connect } from "react-redux";
import { IAppState } from "../../app/IAppState";
import { IAdminState } from "../admin/IAdminState";
import { IEmailMessage } from "./IEmailMessage";
import EmailMessage from "./EmailMessage";

export function ContactForm(props: IAdminState) {

    const attachmentRef = React.useRef<HTMLInputElement>(null);
    const [isVerified, setIsVerified] = React.useState(false);
    const [sendingResult, setSendingResult] = React.useState(
        {
            isVisible: false,
            isMessageSent: false,
            apiResponse: ""
        }
    );

    const v2Callback: TReCaptchaV2Callback = (token: string | boolean | Error): void => {
        if (typeof token === "string") {
            setIsVerified(true);
        } else if (typeof token === "boolean" && !token) {
            // reCAPTCHA token has expired, you must check the checkbox again.
            setIsVerified(false);
        } else if (token instanceof Error) {
            // Error. Please check your network connection.
            setIsVerified(false);
        }
    };
        
    const initialValues: IEmailMessage = new EmailMessage();
    const schema = yup.object({
        name: yup.string()
            .required()
            .max(40, "must be 40 characters or less"),
        email: yup.string()
            .email("invalid email address")
            .required()
            .max(40, "must be 40 characters or less"),
        message: yup.string()
            .required()
            .max(2000, "must be 2000 characters or less")
    });       

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: values => {

            setSendingResult({ isVisible: false, isMessageSent: false, apiResponse: "" });

            const input = attachmentRef.current as HTMLInputElement;
            if (input.files) {
                values.attachment = input.files[0];
            }

            let formData = new FormData();

            for (let [key, value] of Object.entries(values)) {
                if (key === "attachment" && value !== undefined) {
                    formData.set(`${key}`, value);
                }
                else if (key === "attachment" && value === undefined) {
                    continue;
                }
                else {
                    formData.set(`${key}`, `${value}`);
                }
            }

            formData.set(`_${props.antiForgeryData.antiForgeryHeader}`, props.antiForgeryData.antiForgeryToken);

            const headers: string[][] = [[props.antiForgeryData.antiForgeryHeader, props.antiForgeryData.antiForgeryToken]];

            fetch("api/contact/submit", {
                method: "POST",
                headers: headers,
                body: formData
            })
                .then(
                    res => res.text()
                )
                .then(
                    res => {
                        formik.setSubmitting(false);
                        if (res === "Message successfully sent!") {
                            setSendingResult({ isVisible: true, isMessageSent: true, apiResponse: res });
                        }
                        else if (res === "File size not supported." || res === "File format not supported.") {
                            setSendingResult({ isVisible: true, isMessageSent: false, apiResponse: res });
                        }
                        else {
                            console.log(`Email Was Not Sent. API Request Error: ${res}`);
                            setSendingResult({ isVisible: true, isMessageSent: false, apiResponse: "Something went wrong. Try again!" });
                        }
                    } 
                )
                .catch(
                    err => {
                        console.log(`Email Was Not Sent. API Request Error: ${err}`);
                        formik.setSubmitting(false);
                        setSendingResult({ isVisible: true, isMessageSent: false, apiResponse: "Something went wrong. Try again!" });
                    }
            );            
        },
    });

    return (
        <ReCaptchaProvider
            siteKeyV2="6LejqqQZAAAAAJ0-uSLQK0x_JOCZ-6yRLNk8zgA4"
            langCode="en"
        >
            <Form
                className="ff-comfortaa-bold fs-medium"
                autoComplete="off"
                noValidate
                onSubmit={formik.handleSubmit}
                onChange={() => {
                    if (sendingResult.isVisible) {
                        setSendingResult({ isVisible: false, isMessageSent: false, apiResponse: "" });
                    }
                }}
            >                
                <Form.Row>                
                    <Form.Group
                        as={Col}
                        xs="12"
                        lg="6"
                        controlId="validationName"
                        style={{ minHeight: 80 }}
                    >
                        <Form.Label srOnly>
                            Name
                        </Form.Label>
                        <Form.Control
                            className="fs-medium"
                            size="lg"
                            type="text"
                            name="name"
                            placeholder="Name*"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!formik.errors.name}
                            style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.touched.name && formik.errors.name ? formik.errors.name : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        as={Col}
                        xs="12"
                        lg="6"
                        controlId="validationEmail"
                        style={{ minHeight: 80 }}
                    >
                        <Form.Label srOnly>
                            Email
                        </Form.Label>
                        <Form.Control
                            className="fs-medium"
                            size="lg"
                            type="email"
                            name="email"
                            placeholder="Email*"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!formik.errors.email}
                            style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.touched.email && formik.errors.email ? formik.errors.email : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group
                        as={Col}
                        xs="12"
                        controlId="validationMessage"
                        style={{ minHeight: 270 }}
                    >
                        <Form.Label srOnly>
                            Message
                        </Form.Label>
                        <Form.Control
                            className="fs-medium"
                            as="textarea"
                            size="lg"
                            name="message"
                            placeholder="Message*"
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!formik.errors.message}
                            style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff", minHeight: 240 }}
                        />                    
                        <Form.Control.Feedback type="invalid">
                            {formik.touched.message && formik.errors.message ? formik.errors.message : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-center">
                    <Col
                        xs={"auto"}
                        className="p-0 mb-3"
                    >
                        <ReCaptchaV2
                            callback={v2Callback}
                            theme={EReCaptchaV2Theme.Dark}
                            size={EReCaptchaV2Size.Normal}
                            tabindex={0}
                        />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Form.Group
                        as={Col}
                        xs="12"
                        lg="6"
                        className="mb-0"
                        controlId="attachment"
                    >
                        <FormFile>
                            <Form.File.Label className="btn_accent_transparent ff-lobsterTwo-bold mb-0">
                                <span className="d-flex align-items-center">
                                    <i className="material-icons md-accent mr-2">
                                        attachment
                                    </i>
                                    {formik.values.attachment
                                        ? (attachmentRef.current as HTMLInputElement).files![0].name
                                        : "Attach File"
                                    }
                                </span>
                            </Form.File.Label>
                            <Form.File.Input
                                hidden
                                ref={attachmentRef}
                                name="attachment"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />           
                        </FormFile>
                        <small className="ff-comfortaa-thin txt-light-color fs-small">
                            doc, docx, pdf, png, jpg, jpeg; maximum file size: 10Mb
                        </small>
                    </Form.Group>
                    <Col
                        xs={12}
                        lg={6}
                        className="mt-3 mt-lg-0 d-flex flex-lg-row-reverse align-items-center"
                    >
                        <Button
                            className="btn_secondary ff-lobsterTwo-bold fs-medium"
                            disabled={formik.isSubmitting || !isVerified}
                            type="submit"
                        >
                            Send
                        </Button> 
                        <Image
                            className={formik.isSubmitting ? "d-inline-block ml-2 ml-lg-0 mr-lg-2" : "d-none"}
                            src="/img/loader.svg"
                            alt="activity indicator"
                        />
                        <div className={sendingResult.isVisible ? "d-inline-block ml-2 ml-lg-0 mr-lg-2" : "d-none"}>
                            {sendingResult.isMessageSent
                                ? <span style={{ color: "#a0c334" }}>
                                    {sendingResult.apiResponse}
                                   </span>
                                : <span style={{ color: "#bb3042" }}>
                                    {sendingResult.apiResponse}
                                   </span>
                            }
                        </div>
                    </Col>
                </Form.Row>
            </Form>
        </ReCaptchaProvider>
    );
}

export default connect((state: IAppState) => state.admin)(ContactForm);
import * as React from "react";
import { connect } from "react-redux";
import { Form, Col, Button, Image, FormCheck } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import {
    EReCaptchaV2Size,
    EReCaptchaV2Theme,
    ReCaptchaProvider,
    ReCaptchaV2,
    TReCaptchaV2Callback
} from "react-recaptcha-x";
import { IAppState } from "../../app/IAppState";
import { IAdminState } from "./IAdminState";
import { AdminSlice } from "./AdminSlice";
import { IAuthCredentials } from "../../services/auth/IAuthCredentials";
import AuthCredentials from "../../services/auth/AuthCredentials";
import { AuthServiceContext } from "../../services/auth/AuthServiceContext";

export function LoginForm(props: IAdminState & typeof AdminSlice.actions) {
    const authService = React.useContext(AuthServiceContext);
    const [isVerified, setIsVerified] = React.useState(false);
    const [sendingResult, setSendingResult] = React.useState(
        {
            isVisible: false,
            isSuccess: false,
            apiResponse: ""
        }
    );

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (sendingResult.isSuccess) {
                props.setIsAuthenticated(true);
            }            
        }, 1000);
        return (() => {
                clearTimeout(timer);
            }
        );
    });

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

    const initialValues: IAuthCredentials = new AuthCredentials();

    const schema = yup.object({        
        email: yup.string()
            .email("invalid email address")
            .required()
            .max(40, "must be 40 characters or less"),
        password: yup.string()            
            .required()
            .max(40, "must be 40 characters or less"),
        rememberMe: yup.bool()
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: values => {

            setSendingResult({
                isVisible: false, isSuccess: false, apiResponse: ""
            });

            authService.authenticateAsync(values, props.antiForgeryData)
                .then((res: string) => {
                    formik.setSubmitting(false);
                    if (res === "Logged in successfully!") {
                        setSendingResult({ isVisible: true, isSuccess: true, apiResponse: res });
                    }
                    else if (res === "Incorrect username or password.") {
                        setSendingResult({ isVisible: true, isSuccess: false, apiResponse: res });
                    }
                    else {
                        console.log(`Account API Request Error: ${res}`);
                        setSendingResult({ isVisible: true, isSuccess: false, apiResponse: "Something went wrong. Try again!" });
                    }
                })
                .catch((err: Error) => {
                    console.log(`Account API Request Error: ${err}`);
                    formik.setSubmitting(false);
                    setSendingResult({ isVisible: true, isSuccess: false, apiResponse: "Something went wrong. Try again!" });
                });
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
                        setSendingResult({ isVisible: false, isSuccess: false, apiResponse: "" });
                    }
                }}
            >
                <Form.Row>                    
                    <Form.Group
                        as={Col}
                        xs="12"
                        sm={{ span: 6, offset: 3 }}
                        xl={{ span: 4, offset: 4 }}
                        className="mb-0 mb-lg-3"
                        controlId="validationUsername"
                        style={{ minHeight: 80 }}
                    >
                        <Form.Label srOnly>
                            Username
                        </Form.Label>
                        <Form.Control
                            className="fs-medium"
                            size="lg"
                            type="email"
                            name="email"
                            placeholder="Username*"
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
                        sm={{ span: 6, offset: 3 }}
                        xl={{ span: 4, offset: 4 }}
                        className="mb-0 mb-lg-3"
                        controlId="validationPassword"
                        style={{ minHeight: 80 }}
                    >
                        <Form.Label srOnly>
                            Password
                        </Form.Label>
                        <Form.Control
                            className="fs-medium"
                            size="lg"
                            type="password"
                            name="password"
                            placeholder="Password*"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!formik.errors.password}
                            style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-center">
                    <Form.Group
                        as={Col}
                        xs={"auto"}
                        className="d-flex mb-0"
                        controlId="validationRememberMe"
                        style={{height: 50}}
                    >
                        <FormCheck.Input
                            className="align-self-center m-0"
                            type="checkbox"
                            name="rememberMe"
                            isValid={formik.values.rememberMe}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormCheck.Label
                            className="align-self-center txt-light-color pl-4"
                        >
                            Remember me
                        </FormCheck.Label>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-center">
                    <Col
                        xs={"auto"}
                        className="p-0 mb-0 mb-lg-5"
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
                    <Col
                        xs={12}
                        sm={{ span: 6, offset: 3 }}
                        xl={{ span: 4, offset: 4 }}
                        className="mb-0 mt-3 mt-lg-0 d-flex align-items-center"
                    >
                        <Button
                            className="btn_secondary ff-lobsterTwo-bold fs-medium"
                            disabled={formik.isSubmitting || !isVerified}
                            type="submit"
                        >
                            Log in
                        </Button>  
                        <Image
                            className={formik.isSubmitting ? "d-inline-block ml-2" : "d-none"}
                            src="/img/loader.svg"
                            alt="activity indicator"
                        />
                        <div className={sendingResult.isVisible ? "d-inline-block ml-2" : "d-none"}>
                            {sendingResult.isSuccess
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

export default connect((state: IAppState) => state.admin, AdminSlice.actions)(LoginForm);
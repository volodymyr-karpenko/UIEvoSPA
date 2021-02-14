import * as React from "react";
import { connect } from "react-redux";
import { Form, Col, Button, FormFile, Image } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import * as yup from "yup";
import { IAppState } from "../../app/IAppState";
import { IAdminState } from "./IAdminState";
import { IPortfolioPost } from "../portfolio/IPortfolioPost";
import { IAddEditPortfolioPost } from "./IAddEditPortfolioPost";
import { DataServiceContext } from "../../services/data/DataServiceContext";

export function AddEditPortfolioForm(props: IAdminState & { post: IPortfolioPost; }) {

    const dataService = React.useContext(DataServiceContext);
    const attachmentRef = React.useRef<HTMLInputElement>(null);
    const [sendingResult, setSendingResult] = React.useState(
        {
            isVisible: false,
            isPostSaved: false,
            apiResponse: ""
        }
    );    

    const formatDate = (date: Date | undefined): string => {
        const formatterOptions = { day: "numeric", month: "numeric", year: "numeric" };
        const formatter = new Intl.DateTimeFormat("en-GB", formatterOptions);
        if (date) {
            return formatter.format(new Date(date));
        }
        return "";
    }

    let post: IAddEditPortfolioPost = Object.assign({
        startDateInput: formatDate(props.post.startDate),
        finishDateInput: formatDate(props.post.finishDate)
    }, props.post);
    for (let [key, value] of Object.entries(post)) {
        if (value === null && key !== "attachment") {
            post = Object.assign(post, { [key]: "" });
        }
    }

    const schema = yup.object({
        header: yup.string()
            .required()
            .max(60, "must be 60 characters or less"),
        customerTitle: yup.string()
            .nullable()
            .max(60, "must be 60 characters or less"),
        location: yup.string()
            .nullable()
            .max(60, "must be 60 characters or less"),
        imageSource: yup.string()
            .nullable()
            .max(200, "must be 200 characters or less"),
        videoSource: yup.string()
            .nullable()
            .max(200, "must be 200 characters or less"),
        mainText: yup.string()
            .nullable()
            .max(2000, "must be 2000 characters or less"),
        playStoreSource: yup.string()
            .nullable()
            .max(200, "must be 200 characters or less"),
        playStoreText: yup.string()
            .nullable()
            .max(200, "must be 200 characters or less"),
        appStoreSource: yup.string()
            .nullable()
            .max(200, "must be 200 characters or less"),
        appStoreText: yup.string()
            .nullable()
            .max(200, "must be 200 characters or less"),
        footer: yup.string()
            .nullable()
            .max(60, "must be 60 characters or less"),
        startDateInput: yup.string()
            .required()
            .max(60, "must be 60 characters or less"),
        finishDateInput: yup.string()
            .required()
            .max(60, "must be 60 characters or less")
    });

    const formik = useFormik({
        initialValues: post,
        validationSchema: schema,
        onSubmit: async values => {

            setSendingResult({ isVisible: false, isPostSaved: false, apiResponse: "" });            

            const input = attachmentRef.current as HTMLInputElement;
            if (input.files) {
                values.attachment = input.files[0];
            }

            let response: string;

            if (values.id === "") {
                values.id = uuidv4();
                response = await dataService.createDataAsync(values, props.antiForgeryData);
            }
            else {
                response = await dataService.updateDataAsync(values, props.antiForgeryData);
            }
            
            if (response === "Post successfully saved!") {
                setSendingResult({ isVisible: true, isPostSaved: true, apiResponse: response });
            }
            else if (response === "Invalid post ID." || response === "File size not supported." || response === "File format not supported.") {
                setSendingResult({ isVisible: true, isPostSaved: false, apiResponse: response });
            }
            else {
                console.log(`Post was not saved. API Request Error: ${response}`);
                setSendingResult({ isVisible: true, isPostSaved: false, apiResponse: "Something went wrong. Try again!" });
            }

            formik.setSubmitting(false);
        },
    });

    return (
        <Form
            className="text-center ff-comfortaa-bold fs-medium"
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
            onChange={() => {
                if (sendingResult.isVisible) {
                    setSendingResult({ isVisible: false, isPostSaved: false, apiResponse: "" });
                }
            }}
        >
            <Form.Row>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationHeader_${post.id}`}
                    style={{ minHeight: 80 }}
                >
                    <Form.Label>
                        Header
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        size="lg"
                        type="text"
                        name="header"
                        placeholder="Header*"
                        value={formik.values.header}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.header}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.header && formik.errors.header ? formik.errors.header : null}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationCustomerTitle_${post.id}`}
                    style={{ minHeight: 80 }}
                >
                    <Form.Label>
                        Customer Title
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        size="lg"
                        type="text"
                        name="customerTitle"
                        placeholder="Customer Title"
                        value={formik.values.customerTitle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.customerTitle}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.customerTitle && formik.errors.customerTitle ? formik.errors.customerTitle : null}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationLocation_${post.id}`}
                    style={{ minHeight: 80 }}
                >
                    <Form.Label>
                        Location
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        size="lg"
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.location}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.location && formik.errors.location ? formik.errors.location : null}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationStartDate_${post.id}`}
                    style={{ minHeight: 80 }}
                >
                    <Form.Label>
                        Start Date
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        size="lg"
                        type="text"
                        name="startDateInput"
                        placeholder="Start Date"
                        value={formik.values.startDateInput}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.startDateInput}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.startDateInput && formik.errors.startDateInput ? formik.errors.startDateInput : null}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationFinishDate_${post.id}`}
                    style={{ minHeight: 80 }}
                >
                    <Form.Label>
                        Finish Date
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        size="lg"
                        type="text"
                        name="finishDateInput"
                        placeholder="Finish Date"
                        value={formik.values.finishDateInput}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.finishDateInput}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.finishDateInput && formik.errors.finishDateInput ? formik.errors.finishDateInput : null}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationImageSource_${post.id}`}
                    style={{ minHeight: 80 }}
                >
                    <Form.Label>
                        Image Source
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        size="lg"
                        type="text"
                        name="imageSource"
                        placeholder="Image Source"
                        value={formik.values.imageSource}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.imageSource}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.imageSource && formik.errors.imageSource ? formik.errors.imageSource : null}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationVideoSource_${post.id}`}
                    style={{ minHeight: 80 }}
                >
                    <Form.Label>
                        Video Source
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        size="lg"
                        type="text"
                        name="videoSource"
                        placeholder="Video Source"
                        value={formik.values.videoSource}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.videoSource}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.videoSource && formik.errors.videoSource ? formik.errors.videoSource : null}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationMainText_${post.id}`}
                    style={{ minHeight: 270 }}
                >
                    <Form.Label>
                        Main Text
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        as="textarea"
                        size="lg"
                        name="mainText"
                        placeholder="Main Text"
                        value={formik.values.mainText}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.mainText}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff", minHeight: 240 }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.mainText && formik.errors.mainText ? formik.errors.mainText : null}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationPlayStoreSource_${post.id}`}
                    style={{ minHeight: 80 }}
                >
                    <Form.Label>
                        Play Store Source
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        size="lg"
                        type="text"
                        name="playStoreSource"
                        placeholder="Play Store Source"
                        value={formik.values.playStoreSource}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.playStoreSource}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.playStoreSource && formik.errors.playStoreSource ? formik.errors.playStoreSource : null}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationPlayStoreText_${post.id}`}
                    style={{ minHeight: 80 }}
                >
                    <Form.Label>
                        Play Store Text
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        size="lg"
                        type="text"
                        name="playStoreText"
                        placeholder="Play Store Text"
                        value={formik.values.playStoreText}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.playStoreText}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.playStoreText && formik.errors.playStoreText ? formik.errors.playStoreText : null}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationAppStoreSource_${post.id}`}
                    style={{ minHeight: 80 }}
                >
                    <Form.Label>
                        App Store Source
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        size="lg"
                        type="text"
                        name="appStoreSource"
                        placeholder="App Store Source"
                        value={formik.values.appStoreSource}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.appStoreSource}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.appStoreSource && formik.errors.appStoreSource ? formik.errors.appStoreSource : null}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationAppStoreText_${post.id}`}
                    style={{ minHeight: 80 }}
                >
                    <Form.Label>
                        App Store Text
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        size="lg"
                        type="text"
                        name="appStoreText"
                        placeholder="App Store Text"
                        value={formik.values.appStoreText}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.appStoreText}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.appStoreText && formik.errors.appStoreText ? formik.errors.appStoreText : null}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    xs="12"
                    className="mb-0 mb-lg-3"
                    controlId={`validationFooter_${post.id}`}
                    style={{ minHeight: 80 }}
                >
                    <Form.Label>
                        Footer
                    </Form.Label>
                    <Form.Control
                        className="fs-medium"
                        size="lg"
                        type="text"
                        name="footer"
                        placeholder="Footer"
                        value={formik.values.footer}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.footer}
                        style={{ backgroundColor: "rgba(33, 3, 33, 0.9)", color: "#ffffff" }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.footer && formik.errors.footer ? formik.errors.footer : null}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group
                    as={Col}
                    xs="12"
                    lg="6"
                    className="mb-0 mt-3 mt-lg-0 text-left"
                    controlId={`attachment_${post.id}`}
                >
                    <FormFile>
                        <Form.File.Label className="btn_accent_transparent ff-lobsterTwo-bold mb-0">
                            <span className="d-flex align-items-center">
                                <i className="material-icons md-accent mr-2">
                                    attachment
                                </i>
                                {formik.values.attachment
                                    ? (attachmentRef.current as HTMLInputElement).files![0].name
                                    : "Attach Image File"
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
                        png, jpg, jpeg; maximum file size: 10Mb
                    </small>
                </Form.Group>
                <Col
                    xs={12}
                    lg={6}
                    className="mt-3 mt-lg-0 d-flex flex-lg-row-reverse align-items-center"
                >
                    <Button
                        className="btn_secondary ff-lobsterTwo-bold fs-medium"
                        disabled={formik.isSubmitting}
                        type="submit"
                    >
                        Save
                    </Button>
                    <Image
                        className={formik.isSubmitting ? "d-inline-block ml-2 ml-lg-0 mr-lg-2" : "d-none"}
                        src="/img/loader.svg"
                        alt="activity indicator"
                    />
                    <div className={sendingResult.isVisible ? "d-inline-block ml-2 ml-lg-0 mr-lg-2" : "d-none"}>
                        {sendingResult.isPostSaved
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
    );
}

export default connect((state: IAppState) => state.admin)(AddEditPortfolioForm);
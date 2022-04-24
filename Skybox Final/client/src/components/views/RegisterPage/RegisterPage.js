import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import RegisterIllustration from './Images/03.jpg';



import {
  Form,
  Input,
  Button,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('First Name is required'),
        lastName: Yup.string()
          .required('Last Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,       
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
      
        } = props;
        return (
          <div className="app">
            <div className="row space-100 mt-5 p-2">
                <div className="col-lg-6 col-md-12 col-xs-12">
                    <img src={RegisterIllustration} alt="Register" width="550px"/>
                </div>
                <div className="col-lg-6 col-md-12 col-xs-12 p-0">
                    <Form style={{ width: '30rem', marginLeft: '4rem', marginTop: '4rem' }} {...formItemLayout} onSubmit={handleSubmit} >
                       <h2>Sign up</h2>
                        <Form.Item>
                          <Input
                            id="name"
                            placeholder="Enter your First Name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.name && touched.name ? 'text-input error' : 'text-input'
                            }
                          />
                          {errors.name && touched.name && (
                            <div className="input-feedback">{errors.name}</div>
                          )}
                        </Form.Item>

                        <Form.Item>
                          <Input
                            id="lastName"
                            placeholder="Enter your Last Name"
                            type="text"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                            }
                          />
                          {errors.lastName && touched.lastName && (
                            <div className="input-feedback">{errors.lastName}</div>
                          )}
                        </Form.Item>

                        <Form.Item hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                          <Input
                            id="email"
                            placeholder="Enter your Email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.email && touched.email ? 'text-input error' : 'text-input'
                            }
                          />
                          {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                          )}
                        </Form.Item>

                        <Form.Item hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                          <Input
                            id="password"
                            placeholder="Enter Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.password && touched.password ? 'text-input error' : 'text-input'
                            }
                          />
                          {errors.password && touched.password && (
                            <div className="input-feedback">{errors.password}</div>
                          )}
                        </Form.Item>

                        <Form.Item hasFeedback>
                          <Input
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            type="password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                            }
                          />
                          {errors.confirmPassword && touched.confirmPassword && (
                            <div className="input-feedback">{errors.confirmPassword}</div>
                          )}
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                          <Button onClick={handleSubmit} style={{marginLeft:'-9.8rem'}} type="primary" disabled={isSubmitting}>
                            Register Me
                          </Button>
                        </Form.Item>
                      </Form>
                </div>
            </div>
            
            
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage

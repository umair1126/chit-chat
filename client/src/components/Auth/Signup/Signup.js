import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Image,
  Layout,
  Typography,
  Spin,
} from "antd";
import {
  LockOutlined,
  SearchOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
// import { Row, Col } from "antd";
// import signInImg from "../../../assets/images/signinImg.png";
// import backImg from "../../../assets/images/back_img.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthAPI } from "../../../api";
// import logo from "../../../assets/logos/logo.png";
// import { UserAuth } from "../../../context/authContext";
import "./Signup.css";

const { Title } = Typography;
// const FormItem = Form.Item;

const Signup = () => {
  const [isActive, setActive] = React.useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    // alert(JSON.stringify(values));
    setActive(true);
    AuthAPI.signup(values).then((res) => {
      if (res?.status == 201) {
        navigate("/signin");
        form.resetFields();
      }
      setActive(false);
    });
  };

  return (
    <Layout className="login-form-layout">
      <div className="login-form-main">
        <div className="login-form-layout-section">
          <Title
            level={4}
            style={{ color: "gray", marginBottom: 20, textAlign: "center" }}
          >
            Signup to Chat Application
          </Title>

          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input
                placeholder="Enter Name"
                prefix={<UserOutlined />}
                size="large"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input
                placeholder="Enter Email"
                type="email"
                prefix={<LockOutlined />}
                size="large"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input
                placeholder="Enter Password"
                type="password"
                prefix={<LockOutlined />}
                size="large"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input
                type="password"
                placeholder="Confirm Password"
                prefix={<LockOutlined />}
                size="large"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: "10px" }}>
              {isActive === false ? (
                <Button
                  className="login-form-button"
                  htmlType="submit"
                  block
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  Sign up
                </Button>
              ) : (
                <Button
                  className="login-form-button"
                  htmlType="submit"
                  block
                  disabled
                >
                  <Spin
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </Button>
              )}

              <Typography style={{ textAlign: "center", marginTop: "6px" }}>
                Already have an account
                <Link to="/signin"> Sign in</Link>
              </Typography>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

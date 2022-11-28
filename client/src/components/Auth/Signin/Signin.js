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
import "./Signin.css";

const { Title } = Typography;
// const FormItem = Form.Item;

const Signin = () => {
  const [isActive, setActive] = React.useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    // alert(JSON.stringify(values));
    setActive(true);
    AuthAPI.login(values).then((res) => {
      if (res?.status === 200) {
        localStorage.setItem("user", JSON.stringify(res?.data?.data?.response));
        localStorage.setItem(
          "token",
          JSON.stringify(res?.data?.data?.accessToken)
        );

        navigate("/");
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
            Login to Chat Application
          </Title>

          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
                {
                  message: "invalid email!",
                  type: "email",
                },
              ]}
            >
              <Input
                placeholder="Enter Email"
                prefix={<UserOutlined />}
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

            <Form.Item style={{ marginTop: "20px" }}>
              <Link
                className="login-form-forgot"
                to="/forgetPassword"
                style={{ textAlign: "start !important" }}
              >
                Forgot password
              </Link>
              {isActive === false ? (
                <Button
                  className="login-form-button"
                  htmlType="submit"
                  type="primary"
                  block
                >
                  Login
                </Button>
              ) : (
                <Button
                  className="login-form-button"
                  htmlType="submit"
                  type="primary"
                  block
                  disabled
                >
                  <Spin
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  />
                </Button>
              )}

              <Typography style={{ textAlign: "center", marginTop: "10px" }}>
                Need an account
                <Link to="/signup"> Sign up</Link>
              </Typography>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;

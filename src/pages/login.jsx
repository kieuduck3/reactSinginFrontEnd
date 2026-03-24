import React, { useContext } from "react";
import {
  Button,
  Form,
  Input,
  notification,
  Card,
  Typography,
  Row,
  Col,
} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { LoginApi } from "../util/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await LoginApi(email, password);

    if (res && res.EC === 0) {
      localStorage.setItem("access_token", res.access_token);

      notification.success({
        message: "LOGIN USER",
        description: "Đăng nhập thành công",
      });

      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.user?.email ?? "",
          name: res?.user?.name ?? "",
        },
      });

      navigate("/");
    } else {
      notification.error({
        message: "LOGIN USER",
        description: res?.EM ?? "Đăng nhập thất bại",
      });
    }
  };

  return (
    <Row style={{ height: "100vh" }}>
      {/* LEFT */}
      <Col
        xs={0}
        md={12}
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 40,
          textAlign: "center",
        }}
      >
        <Title style={{ color: "#fff", fontSize: 36 }}>Welcome Back 👋</Title>
        <Text style={{ color: "#e0e0e0", fontSize: 16 }}>
          Đăng nhập để tiếp tục sử dụng hệ thống của bạn
        </Text>
      </Col>

      {/* RIGHT */}
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f6f8fb",
        }}
      >
        <Card
          style={{
            width: 380,
            borderRadius: 16,
            padding: "10px 5px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
          bordered={false}
        >
          <div style={{ textAlign: "center", marginBottom: 25 }}>
            <Title level={3} style={{ marginBottom: 5 }}>
              Đăng nhập
            </Title>
            <Text type="secondary">Nhập thông tin để tiếp tục</Text>
          </div>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Nhập email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
                size="large"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 10 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  borderRadius: 8,
                  height: 45,
                }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>

          {/* LINKS */}
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <Text>
              Chưa có tài khoản?{" "}
              <span
                style={{
                  color: "#1677ff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
                onClick={() => navigate("/register")}
              >
                Đăng ký
              </span>
            </Text>
          </div>

          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Text>
              Quay về{" "}
              <span
                style={{
                  color: "#52c41a",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
                onClick={() => navigate("/")}
              >
                Trang chủ
              </span>
            </Text>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;

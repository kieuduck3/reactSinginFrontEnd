import React from "react";
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
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { createUserApi } from "../util/api";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { name, email, password } = values;
    const res = await createUserApi(name, email, password);

    if (res) {
      notification.success({
        message: "CREATE USER",
        description: "Đăng ký thành công",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "CREATE USER",
        description: "Đăng ký thất bại",
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
          background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 40,
          textAlign: "center",
        }}
      >
        <Title style={{ color: "#fff", fontSize: 36 }}>Join With Us 🚀</Title>
        <Text style={{ color: "#e0e0e0", fontSize: 16 }}>
          Tạo tài khoản để bắt đầu trải nghiệm ngay hôm nay
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
          bordered={false}
          style={{
            width: 400,
            borderRadius: 16,
            padding: "10px 5px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 25 }}>
            <Title level={3} style={{ marginBottom: 5 }}>
              Đăng ký
            </Title>
            <Text type="secondary">Điền thông tin để tạo tài khoản</Text>
          </div>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nhập tên của bạn"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
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
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập lại mật khẩu"
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
                  height: 45,
                  borderRadius: 8,
                }}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>

          {/* LINKS */}
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  cursor: "pointer",
                  color: "#52c41a",
                  fontWeight: 500,
                }}
                onClick={() => navigate("/")}
              >
                ← Quay lại trang chủ
              </span>
            </div>

            <Text>
              Đã có tài khoản?{" "}
              <span
                style={{
                  color: "#1677ff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </span>
            </Text>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterPage;

import React from "react";
import { CrownOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title, Text } = Typography;

const HomePage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <CrownOutlined
        style={{
          fontSize: 80,
          color: "#4a6cf7",
          marginBottom: 20,
        }}
      />

      <Title level={2} style={{ margin: 0 }}>
        JSON Web Token (React/Node.JS)
      </Title>
    </div>
  );
};

export default HomePage;

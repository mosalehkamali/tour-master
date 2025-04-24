"use client";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa6";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #4c51bf, #805ad5);
`;

const StyledCard = styled.div`
  width: 400px;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4c51bf;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("لطفا نام کاربری و رمز عبور خود را وارد کنید.");
      return;
    }
    if (username === "motevaslian-mm" && password === "t456789*") {
      document.cookie = `authToken=${btoa(
        username + ":" + password
      )}; path=/; max-age=${24 * 60 * 60}`;
      alert("Login successful!");
      window.location.href = "/p-admin";
    } else {
      alert("نام کاربری یا رمز عبور اشتباه است.");
    }
  };

  return (
    <Container>
      <StyledCard>
        <Title>پنل ورود ادمین</Title>
        <InputGroup>
          <FaUser size={20} />
          <Input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <FaLock size={20} />
          <Input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Button onClick={handleLogin}>ورود</Button>
      </StyledCard>
    </Container>
  );
}

"use client";

import styled from "styled-components";

export const BaseBtn = styled.button`
  background-color: var(--gray);
  color: var(--text-color);
  border: 1px solid #4f4f4f;
  border-radius: 1rem;
  padding: 0.5rem 3rem;
  width: 100%;
  font-weight: 500;
  cursor: pointer;
`;

export const RegBtn = styled.button`
  background-color: ${(props) => {
    switch (props.color) {
      case "blue":
        return "var(--lowBlue)";
      case "red":
        return "var(--lowRed)";
      case "green":
        return "var(--lowGreen)";
    }
  }};
  color: var(--text-color);
  border: ${(props) => {
    switch (props.color) {
      case "blue":
        return "1px solid var(--blue)";
      case "red":
        return "1px solid var(--red)";
      case "green":
        return "1px solid var(--green)";
    }
  }};
  border-radius: 1rem;
  padding: 0.5rem 3rem;
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
`;

export const RegInput = styled.input`
  background-color: var(--gray);
  text-decoration: none;
  border:1px solid var(--text-color);
  border-radius: 1rem;
  padding: .5rem;
  font-size: 1rem;
`;

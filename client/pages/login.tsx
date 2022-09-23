import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../api/auth";

const Home: NextPage = () => {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      router.replace("/chats");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password } = values;
    if (email === "") {
      toast("Please provide your email", {
        type: "error",
        position: "top-center",
      });
      return false;
    } else if (password === "") {
      toast("Please type in your password", {
        type: "error",
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const { email, password } = values;
      const { data } = await loginApi(email, password);

      if (data.responseStatus === false) {
        toast(data.msg, {
          type: "error",
          position: "top-center",
        });
      }

      if (data.responseStatus === true) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        router.push("/chats");
      }
    }
  };

  return (
    <FormContainer>
      <form action="" onSubmit={(event) => handleSubmit(event)}>
        <Logo />
        <input
          className="input"
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
          min="3"
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" className="btn">
          LOGIN
        </button>
        <span>
          {`Don't`} have an account ? <Link href="/register">Create One.</Link>
        </span>
      </form>
    </FormContainer>
  );
};
export default Home;

import styled from "styled-components";
import Link from "next/link";
import { NextPage } from "next";
import { LogoMixins } from "../public/GlobalStyles";
import Logo from "../components/Logo";
const FormContainer = styled.div`
  ${LogoMixins}

  form {
    display: flex;
    flex-direction: column;
    border-radius: 2rem;
    padding: 5rem;
    max-width: 500px;
    margin: 0 auto;
  }

  span {
    text-align: center;
    text-transform: uppercase;
    font-family: "Gilroy Regular";
    letter-spacing: 0.05em;
    font-size: 14px;
    a {
      color: var(--sky500);
      text-decoration: none;
      font-family: "Gilroy Bold";
    }
  }

  input {
    border-radius: 2em;
  }
  .btn {
    font-size: 14px;
  }
`;

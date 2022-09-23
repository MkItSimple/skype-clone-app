import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApp } from "../context/AppContext";
const Login = () => {
  const { user } = useApp();
  const router = useRouter();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      router.replace("/chats");
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { firstname, lastname, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast("Password and confirm password should be same.", {
        type: "error",
        position: "top-center",
      });
      return false;
    } else if (firstname.length < 2) {
      toast("First name should be greater than 3 characters.", {
        type: "error",
        position: "top-center",
      });
      return false;
    } else if (lastname.length < 2) {
      toast("Last name should be greater than 3 characters.", {
        type: "error",
        position: "top-center",
      });
      return false;
    } else if (password.length < 2) {
      toast("Password should be equal or greater than 3 characters.", {
        type: "error",
        position: "top-center",
      });
      return false;
    } else if (email === "") {
      toast("Email is required.", {
        type: "error",
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidation()) {
      const { firstname, lastname, email, password } = values;
      console.log("values ", values);

      const { data } = await registerApi(firstname, lastname, email, password);

      if (data.responseStatus === false) {
        toast(data.msg, {
          type: "error",
          position: "top-center",
        });
      }
      if (data.responseStatus === true) {
        console.log("register success");
        localStorage.setItem("userInfo", JSON.stringify(data));

        router.push("/chats");
      }
    }
  };
  return (
    <FormContainer>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <Logo />
        <input
          className="input"
          type="text"
          placeholder="First name"
          name="firstname"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="input"
          type="text"
          placeholder="Last name"
          name="lastname"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="input"
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" className="btn">
          CREATE ACCOUNT
        </button>
        <span>
          Already have an account ? <Link href="/login">Login.</Link>
        </span>
      </form>
    </FormContainer>
  );
};

export default Login;
import styled from "styled-components";
import { registerApi } from "../api/auth";
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

  h1 {
    text-transform: uppercase;
    text-align: center;
    font-family: "Gilroy Bold";
    color: var(--sky900);
  }

  span {
    text-align: center;
    text-transform: uppercase;
    font-family: "Gilroy Regular";
    letter-spacing: 0.05em;
    font-size: 14px;
    a {
      color: #01b0ef;
      text-decoration: none;
      font-family: "Gilroy Bold";
    }
  }
  input {
    border-radius: 2em;
  }
`;

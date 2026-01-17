import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../state";
import { client, login, verifyToken } from "../../client";
import Container from "../../components/Container";
import Section from "../../components/Section";

type GoogleCredentialResponse = google.accounts.id.CredentialResponse;

const LoginPage: FC<{}> = () => {
  const navigate = useNavigate();
  const { setState } = useGlobalContext();

  const handleGoogleSignIn = (response: GoogleCredentialResponse) => {
    login(response.credential).then(({ id, email, name }) => {
      setState({ isLogged: true, userId: id, email, name });
      navigate("/");
    });
  };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("t");
      if (token) {
        try {
          await verifyToken(token);
          client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setState({ isLogged: true });
          return navigate("/");
        } catch (error) {
          console.log("Token expired");
        }
      }

      google.accounts.id.initialize({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        callback: handleGoogleSignIn,
      });
      google.accounts.id.renderButton(
        document.getElementById("google-sign-in-button")!,
        { type: "standard", theme: "outline" }
      );
    })();
  }, []);

  return (
    <Container>
      <Section>
        <h1>Log In</h1>
      </Section>
      <Section>
        <div id="google-sign-in-button" />
      </Section>
    </Container>
  );
};

export default LoginPage;

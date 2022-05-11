import React from "react";
import Header from "./sections/Header";
import { Container } from "@chakra-ui/layout";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Container>
        <main>
          {children}
        </main>
      </Container>
    </>
  )
}
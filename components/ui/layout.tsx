import Toast from "../toast";
import React from "react";
import Header from "./header";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactChild;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  return (
    <React.Fragment>
      {router.pathname !== "/" && <Header />}
      <div className="container mx-auto">{children}</div>
      <Toast />
    </React.Fragment>
  );
}

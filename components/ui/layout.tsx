import React from "react";
import Header from "./header";

interface Props {
  children: React.ReactChild;
}

export default function Layout({ children }: Props) {
  return (
    <React.Fragment>
      <Header />
      <div className="container mx-auto">{children}</div>
    </React.Fragment>
  );
}

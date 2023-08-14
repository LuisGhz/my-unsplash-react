import React from "react";
import { createPortal } from "react-dom";

type ModalsContainerProps = {
  isModalOpen: boolean;
  children: React.ReactNode;
};

export const ModalsContainer = ({
  isModalOpen,
  children,
}: ModalsContainerProps) => {
  if (!isModalOpen) return null;

  return createPortal(
    <main
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </main>,
    document.getElementById("modal")!
  );
};

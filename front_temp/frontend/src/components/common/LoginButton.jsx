import React, { Component, useState, useRef } from "react";
import LoginModal from "./LoginModal";

const LoginButton = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };

    return (
      <>
        <div>
            <button onClick={showModal}>로그인</button>
            {modalOpen && <LoginModal setModalOpen={setModalOpen} />}
        </div>
      </>
    );
  }


export default LoginButton;

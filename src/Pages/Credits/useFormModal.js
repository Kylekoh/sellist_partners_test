import { useState } from "react";

const useFormModal = () => {
  const [modalActive, setModalActive] = useState(false);
  const [toggle, setToggle] = useState(false);

  //madal active
  const openModal = () => {
    setModalActive(!modalActive);
  };

  //button active
  const btnToggle = () => {
    setToggle(true);
    setTimeout(function () {
      setToggle(false);
    }, 1000);
  };

  return {
    modalActive,
    openModal,
    btnToggle,
    toggle
  };
};

export default useFormModal;

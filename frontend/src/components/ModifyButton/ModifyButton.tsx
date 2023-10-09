import React from 'react';
import styles from "./ModifyButton.module.scss";
import { BiSolidPencil } from "react-icons/bi";

interface ModifyButtonProps {
  onClick: () => void;
}

export default function ModifyButton({ onClick }: ModifyButtonProps) {
  return (
    <>
      <button type="button" className={styles.modifyButton} onClick={onClick}>
        <BiSolidPencil className={styles.pencilIcon} />
      </button>
    </>
  );
}

import React from 'react';
import styles from "./CheckBox.module.scss";

interface CheckBoxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function CheckBox({ checked, onChange }: CheckBoxProps) {
    const handleChange = () => {
        onChange(!checked);
    };
    return (
        <label className={styles.checkBoxContainer}>
            <input
                type="checkbox"
                className={styles.checkBoxInput}
                checked={checked}
                onChange={handleChange}
            />
            <span className={styles.checkBoxCheckmark}></span>
        </label>
    );
}

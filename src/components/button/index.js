import styles from './button.module.css'

const Button = ({
  text,
  disabled,
  onClick,
}) => (
  <button
    className={styles.button}
    onClick={onClick}
    disabled={disabled}
  >{text}</button>
)

export default Button

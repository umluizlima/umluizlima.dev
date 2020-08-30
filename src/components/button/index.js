import styles from './button.module.css'

const Button = ({
  text,
  disabled,
  onClick,
  customStyle,
}) => (
  <button
    className={`${styles.button} ${customStyle || ''}`}
    onClick={onClick}
    disabled={disabled}
  >{text}</button>
)

export default Button

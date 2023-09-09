import "./Button.scss";

/* 
 * Button Component
 * - Represents a button element with an icon (optional) and text
 *
 * Props:
 * 'variant' prop: determines the visual style variant of the button (Options: primary, secondary, delete)
 * 'type' prop: determines the type of the button element
 * 'text' prop: should be a string that is the text within the button
 * 'icon' prop: the source URL for the button icon (optional)
 * 'onClick' prop: the click event handler function for the button (optional)
 */

function Button({ variant, type, text, icon, onClick }) {
    return (
        <button className={`button button__${variant}`} type={type} onClick={onClick}>
            {icon && <img src={icon} alt="" className="button__icon" />}
            {text}
        </button>
    );
};

export default Button;
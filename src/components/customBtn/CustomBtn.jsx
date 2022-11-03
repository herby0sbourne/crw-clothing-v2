import './custombtn.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const CustomBtn = ({ children, buttonType, ...props }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...props}>
      {children}
    </button>
  );
};

export default CustomBtn;

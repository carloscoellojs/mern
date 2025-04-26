export const Button = ({ type, className, children, disabled, ...rest }) => (
  <button type={type} className={className} disabled={disabled} {...rest}>
    {children}
  </button>
);

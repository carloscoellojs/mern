// component for handling inputs
export const Input = ({
  type,
  value,
  name,
  errorMessage,
  onChange,
  className,
  placeholder,
  disabled
}) => (
  <>
    <input
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
    />
    {errorMessage ? (
      <div className="text-xs text-red-500 my-0.5" style={{ display: "block" }}>
        {errorMessage}
      </div>
    ) : null}
  </>
);

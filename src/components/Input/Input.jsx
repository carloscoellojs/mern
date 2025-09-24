// component for handling inputs
export const Input = ({
  type,
  value,
  name,
  id,
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
      id={id}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
    />
    {errorMessage ? (
      <div className="text-xs text-indigo-500 my-0.5" style={{ display: "block" }}>
        {errorMessage}
      </div>
    ) : null}
  </>
);

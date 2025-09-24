// component for handling labels for inputs
export const Label = ({ name, htmlFor, className }) => (
	<label htmlFor={htmlFor} className={className}>{name}</label>
);

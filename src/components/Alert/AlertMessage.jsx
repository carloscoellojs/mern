export const AlertMessage = ({ success, message, showAlert }) => {
  if (!showAlert) return null;

  let colorClass = '';
  if (success === true) colorClass = 'text-indigo-500';
  else if (success === false) colorClass = 'text-red-500';

  return (
    <div className={`my-5 ${colorClass}`} role="alert">
      {message}
    </div>
  );
};

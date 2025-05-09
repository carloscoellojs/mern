export const AlertMessage = ({ success, message, showAlert }) => {
  const CLASS_NAMES = success === undefined ? 'alert' : success === false ? 'alert alert-danger' : 'alert alert-success';
  
  if(!showAlert){
    return null;
  }

  return (
    <div className={`my-5 ${CLASS_NAMES}`} role="alert">
      {message}
    </div>
  );
};

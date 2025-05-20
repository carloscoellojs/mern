export const Loader = ({ message = '' }) => (
  <div className="loader">
    <div className="spinner"></div>
    <div className="message">{message}</div>
  </div>
);

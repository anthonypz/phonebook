const Notification = ({ message }) => {
  if (message === null) return null;
  const notificationStyle = {
    color: ['deleted', 'required', 'not'].some((word) => message.includes(word))
      ? 'red'
      : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };
  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;

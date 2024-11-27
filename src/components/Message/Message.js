import React from 'react';

const Message = (props) => {
  return (
    <div
      style={{
        background: props.success ? '#388e3c' : 'red',
        color: 'white',
        padding: '10px 15px',
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        alignContent: 'flex-end',
        justifyContent: 'space-between',
      }}
    >
      <div>{props.children}</div>
      <p onClick={() => props.setError(false)}>x</p>
    </div>
  );
};

export default Message;

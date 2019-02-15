import React from 'react';

export default function Message(props) {
  return (
    <div
      className="alert alert-info"
      style={{ visibility: props.showMessage ? 'visible' : 'hidden' }}
      role="alert"
    >
      {props.children}
    </div>
  );
}

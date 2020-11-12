import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ name }: { name: string }) => {
  const [state, setState] = useState(false);
  useEffect(() => {
    if (name) setState(true);
  }, [name]);

  return <div>React Typept Starter</div>;
};

ReactDOM.render(<App name="Unknown" />, document.getElementById('App'));

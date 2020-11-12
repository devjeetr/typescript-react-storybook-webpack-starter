import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';

const App = ({ name }: { name: string }) => {
  const [, setState] = useState(false);
  useEffect(() => {
    if (name) setState(true);
  }, [name]);
  return <div>React Typescript Starter</div>;
};

ReactDOM.render(<App name="Unknown" />, document.getElementById('App'));

import { useState } from 'react';

interface Options {
  timeout?: number;
}

const useAlertManager = (initial: boolean = false, opts: Options = {}) => {
  const { timeout = 5000 } = opts;
  const [alert, setAlert] = useState(initial);

  const toggle = (newVal?: boolean) => {
    setAlert(prev => newVal ?? !prev);

    setTimeout(() => {
      setAlert(false);
    }, timeout);
  };

  return [alert, toggle] as const;
};

export default useAlertManager;

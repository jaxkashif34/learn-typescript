import { ButtonHTMLAttributes, FunctionComponent, DetailedHTMLProps } from 'react';
const Button: FunctionComponent<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { title: string }> =
  /* get this big scary type from this source 
https://unpkg.com/@types/react@16.4.7/index.d.ts
*/
  ({ title, children, ...rest }) => {
    return <button {...rest}>{title ?? children}</button>;
  };

export { Button };

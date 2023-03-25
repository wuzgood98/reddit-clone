import React, { MouseEventHandler } from 'react';

type ButtonProps = {
  children: React.ReactNode
  href?: string
  link?: boolean
  classNames: string
  onClick?: MouseEventHandler
  submit?: boolean
  ariaLabel?: string
  tabIndex?: number
};

const Button: React.FC<ButtonProps> = ({ children, href, link, classNames, onClick, submit, ariaLabel, tabIndex }) => {

  if (link) {
    return (
      <a href={href} onClick={onClick} aria-label={ariaLabel} className={`${classNames} motion-safe:transition motion-reduce:transition-none cursor-pointer`}>
        {children}
      </a>
    )
  }


  return (
    <button tabIndex={tabIndex || 0} onClick={onClick} aria-label={ariaLabel} type={`${submit ? 'submit' : 'button'}`} className={`${classNames} motion-safe:transition motion-reduce:transition-none`}>
      {children}
    </button>
  )
}
export default Button;
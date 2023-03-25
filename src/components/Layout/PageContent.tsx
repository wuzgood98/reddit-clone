import React, { ReactNode } from 'react';

type PageContentProps = {
  children: ReactNode
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  console.log(children)

  return (
    <div className="flex w-full p-4">
      <div className="flex flex-col md:flex-row w-[95%] max-w-[60rem] mx-auto">
        {/* LHS */}
        <div className="flex flex-col w-full md:w-[65%] md:mr-6">
          {children && children[0 as keyof typeof children]}
        </div>

        {/* RHS */}
        <div className="flex flex-col w-full md:w-[35%]">
          {children && children[1 as keyof typeof children]}
        </div>
      </div>
    </div>
  )
}
export default PageContent;
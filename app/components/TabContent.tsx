
export const TabContent = ({ title, content }: {title:string, content:string}) => (
  <div className="flex">
    {content ? <p>{content}</p> : <p className="text-center mt-14 mb-14">You don't have {title.toLocaleLowerCase()} </p>}
  </div>
);
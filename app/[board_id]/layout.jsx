"use client";
const layout = ({ children }) => {
  return (
    <div className="flex w-full h-full flex-col sm:flex-row">{children}</div>
  );
};

export default layout;

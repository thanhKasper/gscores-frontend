import React from "react";

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-4 overflow-y-scroll">{children}</div>;
};

export default ContentLayout;

---
to: <%= initiatedProjectPath %>/compiled/components.js
force: true
---
import React from "react";

const <%= componentName %> = () => {
  return (
    <>This is <%= componentName %> component</>
  );
};

export default <%= componentName %>;


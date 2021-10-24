---
to: <%= initiatedProjectPath %>/compiled/<%= filename %>.js
force: true
---
import React from "react";

const <%= filename %> = () => {
  return (
    <>This is <%= name %></>
    <>This is <%= mode %></>
  );
};

export default <%= filename %>;


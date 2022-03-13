---
to: <%= initiatedProjectPath %>/compiled/components.js
force: true
---
import React from "react";
import Astrophel from "astrophel";

const { Sky, Scene, AstrophelRoot, Camera } = Astrophel;

const <%= componentName %> = () => {
  return (
    <>This is <%= componentName %> component</>
  );
};

export default <%= componentName %>;


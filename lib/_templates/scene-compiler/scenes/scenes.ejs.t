---
to: <%= compiledProjectPath %>/<%= projectName %>/scenes/<%= filename %>.js
force: true
---
import React from "react";
import Astrophel from "astrophel";

const { Sky, Scene, AstrophelRoot } = Astrophel;

const content = <Sky image="Assets/Images/space.jpeg" />;

const <%= filename %> = () => {
  return (
    <AstrophelRoot>
      <Scene content={content} />
    </AstrophelRoot>
  );
};

export default <%= filename %>;


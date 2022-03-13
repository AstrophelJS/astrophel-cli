---
to: <%= compiledProjectPath %>/<%= projectName %>/src/AstrophelApp.js
force: true
---
import React from "react";
import Astrophel from "astrophel";

const { Sky, Scene, AstrophelRoot } = Astrophel;

const content = (
  <>
    <Camera />
    <Sky
      image="<%= skyImageUrl %>"
      rotating={{ angle: <%= skyImageRotateTo %>, duration: <%= skyImageRotateDuration %> }} />
  </>
)

const AstrophelApp = () => {
  return (
    <AstrophelRoot>
      <Scene content={content} />
    </AstrophelRoot>
  );
};

export default AstrophelApp;


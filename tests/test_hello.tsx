import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "../src/components/hello";

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework="React" />
  
    </div>,
    document.getElementById("example")
);
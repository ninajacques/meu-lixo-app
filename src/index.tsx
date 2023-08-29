import { createRoot } from "react-dom/client";
import App from "./App";
import TagManager from 'react-gtm-module';
import React from "react";

const tagManagerArgs = {
  gtmId: 'GTM-TW6QC4S'
};

TagManager.initialize(tagManagerArgs);

const root = createRoot(document.querySelector("#root")!);

root.render(<App />);

import { createRoot } from "react-dom/client";
import App from "./App";
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: process.env.GTM_ID
};

TagManager.initialize(tagManagerArgs);

const root = createRoot(document.querySelector("#root"));

root.render(<App />);

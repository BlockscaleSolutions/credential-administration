import React from "react";
import Panel from "./UI/Panel";
import WalletProviderSelector from "./WalletProviderSelector";

const WalletProviderSelectorPage = () => (
  <Panel id="network-selector" style={{ textAlign: "center" }}>
    <img src="/static/images/convergence-logo.png" style={{ maxWidth: 300 }} />
    <h1>Welcome to our Credential Admin Portal</h1>
    <p>Please select a Wallet Network to begin.</p>
    <WalletProviderSelector />
  </Panel>
);

export default WalletProviderSelectorPage;

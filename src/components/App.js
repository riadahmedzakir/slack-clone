import React from "react";
import { Grid } from 'semantic-ui-react';
import { connect } from "react-redux";
import "./App.css";

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

const App = ({ currentUser }) => (
  <Grid columns="equal" className="app" style={{ background: '#eee', margin: -20 }}>
    <ColorPanel />
    <SidePanel currentUser={currentUser} />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages />
    </Grid.Column>

    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);

const mapStateToProbs = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProbs)(App);

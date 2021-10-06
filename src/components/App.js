import React from "react";
import { Grid } from 'semantic-ui-react';
import { connect } from "react-redux";
import "./App.css";

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

const App = ({ currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor, userList }) => (
  <Grid columns="equal" className="app" style={{ background: secondaryColor, margin: -20 }}>
    <ColorPanel key={currentUser && currentUser.name} currentUser={currentUser} />
    <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} primaryColor={primaryColor} />

    {currentChannel &&
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages key={currentChannel && currentChannel.id} currentChannel={currentChannel} currentUser={currentUser} isPrivateChannel={isPrivateChannel}
          userList={userList} />
      </Grid.Column>}

    {currentChannel &&
      <Grid.Column width={4}>
        <MetaPanel key={currentChannel && currentChannel.name} currentChannel={currentChannel} isPrivateChannel={isPrivateChannel} userPosts={userPosts}
          userList={userList} />
      </Grid.Column>}

    {!currentChannel &&
      <Grid.Column style={{ marginLeft: 320 }}>
        <div className="notfound">
          <div className="notfound-404">
            <h1> <span>Secret Society</span></h1>
          </div>
          <h2>No channels, please select or create a channel to get started</h2>
        </div>
      </Grid.Column>}
  </Grid>
);

const mapStateToProbs = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts,
  primaryColor: state.colors.primaryColor,
  secondaryColor: state.colors.secondaryColor,
  userList: state.userCache.userList
})

export default connect(mapStateToProbs)(App);

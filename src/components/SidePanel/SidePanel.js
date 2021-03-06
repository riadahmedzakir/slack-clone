import React from "react";
import { Menu } from 'semantic-ui-react';

import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import Starred from "./Starred";

class SidePanel extends React.Component {
    render() {
        const { currentUser, primaryColor } = this.props;

        return (
            <Menu size="large" inverted fixed="left" vertical style={{ background: primaryColor, fontSize: '20px' }}>
                <UserPanel currentUser={currentUser} primaryColor={primaryColor} />
                <Starred currentUser={currentUser} />
                <Channels currentUser={currentUser} />
                <DirectMessages currentUser={currentUser} />
            </Menu>
        )
    }
}

export default SidePanel;
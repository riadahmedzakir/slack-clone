import React from "react";
import { Menu } from 'semantic-ui-react';

import UserPanel from "./UserPanel";
import Channels from "./Channels";

class SidePanel extends React.Component {
    render() {
        const { currentUser } = this.props;

        return (
            <Menu size="large" inverted fixed="left" vertical style={{ background: '#8244FF', fontSize: '20px' }}>
                <UserPanel currentUser={currentUser} />
                <Channels currentUser={currentUser} />
            </Menu>
        )
    }
}

export default SidePanel;
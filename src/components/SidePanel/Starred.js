import React from "react";
import { Menu, Icon } from 'semantic-ui-react';
import { setCurrentChannel, setPrivateChannel } from "../../actions";
import { connect } from 'react-redux';
import firebase from "./../../firebase";

class Starred extends React.Component {
    state = {
        user: this.props.currentUser,
        usersRef: firebase.database().ref('users'),
        starredChannels: [],
        activeChannel: ''
    }

    componentDidMount() {
        if (this.state.user) {
            this.addListeners(this.state.user.uid);
        }
    }

    addListeners = (userId) => {
        this.state.usersRef
            .child(userId)
            .child('starred')
            .on('child_added', snap => {
                const starredChannel = { id: snap.key, ...snap.val() };

                this.setState({
                    starredChannels: [...this.state.starredChannels, starredChannel]
                })
            });

        this.state.usersRef
            .child(userId)
            .child('starred')
            .on('child_removed', snap => {
                const channelToRemove = { id: snap.key, ...snap.val() };
                const filteredChannels = this.state.starredChannels.filter(channel => {
                    return channel.id !== channelToRemove.id;
                });

                this.setState({ starredChannels: filteredChannels });
            });
    }

    changeChannel = (channel) => {
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
        this.props.setPrivateChannel(false);
    }

    setActiveChannel = (channel) => {
        this.setState({ activeChannel: channel.id });
    }

    displayChannels = (starredChannels) => {
        return starredChannels.length > 0 && starredChannels.map(starredChannel => (
            <Menu.Item key={starredChannel.id} onClick={() => this.changeChannel(starredChannel)} name={starredChannel.name} style={{ opacity: 0.7 }}
                active={starredChannel.id === this.state.activeChannel}>
                # {starredChannel.name}
            </Menu.Item>
        ));
    }

    render() {
        const { starredChannels } = this.state;

        return (
            <Menu.Menu className="menu">
                <Menu.Item>
                    <span>
                        <Icon name="heart"></Icon>
                        FAVORITE
                    </span> {" "}
                    ({starredChannels.length})


                </Menu.Item>

                {this.displayChannels(starredChannels)}
            </Menu.Menu>
        )
    }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred);
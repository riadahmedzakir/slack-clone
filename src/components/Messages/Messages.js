import React from "react";
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';

import firebase from './../../firebase';

class Messages extends React.Component {
    state = {
        messagesRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        privateChannel: this.props.isPrivateChannel,
        privateMessagesRef: firebase.database().ref('privateMessages'),
        isChannelStarred: false,
        user: this.props.currentUser,
        usersRef: firebase.database().ref('users'),
        messages: [],
        messagesLoading: true,
        numUniqUsers: '',
        searchTerm: '',
        searchLoading: false,
        searchResults: []
    };

    componentDidMount() {
        const { channel, user } = this.state;

        if (channel && user) {
            this.addListeners(channel.id, user.uid);
        }
    }

    addListeners = (channelId, userId) => {
        this.addMessageListener(channelId);
        this.addUserStarsListeners(channelId, userId);
    }

    addMessageListener = channelId => {
        let loadedMessages = [];
        const ref = this.getMessagesRef();

        ref.child(channelId).on('child_added', snap => {
            loadedMessages.push(snap.val());
            this.setState({ messages: loadedMessages, messageLoading: false })

            this.countUniqUsers(loadedMessages);
        });
    }

    addUserStarsListeners = (channelId, userId) => {
        this.state.usersRef
            .child(userId)
            .child('starred')
            .once('value')
            .then(data => {
                if (data.val() !== null) {
                    const channelIds = Object.keys(data.val());
                    const prevStarred = channelIds.includes(channelId);
                    this.setState({ isChannelStarred: prevStarred });
                }
            })
    }

    getMessagesRef = () => {
        const { messagesRef, privateMessagesRef, privateChannel } = this.state;

        return privateChannel ? privateMessagesRef : messagesRef;
    }

    countUniqUsers = (messages) => {
        const uniqUsers = messages.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name);
            }

            return acc;
        }, []);

        const numUniqUsers = `${uniqUsers.length} users`;
        this.setState({ numUniqUsers: numUniqUsers })
    }

    displayMessages = (messages) => (
        messages.length > 0 && messages.map(message => {
            return <Message key={message.timestamp} message={message} user={this.state.user} />
        })
    )

    displayChannelName = (channel) => {
        return channel ?
            `${this.state.privateChannel ? '@' : '#'}${channel.name}` : ''
    }

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value, searchLoading: true }, () => {
            this.handleSearchMessages();
        });
    }

    handleSearchMessages = () => {
        const channelMessages = [...this.state.messages];
        const regex = new RegExp(this.state.searchTerm, 'gi');
        const searchResults = channelMessages.reduce((acc, message) => {
            if (message.content && message.content.match(regex) || message.user.name.match(regex)) {
                acc.push(message);
            }

            return acc;
        }, []);

        this.setState({ searchResults: searchResults });
        setTimeout(() => {
            this.setState({ searchLoading: false });
        }, 1000);
    }

    handleStar = () => {
        this.setState(prevState => ({
            isChannelStarred: !prevState.isChannelStarred
        }), () => this.starChannel());
    }

    starChannel = () => {
        if (this.state.isChannelStarred) {
            this.state.usersRef
                .child(`${this.state.user.uid}/starred`)
                .update({
                    [this.state.channel.id]: {
                        name: this.state.channel.name,
                        details: this.state.channel.details,
                        createdBy: {
                            name: this.state.channel.createdBy.name,
                            avatar: this.state.channel.createdBy.avatar
                        }
                    }
                })
        } else {
            this.state.usersRef
                .child(`${this.state.user.uid}/starred`)
                .child(this.state.channel.id)
                .remove(err => {
                    if (err !== null) {
                        console.log(err);
                    }
                })
        }
    }

    render() {
        const { messagesRef, channel, user, messages, numUniqUsers, searchTerm, searchResults, searchLoading, privateChannel, isChannelStarred } = this.state;
        return (
            <React.Fragment>
                <MessagesHeader channelName={this.displayChannelName(channel)} numUniqUsers={numUniqUsers} handleSearchChange={this.handleSearchChange}
                    searchLoading={searchLoading} isPrivateChannel={privateChannel} handleStar={this.handleStar} isChannelStarred={isChannelStarred} />

                <Segment>
                    <Comment.Group className="messages">
                        {searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>

                <MessageForm messagesRef={messagesRef} currentChannel={channel} currentUser={user} isPrivateChannel={privateChannel} getMessagesRef={this.getMessagesRef} />
            </React.Fragment>
        )
    }
}

export default Messages;
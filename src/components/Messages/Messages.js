import React from "react";
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';

import firebase from './../../firebase';
import { connect } from "react-redux";
import { setUserPosts } from './../../actions'

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
        searchResults: [],
        userList: this.props.userList
    };

    componentDidMount() {
        const { channel, user } = this.state;

        if (channel && user) {
            this.addListeners(channel.id, user.uid);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { messages } = this.state;

        messages.forEach(message => {
            const postCreator = this.getPostCreator(message, nextProps.userList);
            message.user.avatar = postCreator.userData.avatar;
        });

        this.setState({ messages: messages });
    }

    addListeners = (channelId, userId) => {
        this.addMessageListener(channelId);
        this.addUserStarsListeners(channelId, userId);
    }

    addMessageListener = channelId => {
        let loadedMessages = [];
        const ref = this.getMessagesRef();

        ref.child(channelId).on('child_added', snap => {
            const message = snap.val();
            const postCreator = this.getPostCreator(snap.val(), this.state.userList);
            message.user.avatar = postCreator.userData.avatar;

            loadedMessages.push(message);

            this.setState({ messages: loadedMessages, messageLoading: false });

            this.countUniqUsers(loadedMessages);
            this.countUserPosts(loadedMessages);
        });
    }

    getPostCreator = (message, userList) => {
        const { user } = message;
        const postCreator = userList.find(listedUser => {
            return listedUser.userId === user.id;
        })
        return postCreator;
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

    countUserPosts = (messages) => {
        let userPosts = messages.reduce((acc, message) => {
            if (message.user.name in acc) {
                acc[message.user.name].count += 1;
            } else {
                acc[message.user.name] = {
                    avatar: message.user.avatar,
                    count: 1
                }
            }
            return acc;
        }, []);

        this.props.setUserPosts(userPosts);
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
            if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
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
                        createdBy: this.state.channel.createdBy
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

export default connect(null, { setUserPosts })(Messages);
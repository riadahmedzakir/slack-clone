import React from "react";
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';
import Typing from "./Typing";
import Skeleton from "./Skeleton";

import firebase from './../../firebase';
import { connect } from "react-redux";
import { setUserPosts } from './../../actions'

class Messages extends React.Component {
    state = {
        messagesRef: firebase.database().ref('messages'),
        privateMessagesRef: firebase.database().ref('privateMessages'),
        usersRef: firebase.database().ref('users'),
        typingRef: firebase.database().ref('typing'),
        connectedRef: firebase.database().ref('.info/connected'),
        channel: this.props.currentChannel,
        privateChannel: this.props.isPrivateChannel,
        isChannelStarred: false,
        user: this.props.currentUser,
        messages: [],
        messagesLoading: true,
        numUniqUsers: '',
        searchTerm: '',
        searchLoading: false,
        searchResults: [],
        userList: this.props.userList,
        typingUsers: [],
        listeners: []
    };

    componentDidMount() {
        const { channel, user, listeners } = this.state;

        if (channel && user) {
            this.removeListeners(listeners);
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

    componentDidUpdate(prevProps, prevState) {
        if (this.messagesEnd) {
            this.scrollToBottom();
        }
    }

    componentWillUnmount() {
        this.removeListeners(this.state.listeners);
        this.state.connectedRef.off();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    addListeners = (channelId, userId) => {
        this.addMessageListener(channelId);
        this.addUserStarsListeners(channelId, userId);
        this.addTypingListeners(channelId, userId);
    }

    addToListeners = (id, ref, event) => {
        const index = this.state.listeners.findIndex(listener => {
            return listener.id === id && listener.ref === ref && listener.event === event;
        });

        if (index === -1) {
            const newListener = { id, ref, event };
            this.setState({ listeners: this.state.listeners.concat(newListener) });
        }
    }

    removeListeners = (listeners) => {
        listeners.forEach(listener => {
            listener.ref.child(listener.id).off(listener.event);
        })
    }

    addMessageListener = channelId => {
        let loadedMessages = [];
        const ref = this.getMessagesRef();

        ref.child(channelId).on('child_added', snap => {
            const message = snap.val();
            const postCreator = this.getPostCreator(snap.val(), this.state.userList);
            message.user.avatar = postCreator.userData.avatar;

            loadedMessages.push(message);

            this.setState({ messages: loadedMessages, messagesLoading: false });

            this.countUniqUsers(loadedMessages);
            this.countUserPosts(loadedMessages);
        });
        this.addToListeners(channelId, ref, 'child_added');
    }

    addTypingListeners = (channelId, userId) => {
        let typingUsers = [];

        this.state.typingRef
            .child(channelId)
            .on('child_added', snap => {
                if (snap.key !== userId) {
                    typingUsers = typingUsers.concat({
                        id: snap.key,
                        name: snap.val()
                    });

                    this.setState({ typingUsers: typingUsers })
                }
            });
        this.addToListeners(channelId, this.state.typingRef, 'child_added');

        this.state.typingRef
            .child(channelId)
            .on('child_removed', snap => {
                const index = typingUsers.findIndex(user => user.id === snap.key);
                if (index !== -1) {
                    typingUsers = typingUsers.filter(user => user.id !== snap.key);
                    this.setState({ typingUsers: typingUsers })
                }
            });
        this.addToListeners(channelId, this.state.typingRef, 'child_removed');

        this.state.connectedRef.on('value', snap => {
            if (snap.val() === true) {
                this.state.typingRef
                    .child(channelId)
                    .child(this.state.user.uid)
                    .onDisconnect()
                    .remove(err => {
                        if (err !== null) {
                            console.log(err);
                        }
                    })
            }
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

    displayTypingUsers = (users) => {
        return users.length > 0 && users.map(user => {
            return <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <span className="user__typing">{user.name}</span> <Typing />
            </div>
        });
    }

    displayMessageSkeleton = (loading) => (
        loading ? (
            <React.Fragment>
                {[...Array(10)].map((_, i) => {
                    return <Skeleton key={i} />
                })}
            </React.Fragment>
        ) : null
    )

    render() {
        const { messagesRef, channel, user, messages, numUniqUsers, searchTerm, searchResults, searchLoading, privateChannel, isChannelStarred, typingUsers, messagesLoading } = this.state;

        return (
            <React.Fragment>
                <MessagesHeader channelName={this.displayChannelName(channel)} numUniqUsers={numUniqUsers} handleSearchChange={this.handleSearchChange}
                    searchLoading={searchLoading} isPrivateChannel={privateChannel} handleStar={this.handleStar} isChannelStarred={isChannelStarred} />

                <Segment>
                    <Comment.Group className="messages">
                        {this.displayMessageSkeleton(messagesLoading)}

                        {searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages)}

                        {this.displayTypingUsers(typingUsers)}

                        <div ref={node => (this.messagesEnd = node)}></div>
                    </Comment.Group>
                </Segment>

                <MessageForm messagesRef={messagesRef} currentChannel={channel} currentUser={user} isPrivateChannel={privateChannel} getMessagesRef={this.getMessagesRef} />
            </React.Fragment>
        )
    }
}

export default connect(null, { setUserPosts })(Messages);
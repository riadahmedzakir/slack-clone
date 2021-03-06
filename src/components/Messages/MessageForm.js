import React from "react";
import uuidv4 from 'uuid/v4';
import { Segment, Button, Input } from 'semantic-ui-react';
import { Picker, emojiIndex } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';


import firebase from './../../firebase';
import FileModal from "./FileModal";
import ProgressBar from "./ProgressBar";

class MessageForm extends React.Component {
    state = {
        message: '',
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        loading: false,
        errors: [],
        modal: false,
        uploadState: '',
        uploadTask: null,
        storageRef: firebase.storage().ref(),
        typingRef: firebase.database().ref('typing'),
        percentUploaded: 0,
        emojiPicker: false
    };

    componentWillUnmount() {
        if (this.state.uploadTask !== null) {
            this.state.uploadTask.cancel();
            this.setState({ uploadTask: null });
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
        const { message, typingRef, channel, user } = this.state;

        if (message) {
            typingRef
                .child(channel.id)
                .child(user.uid)
                .set(user.displayName);
        } else {
            this.removeTypingRef(channel.id, user.uid);
        }
    }

    removeTypingRef(channelId, userId) {
        const { typingRef } = this.state;

        typingRef
            .child(channelId)
            .child(userId)
            .remove();
    }

    createMessage = (fileUrl = null) => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName
            }
        }

        if (fileUrl !== null) {
            message['image'] = fileUrl;
        } else {
            message['content'] = this.state.message;
        }

        return message;
    }

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    sendMessage = () => {
        const { getMessagesRef } = this.props;
        const { message, channel, user } = this.state;

        if (message) {
            this.setState({ loading: true });
            getMessagesRef().child(channel.id).push().set(this.createMessage()).then(() => {
                this.setState({ loading: false, message: '', error: [] });
                this.removeTypingRef(channel.id, user.uid);
            }).catch(err => {
                this.setState({ loading: false, errors: this.state.errors.concat(err) });
            });
        } else {
            this.setState({ errors: this.state.errors.concat({ message: 'Add a message' }) })
        }
    }

    getPath = () => {
        if (this.props.isPrivateChannel) {
            return `chat/private/${this.state.channel.id}`;
        } else {
            return `chat/public`;
        }
    }

    uploadFile = (file, metadata) => {
        const pathToUpload = this.state.channel.id;
        const ref = this.props.getMessagesRef();
        const filePath = `${this.getPath()}/${uuidv4()}.jpeg`;

        this.setState({ uploadState: 'uploading', uploadTask: this.state.storageRef.child(filePath).put(file, metadata) }, () => {
            this.state.uploadTask.on('static_changed', snap => {
                const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                this.setState({ percentUploaded: percentUploaded });
            }, err => {
                this.setState({
                    errors: this.state.errors.concat(err),
                    uploadState: 'error',
                    uploadTask: null
                });
            }, () => {
                this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
                    this.sendFileMessage(downloadUrl, ref, pathToUpload);
                }).catch(err => {
                    this.setState({
                        errors: this.state.errors.concat(err),
                        uploadState: 'error',
                        uploadTask: null
                    });
                });
            });
        });
    }

    sendFileMessage = (fileUrl, ref, pathToUpload) => {
        ref.child(pathToUpload)
            .push()
            .set(this.createMessage(fileUrl))
            .then(() => {
                this.setState({ uploadState: 'done' });
            })
            .catch(err => {
                this.setState({
                    errors: this.state.errors.concat(err)
                })
            });
    }

    handleTogglePicker = () => {
        this.setState({ emojiPicker: !this.state.emojiPicker });
    }

    colonToUnicode = message => {
        return message.replace(/:[A-Za-z0-9_+-]+:/g, x => {
            x = x.replace(/:/g, "");
            let emoji = emojiIndex.emojis[x];
            if (typeof emoji !== "undefined") {
                let unicode = emoji.native;
                if (typeof unicode !== "undefined") {
                    return unicode;
                }
            }

            x = ":" + x + ":";
            return x;
        });
    }

    handleAddEmoji = (emoji) => {
        const oldMessage = this.state.message;
        const newMessage = this.colonToUnicode(`${oldMessage} ${emoji.colons}`);
        this.setState({ message: newMessage, emojiPicker: false });

        setTimeout(() => {
            this.messageInputRef.focus();
        }, 0);
    }

    render() {
        const { errors, message, loading, modal, uploadState, percentUploaded, emojiPicker } = this.state;

        return (
            <Segment className="message__form">

                {emojiPicker && (
                    <Picker set="apple" title="Pick your emoji" emoji="point_up" autoFocus onSelect={this.handleAddEmoji} />
                )}

                <Input fluid onChange={this.handleChange} name="message" style={{ marginBottom: '20px' }} labelPosition="left"
                    label={<Button onClick={this.handleTogglePicker} icon={emojiPicker ? 'close' : 'add'} content={emojiPicker ? 'Close' : null} />}
                    placeholder="Write your messages" value={message} onKeyDown={this.handleKeyDown}
                    className={errors.some(error => error.message.toLowerCase().includes('message')) ? 'error' : ''}
                    ref={node => (this.messageInputRef = node)} />

                <Button.Group icon widths="2">
                    <Button color="orange" onClick={this.sendMessage} content="Add reply" labelPosition="left" icon="edit" disabled={loading} />
                    <Button color="teal" onClick={this.openModal} disabled={uploadState === 'uploading'} content="Upload media" labelPosition="right" icon="cloud upload" />
                </Button.Group>

                <FileModal modal={modal} closeModal={this.closeModal} uploadFile={this.uploadFile} />
                <ProgressBar uploadState={uploadState} percentUploaded={percentUploaded} />
            </Segment>
        )
    }
}

export default MessageForm;
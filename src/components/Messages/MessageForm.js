import React from "react";
import uuidv4 from 'uuid/v4';
import { Segment, Button, Input } from 'semantic-ui-react';

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
        percentUploaded: 0
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    createMessage = (fileUrl = null) => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            },
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
        const { messagesRef } = this.props;
        const { message, channel } = this.state;

        if (message) {
            this.setState({ loading: true });
            messagesRef.child(channel.id).push().set(this.createMessage()).then(() => {
                this.setState({ loading: false, message: '', error: [] });
            }).catch(err => {
                this.setState({ loading: false, errors: this.state.errors.concat(err) });
            });
        } else {
            this.setState({ errors: this.state.errors.concat({ message: 'Add a message' }) })
        }
    }

    uploadFile = (file, metadata) => {
        const pathToUpload = this.state.channel.id;
        const ref = this.props.messagesRef;
        const filePath = `chat/public/${uuidv4()}.jpeg`;

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

    render() {
        const { errors, message, loading, modal, uploadState, percentUploaded } = this.state;

        return (
            <Segment className="message__form">
                <Input fluid onChange={this.handleChange} name="message" style={{ marginBottom: '20px' }} label={<Button icon="add" />}
                    labelPosition="left" placeholder="Write your messages" value={message}
                    className={errors.some(error => error.message.toLowerCase().includes('message')) ? 'error' : ''} />

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
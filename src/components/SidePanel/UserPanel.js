import React from "react";
import firebase from "./../../firebase";
import { Dropdown, Grid, Header, Icon, Image, Modal, Input, Button } from "semantic-ui-react";

import AvatarEditor from "react-avatar-editor";

class UserPanel extends React.Component {
    state = {
        user: this.props.currentUser,
        modal: false,
        previewImage: '',
        croppedImage: '',
        blob: '',
        storageRef: firebase.storage().ref(),
        userRef: firebase.auth().currentUser,
        usersRef: firebase.database().ref('users'),
        metadata: {
            contentType: 'image/jpeg'
        },
        uploadedCroppedImage: '',
        isAvatarUploading: false
    };

    componentDidMount() {
        this.setState({ user: this.props.currentUser });
    }

    dropdownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span onClick={this.openModal}>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignout}>Sign Out</span>
        }
    ];

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
            });
    };

    handleChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                this.setState({ previewImage: reader.result });
            });
        }
    }

    handleCropImage = () => {
        if (this.avatarEditor) {
            this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
                let imageUrl = URL.createObjectURL(blob);
                this.setState({ croppedImage: imageUrl, blob: blob });
            });
        }
    }

    uploadCroppedImage = () => {
        const { storageRef, userRef, blob, metadata } = this.state;

        storageRef
            .child(`avatars/users/${userRef.uid}`)
            .put(blob, metadata)
            .then(snap => {
                snap.ref.getDownloadURL().then(downloadURL => {
                    this.setState({ uploadedCroppedImage: downloadURL }, () => {
                        this.changeAvatar();
                    });
                });
            });
    }

    changeAvatar = () => {
        this.setState({ isAvatarUploading: true });

        this.state.userRef
            .updateProfile({ photoURL: this.state.uploadedCroppedImage }).then(() => {
                this.setState({ isAvatarUploading: false });
                this.closeModal();
            }).catch(err => {
                console.log(err);
            });

        this.state.usersRef
            .child(this.state.user.uid)
            .update({ avatar: this.state.uploadedCroppedImage })
            .then(() => {

            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        const { primaryColor, modal, previewImage, croppedImage, isAvatarUploading } = this.state;

        return (
            <Grid style={{ background: primaryColor }}>
                <Grid.Column>
                    <Grid.Row style={{ padding: 20, margin: 0 }}>
                        <Header inverted floated="left" as="h3">
                            <Icon name="user secret" />
                            <Header.Content>Secret Society</Header.Content>
                        </Header>

                        <Header style={{ padding: '20px' }} as="h4" inverted>
                            <Dropdown style={{ background: primaryColor }} trigger={
                                <span>
                                    <Image src={this.state.user.photoURL} spaced="right" avatar />
                                    {this.state.user.displayName}
                                </span>
                            } options={this.dropdownOptions()} />
                        </Header>
                    </Grid.Row>

                    <Modal basic open={modal} onClose={this.closeModal}>
                        <Modal.Header>Change avatar</Modal.Header>

                        <Modal.Content>
                            <Input onChange={this.handleChange} fluid type="file" label="New avatar" name="previewImage" />

                            <Grid centered stackable columns={2}>
                                <Grid.Row centered>
                                    <Grid.Column style={{ marginTop: '20px' }} className="ui center aligned grid">
                                        {previewImage && (
                                            <AvatarEditor image={previewImage} width={300} height={300} border={50} ref={node => (this.avatarEditor = node)} />
                                        )}
                                    </Grid.Column>

                                    <Grid.Column >
                                        {croppedImage && (
                                            <Image style={{ margin: '20px auto' }} width={300} height={300} src={croppedImage} />
                                        )}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Modal.Content>

                        <Modal.Actions>
                            {croppedImage && <Button color="green" inverted onClick={this.uploadCroppedImage} disabled={isAvatarUploading}>
                                <Icon name="save" />Change Avatar
                            </Button>}

                            <Button color="green" inverted onClick={this.handleCropImage}>
                                <Icon name="image" />Preview
                            </Button>

                            <Button color="red" inverted onClick={this.closeModal}>
                                <Icon name="remove" />Cancel
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Grid.Column>
            </Grid>
        )
    }
}
export default UserPanel;
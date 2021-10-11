import React from "react";
import firebase from "./../../firebase";
import { Button } from 'semantic-ui-react';

import { connect } from 'react-redux';

import { cacheUserData } from "./../../actions";


class SocialLogin extends React.Component {
    state = {
        loading: false,
        errors: [],
        usersRef: firebase.database().ref('users')
    }

    handleFacebookLogin = () => {
        this.setState({ errors: [], loading: true });

        firebase
            .auth()
            .signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then((createdUser) => {
                this.saveUser(createdUser).then(() => {
                    this.cacheUserData();
                    this.setState({ loading: false });
                });
            })
            .catch(err => {
                this.setState({ errors: this.state.errors.concat(err), loading: false });
            });
    }

    handleGoogleLogin = () => {
        this.setState({ errors: [], loading: true });

        firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((createdUser) => {
                this.saveUser(createdUser).then(() => {
                    this.cacheUserData();
                    this.setState({ loading: false });
                });
            })
            .catch(err => {
                this.setState({ errors: this.state.errors.concat(err), loading: false });
            });
    }


    saveUser = (createdUser) => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    }

    cacheUserData = () => {
        const userList = [];

        firebase.database().ref('users').once("value", data => {
            const users = data.val()
            const userIds = Object.keys(users);

            userIds.forEach(id => {
                userList.push({
                    userId: id,
                    userData: users[id]
                })
            });

            this.props.cacheUserData(userList);
        });
    }

    render() {
        const { loading } = this.state;

        return (
            <React.Fragment>
                <Button disabled={loading} icon="facebook" fluid color="facebook" style={{ marginBottom: 10 }} content="Login with Facebook" onClick={this.handleFacebookLogin} />
                <Button disabled={loading} icon="google" fluid color="google plus" content="Login with Google" onClick={this.handleGoogleLogin} />
            </React.Fragment>
        )
    }
}

export default connect(null, { cacheUserData })(SocialLogin);
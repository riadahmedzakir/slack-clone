import React from "react";
import firebase from "./../../firebase";
import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react";

class UserPanel extends React.Component {
    state = {
        user: this.props.currentUser
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
            text: <span>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignout}>Sign Out</span>
        }
    ];

    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
            });
    };


    render() {
        return (
            <Grid style={{ background: '#8244FF' }}>
                <Grid.Column>
                    <Grid.Row style={{ padding: 20, margin: 0 }}>
                        <Header inverted floated="left" as="h3">
                            <Icon name="user secret" />
                            <Header.Content>Secret Society</Header.Content>
                        </Header>

                        <Header style={{ padding: '20px' }} as="h4" inverted>
                            <Dropdown trigger={
                                <span>
                                    <Image src={this.state.user.photoURL} spaced="right" avatar />
                                    {this.state.user.displayName}
                                </span>
                            } options={this.dropdownOptions()} />
                        </Header>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}
export default UserPanel;
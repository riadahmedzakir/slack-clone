import React from "react";
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

class MessagesHeader extends React.Component {
    render() {
        const { channelName, numUniqUsers, handleSearchChange, searchLoading } = this.props;
        return (
            <Segment clearing>
                <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
                    <span>
                        {channelName}
                        <Icon name="star outline" />
                    </span>

                    <Header.Subheader>{numUniqUsers}</Header.Subheader>
                </Header>
                <Header floated="right">
                    <Input size="mini" icon="search" name="searchTerm" placeholder="Search Messages" onChange={handleSearchChange}
                        loading={searchLoading} />
                </Header>
            </Segment>
        )
    }
}

export default MessagesHeader;
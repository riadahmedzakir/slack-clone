import React from "react";
import { Segment, Accordion, Header, Icon, Image, List } from 'semantic-ui-react';

class MetaPanel extends React.Component {
    state = {
        activeIndex: 0,
        channel: this.props.currentChannel,
        privateChannel: this.props.isPrivateChannel,
        userList: this.props.userList
    };

    componentDidMount() {
        const { channel, userList, privateChannel } = this.state;

        if (channel && userList.length && !privateChannel) {
            const channelCreator = this.getChannelCreator(channel, userList);
            channel.creatorData = channelCreator.userData;

            this.setState({ channel: channel });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { channel, privateChannel } = this.state;

        if (channel && nextProps.userList.length && !privateChannel) {
            const channelCreator = this.getChannelCreator(channel, nextProps.userList);
            channel.creatorData = channelCreator.userData;

            this.setState({ channel: channel });
        }
    }


    getChannelCreator = (channel, userList) => {
        const { createdBy } = channel;
        const channelCreator = userList.find(listedUser => {
            return listedUser.userId === createdBy;
        })
        return channelCreator;
    }

    setActiveIndex = (event, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex });
    }

    displayTopPosters = (posts) => {
        return Object.entries(posts)
            .sort((a, b) => b[1] - a[1])
            .map(([key, val], i) => (
                <List.Item key={i}>
                    <Image avatar src={val.avatar} />
                    <List.Content>
                        <List.Header as="a">{key}</List.Header>
                        <List.Description>{val.count} posts</List.Description>
                    </List.Content>
                </List.Item>
            )).splice(0, 3);
    }

    render() {
        const { activeIndex, privateChannel, channel } = this.state;
        const { userPosts } = this.props;

        if (privateChannel) return null;

        return (
            <Segment loading={!channel}>
                <Header as="h3" attached="top">
                    About # {channel && channel.name}
                </Header>
                <Accordion styled attached="true">
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.setActiveIndex}>
                        <Icon name="dropdown" />
                        <Icon name="info" />
                        DETAILS
                    </Accordion.Title>

                    <Accordion.Content active={activeIndex === 0}>
                        {channel && channel.details}
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.setActiveIndex}>
                        <Icon name="dropdown" />
                        <Icon name="user circle" />
                        TOP POSTERS
                    </Accordion.Title>

                    <Accordion.Content active={activeIndex === 1}>
                        <List>
                            {userPosts && this.displayTopPosters(userPosts)}
                        </List>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 2} index={2} onClick={this.setActiveIndex}>
                        <Icon name="dropdown" />
                        <Icon name="pencil alternate" />
                        CREATED BY
                    </Accordion.Title>

                    <Accordion.Content active={activeIndex === 2}>
                        <Header as="h3">
                            <Image circular src={channel && channel.creatorData && channel.creatorData.avatar} />
                            {channel && channel.creatorData && channel.creatorData.name}
                        </Header>
                    </Accordion.Content>
                </Accordion>
            </Segment>
        )
    }
}

export default MetaPanel;
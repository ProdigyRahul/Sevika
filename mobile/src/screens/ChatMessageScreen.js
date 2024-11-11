import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Wrapper from '../components/Wrapper';


export const ChatMessageScreen = ({ route, navigation }) => {
    const { chat } = route.params;
    const [message, setMessage] = React.useState('');

    const messages = [
        {
            id: 1,
            text: 'Hello! Thank you for signing up for our weekend teaching program.',
            time: '10:00 AM',
            sender: 'them',
        },
        {
            id: 2,
            text: "Hi! Yes, I'm really excited to help out!",
            time: '10:05 AM',
            sender: 'me',
        },
        {
            id: 3,
            text: 'Great! The session will be this Saturday at 10 AM. We will be teaching basic English to children aged 8-12.',
            time: '10:07 AM',
            sender: 'them',
        },
        {
            id: 4,
            text: 'Perfect! Looking forward to it. Should I prepare any materials?',
            time: '10:10 AM',
            sender: 'me',
        },
        {
            id: 5,
            text: "We'll provide all the necessary materials. Just bring your enthusiasm!",
            time: '10:12 AM',
            sender: 'them',
        },
        {
            id: 6,
            text: 'Thank you for volunteering! See you on Saturday.',
            time: '10:15 AM',
            sender: 'them',
        },
    ];

    return (
        <Wrapper style={styles.wrapper}>
            {/* Chat Header */}
            <View style={styles.messageHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../assets/images/location.png')}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Image source={chat.avatar} style={styles.messageAvatar} />
                <View style={styles.messageHeaderInfo}>
                    <Text style={styles.messageHeaderName}>{chat.name}</Text>
                    <Text style={styles.messageHeaderStatus}>Online</Text>
                </View>
            </View>

            {/* Messages */}
            <ScrollView
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}>
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.messageWrapper,
                            msg.sender === 'me' ? styles.myMessage : styles.theirMessage,
                        ]}>
                        <View
                            style={[
                                styles.messageBubble,
                                msg.sender === 'me'
                                    ? styles.myMessageBubble
                                    : styles.theirMessageBubble,
                            ]}>
                            <Text
                                style={[
                                    styles.messageText,
                                    msg.sender === 'me'
                                        ? styles.myMessageText
                                        : styles.theirMessageText,
                                ]}>
                                {msg.text}
                            </Text>
                            <Text
                                style={[
                                    styles.messageTime,
                                    msg.sender === 'me'
                                        ? styles.myMessageTime
                                        : styles.theirMessageTime,
                                ]}>
                                {msg.time}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Message Input */}
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.attachButton}>
                    <Image
                        source={require('../assets/images/location.png')}
                        style={styles.attachIcon}
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Type a message..."
                    value={message}
                    onChangeText={setMessage}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Image
                        source={require('../assets/images/location.png')}
                        style={styles.sendIcon}
                    />
                </TouchableOpacity>
            </View>
        </Wrapper>
    );
};

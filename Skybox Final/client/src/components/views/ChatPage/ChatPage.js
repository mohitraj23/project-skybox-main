import React, { Component } from 'react'
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getChats, afterPostMessage } from '../../../_actions/chat_actions';
import { getUsers } from '../../../_actions/user_actions';
import ChatCard from './Sections/ChatCard';
import VideoCall from './Sections/VideoCall';
import './style/chatStyle.css';
import Send from './Images/send.png';
import Video from './Images/video-call.png';

export class ChatPage extends Component {


    state = {
        chatMessage: "",
        usersCall: {}
    }



    componentDidMount() {
        let server = "http://localhost:5000";


        this.props.dispatch(getChats());
        this.props.dispatch(getUsers());


        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackEnd => {

            console.log("Message from backend", messageFromBackEnd)
            this.props.dispatch(afterPostMessage(messageFromBackEnd));
        })
        this.refreshPid = setInterval(() => {
            this.props.dispatch(getUsers());
        }, 5000)


    }

    componentWillUnmount() {
        clearInterval(this.refreshPid);
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });

    }


    handleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }



    renderCards = () =>
        this.props.chats.chats
        && this.props.chats.chats.map((chat) => {
            if (chat.sender) {
                return <ChatCard key={chat._id}  {...chat} />
            }

        });

    callbackFunction = (childData) => {
        this.setState({ usersCall: childData })
    }

    phoneCall = () => {
        console.log("in function")
        return <VideoCall parentCallback={this.callbackFunction} />

        //return <VideoCall {...this.props.userData}/>
    }



    renderUsers = () => {
        const { userList } = this.props;

        console.log("renderusers", userList);
        return userList.map((user) => {
            console.log("user is:", user)
            if (user.token) {
                return (
                    <div className="row space-100">
                        <div className="col-lg-1">                            
                            <a href="/call" className="lh-lg" onClick={this.phoneCall}><img src={Video} width="30px" alt="Start Video Call"/></a>
                        </div>
                        <div className="col-lg-11 pl-2" style={{paddingLeft: '1.4rem', marginTop: '-0.3rem', textTransform: 'capitalize'}}>
                        <span className="h5 text-white lh-lg">{user.name}</span>
                        </div>
                    </div>
                )
            }

        })

    }


    submitChatMessage = (e) => {
        e.preventDefault();

        let chatMessage = this.state.chatMessage
        let userId = this.props.userData._id
        let userName = this.props.userData.name;
        let userImage = this.props.userData.image;
        let nowTime = moment();
        let type = "Text"

        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            userImage,
            nowTime,
            type
        });
        this.setState({ chatMessage: "" })
    }

    
    render() {

        return (
            <React.Fragment>
                <div className="container position-relative" style={{width: '70rem',top: '5.2rem'}}>
                    
                    <div className="row space-100 pb-0">
                        <div className="col-lg-4 color-container border-bottom border-dark border-2 ht2">
                             <a href="/"><h1 className="p-3 text-white"><strong>Skybox</strong></h1></a>
                        </div>
                        <div className="col-lg-8 color-container2 border-bottom border-dark border-2 ht2">
                            
                        </div>
                    </div>
                    <div className="row space-100">
                        <div className="col-lg-4 color-container ht1">
                                <p className="text-white" style={{ fontSize: '1.5rem', textAlign: 'left', padding: '1.2rem 1.2rem'}}><strong>Friends</strong></p>

                                <div style={{marginTop: '-1.8rem', marginLeft: '1.2rem'}}>{this.renderUsers()}</div>
                        </div>
                        <div className="col-lg-8 color-container2 ht1">
                            <div className="infinite-container" style={{ height: '500px', overflowY: 'scroll' }}>
                                {this.props.chats && (
                                    <div>{this.renderCards()}</div>
                                )}
                                <div
                                    ref={el => {
                                        this.messagesEnd = el;
                                    }}
                                    style={{ float: "left", clear: "both" }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row space-100 pb-0">
                        <div className="col-lg-4 color-container border-top border-dark border-2">
                        </div>
                        <div className="col-lg-8 color-container2 border-top border-dark border-2">
                            <form id="message">
                                <input 
                                    className="input-message"
                                    placeholder="Enter Your Message Here"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.handleSearchChange} />
                                <button className="send-button" onClick={this.submitChatMessage}><img src={Send} alt="send"/></button>
                            </form>
                        </div>
                     </div>
                </div>
                

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    console.log("chatpage state is", state);
    return {
        userData: state.user.userData,
        chats: state.chat,
        userList: state.user.users || []
    }
}


export default connect(mapStateToProps)(ChatPage);

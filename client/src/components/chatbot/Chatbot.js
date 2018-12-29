import React, { Component } from "react";
import axios from "axios/index";
import Message from "./Message";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import Card from "./Card";
import QuickReplies from "./QuickReplies";

const cookies = new Cookies();

export default class Chatbot extends Component {
  messagesEnd;
  talkInput;
  constructor(props) {
    super(props);
    //this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);

    this.state = {
      messages: []
    };

    if (cookies.get("userID") === undefined) {
      cookies.set("userID", uuid(), { path: "/" });
    }
    console.log(cookies.get("userID"));
  }

  async df_text_query(queryText) {
    let says = {
      speaks: "me",
      msg: {
        text: {
          text: queryText
        }
      }
    };

    this.setState({ messages: [...this.state.messages, says] });
    const res = await axios.post("/api/df_text_query", {
      text: queryText,
      userID: cookies.get("userID")
    });
    for (let msg of res.data.fulfillmentMessages) {
      console.log(JSON.stringify(msg));

      says = {
        speaks: "bot",
        msg: msg
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  async df_event_query(eventName) {
    const res = await axios.post("/api/df_event_query", {
      event: eventName,
      userID: cookies.get("userID")
    });
    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  componentDidMount() {
    this.df_event_query("Welcome");
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behaviour: "smooth" });
    this.talkInput.focus();
  }

  _handleQuickReplyPayload(text) {
    this.df_text_query(text);
  }

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
      );
    } else if (message.msg && message.msg.payload.fields.cards) {
      //message.msg.payload.fields.cards.listValue.values

      return (
        <div key={i}>
          <div className="card-panel grey lighten-5 z-depth-1">
            <div style={{ overflow: "hidden" }}>
              <div className="col s2">
                {/* <a className="btn-floating btn-large waves-effect waves-light red">
                  {message.speaks}
                </a> */}
                <h4>
                  <i class="fas fa-robot" />
                </h4>
              </div>
              <div style={{ overflow: "auto", overflowX: "scroll" }}>
                <div
                  style={{
                    height: 300,
                    width:
                      message.msg.payload.fields.cards.listValue.values.length *
                      270
                  }}
                >
                  {this.renderCards(
                    message.msg.payload.fields.cards.listValue.values
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.quick_replies
    ) {
      return (
        <QuickReplies
          text={
            message.msg.payload.fields.text
              ? message.msg.payload.fields.text
              : null
          }
          key={i}
          replyClick={this._handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.fields.quick_replies.listValue.values}
        />
      );
    }
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  _handleInputKeyPress(e) {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  }

  render() {
    return (
      <div>
        <div
          style={{
            height: 500,
            width: "auto",
            overflow: "auto"
            //position: "center",
            //bottom: 0,
            //right: 0
          }}
        >
          <div>
            <h2>ChatBot</h2>
          </div>
          <div
            id="chatbot"
            style={{ height: "388", width: "100%", overflow: "auto" }}
          >
            {this.renderMessages(this.state.messages)}
            <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </div>
          <div className="col s12">
            <input
              style={{
                margin: 0,
                paddingLeft: "1%",
                paddingRight: "1%",
                width: "98%",
                marginBottom: 30
              }}
              type="text"
              ref={input => (this.talkInput = input)}
              onKeyPress={e => this._handleInputKeyPress(e)}
              placeholder="type a message"
            />
          </div>
        </div>
      </div>
    );
  }
}

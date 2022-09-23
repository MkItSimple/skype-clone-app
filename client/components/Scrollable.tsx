import moment from "moment";
import "moment-precise-range-plugin";
import { MouseEvent, UIEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { dayFormat, minutesDifference, toGif } from "../utils/customFunctions";
import { User } from "../utils/types";
import { isSameDay, p6 } from "../utils/logics";
import AvatarMessage from "./avatar/AvatarMessage";
import AvatarReadBy from "./avatar/AvatarReadBy";
import DOMPurify from "dompurify";

interface ScrollableProps {
  user: User;
  messages: any;
  scrollAgain: boolean;
  selectedChat: any;
}

const Scrollable = ({ user, messages }: ScrollableProps) => {
  const lastElement = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLDivElement>(null);
  const [messagesDay, setMessagesDay] = useState<any[]>([]);

  const handleMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) {
      e.preventDefault;
    }
  };

  const scrollToBottom = () => {
    lastElement.current?.scrollIntoView();
  };

  const scrollToSomething = () => {
    console.log("scrollToSomething called");
    scrollRef.current?.scrollIntoView();
  };

  useEffect(() => {
    console.log("messages.length ", messages.length);

    if (messages.length > 0) {
      messages.length > 29 ? scrollToSomething() : scrollToBottom();
      const tempMessagesDay: any[] = [];
      for (let i = 0; i < messages.length; i++) {
        const date = messages[i].createdAt;
        tempMessagesDay.push(moment(date).format("dddd, DD MMMM YYYY"));
      }
      setMessagesDay(tempMessagesDay);
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <ScrollableContainer>
      <div className="chat__messages">
        {messages.length > 0 &&
          messages.map((m: any, i: number) => (
            <div key={`m-${m._id}`}>
              {!isSameDay(messagesDay, messagesDay[i], i) && (
                <div className="date__container">
                  <span></span>
                  <div className="date">{dayFormat(m.createdAt)}</div>
                  <span></span>
                </div>
              )}
              <div
                className={`message ${
                  m.sender._id === user._id ? "right" : ""
                }`}
                ref={
                  i === messages.length - 1
                    ? lastElement
                    : i === 14
                    ? scrollRef
                    : noRef
                }
                onContextMenu={(e) => handleMouseDown(e)}
              >
                {p6(messages, m, i, user._id) === "left avatar" && (
                  <AvatarMessage user={m.sender} myId={user._id} />
                )}
                {p6(messages, m, i, user._id) === "left" && (
                  <div className="avatar__placer"></div>
                )}
                <div className="message__right">
                  {(p6(messages, m, i, user._id) === "left avatar" ||
                    p6(messages, m, i, user._id) === "right avatar" ||
                    minutesDifference(messages, m, i) > 9) && (
                    <div className="time">
                      {m.sender.firstname},{" "}
                      {moment(m.updatedAt).format("h:mm A")}
                    </div>
                  )}
                  <div
                    className={"message__bubble"}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        toGif(
                          `${m.content} ${
                            i === messages.length - 1
                              ? " lastElement"
                              : i === 14
                              ? " scrollRef"
                              : " noRef"
                          }`
                        )
                      ),
                    }}
                  ></div>
                </div>
                {messages[messages.length - 1]._id === m._id && (
                  <div className="readBy">
                    {m.readBy.map((rb: any, index: number) => (
                      <AvatarReadBy
                        key={`${m._id}-${rb._id}`}
                        readBy={rb}
                        myId={user._id}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </ScrollableContainer>
  );
};

export default Scrollable;
const ScrollableContainer = styled.div`
  padding-left: 1.3em;
  padding-top: 1em;
  padding-bottom: 5em;

  .date__container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 300px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    .date {
      padding: 0.5em 1em;
      color: var(--gray400);
      font-size: 13px;
      font-weight: 400;
    }
    span {
      flex: 1;
      height: 0px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      max-width: 200px;
    }
  }

  .message {
    max-width: 800px;
    display: flex;
    justify-content: left;
    font-size: 13px;

    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
  .message__right {
    max-width: 700px;
    padding-left: 0.5em;
    padding-right: 2em;
  }

  .readBy {
    display: flex;
    margin-top: 3px;
    gap: 3px;
    position: absolute;
    right: 20px;
    bottom: -18px;
  }
  .time {
    color: var(--color400);
    font-size: 12px;
    margin-bottom: 0.3em;
    margin-top: 0.7em;
  }
  .message__bubble {
    width: fit-content;
    max-width: 600px;
    background-color: var(--color100);
    padding: 0.7em;
    border-radius: 0em 0.7em 0.7em 0.7em;
    margin-bottom: 0.1em;
    color: var(--color600);
    margin-top: 1px;

    span,
    p {
      font-size: 14px !important;
    }
  }

  .right {
    justify-content: right;
    .message__bubble {
      background-color: var(--sky100);
      border-radius: 0.7em 0.7em 0em.7em;
      color: var(--color600);
      float: right;
    }
    .time {
      text-align: right;
    }
  }

  .avatar__placer {
    width: 40px;
  }
`;

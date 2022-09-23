import "moment-precise-range-plugin";
import { minutesDifference } from "./customFunctions";
import { SelectedChatUser, User } from "./types";

export const getSenderName = (loggedUser: User, users: SelectedChatUser[]) => {
    const name0 = users[0].firstname + ' ' + users[0].lastname;
    const name1 = users[1].firstname + ' ' + users[1].lastname;
  return users[0].firstname === loggedUser.firstname ? name1 : name0;
};

export const isOffline = (loggedUser: User, users: SelectedChatUser[], onlineUsers: any) => {
  const peerUser = users[0].firstname === loggedUser.firstname ? users[1] : users[0];
  const array = onlineUsers.filter((ou: any) => ou._id === peerUser._id);
  return array.length === 0 ? true : false;
}

export const getSenderStatus = (loggedUser: User, users: SelectedChatUser[]) => {
  return users[0].firstname === loggedUser.firstname ? users[1].status : users[0].status;
};

export const getUserPartner = (loggedUser: User, users: SelectedChatUser[]) => {
  return users[0].firstname === loggedUser.firstname ? users[1] : users[0];
};

export const isLastMessage = (messages: any, i: number, userId: string) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages: any, m: any, i: number) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const isSameDay = (messagesDay: any[], d: any, i: number) => {
  return i > 0 && messagesDay[i - 1] === d;
};

export const isSameSender = (messages:any, m:any, i:number, userId:string) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const p6 = (messages:any, m:any, i:number, userId:string) => {
  let returnValue = ''
  
  if (m.sender._id !== userId) {
    i > 0 && m.sender._id === messages[i - 1].sender._id ? returnValue = `left` : returnValue = `left avatar`;
    
    if (minutesDifference(messages, m, i) > 9) returnValue = `left avatar`
  } else {
    
    i > 0 && m.sender._id === messages[i - 1].sender._id ? returnValue = `right`: returnValue = `right avatar`;
  }

  return returnValue
}








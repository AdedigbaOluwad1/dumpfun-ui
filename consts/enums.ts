export enum ChatEventEnum {
  SEND_MESSAGE = "sendMessage",
  GET_MESSAGES = "getMessages",
  JOIN_ROOM = "joinRoom",
  USER_JOINED = "userJoined",
  LEAVE_ROOM = "leaveRoom",
  USER_LEFT = "userLeft",
  GET_ROOM_USERS = "getRoomUsers",
  NEW_MESSAGE = "newMessage",
  WATCH_ROOM = "watchRoom",
}

export enum MessageTypeEnum {
  TEXT = 0,
  USER_JOINED = 1,
  USER_LEFT = 2,
  SYSTEM = 3,
}

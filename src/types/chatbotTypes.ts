


export interface MessageType {
  id: string;
  data: dataType[]|string;        // message text(s)
  isUser: boolean;       // whether the message is from the user
  timestamp: Date;       // when the message was sent
};


export interface dataType {
  _id: any; // or use specific type if you know the ObjectId structure
  name: string;
  url: string;
  content: string;
}
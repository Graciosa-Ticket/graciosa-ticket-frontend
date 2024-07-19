import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { ChatCardContainer, ChatContainer } from "./styles";
import { useAuth } from "../../../../hooks/auth";
import { UserModel } from "../../../../models/user";
import ButtonComponent from "../../../../components/buttons";
import Avatar from "../../../../components/Avatar";
import timeConverter from "../../../../utils/timeConverter";

export interface Message {
  user: UserModel;
  message: string;
  createdAt: Date;
}

const fakeUser = {
  name: "airto sena super",
  profile_picture:
    "https://gcc-tickets-bucket.s3.amazonaws.com/profile-picture/2/1721327967538_1374800653-profile_picture.jpg",
  id: 5,
};

const ChatComponent = () => {
  const [chatConversation, setChatConversation] = useState<Message[]>([]);
  const [textAreaValue, setTextAreaValue] = useState<string>();
  const commentRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const handleChatSubmit = () => {
    const message = spanRef.current?.innerText;
    if (!message) return;
    setChatConversation((prevConversations) => [
      ...prevConversations,
      {
        createdAt: new Date(),
        message: message as string,
        user
      },
    ]);
    (spanRef.current as HTMLDivElement).innerText = "";
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!event.shiftKey && event.code === "Enter") {
      event.preventDefault();
      handleChatSubmit();
    }
  };

  useEffect(() => {
    const handleKeydown = (event: globalThis.KeyboardEvent) => {
      const value = (event.target as HTMLDivElement)?.innerText;

      setTextAreaValue(value);
    };

    spanRef.current?.addEventListener("keyup", handleKeydown);

    return () => {
      spanRef.current?.removeEventListener("keyup", handleKeydown);
    };
  }, [spanRef]);

  return (
    <ChatContainer>
      <div className="chat-container" ref={commentRef}>
        {chatConversation.length > 0 && (
          <ul className="chat-list">
            {chatConversation.map((e, i) => (
              <li key={i}>
                <ConnectionsMessageCard data={e} />
              </li>
            ))}
          </ul> 
        )}
      </div>

      <div className="chat-input-container">
        <div
          className={textAreaValue ? "textarea" : "textarea empty-textarea"}
          role="textbox"
          ref={spanRef}
          contentEditable
          data-placeholder="Escreva um comentário..."
          onKeyDown={onKeyDown}
        />
        <div className="input-button-container">
          <ButtonComponent
            onClick={handleChatSubmit}
            buttonStyles="primary"
            buttonStylesType="fill"
            title="Enviar"
          >
            Enviar
          </ButtonComponent>
        </div>
      </div>
    </ChatContainer>
  );
};

interface chatCardProps {
  data: Message;
}

const ConnectionsMessageCard = ({ data }: chatCardProps) => {
  const { user } = useAuth();

  const isCurrentUser = user.id === data?.user?.id;

  return (
    <ChatCardContainer $self={isCurrentUser}>    

      <section className="header">
        <h1>á  {timeConverter(data.createdAt)} </h1>
          <span>{user.name.slice(0,10)}.</span>        
            <div className="user-side">
              <Avatar
                src={user.profile_picture}
                style={{ width: 32, height: 32 }}
              />
            </div>
      </section>

      <section className="message-container">
        <p>{data.message}</p>
      </section>

      
    </ChatCardContainer>
  );
};

export default ChatComponent;

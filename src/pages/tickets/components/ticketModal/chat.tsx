import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { ChatCardContainer, ChatContainer } from "./styles";
import { useAuth } from "../../../../hooks/auth";
import { UserModel } from "../../../../models/user";
import ButtonComponent from "../../../../components/buttons";
import { formatDate } from "date-fns";

export interface Message {
  user: UserModel;
  message: string;
  createdAt: Date;
  type: "Text" | "Notification" | "Image" | "Video";
  module?: "budget" | "attendance";
  moduleID?: string;
}

const ChatComponent = () => {
  const [chatConversation, setChatConversation] = useState<Message[]>([]);
  const [textAreaValue, setTextAreaValue] = useState<string>();
  const commentRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLDivElement>(null);

  const handleChatSubmit = () => {
    const message = spanRef.current?.innerText;

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
          <ButtonComponent onClick={handleChatSubmit}>Enviar</ButtonComponent>
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
    <ChatCardContainer $self={isCurrentUser} $message_type={data.type}>
      {data.message}

      <span className="date-span">{formatDate(data.createdAt, "HH:mm")}</span>
    </ChatCardContainer>
  );
};

export default ChatComponent;

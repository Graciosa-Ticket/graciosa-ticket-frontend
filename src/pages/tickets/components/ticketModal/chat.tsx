import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { ChatCardContainer, ChatContainer } from "./styles";
import { useAuth } from "../../../../hooks/auth";
import ButtonComponent from "../../../../components/buttons";
import Avatar from "../../../../components/Avatar";
import { useFetch } from "../../../../services/hooks/getQuery";
import { chatComment, TicketModel } from "../../../../models/ticket";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import timeConverter from "../../../../utils/timeConverter";

interface ChatComponentProps {
  ticket_data: TicketModel;
}

const ChatComponent = ({ ticket_data }: ChatComponentProps) => {
  const [chatConversation, setChatConversation] = useState<chatComment[]>([]);
  const [textAreaValue, setTextAreaValue] = useState<string>();
  const commentRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const { refetch } = useFetch<TicketModel>(
    `/ticket/${ticket_data?.code}`,
    [ticket_data?.status, ticket_data?.code, "chat"],
    {
      onSuccess: (data) => {
        if (data.comments?.length) {
          setChatConversation(data.comments);
        }
      },
    }
  );

  const { mutate: createComment, isLoading: isLoadingUpdate } =
    useMutationQuery("/comment");

  const handleChatSubmit = () => {
    const message = spanRef.current?.innerText;
    if (!message) return;
    createComment(
      {
        comment: message,
        userCode: user.code,
        ticketCode: ticket_data.code,
      },
      {
        onSuccess: () => {
          (spanRef.current as HTMLDivElement).innerText = "";
          refetch();
        },
      }
    );
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
            isLoading={isLoadingUpdate}
          >
            Enviar
          </ButtonComponent>
        </div>
      </div>
    </ChatContainer>
  );
};

interface chatCardProps {
  data: chatComment;
}

const ConnectionsMessageCard = ({ data }: chatCardProps) => {
  const { user } = useAuth();

  const isCurrentUser = user.code === data?.user?.code;

  return (
    <ChatCardContainer $self={isCurrentUser}>
      <section className="header">
        <h1>
          {" "}
          {data?.created_at
            ? timeConverter(new Date(data.created_at))
            : "Data inválida"}{" "}
        </h1>
        <span>{data.user.name.slice(0, 10)}.</span>
        <div className="user-side">
          <Avatar
            src={`profile-picture/${user.code}/minSize_${user?.profile_picture}`}
            style={{ width: 32, height: 32 }}
          />
        </div>
      </section>

      <section className="message-container">
        <p>{data.comment}</p>
      </section>
    </ChatCardContainer>
  );
};

export default ChatComponent;

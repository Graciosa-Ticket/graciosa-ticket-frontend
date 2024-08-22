import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { ChatCardContainer, ChatContainer } from "./styles";
import { useAuth } from "../../../../hooks/auth";
import ButtonComponent from "../../../../components/buttons";
import Avatar from "../../../../components/Avatar";
import { useFetch } from "../../../../services/hooks/getQuery";
import { chatComment, TicketModel } from "../../../../models/ticket";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import timeConverter from "../../../../utils/timeConverter";
import ChatAddFilesButton from "./components/chatAddFileButton";
import ChatFileViewer from "./components/chatFileViewer";

interface ChatComponentProps {
  ticket_data: TicketModel;
  ticketDone?: boolean;
  isNewStyle?: boolean;
}

const ChatComponent = ({ ticket_data, ticketDone }: ChatComponentProps) => {
  const [chatConversation, setChatConversation] = useState<chatComment[]>([]);
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const commentRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<File[]>([]);

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
    if (ticketDone) return;

    const message = spanRef.current?.innerText || "";

    if (!message && files.length === 0) return; // Não envia se não houver texto e sem arquivos

    // Cria um FormData e adiciona o comentário
    const formData = new FormData();
    formData.append("comment", message); // Adiciona a mensagem
    formData.append("userCode", user.code as any); // Adiciona o código do usuário
    formData.append("ticketCode", ticket_data.code as any); // Adiciona o código do ticket

    // Adiciona arquivos ao FormData
    files.forEach((file) => {
      formData.append("attachments", file); // Usa o nome de campo "attachments" para os arquivos
    });

    // Log para verificar o conteúdo do FormData
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    createComment(formData, {
      onSuccess: () => {
        if (spanRef.current) {
          spanRef.current.innerText = ""; // Limpa o texto do span se o ref não for nulo
        }
        setFiles([]); // Limpa a lista de arquivos após o envio
        refetch();
      },
      onError: (error) => {
        console.error("Error creating comment:", error);
      },
    });
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (ticketDone) {
      event.preventDefault();
      return;
    }

    const textLength = spanRef.current?.innerText.length || 0;
    const maxChars = 255;

    if (
      textLength >= maxChars &&
      event.key !== "Backspace" &&
      event.key !== "Delete"
    ) {
      event.preventDefault();
    }

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

  // Verifica se o botão deve ser habilitado
  const isButtonEnabled = textAreaValue.trim().length > 0 || files.length > 0;

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
        <ChatAddFilesButton setFiles={setFiles} files={files} />
        {files.length > 0 ? (
          <>
            <ChatFileViewer files={files} onRemoveFile={handleRemoveFile} />
          </>
        ) : (
          <div
            className={textAreaValue ? "textarea" : "textarea empty-textarea"}
            role="textbox"
            ref={spanRef}
            contentEditable={!ticketDone} // Desabilita edição se concluído
            data-placeholder={ticketDone ? "" : "Escreva um comentário..."}
            onKeyDown={onKeyDown}
            style={{ userSelect: ticketDone ? "none" : "text" }} // Evita seleção se concluído
          />
        )}
        <div className="input-button-container">
          <ButtonComponent
            onClick={handleChatSubmit}
            buttonStyles="primary"
            buttonStylesType="fill"
            title="Enviar"
            isLoading={isLoadingUpdate}
            disabled={ticketDone || !isButtonEnabled} // Desabilita botão se concluído ou se não houver texto/arquivos
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
  const isDone = data.is_done;

  return (
    <ChatCardContainer $self={isCurrentUser} $isDone={isDone}>
      <section className="header">
        <h1>
          {data?.created_at
            ? timeConverter(new Date(data.created_at))
            : "Data inválida"}{" "}
        </h1>
        <span>{data.user.name.slice(0, 10)}.</span>
        <div className="user-side">
          <Avatar
            src={`profile-picture/${data?.user.code}/minSize_${data?.user.profile_picture}`}
            style={{ width: 32, height: 32 }}
          />
        </div>
      </section>

      <section className="message-container">
        {isDone && <p className="conclusion-message">Conclusão do chamado:</p>}
        <p>{data.comment}</p>
      </section>
    </ChatCardContainer>
  );
};

export default ChatComponent;

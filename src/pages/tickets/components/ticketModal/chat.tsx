import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
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
import {
  IdentifyFiles,
  getCleanFileName,
  handleDownloadFile,
} from "../../../../utils/fileIdentify";
import ImageViewer from "./components/imageViewer";
import { FaRegFilePdf } from "react-icons/fa";
import { fileIcons } from "./components/ticketFileViewer";

interface ChatComponentProps {
  ticket_data: TicketModel;
  ticketDone?: boolean;
  isNewStyle?: boolean;
}

interface commentDataType {
  comment: string;
  userCode: string;
  ticketCode: string;
}

const ChatComponent = ({ ticket_data, ticketDone }: ChatComponentProps) => {
  const [chatConversation, setChatConversation] = useState<chatComment[]>([]);
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const commentRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const prevMessageCountRef = useRef<number>(0);

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

    if (!message && files.length === 0) return; // Não envia se não houver texto e arquivos

    // Cria um FormData e adiciona os arquivos
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    // Adiciona dados do comentário ao FormData
    const commentData: commentDataType = {
      comment: message,
      userCode: user.code as string,
      ticketCode: ticket_data.code as string,
    };

    // Adiciona os dados ao FormData, exceto o comment se estiver vazio
    Object.keys(commentData).forEach((key) => {
      if (key === "comment" && !message) {
        // Não adiciona o campo 'comment' se message for vazio
        return;
      }
      formData.append(key, commentData[key as keyof commentDataType]);
    });

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

  useEffect(() => {
    const currentMessageCount = chatConversation.length;
    if (currentMessageCount > prevMessageCountRef.current) {
      if (commentRef.current) {
        const { scrollHeight, clientHeight } = commentRef.current;
        commentRef.current.scrollTop = scrollHeight - clientHeight;
      }
    }
    prevMessageCountRef.current = currentMessageCount;
  }, [chatConversation]);

  const shouldShowChatInputContainer = !ticketDone;

  return (
    <ChatContainer>
      <div className="chat-container" ref={commentRef}>
        {chatConversation.length > 0 && (
          <ul className="chat-list">
            {chatConversation.map((e, i) => (
              <li
                key={i}
                className={
                  user.code === e?.user?.code ? "is-current-user-list-item" : ""
                }
              >
                <ConnectionsMessageCard
                  data={e}
                  isCurrentUser={user.code === e?.user?.code}
                  isDone={e?.is_done || false}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {shouldShowChatInputContainer && (
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
              buttonSize="small"
              title="Enviar"
              isLoading={isLoadingUpdate}
              disabled={ticketDone} // Desabilita botão se concluído ou se não houver texto/arquivos
            >
              Enviar
            </ButtonComponent>
          </div>
        </div>
      )}
    </ChatContainer>
  );
};

interface chatCardProps {
  data: chatComment;
  isCurrentUser: boolean;
  isDone: boolean;
}
const ConnectionsMessageCard = ({
  data,
  isCurrentUser,
  isDone,
}: chatCardProps) => {
  const commentFiles = useMemo(() => {
    if (data?.attachmentUrl.length) {
      const files = IdentifyFiles(data?.attachmentUrl);

      return (
        <ul className="file-list">
          {files.map((e, i) => {
            const cleanFileName = getCleanFileName(e.file);
            if (e.type === "image") {
              return (
                <li key={i}>
                  <ImageViewer imageUrl={e.file} style={{ width: "100%" }} />
                </li>
              );
            }

            if (e.type === "pdf") {
              return (
                <li key={i} className="not-image-container">
                  <ButtonComponent
                    buttonStyles="text"
                    className="download-button"
                    onClick={() => handleDownloadFile(e.file)}
                    title="Clique para baixar o PDF"
                  >
                    <FaRegFilePdf />
                    <span>{cleanFileName}</span>
                  </ButtonComponent>
                </li>
              );
            }

            // Renderiza o ícone e o nome do arquivo para outros tipos (doc, excel)
            return (
              <li key={i} className="not-image-container">
                <ButtonComponent
                  buttonStyles="text"
                  onClick={() => handleDownloadFile(e.file)}
                  title="Clique para baixar"
                  className="download-button"
                >
                  {fileIcons[e.type]}
                  <span>{cleanFileName}</span>
                </ButtonComponent>
              </li>
            );
          })}
        </ul>
      );
    }

    return undefined;
  }, [data?.attachmentUrl]);

  return (
    <>
      {isDone && <p className="finalization-message">Finalização do chamado</p>}
      <ChatCardContainer $self={isCurrentUser} $isDone={isDone}>
        <section className="header">
          <h6>
            {data?.created_at
              ? timeConverter(new Date(data.created_at))
              : "Data inválida"}
          </h6>
          <span>{data.user.name.slice(0, 10)}.</span>
          <div className="user-side">
            <Avatar
              src={`profile-picture/${data?.user.code}/minSize_${data?.user.profile_picture}`}
              style={{ width: 22, height: 22 }}
            />
          </div>
        </section>

        <section className="message-container">
          {commentFiles ? commentFiles : <p>{data.comment}</p>}
        </section>
      </ChatCardContainer>
    </>
  );
};

export default ChatComponent;

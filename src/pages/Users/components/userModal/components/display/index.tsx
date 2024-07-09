
import { DisplayComponent } from "./styles";

interface DisplayProps {
    label: string;
    content: string;
    suffix?: string;
  }
  
  export default function Display({ label, content,suffix}: DisplayProps) {

  
    return (
      <DisplayComponent>
        <div className="label">{label}</div>
        {label === "Código" && <div className="number">{content}</div>}
        {label === "Nome" && <div className="text">{content.slice(0, 10) + "."}</div>}
        {label === "Nascimento" && <><div className="number">{content.slice(0, 10)}</div><div className="suffix">{(suffix)} anos</div></>}
        {label === "Endereço" && <div className="text">{content}</div>}
        {label === "Cep" && <div className="number">{content}</div>}
        {label === "Telefone/Ramal" && <div className="number">{content}</div>}
      </DisplayComponent>
    );
  }
 
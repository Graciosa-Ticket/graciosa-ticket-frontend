
import { DisplayComponent } from "./styles";

interface DisplayProps {
    label: string;
    content: string | number | Date | undefined;
  }
  
  export default function Display({ label, content }: DisplayProps) {
    let displayContent: string | JSX.Element = '';
  
    function calculateAge(birthDate: Date): number {
        const today = new Date();
        const diff = today.getTime() - birthDate.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      }
    
    if (typeof content === "string" || typeof content === "number") {
      displayContent = content.toString();
    } else if (content instanceof Date) {
      displayContent = content.toLocaleDateString(); 
    } else {
      displayContent = "Não disponível";
    }
  
    return (
      <DisplayComponent>
        <div className="label">{label}</div>
        <div className="content">{displayContent}</div>
        {label === "Nascimento" && content instanceof Date && (
          <div className="suffix">{calculateAge(content)} anos</div>
        )}
      </DisplayComponent>
    );
  }
 
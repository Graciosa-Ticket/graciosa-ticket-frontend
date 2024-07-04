
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
        <div className="content">{content}</div>
        {label === "Nascimento" && 
          <div className="suffix">{(suffix)} anos</div>
  }
      </DisplayComponent>
    );
  }
 
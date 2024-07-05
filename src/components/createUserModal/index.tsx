import { UserModel } from "../../models/user";
import { useForm } from "react-hook-form";
import { UserComponent } from "./styles";
import HenryCalvo from "../../assets/henrycalvo.svg"; 
import Input from "../form/input";
import ButtonComponent from "../buttons";
import { AiOutlineLeft } from "react-icons/ai";
import { ModalHeader } from "../modal";




interface userModalProps {
  onClose:()=>void;
}

export default function CreateUserModal({onClose}:userModalProps){

const { handleSubmit, register } = useForm<UserModel>()


const onSubmit = handleSubmit((data) => {
console.log(data)
  window.alert(data)
})


  return (
    <><ModalHeader>
          <div className="left-side">
              <ButtonComponent buttonStyles="text" onClick={onClose}><AiOutlineLeft fontSize={"20px"} /></ButtonComponent>
              <h3>Cadastro</h3>
          </div>
      </ModalHeader>
      <UserComponent>
              <div className="img-sector">
                  <img src={HenryCalvo} alt="" className="user-avatar" />
              </div>
              <h1>informações Pessoais</h1>
              <div>
                  <form className="form" onSubmit={onSubmit}>
                      <Input label="Código" placeholder="Digite o Código" register={{ ...register("code") }} />
                      <Input label="Nome" placeholder="Digite o Nome" register={{ ...register("name") }} />
                      <Input label="Nascimento" placeholder="Digite o Nascimento" register={{ ...register("birthdate") }} />
                      <Input label="Endereço" placeholder="Digite o Endereço" register={{ ...register("address") }} />
                      <Input label="Cep" placeholder="Digite o Cep" register={{ ...register("postalCode") }} />
                      <Input label="Telefone/Ramal" placeholder="Digite o Telefone" register={{ ...register("phone") }} />
                      <Input label="Setor" placeholder="Digite o Setor" register={{ ...register("type") }} />
                  </form>
                  <div className="button-div">
                  <ButtonComponent type="submit" >Enviar</ButtonComponent>
                  </div>
                        
              </div>
          </UserComponent></>
  )}
  
import { useForm } from "react-hook-form";
import { UserComponent } from "./styles";
import HenryCalvo from "../../../../assets/henrycalvo.svg";
import { AiOutlineEdit, AiOutlineLeft } from "react-icons/ai";
import { ModalHeader } from "../../../../components/modal";
import ButtonComponent from "../../../../components/buttons";
import Input from "../../../../components/form/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select, SelectItem } from "../../../../components/form/select";
import { updadeUserValidation } from "./validation/updateUserValidation";
import phoneMask from "../../../../utils/phoneMask";
import { UserModel } from "../../../../models/user";
import { format } from "date-fns";


interface updateUserModalProps {
  onClose:()=>void;  
  data: UserModel;
}

export default function UpdateUserModal({data,onClose}:updateUserModalProps){
  const { handleSubmit, register, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(updadeUserValidation) as any, 
    defaultValues: {...data, birth_date:data.birth_date ? format(data.birth_date, "yyyy-MM-dd"): ""}
  });


  const onSubmit = handleSubmit((data) => {

    const userData = {
      name: data.name,
      email: data.email,
      birth_date: data.birth_date,
      address: data.address,
      cep: data.cep,
      phone_number: phoneMask(data.phone_number),
      role: data.role,
      created_at: new Date(),
      status: true,
    };


    
    console.log(userData); 
  });

  return (
    <><ModalHeader>
          <div className="left-side">
              <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}><AiOutlineLeft fontSize={"20px"} /></ButtonComponent>
              <h3>Editar Cadastro</h3>
          </div>
      </ModalHeader>
      <UserComponent>
              <div className="img-sector">
                  <img src={HenryCalvo} alt="" className="user-avatar" />
              </div>
              <h1>Informe Dados Pessoais Atualizados</h1>
              <div>
                  <form className="form" onSubmit={onSubmit}>
                    <Input 
                      label="Nome" 
                      error={errors.name?.message} 
                      register={{ ...register("name") }} 
                      />
                    <Input 
                      label="Email" 
                      error={errors.email?.message} 
                      register={{ ...register("email") }}
                      />
                    <Input 
                      type="date" 
                      label="Nascimento" 
                      error={errors.birth_date?.message}  
                      register={{ ...register("birth_date") }}                      
                      />
                    <Input 
                      label="Endereço"
                      error={errors.address?.message} 
                      register={{ ...register("address") }} 
                      />
                    <Input 
                      label="Cep" 
                      error={errors.cep?.message} 
                      register={{ ...register("cep") }} 
                      />
                    <Input 
                      label="Telefone" 
                      error={errors.phone_number?.message} 
                      register={{ ...register("phone_number") }}  
                      />
                    <Select 
                      defaultValue={data.role || "Collaborator"} 
                      triggerStyle={{}} 
                      onValueChange={(value:UserModel["role"]) => setValue("role", value)}>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                      <SelectItem value="Collaborator">Collaborator</SelectItem> 
                    </Select>    

                  </form>                        
              </div>
              <div className="button-div">
                   <ButtonComponent buttonStyles="edit" className="btn" title="Confirmar edição" onClick={onSubmit} >
                      <AiOutlineEdit /> Confirmar edição
                    </ButtonComponent>
                  </div>
          </UserComponent></>
  )}
  
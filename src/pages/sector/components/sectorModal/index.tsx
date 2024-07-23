import { FaAngleLeft } from "react-icons/fa";
import ButtonComponent from "../../../../components/buttons";
import { ModalTitle } from "../../../../components/centerModal";
import { ModalHeader } from "../../../../components/modal";
import { SectorCardModel } from "../../../../models/sector";
import { modalActions } from "../../../../shared/global.interface";
import { SectorModalComponent } from "./styles";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSwap } from "react-icons/ai";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import { toast } from "sonner";
import ActionsModalComponent from "../../../../components/actionModal";
import SelectUsers from "../../../../components/form/selectUsers";
import { UserModel } from "../../../../models/user";
import SectorTicketsDisplay from "../sectorTicketsDisplay";

export default function SectorModal({
  data,
  onClose,
  onUpdate,
}: modalActions<SectorCardModel>) {
  const { mutate: deleteSector, isLoading: isLoadingDelete } = useMutationQuery(
    `/sectors/${data?.code}`,
    "delete"
  );

  const handleDeleteSector = () => {
    deleteSector(
      {},
      {
        onSuccess: () => {
          console.log(data?.code);
          toast.success("Setor deletado com sucesso!");
          onUpdate?.();
        },
      }
    );
  };

  const { mutate: updateSectorUser, isLoading: isLoadingupdate } =
    useMutationQuery(`/sectors`, "put");

  const handleChangeUser = (user: UserModel) => {
    updateSectorUser(
      {
        responsible_code: user.code,
        code: data?.code,
      },
      {
        onSuccess: () => {
          toast.success("Responsavel Alterado!");
          onUpdate?.();
        },
      }
    );
  };

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}>
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <ModalTitle>{data?.name}</ModalTitle>
        </div>
      </ModalHeader>
      <SectorModalComponent>
        <SelectUsers
          label="Responsavel"
          title="Adicionar Responsável"
          showRemoveButton={false}
          placeholderIcon={<AiOutlineSwap />}
          defaultValue={data?.user as UserModel}
          onChange={handleChangeUser}
        />
        <h1>chamados do setor</h1>
        <SectorTicketsDisplay />
        <div className="footer">
          <div />
          <ActionsModalComponent
            message="Confirme para deletar este Setor. Esta ação não pode ser desfeita."
            actionButton={
              <ButtonComponent
                buttonStyles="delete"
                onClick={handleDeleteSector}
                isLoading={isLoadingDelete}
              >
                Confirmar Deletar Setor
              </ButtonComponent>
            }
            buttonProps={{
              buttonStyles: "delete",
              buttonStylesType: "outline",
            }}
          >
            <AiOutlineDelete /> Deletar
          </ActionsModalComponent>

          <ButtonComponent buttonStylesType="outline">
            <AiOutlineEdit />
            Editar
          </ButtonComponent>
        </div>
      </SectorModalComponent>
    </>
  );
}

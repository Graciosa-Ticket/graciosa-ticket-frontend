import { FaRegFaceSmile, FaXmark } from "react-icons/fa6";
import {
  SelectUsersContainer,
  SelectUsersContainerPlaceholder,
} from "./styles";
import { PopOverRoot } from "../../popOver";
import SearchUsers from "./searchUsers";
import { UserModel } from "../../../models/user";
import Avatar from "../../Avatar";
import ButtonComponent from "../../buttons";
import { useState } from "react";

interface selectUserProps {
  label?: string;
  title: string;
  onChange(data: UserModel | undefined): void;
  defaultValue?: UserModel;
  placeholderIcon?: any;
  showRemoveButton?: boolean;
  filterCollaborators?: boolean;
  showPicturePlaceholder?: boolean;
}

const SelectUsers = ({
  label,
  title,
  onChange,
  defaultValue,
  placeholderIcon,
  showRemoveButton = true,
  filterCollaborators = true,
  showPicturePlaceholder = true,
}: selectUserProps) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | undefined>(
    defaultValue
  );

  const handleSelectUser = (data: UserModel) => {
    setSelectedUser(data);
    onChange(data);
    setOpen(false);
  };

  const handleClearSelect = () => {
    setSelectedUser(undefined);
    onChange(undefined);
    setOpen(false);
  };

  return (
    <>
      <SelectUsersContainer title={title}>
        {label && <label>{label}</label>}

        <PopOverRoot
          open={open}
          onOpenChange={() => setOpen(!open)}
          contentProps={{
            style: {
              animation: "unset",
              marginBottom: "2em",
            },
          }}
          trigger={
            <div className="add-user-button-container">
              <button
                type="button"
                className="add-user-button"
                onClick={() => setOpen(!open)}
              >
                {selectedUser ? (
                  <SelectedUserContainer
                    data={selectedUser}
                    showPicturePlaceholder={showPicturePlaceholder}
                  />
                ) : (
                  <PicturePlaceholder
                    title={title}
                    icon={placeholderIcon}
                    showPicturePlaceholder={showPicturePlaceholder}
                  />
                )}
              </button>

              {selectedUser && showRemoveButton ? (
                <ButtonComponent
                  buttonStyles="text"
                  onClick={handleClearSelect}
                >
                  <FaXmark />
                </ButtonComponent>
              ) : null}
            </div>
          }
        >
          <SearchUsers
            onChange={handleSelectUser}
            selectedUser={selectedUser}
            filterCollaborators={filterCollaborators}
          />
        </PopOverRoot>
      </SelectUsersContainer>
    </>
  );
};

interface picturePlaceholderProps {
  title: string;
  icon: any;
  showPicturePlaceholder: boolean;
}

const PicturePlaceholder = ({
  title,
  icon = <FaRegFaceSmile fontSize={"1.5em"} />,
  showPicturePlaceholder,
}: picturePlaceholderProps) => {
  return (
    <SelectUsersContainerPlaceholder>
      {showPicturePlaceholder && icon}
      <span>{title}</span>
    </SelectUsersContainerPlaceholder>
  );
};

interface selectedUserProps {
  data: UserModel;
  showPicturePlaceholder: boolean;
}

const SelectedUserContainer = ({
  data,
  showPicturePlaceholder,
}: selectedUserProps) => {
  return (
    <SelectUsersContainerPlaceholder>
      {showPicturePlaceholder && (
        <Avatar
          src={`profile-picture/${data?.code}/regularSize_${data?.profile_picture}`}
          className="avatar-img"
        />
      )}
      <span className="selected-user-span">{data.name}</span>
    </SelectUsersContainerPlaceholder>
  );
};

export default SelectUsers;

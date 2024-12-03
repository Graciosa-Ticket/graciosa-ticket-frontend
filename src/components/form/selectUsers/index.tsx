import { FaRegFaceSmile, FaXmark } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5"; // Importando o novo ícone
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
import { StyledIcon } from "../../../pages/home/components/graphs/barGraphGCC/styles";

interface selectUserProps {
  label?: string;
  title: string;
  onChange(data: UserModel | undefined): void;
  defaultValue?: UserModel;
  placeholderIcon?: any;
  showRemoveButton?: boolean;
  filterCollaborators?: boolean;
  showPicturePlaceholder?: boolean;
  showSearchIcon?: boolean;
  error?: string;
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
  showSearchIcon = false,
  error,
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
                  showSearchIcon={showSearchIcon}
                />
              )}
            </button>

            {selectedUser && showRemoveButton ? (
              <ButtonComponent buttonStyles="text" onClick={handleClearSelect}>
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
      <div className="error-container">
        {error && <div className="error-message">{error}</div>}
      </div>
    </SelectUsersContainer>
  );
};

interface picturePlaceholderProps {
  title: string;
  icon: any;
  showPicturePlaceholder: boolean;
  showSearchIcon?: boolean;
}

const PicturePlaceholder = ({
  title,
  icon = <FaRegFaceSmile />,
  showPicturePlaceholder,
  showSearchIcon = false,
}: picturePlaceholderProps) => {
  return (
    <SelectUsersContainerPlaceholder>
      {showPicturePlaceholder &&
        (showSearchIcon ? (
          <StyledIcon size=".7em">
            <IoSearchOutline />
          </StyledIcon>
        ) : (
          <StyledIcon size=".8em">{icon}</StyledIcon>
        ))}
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
  const profilePictureSrc = data.profile_picture
    ? `profile_pictures/${data?.profile_picture}`
    : undefined;

  return (
    <SelectUsersContainerPlaceholder>
      {showPicturePlaceholder && (
        <Avatar src={profilePictureSrc} className="avatar-img" />
      )}
      <span className="selected-user-span">{data.name}</span>
    </SelectUsersContainerPlaceholder>
  );
};

export default SelectUsers;

import { FaRegFaceSmile, FaXmark } from "react-icons/fa6";
import {
  SelectUsersContainer,
  SelectUsersContainerPlaceholder,
} from "./styles";
import { useState } from "react";
import { PopOverRoot } from "../../popOver";
import SearchUsers from "./searchUsers";
import { UserModel } from "../../../models/user";
import Avatar from "../../Avatar";
import ButtonComponent from "../../buttons";

interface selectUserProps {
  label?: string;
  title: string;
  onChange(data: UserModel | undefined): void;
  defaultValue?: UserModel;
}

const SelectUsers = ({
  label,
  title,
  onChange,
  defaultValue,
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
      <SelectUsersContainer>
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
                  <SelectedUserContainer data={selectedUser} />
                ) : (
                  <PicturePlaceholder title={title} />
                )}
              </button>

              {selectedUser ? (
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
          />
        </PopOverRoot>
      </SelectUsersContainer>
    </>
  );
};

interface picturePlaceholderProps {
  title: string;
}

const PicturePlaceholder = ({ title }: picturePlaceholderProps) => {
  return (
    <SelectUsersContainerPlaceholder>
      <FaRegFaceSmile fontSize="2em" />

      <span>{title}</span>
    </SelectUsersContainerPlaceholder>
  );
};

interface selectedUserProps {
  data: UserModel;
}

const SelectedUserContainer = ({ data }: selectedUserProps) => {
  return (
    <SelectUsersContainerPlaceholder>
      <Avatar src={data.profile_picture} />

      <span className="selected-user-span">{data.name}</span>
    </SelectUsersContainerPlaceholder>
  );
};

export default SelectUsers;

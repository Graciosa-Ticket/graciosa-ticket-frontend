import React, { useState } from "react";
import MenuHeader from "../../components/menu";
import UserCard from "../../components/userCard";
import { UserContainer } from "./styles";

export default function Sector() {
  const [selectedBtn, setSelectedBtn] = useState<number | null>(null);

  const handleBtnClick = (btnId: number) => {
    setSelectedBtn(btnId === selectedBtn ? null : btnId);
  };

  return (
    <UserContainer>
      <section>
        <MenuHeader />
        <div className="user-div">
          <h1>Usuários</h1>
          <div className="sector-selector">
            <button
              className={`btn ${selectedBtn === 1 ? "selected" : ""}`}
              onClick={() => handleBtnClick(1)}
            >
              Administradores
            </button>
            <button
              className={`btn ${selectedBtn === 2 ? "selected" : ""}`}
              onClick={() => handleBtnClick(2)}
            >
              Supervisores
            </button>
            <button
              className={`btn ${selectedBtn === 3 ? "selected" : ""}`}
              onClick={() => handleBtnClick(3)}
            >
              Colaboradores
            </button>
          </div>

          <div className="user-cards">
            {selectedBtn === 1 && (
              <>
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
              </>
            )}
            {selectedBtn === 2 && (
              <> 
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
              </>
            )}
            {selectedBtn === 3 && (
              <>
                <UserCard />
                <UserCard />
                <UserCard />
              </>
            )}
          </div>
        </div>
      </section>
    </UserContainer>
  );
}

import { LoginContainer } from "./styles";
import Logo from "../../assets/graciosa-logo 2.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/auth";
import Input from "../../components/form/input";
import ButtonComponent from "../../components/buttons";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import LoadingScreen from "../../components/loading/loadingScreen";
import CenterModal from "../../components/centerModal";
import PasswordChangeRequestModal from "./passwordChangeRequestModal";

interface login {
  code: string;
  password: string;
}

export default function LoginPage() {
  const { signIn, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };
  const { handleSubmit, register } = useForm<login>();

  const onSubmit = handleSubmit(({ code, password }) => {
    signIn(code, password);
  });

  const [openPasswordChangeRequestModal, setPasswordChangeRequestModal] =
    useState(false);

  return (
    <>
      <CenterModal
        open={openPasswordChangeRequestModal}
        onOpenChange={() =>
          setPasswordChangeRequestModal(!PasswordChangeRequestModal)
        }
      >
        <PasswordChangeRequestModal
          onClose={() => setPasswordChangeRequestModal(false)}
        />
      </CenterModal>

      {loading && <LoadingScreen />}

      <LoginContainer>
        <div className="left-container">
          <h1>Gestão de chamados Graciosa Country Club</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim.
          </p>
        </div>

        <section className="right-container">
          <div className="content">
            <div className="logo-container">
              <img src={Logo} />
              <h1>Bem vindo</h1>
              <p>ao sistema de chamados Graciosa Country Club</p>
            </div>

            <form onSubmit={onSubmit}>
              <Input
                inputStyle="secondary"
                placeholder="login"
                label="Login"
                register={{ ...register("code") }}
              />
              <Input
                inputStyle="secondary"
                className="input-placeholder-text"
                placeholder="Senha"
                label="Senha"
                type={showPassword ? "text" : "password"}
                affix={{
                  suffix: (
                    <ButtonComponent onClick={handleShow} buttonStyles="text">
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </ButtonComponent>
                  ),
                }}
                register={{ ...register("password") }}
              />
              <div className="buttons-container">
                <ButtonComponent
                  type="submit"
                  buttonStyles="primary"
                  title="Entrar"
                >
                  Entrar
                </ButtonComponent>
              </div>
            </form>
            <div className="reset-Password-container">
              <span onClick={() => setPasswordChangeRequestModal(true)}>
                Esqueci minha senha
              </span>
            </div>
          </div>
        </section>
      </LoginContainer>
    </>
  );
}

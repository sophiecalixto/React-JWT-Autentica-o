import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBInput } from "mdb-react-ui-kit";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/authAPI";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  // useState
  const [formValue, setFormValue] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = formValue;
  const [showRegister, setShowRegister] = useState(false);
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSucess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSucess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  // Functions

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    if (email && password) {
      await loginUser({ email, password });
    } else {
      toast.error("Por favor preencha todos os campos de entrada!");
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return toast.error("As senhas não coincidem!");
    }

    if (firstName && lastName && email && password) {
      await registerUser({ firstName, lastName, email, password });
    }
  };

  // useEffect
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoginSucess) {
      toast.success("Usuário logado com sucesso!");
      dispatch(
        setUser({ name: loginData.result.name, token: loginData.token })
      );
      navigate("/dashboard");
    }
    if (isRegisterSucess) {
      toast.success("Usuário registrado com sucesso! Faça o Login");
      setShowRegister(false);
    }
  }, [isLoginSucess, isRegisterSucess]);

  useEffect(() => {
    if(isLoginError) {
      toast.error((loginError as any).data.message)
    }
    if(isRegisterError) {
      toast.error((registerError as any).data.message)
    }
  }, [isLoginError, isRegisterError])
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-4 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">
                    {!showRegister ? "Fazer Login" : "Registrar"}
                  </h2>
                  <p className="text-white-50 mb-4">
                    {!showRegister
                      ? "Por favor, insira seu E-mail e Senha"
                      : "Por favor, insira os detalhes do usuário"}
                  </p>
                  {showRegister && (
                    <>
                      <div className="form-outline form-white mb-4">
                        <MDBInput
                          type="text"
                          name="firstName"
                          value={firstName}
                          onChange={handleChange}
                          label="Nome..."
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline form-white mb-4">
                        <MDBInput
                          type="text"
                          name="lastName"
                          value={lastName}
                          onChange={handleChange}
                          label="Sobrenome..."
                          className="form-control form-control-lg"
                        />
                      </div>
                    </>
                  )}
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      label="Email..."
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      label="Senha..."
                      className="form-control form-control-lg"
                    />
                  </div>
                  {showRegister && (
                    <div className="form-outline form-white mb-4">
                      <MDBInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        label="Confirmar Senha..."
                        className="form-control form-control-lg"
                      />
                    </div>
                  )}
                  {!showRegister ? (
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="button"
                      onClick={() => handleLogin()}
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="button"
                      onClick={() => handleRegister()}
                    >
                      Registrar
                    </button>
                  )}
                </div>
                <div>
                  <h5 className="mb-0">
                    {!showRegister ? (
                      <>
                        Não tem uma conta ?
                        <p
                          className="text-white-50 fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowRegister(true)}
                        >
                          Criar conta
                        </p>
                      </>
                    ) : (
                      <>
                        Já possui uma conta?
                        <p
                          className="text-white-50 fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowRegister(false)}
                        >
                          Fazer login
                        </p>
                      </>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;

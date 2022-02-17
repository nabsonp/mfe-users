import { useState } from "react";
import { useNavigate } from "react-router";
import apiMethods from "../../services/api";

const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();

  const createUser = async (nome, email, senha, tipoUsuarioId) => {
    setIsLoading(true);
    apiMethods
      .createUsuario({
        nome,
        email,
        senha,
        tipoUsuarioId,
      })
      .then((resp) => {
        setData(resp);
        setError(undefined);
        setIsLoading(false);
        if (tipoUsuarioId === 1) {
          navigate(`/users/login`);
        } else {
          navigate(`/`);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        console.error("Erro ao criar usuário.", err);
      });
  };

  return { createUser, data, isLoading, error };
};

export default useCreateUser;

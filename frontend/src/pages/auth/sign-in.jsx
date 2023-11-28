import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import axios from "axios";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function SignIn({ setRol }) {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  //alerta para usuario desactivado
  const [visibleUser, setVisibleUser] = useState(false);
  //alerta para usuario no encontrado
  const [visibleUserExists, setVisibleUserExists] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const userNotFound = false;

  const handleVisible = (visibility) => {
    setVisible(visibility);
  };

  const handleVisibleUser = (visibility) => {
    setVisibleUser(visibility);
  };
  const handleVisibleUserExists = (visibility) => {
    setVisibleUserExists(visibility);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard/home");
    }
  }, []);

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Formik
          initialValues={{
            //Los valores iniciales del input
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            console.log(values); //Por si quieren ver los valores que se estan enviando

            try {
              const response = await axios.post(
                //Declarar la variable VITE_BACKEND_URL en el .env del front de acuerdo a donde se ejecute la API
                `${import.meta.env.VITE_BACKEND_URL}/login`,
                values
              );

              if (response.data.action === "success") {
                signIn({
                  token: response.data.token, //el token que devuelve el api
                  expiresIn: 3600, //tiempo de expiracion del token
                  tokenType: "Bearer", //tipo de token
                  authState: { user: values.email }, //estado de autenticacion
                });

                setRol(response.data.rol.toString());

                navigate("/dashboard/home");
              } else {
                console.log("Valor responde en el form: ", response.data.action);
                // Modificar la condición para manejar "disabled"
                if (response.data.action === "disabled") {
                  console.log("Entre a disabled")
                  handleVisible(true, "Usuario desactivado");
                } else {
                  if (response.data.action === "errorNoExiste") {
                    console.log("Entre a errorNoexiste")
                    handleVisibleUserExists(true, "Usuario no existente");
                  } else {
                    console.log("Me fui al else")
                    handleVisibleUser(true, "Usuario o contraseña incorrectos");
                  }

                }
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({
            handleChange, //handleChange se usa para que se vaya guardando lo que se escribe en el input
            handleSubmit, //handleSubmit se usa para ejecutar la funcion onSubmit de arriba}
          }) => (
            <Form>
              <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
                <CardHeader
                  variant="gradient"
                  color="blue"
                  className="mb-4 grid h-28 place-items-center"
                >
                  <Typography variant="h3" color="white">
                    ¡Bienvenido de Nuevo!
                  </Typography>
                </CardHeader>
                {visible && (
                  <CardHeader className="top-5">
                    <Alert
                      color="orange"
                      dismissible={{
                        onClose: () => {
                          handleVisible(false);
                        },
                      }}
                    >
                      Usuario o contraseña incorrectos
                    </Alert>

                  </CardHeader>
                )}
                {visibleUser && (
                  <CardHeader className="top-5">
                    <Alert
                      color="red"
                      dismissible={{
                        onClose: () => {
                          handleVisibleUser(false);
                        },
                      }}
                    >
                      Usuario desactivado
                    </Alert>
                  </CardHeader>
                )}
                {visibleUserExists && (
                  <CardHeader className="top-5">
                    <Alert
                      color="red"
                      dismissible={{
                        onClose: () => {
                          handleVisibleUser(false);
                        },
                      }}
                    >
                      Usuario no existente
                    </Alert>
                  </CardHeader>
                )}
                <CardBody className="flex flex-col gap-4">
                  <Input
                    type="email"
                    label="Correo electrónico"
                    size="lg"
                    name="email"
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                  />
                  <Input
                    type="password"
                    label="Contraseña"
                    size="lg"
                    name="password"
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                  />
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="gradient" fullWidth onClick={handleSubmit}>
                    Iniciar Sesión
                  </Button>
                  <div className="flex justify-center items-center">
                    <Button
                      className="mt-2"
                      variant="text"
                      onClick={() => navigate("/recover_password/")}
                    >
                      ¿Has olvidado tu contraseña?
                    </Button>
                  </div>


                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SignIn;

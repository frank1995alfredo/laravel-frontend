import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import URL from "../../config/URL";
import ModalAgregar from "./ModalAgregar";
import ModalEliminar from "./ModalEliminar";
import ModalEditar from "./ModalEditar";

const NuevaCategoria = () => {

  const [categoria, setCategoria] = useState([]);
  const [dataEliminar, setDataEliminar] = useState([]); //le paso los datos del registro al modal
  const initialFormState = { id: null ,descripcion: "" }; //se inicializan los inputs
  const [cate, setCate] = useState(initialFormState);

  const addCategoria = (cate) => {
    setCategoria([...categoria, cate]);
  };

  useEffect(() => {
    listaCategorias();
  }, []);

  async function listaCategorias() {
    try {
      let response = await fetch(`${URL}/listaCategoria`);
      response = await response.json();
      setCategoria(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

   //metodo para seleccionar entre editar o eliminar
  const seleccionarOpcion = (categoria, caso) => {
    if (caso === "Editar") {
      setCate({
        id: categoria.id,
        descripcion: categoria.descripcion
      })    
    } else {
      setDataEliminar(categoria);
      console.log(categoria);
    }
  };

  return (
    <>
      <Layout>
        <div className="container">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#modalAgregar"
          >
            Agregar categoria
          </button>
          <div className="table-responsive">
            <table className="table caption-top">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th>Descripcion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categoria.map((categorias, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{categorias.descripcion}</td>
                    <td>
                      {" "}
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEditar"
                        onClick={() =>
                          seleccionarOpcion(categorias, "Editar")
                        }
                      >
                        Editar
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEliminar"
                        onClick={() =>
                        seleccionarOpcion(categorias, "Eliminar")
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>

      <ModalAgregar addCategoria={addCategoria} />
      <ModalEditar 
       cate = {cate}
       setCategoria={setCategoria}
       categoria = {categoria}
      />
      <ModalEliminar
        categoria={categoria}
        dataEliminar={dataEliminar}
        setCategoria={setCategoria}
      />
    </>
  );
};

export default NuevaCategoria;

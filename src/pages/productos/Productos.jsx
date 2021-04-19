import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import URL from "../../config/URL";
import ModalAgregar from "./ModalAgregar";
import ModalEliminar from "./ModalEliminar";
import ModalEditar from "./ModalEditar";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [productos, setProductos] = useState([]); //me permite recorrer la data que viene del backend
  const [dataEliminar, setDataEliminar] = useState([]); //le paso los datos del registro al modal

  const addProducto = (product) => {
    setProductos([...productos, product]);
  };

  const initialFormState = {
    id: null,
    idcategoria: null,
    descripcion: "",
    precio: 0.0,
    cantidad: 0,
  }; //se inicializan los inputs
  const [product, setProduct] = useState(initialFormState);

  useEffect(() => {
    listaProductos();
  }, []);

  async function listaProductos() {
    try {
      let response = await fetch(`${URL}/listaProducto`);
      response = await response.json();
      setProductos(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const seleccionarOpcion = (producto, caso) => {
    if (caso === "Editar") {
      setProduct({
        id: producto.id,
        idcategoria: producto.idcategoria,
        descripcion: producto.producto,
        cantidad: producto.cantidad,
        precio: producto.precio
      });
      console.log(producto)
    } else {
      setDataEliminar(producto);
      console.log(producto);
    }
  };

  const history = useHistory();

  const handleUpdateClick = () => {
    history.push(`/api/agregar`);
  };
  return (
    <>
      <Layout>
        <div className="container">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => handleUpdateClick()}
          >
            Nueva categoria
          </button>{" "}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#modalAgregarProducto"
          >
            Agregar Producto
          </button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Categoria</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Total</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 ? (
                productos.map((producto, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{producto.producto}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.cantidad}</td>
                    <td>$ {producto.total}</td>
                    <td>
                      {" "}
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEditarProducto"
                        onClick={() => seleccionarOpcion(producto, "Editar")}
                      >
                        Editar
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEliminar"
                        onClick={() => seleccionarOpcion(producto, "Eliminar")}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No existen datos</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Layout>
      <ModalAgregar addProducto={addProducto} />
      <ModalEliminar
        dataEliminar={dataEliminar}
        productos={productos}
        setProductos={setProductos}
      />
      <ModalEditar
        product={product}
        setProductos={setProductos}
        productos={productos}
      />
    </>
  );
};

export default Home;

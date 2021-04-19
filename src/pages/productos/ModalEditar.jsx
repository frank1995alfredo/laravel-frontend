import React, { useState, useEffect } from "react";
import URL from "../../config/URL";
import axios from "axios";

const ModalEditar = ({ product, setProductos, productos }) => {
  const [categoria, setCategoria] = useState([]);
  const [producto, setProducto] = useState(product);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProducto({ ...producto, [name]: value });
    console.log(producto);
  };

  useEffect(() => {
    listaCategorias();
  }, []);

  //este useEffect me permite tomar los datos para actualizar
  useEffect(() => {
    setProducto(product);
  }, [product]);

  const peticionActualizar = (event) => {
    event.preventDefault();
    actualizar(producto.id, producto);
    
  };

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

  const actualizar = async (id, data) => {
    await axios.put(`${URL}/actualizarProducto/` + id, data).then((response) => {
        setProductos(
            productos.map((producto) => (producto.id === id ? response.data.data[0] : producto))
          );
    });
  };

  return (
    <div
      className="modal fade"
      id="modalEditarProducto"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Editar Producto
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={peticionActualizar}>
            <div className="modal-body">
              <div className="mb-3 row">
                <label for="descripcion" className="col-sm-2 col-form-label">
                  Descripcion
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="descripcion"
                    onChange={handleInputChange}
                    value={producto.descripcion}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="descripcion" className="col-sm-2 col-form-label">
                  Categoria
                </label>
                <div className="col-sm-10">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    name="idcategoria"
                    value={producto.idcategoria}
                    onChange={handleInputChange}
                  >
                    <option >{producto.categoria}</option>
                    {categoria.map((categoria, index) => (
                      <option
                        key={index}
                        value={categoria.id}
                      >
                        {categoria.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="descripcion" className="col-sm-2 col-form-label">
                  Precio
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    value={producto.precio}
                    onChange={handleInputChange}
                    name="precio"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="descripcion" className="col-sm-2 col-form-label">
                  Cantidad
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    name="cantidad"
                    value={producto.cantidad}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success btn-sm">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalEditar;

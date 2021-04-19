import React, {useEffect, useState} from "react";
import URL from "../../config/URL";
import axios from "axios"
const ModalAgregar = ({addProducto}) => {
    
    const [categoria, setCategoria] = useState([])
    const initialFormState = { idcategoria: 0, precio: 0, cantidad: 0 ,descripcion: "" }; //se inicializan los inputs
    const [prod, setProd] = useState(initialFormState);

   //esta funcion es importante para poder escribir en los input
  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setProd({ ...prod, [name]: value });
    console.log(prod);
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

      useEffect(() => {
        listaCategorias();
      }, []);
    
      const guardarProducto = async(event) => {
        event.preventDefault();
        try {
          await axios.post(`${URL}/agregarProducto`, prod).then((response) => {
              addProducto(response.data.data)
              console.log(response.data)
              setProd(initialFormState)
           });
           
        } catch (error) {
          console.log(error);
        }
    }

  return (
    <div
      className="modal fade"
      id="modalAgregarProducto"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Agregar Producto
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={guardarProducto}>
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
                    value={prod.descripcion}
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
                    value={prod.idcategoria}
                    onChange={handleInputChange}
                  >
                    <option selected>Seleccine una categoria</option>
                    {
                        categoria.map((categoria, index) => (
                            <option key={index} name="idcategoria" value={categoria.id}>{categoria.descripcion}</option>
                        ))
                    }             
                  </select>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="descripcion" className="col-sm-2 col-form-label">
                  Precio
                </label>
                <div className="col-sm-10">
                  <input type="number" className="form-control" value={prod.precio} onChange={handleInputChange} name="precio" />
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
                    value={prod.cantidad}
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

export default ModalAgregar;

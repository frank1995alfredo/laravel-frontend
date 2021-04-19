import React, { useEffect, useState } from "react";
import URL from "../../config/URL";
import axios from "axios"

const ModalEditar = ({cate, setCategoria, categoria}) => {
 
  const [catego, setCatego] = useState(cate)
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCatego({ ...catego, [name]: value });
    console.log(catego)
  };

  const actualizar = async (id, data) => {
    await axios.put(`${URL}/actualizarCategoria/` + id, data).then((response) => {});
    setCategoria(
      categoria.map((categori) => (categori.id === id ? data : categori))
    );
  };

  const peticionActualizar = (event) => {
    event.preventDefault();
    actualizar(catego.id, catego);
  };

  //este useEffect me permite tomar los datos para actualizar 
  useEffect(() => {
    setCatego(cate);
  }, [cate])

  return (
    <div
      className="modal fade"
      id="modalEditar"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Editar Categoria
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={peticionActualizar} >
          <div className="modal-body">
             
             <div className="mb-3 row">
               <label for="descripcion" className="col-sm-2 col-form-label">
                 Categoria
               </label>
               <div className="col-sm-10">
                 <input
                   type="text"
                   className="form-control"
                   id="descripcion"
                   name="descripcion"
                   value={catego.descripcion}
                   onChange={handleInputChange}
                   
                 />
               </div>
             </div>
           </div>
           <div className="modal-footer">
             <button
               type="submit"
               className="btn btn-success btn-sm"
              
             >
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

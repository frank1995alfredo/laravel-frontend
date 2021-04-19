import React, { useState } from "react";
import URL from "../../config/URL";
import axios from "axios"

const ModalAgregar = ({addCategoria}) => {
  const initialFormState = { descripcion: "" }; //se inicializan los inputs
  const [cate, setCate] = useState(initialFormState);

  //esta funcion es importante para poder escribir en los input
  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setCate({ ...cate, [name]: value });
    console.log(cate);
  };

  const guardarCategoria = async(event) => {
    event.preventDefault();
    try {
      await axios.post(`${URL}/agregarCategoria`, cate).then((response) => {
     
          addCategoria(response.data.data)
          console.log(response.data)
          setCate(initialFormState)
        
       });
       
    } catch (error) {
      console.log(error);
    }
}

 const cancelar = (event) => {
     event.preventDefault()
     setCate(initialFormState)
 }

  return (
    <div
      className="modal fade"
      id="modalAgregar"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Agregar Categoria
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form  onSubmit={guardarCategoria}>
          <div className="modal-body">
             
             <div className="mb-3 row">
               <label for="descripcion" className="col-sm-2 col-form-label">
                 Categoria
               </label>
               <div className="col-sm-10">
                 <input
                   type="text"
                   className="form-control"
                   name="descripcion"
                   value={cate.descripcion}
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
               onClick={cancelar}
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

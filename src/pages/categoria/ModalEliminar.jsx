import React from "react";
import axios from "axios"
import URL from "../../config/URL";

const ModalEliminar = ({
  dataEliminar,
  setCategoria,
  categoria,
}) => {


    const peticionDelete = async () => {
        await axios
          .delete(`${URL}/eliminarCategoria/` + dataEliminar.id,)
          .then((response) => {
            setCategoria(categoria.filter((categoria) => categoria.id !== dataEliminar.id));
          });
      };

  return (
    <div
      className="modal fade"
      id="modalEliminar"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Eliminar categoria
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Seguro que desea eliminar <strong>{dataEliminar.descripcion}</strong>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              data-bs-dismiss="modal"
              onClick={() => peticionDelete()}
            >
              Eliminar
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminar;

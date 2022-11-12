"use strict";

var conn = require("../db-connection"),
  ModoPedidoModel = () => {};

ModoPedidoModel.getAll = (cb) =>
  conn.query("SELECT * FROM tbl_modo_pedido", cb);

ModoPedidoModel.getAllActive = (cb) =>
  conn.query("SELECT * FROM tbl_modo_pedido where activo = '1'", cb);

ModoPedidoModel.getOne = (cod, cb) =>
  conn.query(
    "SELECT * FROM tbl_modo_pedido WHERE cod_modo_pedido = $1",
    [cod],
    cb
  );

ModoPedidoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_modo_pedido WHERE cod_modo_pedido = $1",
    [data.cod_modo_pedido],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_modo_pedido_update ($1,$2,$3,$4,$5)",
              [
                data.cod_modo_pedido,
                data.descripcion,
                data.activo,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call prc_modo_pedido_insert ($1,$2,$3,$4,$5)",
              [
                data.cod_modo_pedido,
                data.descripcion,
                data.activo,
                data.creado_por,
                data.fecha_creacion,
              ],
              cb
            );
      }
    }
  );
};

ModoPedidoModel.delete = (cod, cb) =>
  conn.query("call prc_modo_pedido_delete ($1)", [cod], cb);

module.exports = ModoPedidoModel;

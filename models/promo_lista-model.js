"use strict";

var conn = require("./db-connection"),
  PromoListaModel = () => {};

PromoListaModel.getAll = (cb) => conn.query("SELECT * FROM tbl_promo_lista", cb);

PromoListaModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_promo_lista WHERE id_promo = $1", [id], cb);

PromoListaModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_promo_lista WHERE id_promo = $1",
    [data.id_categoria],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_promo_lista_update ($1,$2)",
              [
                data.id_promo,
                data.articulo
              ],
              cb
            )
          : conn.query(
              "call prc_promo_lista_insert ($1,$2)",
              [
                data.id_promo,
                data.articulo
              ],
              cb
            );
      }
    }
  );
};

PromoListaModel.delete = (id, cb) =>
  conn.query("call prc_promo_lista_delete ($1)", [id], cb);

module.exports = PromoListaModel;

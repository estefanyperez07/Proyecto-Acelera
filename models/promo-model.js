"use strict";

var conn = require("./db-connection"),
  PromoModel = () => {};

PromoModel.getAll = (cb) => conn.query("SELECT * FROM tbl_promo", cb);

PromoModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_promo WHERE cod_promo = $1", [id], cb);

PromoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_promo WHERE cod_promo = $1",
    [data.cod_promo],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_promo_update ($1,$2,$3,$4,$5,$6,$7,$8)",
              [
                data.cod_promo,
                data.desc_promo,
                data.precio,
                data.id_categoria,
                data.valida_hasta,
                data.estado,
                data.modificado_por,
                data.fecha_modificacion
              ],
              cb
            )
          : conn.query(
              "call prc_promo_insert ($1,$2,$3,$4,$5,$6,$7,$8)",
              [
                data.cod_promo,
                data.desc_promo,
                data.precio,
                data.id_categoria,
                data.valida_hasta,
                data.estado,
                data.creado_por,
                data.fecha_creacion
              ],
              cb
            );
      }
    }
  );
};

PromoModel.delete = (id, cb) =>
  conn.query("call prc_promo_delete ($1)", [id], cb);

module.exports = PromoModel;

'use strict'

module.exports = (objectJson ,nameParam) =>{
    return objectJson.filter( (item) => item.parametro === nameParam, )[0] || {};
  }
  
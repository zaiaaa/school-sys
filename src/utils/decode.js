const jwt = require('jsonwebtoken')

const decodeHeader = (token) => {
    try{
      const decoded = jwt.decode(token, {complete: true})
      return decoded ? decoded : null
    }catch(e){
      console.error('Erro ao decodificar o cabeçalho do token:', e.message);
      return null;
    }
}

module.exports = decodeHeader()

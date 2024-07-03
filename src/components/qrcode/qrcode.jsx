import React from 'react';
import QRCode from 'qrcode.react';

const PixQRCode = ({pixKey}) => {
  // Formate os dados conforme o padrão Pix

  return (
    <div>
      <QRCode value={pixKey} />
    </div>
  );
};

export default PixQRCode;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import QRCodeScanner from 'qrcode-scanner';

const QRScanner = () => {
  const history = useHistory();
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    const scanner = new QRCodeScanner(
      (error, result) => {
        if (result) {
          history.push(`/queue?venue=${result.text}`);
        }
      },
      '#scan-canvas'
    );

    setScanner(scanner);

    return () => {
      scanner.destroy();
    };
  }, [history]);

  return <div id="scan-canvas" />;
};

export default QRScanner;
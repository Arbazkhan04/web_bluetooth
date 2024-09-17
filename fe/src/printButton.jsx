// import React from 'react';

// function PrintButton() {
//   // Detect printer type using Bluetooth and print the receipt
//   const handlePrint = async () => {
//     try {
//       const printerType = await detectPrinterType(); // Detect the printer type

//       // Fetch the receipt from the server
//       const response = await fetch('http://localhost:8000/generate-receipt', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ receiptData: "Your receipt details here", printerType })
//       });

//       // Retrieve the formatted receipt
//       const { receipt } = await response.json();
//       const receiptBuffer = new TextEncoder().encode(receipt);

//       // Connect to the Bluetooth printer
//       const device = await navigator.bluetooth.requestDevice({
//         acceptAllDevices: true,
//       });
//       const server = await device.gatt.connect();
      
//       const services = await server.getPrimaryServices();
//       let printCharacteristic = null;

//       for (const service of services) {
//         const characteristics = await service.getCharacteristics();
//         for (const characteristic of characteristics) {
//           // Assuming first writable characteristic is the print characteristic
//           if (characteristic.properties.write) {
//             printCharacteristic = characteristic;
//             break;
//           }
//         }
//         if (printCharacteristic) break;
//       }

//       if (printCharacteristic) {
//         // Send the receipt to the printer
//         await sendPrintData(printCharacteristic, receiptBuffer);
//       } else {
//         console.error('No suitable print characteristic found');
//       }
//     } catch (error) {
//       console.error('Error printing receipt:', error);
//     }
//   };

//   // Function to detect printer type
//   const detectPrinterType = async () => {
//     try {
//       const device = await navigator.bluetooth.requestDevice({
//         acceptAllDevices: true,
//       });
//       const server = await device.gatt.connect();
//       const services = await server.getPrimaryServices();

//       let isEscPosPrinter = false;

//       for (const service of services) {
//         console.log('Service UUID:', service.uuid);
//         const characteristics = await service.getCharacteristics();

//         for (const characteristic of characteristics) {
//           console.log('Characteristic UUID:', characteristic.uuid);
//           // If we find a characteristic that typically belongs to ESC/POS
//           if (characteristic.properties.write) {
//             try {
//               // Test with an ESC/POS initialization command
//               const initCommand = new Uint8Array([0x1B, 0x40]); // ESC @
//               await characteristic.writeValue(initCommand);
//               isEscPosPrinter = true;
//               break;
//             } catch (error) {
//               console.warn('Failed ESC/POS test command:', error);
//             }
//           }
//         }

//         if (isEscPosPrinter) break;
//       }

//       if (isEscPosPrinter) {
//         console.log('Detected ESC/POS printer');
//         return 'ESC/POS';
//       } else {
//         console.log('Printer type unknown, using generic text format');
//         return 'Generic';
//       }

//     } catch (error) {
//       console.error('Error detecting printer type:', error);
//       return 'Generic';
//     }
//   };

//   // Function to send print data to the printer
//   const sendPrintData = async (characteristic, data) => {
//     await characteristic.writeValue(data);
//     console.log('Receipt sent to printer');
//   };

//   return (
//     <div>
//       <button onClick={handlePrint}>Print Receipt</button>
//     </div>
//   );
// }

// export default PrintButton;


import React from 'react';

function PrintButton() {
  const handlePrint = async () => {
    try {
      const printerType = 'Generic'; // Mock printer type detection
      const receiptData = "Your receipt details here";

      // Fetch the receipt from the server
      const response = await fetch('http://localhost:8001/generate-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiptData, printerType })
      });

      const { receipt } = await response.json();
      console.log('Formatted receipt:', receipt);

      // Mock Bluetooth data sending
      await sendPrintData(receipt);

    } catch (error) {
      console.error('Error printing receipt:', error);
    }
  };

  const sendPrintData = async (data) => {
    console.log('Sending data to printer:', data);
    // Simulate data sending
    // In reality, you would use the Web Bluetooth API to send the data
  };

  return (
    <div>
      <button onClick={handlePrint}>Print Receipt</button>
    </div>
  );
}

export default PrintButton;

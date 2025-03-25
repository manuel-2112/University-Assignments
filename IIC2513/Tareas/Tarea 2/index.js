const { buscarRestricciones } = require('./restricciones.js');
const { encriptacionCasera } = require('./encriptacion.js')
const readline = require('readline');

const restricciones = [
    { codigo: "ABC12", destino: "SANTIAGO", restriccion: 13 },
    { codigo: "XYZ23", destino: "ARUBA", restriccion: 57 },
    { codigo: "QWE34", destino: "NUEVA YORK", restriccion: 8 },
    { codigo: "JKL45", destino: "PARIS", restriccion: 21 },
    { codigo: "MNO56", destino: "MADRID", restriccion: 5 },
    { codigo: "PQR67", destino: "BERLIN", restriccion: 16 },
    { codigo: "STU78", destino: "CANCUN", restriccion: 41 },
    { codigo: "VWX89", destino: "MEXICO DF", restriccion: 29 },
    { codigo: "DEF90", destino: "TOKIO", restriccion: 32 },
    { codigo: "GHI01", destino: "ROMA", restriccion: 11 }
  ];  

function main(restricciones) {
    console.log('Los programas disponibles son:')
    console.log('1.  Sistema de aviso de riesgo sanitario para viajeros')
    console.log('2. Métodos de encriptación caseros')
  
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    console.log("\nIngrese 1, 2 u otro para salir:");
    rl.prompt();
  
    rl.on('line', (line) => {
      switch (line.trim()) {
        case '1':
            console.log("|Sistema de aviso de riesgo sanitario para viajeros|");
            rl.close();
            buscarRestricciones(restricciones)
            break;
        case '2':
            console.log("|Métodos de encriptación caseros|");
            rl.close();
            encriptacionCasera()
            break;
        default:
            activo = false;
            rl.close();
            break;
      }
    });
}


main(restricciones)
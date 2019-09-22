const { TesseractWorker } = require( "tesseract.js" );
const path = require("path"), fs = require("fs");
const worker = new TesseractWorker();

let nombreImagen = "ejemplo.jpg";
let entrada = path.resolve( __dirname, nombreImagen );

try {
    fs.exists(entrada, FileExist => { 
        if (FileExist) {
            worker.recognize( entrada )
            .progress( p => { console.log('[INFO]', p); } )
            .then( ( { text } ) => {
                console.log("[INFO] Texto encontrado:\n - - - - - - - - - -\n");
                console.log(text);
                console.log("\n - - - - - - - - - -\n");
                worker.terminate();
            })
            .finally(() => { process.exit(); });
        }
        else { console.error(`El archivo ${ entrada } no existe.`);}
    });
}
catch ( err ) { console.error( err ); }

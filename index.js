const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const multer = require('multer');
const mime = require('mime-types');
const readline = require('readline');
const net = require('net');
const fs = require('fs');
const path = require('path');

// === Función para guardar logs ===
const logFile = path.join(__dirname, 'envios.log');

function logToFile(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
    console.log(message); // También lo muestra en consola
}

// === Preguntar el puerto ===
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('🔧 Ingresa el puerto para levantar el servidor Express: ', (inputPort) => {
    const port = parseInt(inputPort) || 2408;

    const tester = net.createServer()
        .once('error', err => {
            if (err.code === 'EADDRINUSE') {
                logToFile(`❌ El puerto ${port} ya está en uso. Elige otro.`);
            } else {
                logToFile(`❌ Error al verificar el puerto: ${err.message}`);
            }
            rl.close();
        })
        .once('listening', () => {
            tester.close();
            iniciarServidor(port); 
            rl.close();
        })
        .listen(port);
});

function iniciarServidor(port) {
    const app = express();
    app.use(express.json());

    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    let latestQr = null;
    let isReady = false;

    const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
            args: ['--no-sandbox']
        }
    });

    // === Eventos del cliente ===
    client.on('qr', async (qr) => {
        latestQr = await qrcode.toDataURL(qr);
        logToFile('🔄 Nuevo QR generado. Escanéalo en WhatsApp Web.');
    });

    client.on('ready', () => {
        isReady = true;
        logToFile('✅ WhatsApp Web Client está listo.');
    });

    client.on('disconnected', () => {
        isReady = false;
        logToFile('❌ Cliente de WhatsApp desconectado.');
    });

    client.on('auth_failure', msg => {
        logToFile(`❌ Falló la autenticación: ${msg}`);
    });

    // === Rutas de API ===
    app.get('/status', (req, res) => {
        res.json({ status: isReady ? 'ready' : 'not_ready' });
    });

    app.get('/qr', (req, res) => {
        if (latestQr) {
            res.json({ qr: latestQr });
        } else {
            res.status(404).json({ message: 'QR no disponible aún' });
        }
    });

    app.post('/send-message', upload.single('pdf'), async (req, res) => {
        const { numero, mensaje } = req.body;
        const pdfFile = req.file;

        if (!numero || !mensaje) {
            const errMsg = '⚠️ Faltan campos requeridos (numero o mensaje)';
            logToFile(errMsg);
            return res.status(400).json({ error: errMsg });
        }

        const chatId = `${numero}@c.us`;

        try {
            const isRegistered = await client.isRegisteredUser(chatId);
            if (!isRegistered) {
                const msg = `⚠️ El número ${numero} no está registrado en WhatsApp.`;
                logToFile(msg);
                return res.status(400).json({ error: msg });
            }

            // Enviar mensaje de texto
            await client.sendMessage(chatId, mensaje);
            logToFile(`✅ Mensaje enviado a ${numero}: ${mensaje}`);

            // Enviar PDF si existe
            if (pdfFile) {
                const media = new MessageMedia(
                    mime.lookup(pdfFile.originalname) || 'application/pdf',
                    pdfFile.buffer.toString('base64'),
                    pdfFile.originalname || 'archivo.pdf'
                );

                await client.sendMessage(chatId, media);
                logToFile(`📎 PDF enviado a ${numero}: ${pdfFile.originalname}`);
            }

            res.send({ status: 'Mensaje enviado correctamente' });

        } catch (err) {
            const errorLog = `❌ Error al enviar a ${numero}: ${err.message}`;
            logToFile(errorLog);
            res.status(500).send({ error: err.message || 'Error desconocido' });
        }
    });

    // === Inicializar cliente y servidor ===
    client.initialize();

    app.listen(port, () => {
        logToFile(`🚀 Servidor Express escuchando en http://localhost:${port}`);
    });
}

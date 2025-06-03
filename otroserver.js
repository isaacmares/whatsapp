const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const multer = require('multer');
const mime = require('mime-types');
const readline = require('readline');
const net = require('net');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('🔧 Ingresa el puerto para levantar el servidor Express: ', (inputPort) => {
    const port = parseInt(inputPort) || 2408;

    const tester = net.createServer()
        .once('error', err => {
            if (err.code === 'EADDRINUSE') {
                console.error(`❌ El puerto ${port} ya está en uso. Elige otro.`);
            } else {
                console.error('Error al verificar el puerto:', err);
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

    client.on('qr', async (qr) => {
        latestQr = await qrcode.toDataURL(qr);
        console.log('🔄 Nuevo QR generado');
    });

    client.on('ready', () => {
        console.log('✅ WhatsApp Web Client is ready!');
        isReady = true;
    });

    client.on('disconnected', () => {
        console.log('❌ Cliente desconectado');
        isReady = false;
    });

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
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        try {
            await client.sendMessage(`${numero}@c.us`, mensaje);

            if (pdfFile) {
                const media = new MessageMedia(
                    mime.lookup(pdfFile.originalname) || 'application/pdf',
                    pdfFile.buffer.toString('base64'),
                    pdfFile.originalname || 'archivo.pdf'
                );

                await client.sendMessage(`${numero}@c.us`, media);
            }

            res.send({ status: 'Mensaje enviado correctamente' });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: err.message });
        }
    });

    client.initialize();

    app.listen(port, () => {
        console.log(`🚀 Servidor Express escuchando en http://localhost:${port}`);
    });
}

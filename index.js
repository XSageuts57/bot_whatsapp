const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // 👈 Esto es lo nuevo
    }
});

client.on('qr', (qr) => {
    console.log('Escanea este código QR con tu WhatsApp:');
    qrcode.toFile('./qrcode.png', qr, function (err) {
        if (err) throw err;
        console.log('Código QR guardado como imagen.');
    });
});


client.on('ready', () => {
    console.log('✅ Bot listo para usar');
});

client.on('message', async (message) => {
    const msg = message.body.trim().toLowerCase();

    // Obtén el chat en el que se ha enviado el mensaje
    const chat = await message.getChat();

    switch (msg) {
        case 'hola':
            client.sendMessage(chat.id._serialized, 
`👋 ¡Hola! Bienvenido a *Sageuts Company* 🧠💻

Somos especialistas en:
🌐 Desarrollo de páginas web personalizadas
🤖 Bots de WhatsApp automatizados 24/7
📱 Sistemas a medida para tu negocio

📌 Dirección: Av. Tecnológica 123, Lima, Perú
🌎 Web: www.sageutscompany.com
📧 Email: contacto@sageutscompany.com
📞 WhatsApp: +51 999 888 777

Escribe el número de la opción que te interesa:
1️⃣ Crear mi página web
2️⃣ Automatizar WhatsApp
3️⃣ Hablar con un asesor
4️⃣ Ver portafolio

Estamos aquí para ayudarte 🚀`);
            break;
        case '1':
        case '1️⃣':
            client.sendMessage(chat.id._serialized, 
`🌐 *Desarrollo de Página Web*

Creamos páginas modernas, rápidas y personalizadas para tu negocio:
- Sitios institucionales
- Tiendas online (e-commerce)
- Páginas de aterrizaje

💸 Planes desde *S/ 500*
⏱️ Tiempo estimado: 7 días hábiles
¿Deseas agendar una reunión sin costo?

Responde con: *Quiero agendar*`);
            break;
        case '2':
        case '2️⃣':
            client.sendMessage(chat.id._serialized, 
`🤖 *Automatización de WhatsApp*

Creamos bots que:
- Responden preguntas frecuentes
- Gestionan pedidos
- Envían promociones automáticamente

🛠️ Se adapta a tu negocio: tiendas, restaurantes, servicios y más.
💵 Desde *S/ 350* con servidor activo 24/7

¿Te gustaría ver una demo? Responde con: *Demo bot*`);
            break;
        case '3':
        case '3️⃣':
            client.sendMessage(chat.id._serialized, 
`👤 *Atención personalizada*

Un asesor estará disponible para resolver tus dudas y ayudarte a elegir la mejor solución.

⏳ Horario: Lunes a Viernes de 9:00 a.m. a 6:00 p.m.
💬 Te contactaremos pronto por este mismo medio.

También puedes escribir directamente a:
📞 +51 999 888 777`);
            break;
        case '4':
        case '4️⃣':
            client.sendMessage(chat.id._serialized, 
`📁 *Portafolio de Proyectos*

Aquí puedes ver algunos de nuestros trabajos recientes:
- 🛒 www.tienda-ejemplo.com
- 📚 www.academiadigital.pe
- 💼 www.estudiolegal360.com

¿Deseas que te enviemos un PDF detallado? Responde con: *Portafolio PDF*`);
            break;
        case 'quiero agendar':
            client.sendMessage(chat.id._serialized, '✅ ¡Perfecto! Un asesor se pondrá en contacto contigo en breve para agendar una reunión gratuita.');
            break;
        case 'demo bot':
            client.sendMessage(chat.id._serialized, '🔧 Puedes probar una demo básica escribiendo: *Hola* o *Opciones*. Además, te enviaremos un video demostrativo al correo si lo deseas.');
            break;
        case 'portafolio pdf':
            client.sendMessage(chat.id._serialized, '📨 Envíanos tu correo y te mandaremos nuestro portafolio completo en formato PDF.');
            break;
        default:
            // Puedes agregar una respuesta por defecto si quieres capturar mensajes no previstos
            client.sendMessage(chat.id._serialized, 'Lo siento, no entiendo ese comando. Por favor, elige una opción válida.');
            break;
    }
});

client.initialize();

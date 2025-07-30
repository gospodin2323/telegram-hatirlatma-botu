const { Telegraf } = require('telegraf');

// Bot Token'ını bir sonraki adımda Vercel'e ekleyeceğiz. Kodumuz buradan okuyacak.
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Kullanıcı botu başlattığında (/start komutu) gönderilecek mesaj.
bot.start((ctx) => ctx.reply('Merhaba! Ben senin kişisel hatırlatma botunum.'));

// Bot, gelen her türlü metin mesajına şimdilik basit bir cevap verecek.
// Bu, botun çalışıp çalışmadığını test etmek için.
bot.on('text', (ctx) => {
  ctx.reply(`Mesajını aldım: "${ctx.message.text}"`);
});

// Vercel'in her isteği işlemesi için botumuzu bir sunucu fonksiyonu olarak dışa aktarıyoruz.
module.exports = async (req, res) => {
  try {
    // Telegraf'ın gelen isteği işlemesini sağlıyoruz.
    await bot.handleUpdate(req.body, res);
  } catch (err) {
    console.error('Error handling update', err);
    res.status(500).send('Internal Server Error');
  }
};

// Простая и надежная версия edgetunnel
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const uuid = env.UUID || "777174e1-6785-446a-8451-b0e6840742f5";
    
    // Если заходим по секретной ссылке (твой UUID)
    if (url.pathname === `/${uuid}`) {
      const host = request.headers.get('Host');
      const vlessConfig = `vless://${uuid}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&sni=${host}#Cloudflare_Proxy`;
      
      return new Response(`
        <html>
          <body style="font-family: sans-serif; padding: 20px;">
            <h2>Твои настройки прокси:</h2>
            <p>Скопируй эту ссылку в v2rayNG:</p>
            <textarea style="width: 100%; height: 100px;">${vlessConfig}</textarea>
            <br><br>
            <p>UUID: ${uuid}</p>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // Для всех остальных показываем стандартный nginx
    return new Response('Welcome to nginx!', { status: 200 });
  }
};

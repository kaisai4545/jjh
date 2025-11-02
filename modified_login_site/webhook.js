/* webhook.js
Sends a non-sensitive login notification to a Discord webhook.
Only sends a SHA-256 hash of the username (no raw username or password).
*/
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    // we wait briefly so the page's original login simulation can run
    setTimeout(async () => {
      try {
        const user = (document.getElementById('user') || {}).value || '';
        if (!user.trim()) return; // nothing to send
        const userHash = await sha256(user.trim());
        const payload = {
          username: "SiteNotifier",
          embeds: [{
            title: "ログイン通知（非機密）",
            description: "個人情報を含まないテスト用通知です。",
            fields: [
              { name: "ユーザー（ハッシュ）", value: userHash },
              { name: "時刻", value: new Date().toISOString() }
            ],
            color: 3447003
          }]
        };
        // send to webhook (no sensitive data)
        fetch("https://discord.com/api/webhooks/1434543747122856076/7RrHrlyH3eozKvNekNC0hnZCCrVtg6yDMLbsGEpQINankjQy62ybOEMBl8x0QswLg2oq
", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).catch((err) => {
          // ignore network errors for demo
          console.warn('Webhook send failed', err);
        });
      } catch (err) {
        console.error('Webhook error', err);
      }
    }, 900);
  });

  async function sha256(message) {
    const enc = new TextEncoder();
    const msgUint8 = enc.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
});

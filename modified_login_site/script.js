document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const userInput = document.getElementById('user');
  const passInput = document.getElementById('password');
  const createBtn = document.getElementById('createAccount');
  const forgot = document.getElementById('forgot');
  const savedUser = sessionStorage.getItem('demo_user');
  if (savedUser) userInput.value = savedUser;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = userInput.value.trim();
    const pass = passInput.value;
    if (!user) { alert('ユーザーネーム、メールまたは携帯電話番号を入力してください。'); userInput.focus(); return; }
    if (!pass) { alert('パスワードを入力してください。'); passInput.focus(); return; }
    sessionStorage.setItem('demo_user', user);
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.disabled = true;
    loginBtn.textContent = 'ログイン中...';
    setTimeout(() => {
      loginBtn.disabled = false;
      loginBtn.textContent = 'ログイン';
      alert(`${user} さん、デモログインに成功しました（本番ではここでサーバー認証を行ってください）。`);
      passInput.value = '';
    }, 900);
  });
  createBtn.addEventListener('click', function () {
    alert('「アカウント作成」のデモ挙動です。教材ではここに登録フォームを実装します。');
  });
  forgot.addEventListener('click', function (e) {
    e.preventDefault();
    const user = userInput.value.trim();
    if (!user) { alert('まずユーザーネームかメールアドレスを入力してください。'); userInput.focus(); return; }
    alert(`${user} 宛にパスワード再設定リンクが送られた（デモ表示）`);
  });
});
import { useState, useEffect } from 'react';
import { api } from './api';

const vnd = (n) => Number(n).toLocaleString('vi-VN') + ' đ';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra phiên đăng nhập khi mở app
  useEffect(() => {
    api('/auth/me').then((r) => {
      if (r.err === 200) setUser(r.customer);
      setLoading(false);
    });
  }, []);

  if (loading) return <p style={{ padding: 24 }}>Đang tải…</p>;

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'system-ui', padding: 16 }}>
      <h1>Mini-Mini-Wallet</h1>
      {user
        ? <Dashboard user={user} onLogout={() => setUser(null)} />
        : <AuthForm onAuth={setUser} />}
    </div>
  );
}

function AuthForm({ onAuth }) {
  const [mode, setMode] = useState('login');      
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    const path = mode === 'login' ? '/auth/login' : '/auth/register';
    const r = await api(path, { phone, password, name });
    if (r.err === 200) onAuth(r.customer);
    else setMsg(r.message);
  }

  return (
    <form onSubmit={submit}>
      <h2>{mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h2>
      <input placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} style={inp} />
      <input placeholder="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inp} />
      {mode === 'register' &&
        <input placeholder="Tên" value={name} onChange={(e) => setName(e.target.value)} style={inp} />}
      <button style={btn}>{mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</button>
      {msg && <p style={{ color: 'crimson' }}>{msg}</p>}
      <p>
        {mode === 'login' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
        <a href="#" onClick={(e) => { e.preventDefault(); setMsg(''); setMode(mode === 'login' ? 'register' : 'login'); }}>
          {mode === 'login' ? 'Đăng ký' : 'Đăng nhập'}
        </a>
      </p>
    </form>
  );
}

function Dashboard({ user, onLogout }) {
  const [balance, setBalance] = useState(null);
  const [history, setHistory] = useState([]);
  const [toPhone, setToPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');

  async function refresh() {
    const b = await api('/wallet/balance');
    if (b.err === 200) setBalance(b.balance);
    const h = await api('/wallet/history');
    if (h.err === 200) setHistory(h.transactions);
  }
  useEffect(() => { refresh(); }, []);

  async function transfer(e) {
    e.preventDefault();
    const r = await api('/wallet/transfer', { toPhone, amount: Number(amount) });
    setMsg(r.message);
    if (r.err === 200) { setToPhone(''); setAmount(''); refresh(); }
  }

  async function logout() {
    await api('/auth/logout');
    onLogout();
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Xin chào <b>{user.name || user.phone}</b></span>
        <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Đăng xuất</a>
      </div>

      <div style={{ background: '#0d6efd', color: '#fff', padding: 20, borderRadius: 12, margin: '16px 0' }}>
        <div>Số dư</div>
        <div style={{ fontSize: 28, fontWeight: 700 }}>{balance == null ? '…' : vnd(balance)}</div>
      </div>

      <form onSubmit={transfer}>
        <h3>Chuyển tiền</h3>
        <input placeholder="SĐT người nhận" value={toPhone} onChange={(e) => setToPhone(e.target.value)} style={inp} />
        <input placeholder="Số tiền" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={inp} />
        <button style={btn}>Chuyển</button>
        {msg && <p>{msg}</p>}
      </form>

      <h3>Lịch sử giao dịch</h3>
      {history.length === 0 && <p>Chưa có giao dịch.</p>}
      {history.map((t) => (
        <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <span>{t.type === 'OUT' ? `↗ Gửi ${t.counterparty}` : `↘ Nhận từ ${t.counterparty}`}</span>
          <b style={{ color: t.type === 'OUT' ? 'crimson' : 'green' }}>
            {t.type === 'OUT' ? '-' : '+'}{vnd(t.amount)}
          </b>
        </div>
      ))}
    </div>
  );
}

const inp = { display: 'block', width: '100%', padding: 10, margin: '6px 0', boxSizing: 'border-box' };
const btn = { padding: '10px 16px', marginTop: 6, cursor: 'pointer' };
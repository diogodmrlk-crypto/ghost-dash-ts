import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, BadgeHelp, Banknote, Check, ChevronRight, CircleHelp,
  Copy, Eye, EyeOff, Gift, Heart, Home, MoreHorizontal, Pencil, Plus, QrCode,
  Receipt, Search, Send, Settings, ShieldCheck, Sparkles, UserRound, Users, Wallet,
  X, Zap,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

type Screen = "home" | "contacts" | "amount" | "review" | "pin" | "processing" | "success";
type EditMode = "name" | "balance" | null;

const purple = "#820ad1";
const defaultContacts = [
  { name: "Mariana Silva", detail: "Nubank", initials: "MS", color: "#f0b39c" },
  { name: "João Pedro", detail: "Nubank", initials: "JP", color: "#9ed7c0" },
  { name: "Ana Clara", detail: "Itaú Unibanco", initials: "AC", color: "#d3b2e8" },
];

function money(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function AppContent() {
  const [screen, setScreen] = useState<Screen>("home");
  const [name, setName] = useState(() => localStorage.getItem("sim-name") || "felipe");
  const [balance, setBalance] = useState(() => Number(localStorage.getItem("sim-balance")) || 400);
  const [hidden, setHidden] = useState(false);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [draft, setDraft] = useState("");
  const [contact, setContact] = useState(defaultContacts[0]);
  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState("");

  useEffect(() => localStorage.setItem("sim-name", name), [name]);
  useEffect(() => localStorage.setItem("sim-balance", String(balance)), [balance]);

  const openEdit = (mode: EditMode) => {
    setEditMode(mode);
    setDraft(mode === "name" ? name : String(balance));
  };
  const saveEdit = () => {
    if (editMode === "name" && draft.trim()) setName(draft.trim());
    if (editMode === "balance" && Number(draft) >= 0) setBalance(Number(draft));
    setEditMode(null);
    toast.success("Dados atualizados");
  };
  const startPix = () => { setAmount(0); setScreen("contacts"); };
  const chooseContact = (item: typeof defaultContacts[number]) => { setContact(item); setScreen("amount"); };
  const addDigit = (digit: string) => {
    const next = Number(`${Math.round(amount * 100)}${digit}`) / 100;
    if (next <= 999999) setAmount(next);
  };
  const removeDigit = () => setAmount(Math.floor(amount * 10) / 100);
  const submitPin = (value: string) => {
    setPin(value);
    if (value.length === 4) {
      setScreen("processing");
      window.setTimeout(() => setScreen("success"), 1900);
    }
  };
  const finishTransfer = () => {
    setBalance((current) => Math.max(0, current - amount));
    setScreen("home"); setPin(""); setAmount(0);
    toast.success("Transferência concluída");
  };

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="notch" />
        {screen === "home" && <HomeScreen name={name} balance={balance} hidden={hidden} setHidden={setHidden} openEdit={openEdit} startPix={startPix} />}
        {screen === "contacts" && <ContactsScreen onBack={() => setScreen("home")} onChoose={chooseContact} />}
        {screen === "amount" && <AmountScreen contact={contact} amount={amount} addDigit={addDigit} removeDigit={removeDigit} onBack={() => setScreen("contacts")} onContinue={() => amount > 0 ? setScreen("review") : toast.error("Digite um valor") } />}
        {screen === "review" && <ReviewScreen contact={contact} amount={amount} onBack={() => setScreen("amount")} onSend={() => setScreen("pin")} />}
        {screen === "pin" && <PinScreen pin={pin} setPin={submitPin} onBack={() => setScreen("review")} />}
        {screen === "processing" && <ProcessingScreen />}
        {screen === "success" && <SuccessScreen contact={contact} amount={amount} onHome={finishTransfer} />}
        {screen === "home" && <BottomNav onPix={startPix} />}
        {editMode && <EditModal mode={editMode} value={draft} setValue={setDraft} onCancel={() => setEditMode(null)} onSave={saveEdit} />}
      </div>
    </div>
  );
}

function Header({ name, onEdit }: { name: string; onEdit: () => void }) {
  return <header className="home-header"><button className="avatar" onClick={onEdit}>{name.slice(0, 1).toUpperCase()}</button><button className="greeting" onClick={onEdit}>Olá, <strong>{name}</strong><Pencil size={13} /></button><div className="header-actions"><button aria-label="Ajuda"><CircleHelp size={21} /></button><button aria-label="Convide amigos"><Gift size={21} /></button></div></header>;
}

function HomeScreen({ name, balance, hidden, setHidden, openEdit, startPix }: { name: string; balance: number; hidden: boolean; setHidden: (v: boolean) => void; openEdit: (m: EditMode) => void; startPix: () => void }) {
  const shortcuts = [{ icon: <QrCode />, label: "Área Pix", action: startPix }, { icon: <Send />, label: "Transferir", action: startPix }, { icon: <Receipt />, label: "Pagar", action: () => toast("Pagamento em breve") }, { icon: <Wallet />, label: "Empréstimo", action: () => toast("Simulação em breve") }];
  return <main className="home-content"><Header name={name} onEdit={() => openEdit("name")} /><section className="balance-card"><div className="section-label">Saldo em conta <button onClick={() => setHidden(!hidden)}>{hidden ? <EyeOff size={17} /> : <Eye size={17} />}</button></div><button className="balance-value" onClick={() => openEdit("balance")}>{hidden ? "R$ •••••" : money(balance)}<Pencil size={14} /></button><span className="edit-hint">Toque no valor para editar</span></section><section className="shortcut-grid">{shortcuts.map((item) => <button className="shortcut" key={item.label} onClick={item.action}><span className="shortcut-icon">{item.icon}</span><span>{item.label}</span></button>)}</section><section className="promo-card"><div><span className="eyebrow">CONTA DIGITAL</span><h2>Seu dinheiro<br /><strong>do seu jeito.</strong></h2><p>Tenha controle de tudo<br />na palma da mão.</p></div><Sparkles className="promo-spark" /></section><section className="credit-card"><div className="card-title"><span><Wallet size={18} /> Cartão de crédito</span><ChevronRight size={18} /></div><div className="invoice-row"><div><span>Fatura atual</span><strong>R$ 0,00</strong></div><div><span>Limite disponível</span><strong>R$ 2.500,00</strong></div></div></section><section className="quick-row"><button onClick={() => toast("Convide seus amigos e ganhe benefícios") }><Users size={19} /><span>Indique amigos</span><ChevronRight size={17} /></button><button onClick={() => toast("Configurações em breve") }><Settings size={19} /><span>Configurações</span><ChevronRight size={17} /></button></section></main>;
}

function TopBar({ title, onBack }: { title: string; onBack: () => void }) { return <div className="top-bar"><button onClick={onBack}><ArrowLeft size={21} /></button><strong>{title}</strong><span /></div>; }
function ContactsScreen({ onBack, onChoose }: { onBack: () => void; onChoose: (item: typeof defaultContacts[number]) => void }) { const [search, setSearch] = useState(""); const list = defaultContacts.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())); return <main className="flow-screen contacts-screen"><TopBar title="Pix" onBack={onBack} /><h1>Para quem você<br /><strong>quer enviar?</strong></h1><label className="search-box"><Search size={19} /><input placeholder="Nome, CPF/CNPJ ou chave Pix" value={search} onChange={(e) => setSearch(e.target.value)} /></label><h3>Favoritos</h3><div className="favorite-row">{defaultContacts.map((item) => <button key={item.name} onClick={() => onChoose(item)}><span className="contact-avatar" style={{ background: item.color }}>{item.initials}</span><small>{item.name.split(" ")[0]}</small></button>)}</div><h3>Contatos recentes</h3><div className="contact-list">{list.map((item) => <button key={item.name} onClick={() => onChoose(item)}><span className="contact-avatar" style={{ background: item.color }}>{item.initials}</span><span><strong>{item.name}</strong><small>{item.detail}</small></span><ChevronRight size={18} /></button>)}</div><button className="new-contact" onClick={() => toast("Você pode adicionar um novo contato em breve") }><Plus size={19} /> Novo contato</button></main>; }
function AmountScreen({ contact, amount, addDigit, removeDigit, onBack, onContinue }: { contact: typeof defaultContacts[number]; amount: number; addDigit: (d: string) => void; removeDigit: () => void; onBack: () => void; onContinue: () => void }) { return <main className="flow-screen amount-screen"><TopBar title="Enviar Pix" onBack={onBack} /><div className="recipient-mini"><span className="contact-avatar" style={{ background: contact.color }}>{contact.initials}</span><div><span>Enviando para</span><strong>{contact.name}</strong></div></div><div className="amount-display"><span>Quanto você quer enviar?</span><strong>{money(amount)}</strong></div><div className="keypad">{["1","2","3","4","5","6","7","8","9",".","0","⌫"].map((digit) => <button key={digit} onClick={() => digit === "⌫" ? removeDigit() : digit !== "." && addDigit(digit)}>{digit}</button>)}</div><button className="primary-button continue-button" onClick={onContinue}>Continuar com saldo <ArrowRight size={19} /></button></main>; }
function ReviewScreen({ contact, amount, onBack, onSend }: { contact: typeof defaultContacts[number]; amount: number; onBack: () => void; onSend: () => void }) { return <main className="flow-screen review-screen"><TopBar title="Confira os dados" onBack={onBack} /><div className="review-icon"><Send size={25} /></div><h1>Você vai enviar<br /><strong>{money(amount)}</strong></h1><div className="review-card"><span>Para</span><div className="review-person"><span className="contact-avatar" style={{ background: contact.color }}>{contact.initials}</span><div><strong>{contact.name}</strong><small>Banco {contact.detail}</small></div></div><hr /><div className="detail-line"><span>Tipo de transferência</span><strong>Pix</strong></div><div className="detail-line"><span>Valor</span><strong>{money(amount)}</strong></div></div><button className="primary-button" onClick={onSend}>Enviar Pix <Send size={18} /></button></main>; }
function PinScreen({ pin, setPin, onBack }: { pin: string; setPin: (v: string) => void; onBack: () => void }) { return <main className="pin-screen"><button className="pin-back" onClick={onBack}><ArrowLeft size={21} /></button><ShieldCheck size={39} className="pin-shield" /><h1>Digite sua senha<br /><strong>de 4 dígitos</strong></h1><p>Para confirmar esta transferência</p><div className="pin-dots">{[0,1,2,3].map((index) => <span className={index < pin.length ? "filled" : ""} key={index} />)}</div><input className="pin-input" autoFocus inputMode="numeric" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))} /><div className="pin-note"><LockIcon /> Nunca compartilhe sua senha</div></main>; }
function LockIcon() { return <ShieldCheck size={16} />; }
function ProcessingScreen() { return <main className="processing-screen"><div className="spinner" /><h2>Transferindo...</h2><p>Gerando comprovante</p></main>; }
function SuccessScreen({ contact, amount, onHome }: { contact: typeof defaultContacts[number]; amount: number; onHome: () => void }) { return <main className="success-screen"><div className="success-check"><Check size={41} /></div><span className="success-label">Tudo certo!</span><h1>Sua transferência<br /><strong>foi concluída</strong></h1><div className="receipt-card"><span>Você enviou</span><strong>{money(amount)}</strong><div className="receipt-person"><span className="contact-avatar" style={{ background: contact.color }}>{contact.initials}</span><div><small>Para</small><strong>{contact.name}</strong></div></div><span className="receipt-date">Hoje, agora · Pix</span></div><button className="secondary-button" onClick={() => toast("Comprovante salvo no seu dispositivo") }><Copy size={17} /> Abrir comprovante</button><button className="home-link" onClick={onHome}>Voltar para início</button></main>; }
function BottomNav({ onPix }: { onPix: () => void }) { return <nav className="bottom-nav"><button className="active"><Home size={20} /><span>Início</span></button><button onClick={onPix}><QrCode size={20} /><span>Pix</span></button><button onClick={() => toast("Área de cartões em breve") }><Wallet size={20} /><span>Cartões</span></button><button onClick={() => toast("Seu perfil está em construção") }><UserRound size={20} /><span>Perfil</span></button></nav>; }
function EditModal({ mode, value, setValue, onCancel, onSave }: { mode: Exclude<EditMode, null>; value: string; setValue: (v: string) => void; onCancel: () => void; onSave: () => void }) { return <div className="modal-backdrop" onClick={onCancel}><div className="edit-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onCancel}><X size={19} /></button><span className="modal-kicker"><Pencil size={15} /> EDITAR SIMULAÇÃO</span><h2>{mode === "name" ? "Como você quer ser chamado?" : "Qual é o seu saldo?"}</h2><p>{mode === "name" ? "Altere o nome exibido na sua conta." : "Defina um valor para testar o fluxo."}</p><input autoFocus type={mode === "balance" ? "number" : "text"} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSave()} /><button className="primary-button" onClick={onSave}>Salvar alteração</button></div></div>; }

export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><Toaster position="top-center" richColors /><AppContent /></ThemeProvider></ErrorBoundary>; }

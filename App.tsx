
import React, { useState, useEffect, useRef } from 'react';
import {
  Cpu,
  CheckCircle2,
  Users,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  X,
  Sparkles,
  Layers,
  ArrowDown,
  Send,
  Loader2,
  Calendar,
  BookOpen,
  Handshake,
  Youtube,
  Linkedin
} from 'lucide-react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ⚠️ Remplace par ton endpoint Formspree : https://formspree.io/f/XXXXXXXX
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyknjbda';

type ModalType = 'Rendez-vous' | 'Formation' | 'Accompagnement' | null;

// --- Modal de contact ---

const modalConfig = {
  'Rendez-vous': {
    icon: <Calendar className="w-5 h-5" />,
    title: 'Prendre un rendez-vous',
    subtitle: 'Discutons de votre projet en 30 min.',
    color: 'text-emerald-400',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/10',
  },
  'Formation': {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Demander une formation',
    subtitle: 'Formations IA sur mesure pour votre équipe.',
    color: 'text-blue-400',
    border: 'border-blue-500/40',
    bg: 'bg-blue-500/10',
  },
  'Accompagnement': {
    icon: <Handshake className="w-5 h-5" />,
    title: 'Être accompagné',
    subtitle: 'Un suivi personnalisé adapté à vos objectifs.',
    color: 'text-purple-400',
    border: 'border-purple-500/40',
    bg: 'bg-purple-500/10',
  },
};

const ContactModal = ({ type, onClose }: { type: ModalType; onClose: () => void }) => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [type]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!type) return null;

  const config = modalConfig[type];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ type, nom, email, message }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(12px)' }}
    >
      <div
        className="w-full max-w-lg glass-card rounded-[2rem] p-8 relative"
        style={{ animation: 'modalIn 0.25s ease' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/15 transition-colors text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${config.bg} border ${config.border} ${config.color} text-sm font-bold mb-6`}>
          {config.icon}
          {type}
        </div>
        <h2 className="text-2xl font-black font-outfit mb-1">{config.title}</h2>
        <p className="text-slate-400 text-sm mb-8">{config.subtitle}</p>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <p className="text-lg font-bold mb-1">Message envoyé !</p>
            <p className="text-slate-400 text-sm">Je vous réponds dans les plus brefs délais.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nom complet</label>
              <input
                type="text"
                required
                value={nom}
                onChange={e => setNom(e.target.value)}
                placeholder="Votre nom"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Message</label>
              <textarea
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Décrivez brièvement votre besoin..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-xs">Une erreur est survenue. Veuillez réessayer.</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-xl py-3.5 font-black text-sm hover:bg-slate-100 transition-all disabled:opacity-60"
            >
              {status === 'loading' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</>
              ) : (
                <><Send className="w-4 h-4" /> Envoyer le message</>
              )}
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

// --- Components ---

const Navbar = ({ openModal, onPricing }: { openModal: (t: ModalType) => void; onPricing: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex justify-between items-center px-6 py-3 rounded-2xl transition-all duration-500 ${scrolled ? 'glass-card shadow-2xl translate-y-2' : 'bg-transparent'}`}>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Djimtech" className="h-8 w-auto object-contain" />
            <span className="text-xl font-black tracking-tighter font-outfit uppercase">Djimtech</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#approche" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Approche</a>
            <a href="#parcours" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Parcours</a>
            <a href="#publics" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Publics</a>
            <button
              onClick={onPricing}
              className="text-sm font-semibold text-emerald-400 hover:text-white transition-colors"
            >
              Tarifs
            </button>
            <button
              onClick={() => openModal('Rendez-vous')}
              className="bg-white text-black px-5 py-2 rounded-xl text-sm font-extrabold hover:scale-105 transition-all active:scale-95 shadow-xl"
            >
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ openModal, onPricing }: { openModal: (t: ModalType) => void; onPricing: () => void }) => (
  <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-float"></div>
    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full animate-float" style={{animationDelay: '-3s'}}></div>

    <div className="max-w-5xl mx-auto text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
        <Sparkles className="w-3.5 h-3.5" />
        Accompagnement Expert en IA
      </div>

      <h1 className="text-5xl md:text-8xl font-extrabold mb-6 font-outfit leading-[1.1] tracking-tight">
        Coach & Formateur en <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500">
          Intelligence Artificielle
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-slate-300 font-medium mb-10 font-outfit tracking-wide">
        Chatbots · Agents IA · Vibe Coding
      </p>

      <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
        J'accompagne individus, équipes et organisations à comprendre, maîtriser et utiliser concrètement l'IA — des chatbots aux agents autonomes, jusqu'au développement assisté par agents.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
        <button
          onClick={() => openModal('Formation')}
          className="w-full sm:w-auto px-8 py-5 bg-white text-black rounded-2xl font-black text-lg transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1"
        >
          Demander une formation IA
        </button>
        <button
          onClick={() => openModal('Accompagnement')}
          className="w-full sm:w-auto px-8 py-5 glass-card border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
        >
          Être accompagné
        </button>
      </div>
      <button
        onClick={onPricing}
        className="mt-5 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-semibold underline underline-offset-4"
      >
        Voir les tarifs →
      </button>
    </div>

    <a href="#approche" className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors animate-bounce">
      <ArrowDown />
    </a>
  </section>
);

const Philosophy = () => {
  const points = [
    { title: "Approche progressive", desc: "Du simple au complexe pour une montée en puissance maîtrisée.", icon: <Layers className="text-emerald-400" /> },
    { title: "Orientation autonomie", desc: "Comprendre avant d'utiliser. Devenir souverain face à l'outil.", icon: <ShieldCheck className="text-blue-400" /> },
    { title: "Coaching + Formation", desc: "La transmission théorique alliée à l'accompagnement personnalisé.", icon: <GraduationCap className="text-purple-400" /> },
    { title: "Pratique réelle", desc: "Apprentissage par la pratique sur vos cas d'usage concrets.", icon: <Cpu className="text-pink-400" /> }
  ];

  return (
    <section id="approche" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-outfit uppercase tracking-tighter">Approche & Philosophie</h2>
          <p className="text-xl text-slate-400 font-light italic">IA utile, maîtrisée et responsable.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, i) => (
            <div key={i} className="glass-card p-10 rounded-[2.5rem] hover:border-white/20 transition-all duration-500 group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">{p.icon}</div>
              <h3 className="text-xl font-bold mb-4 font-outfit">{p.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PathLevel = ({ num, title, obj, items, tools, cta, color, glow, onCta }: any) => (
  <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-24 mb-32 last:mb-0 group">
    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 flex flex-col items-center">
      <div className={`w-12 h-12 rounded-full border-4 border-[#020617] bg-gradient-to-br ${color} z-10 flex items-center justify-center font-black text-xl shadow-xl group-hover:scale-110 transition-transform`}>
        {num}
      </div>
      <div className="w-1 flex-grow bg-slate-800 relative">
        <div className={`absolute top-0 left-0 w-full h-0 group-hover:h-full transition-all duration-1000 bg-gradient-to-b ${color}`}></div>
      </div>
    </div>

    <div className={`md:flex md:flex-col ${num % 2 === 0 ? 'md:order-last' : 'md:text-right md:items-end'}`}>
      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Niveau {num}</h3>
      <h4 className="text-3xl md:text-4xl font-black font-outfit mb-6">{title}</h4>
      <div className={`p-8 glass-card rounded-[2rem] border-l-4 ${glow} max-w-lg mb-8 transition-all hover:bg-white/[0.04]`}>
        <p className="text-slate-200 font-semibold mb-4 text-lg">{obj}</p>
        <div className={`space-y-4 ${num % 2 !== 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
          {items.map((item: string, i: number) => (
            <div key={i} className={`flex items-start gap-3 text-slate-400 text-sm ${num % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${num === 1 ? 'text-emerald-400' : num === 2 ? 'text-blue-400' : 'text-purple-400'}`} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className={`hidden md:flex flex-col justify-center ${num % 2 === 0 ? 'items-end text-right' : ''}`}>
      {tools && (
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-slate-600 mb-4">Outils de référence</p>
          <div className={`flex flex-wrap gap-3 ${num % 2 !== 0 ? '' : 'justify-end'}`}>
            {tools.map((t: string) => (
              <span key={t} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-slate-300">{t}</span>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <button
          onClick={onCta}
          className="px-6 py-4 rounded-xl font-extrabold text-sm transition-all flex items-center gap-3 border border-white/10 hover:bg-white hover:text-black"
        >
          {cta}
          <ArrowRight className="w-4 h-4" />
        </button>
        <a
          href="https://wa.me/221775218762"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-4 rounded-xl font-extrabold text-sm transition-all flex items-center gap-3 border border-green-500/20 text-green-400 hover:bg-green-600 hover:text-white hover:border-green-600"
        >
          <WhatsAppIcon />
          Discuter sur WhatsApp
        </a>
      </div>
    </div>
  </div>
);

const Path = ({ openModal }: { openModal: (t: ModalType) => void }) => (
  <section id="parcours" className="py-32 px-6 bg-slate-950/30">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-7xl font-black mb-6 font-outfit tracking-tighter">LE PARCOURS</h2>
        <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">Une montée en compétence fluide en 3 étapes clés vers l'autonomie totale.</p>
      </div>

      <div className="relative">
        <PathLevel
          num={1}
          title="Maîtrise des Chatbots et Assistants IA"
          obj="Rendre l'utilisateur autonome et stratégique dans l'usage des chatbots IA — adapté à tous les secteurs."
          items={[
            "Comprendre comment fonctionnent les LLMs",
            "Apprendre à bien formuler ses prompts",
            "Choisir le bon outil selon le besoin",
            "Utiliser les chatbots dans un cadre pro",
            "Générer des affiches publicitaires avec l'IA",
            "Créer des vidéos et contenus avec l'IA",
            "Maîtriser les outils audio, vidéo et photo IA",
            "Utiliser les outils de RAG pour ses données"
          ]}
          tools={["ChatGPT", "Claude", "Gemini", "Notebook LM", "DeepSeek", "Kimi", "Outils RAG", "Audio / Vidéo / Photo"]}
          cta="Se former aux chatbots IA"
          color="from-emerald-400 to-teal-500"
          glow="border-emerald-500 glow-emerald"
          onCta={() => openModal('Formation')}
        />
        <PathLevel
          num={2}
          title="Agents IA & Automatisations"
          obj="Passer du simple chat à des systèmes IA autonomes et actionnables."
          items={[
            "Différence entre chatbot et agent IA",
            "Conception d'agents orientés objectifs",
            "Automatisation via Make & N8N",
            "Agents connectés (Navigateurs, APIs)",
            "Logique multi-agents et workflows",
            "Création d'agents sur mesure",
            "Outils agentiques : Antigravity, Claude Cowork, Manus AI, Genspark et autres"
          ]}
          cta="Mettre en place des agents IA"
          color="from-blue-500 to-indigo-600"
          glow="border-blue-500 glow-blue"
          onCta={() => openModal('Accompagnement')}
        />
        <PathLevel
          num={3}
          title="Vibe Coding & Agentic"
          obj="Créer, coder et prototyper plus vite avec les agents IA."
          items={[
            "Le Vibe Coding : développer sans coder",
            "Le Vibe Prospecting : prospecter avec l'IA",
            "Le Vibe Editing : créer et éditer du contenu IA",
            "Le Vibe Marketing : automatiser sa stratégie marketing",
            "Le Vibe Agents : orchestrer ses agents au quotidien",
            "Collaboration humain–agent",
            "Accompagnement profils tech/non-tech"
          ]}
          cta="Apprendre le vibe coding"
          color="from-purple-500 to-pink-600"
          glow="border-purple-500 glow-purple"
          onCta={() => openModal('Accompagnement')}
        />
      </div>
    </div>
  </section>
);

const CoachSection = () => (
  <section id="coach" className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="glass-card rounded-[3rem] overflow-hidden grid lg:grid-cols-2 items-center border-white/10">
        <div className="h-full bg-slate-900 relative">
          <img src="/coach.jpeg" alt="Coach Profile" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent"></div>
          <div className="absolute bottom-10 left-10">
            <h3 className="text-4xl font-black font-outfit uppercase">Djimi Adotevi</h3>
            <p className="text-emerald-400 font-bold tracking-widest uppercase text-sm mt-2">Coach & Formateur en IA</p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.youtube.com/@djimtechdjimiadotevi1166" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-red-600 transition-colors text-white">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/djimi-adotevi" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-blue-600 transition-colors text-white">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://wa.me/221775218762" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-green-600 transition-colors text-white">
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="p-12 lg:p-20">
          <div className="space-y-10">
            <div>
              <h4 className="flex items-center gap-3 text-xl font-bold mb-4 font-outfit">
                <Users className="text-blue-400" /> Posture de Coach
              </h4>
              <p className="text-slate-400 leading-relaxed font-light">Accompagnement, écoute active et progression personnalisée selon votre contexte spécifique.</p>
            </div>
            <div>
              <h4 className="flex items-center gap-3 text-xl font-bold mb-4 font-outfit">
                <GraduationCap className="text-purple-400" /> Rôle de Formateur
              </h4>
              <p className="text-slate-400 leading-relaxed font-light">Transmission de savoirs, pédagogie adaptée au niveau du public pour une assimilation durable.</p>
            </div>
            <div className="pt-6 border-t border-white/5">
              <p className="text-lg font-medium text-slate-200 italic">"Objectif : rendre autonome, pas dépendant de l'outil."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Publics = () => {
  const groups = ["Individus", "Indépendants", "Développeurs", "Non-développeurs", "Équipes métiers", "Organisations"];

  return (
    <section id="publics" className="py-32 px-6 bg-slate-950/20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-20 font-outfit">PUBLICS ACCOMPAGNÉS</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {groups.map((g) => (
            <div key={g} className="px-8 py-6 glass-card rounded-2xl border-white/5 hover:border-blue-500/50 transition-all cursor-default group">
              <span className="text-xl font-bold font-outfit group-hover:text-blue-400 transition-colors">{g}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const reasons = [
    { t: "Progression claire", d: "En 3 niveaux structurés pour ne jamais se sentir perdu." },
    { t: "Vision globale", d: "De l'outil au système, puis à la création pure." },
    { t: "Usage réel", d: "Orientation sur l'application concrète en milieu pro." },
    { t: "Pédagogique", d: "Une approche structurée pensée pour l'assimilation." }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 font-outfit">POURQUOI CETTE APPROCHE ?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((r, i) => (
            <div key={i} className="flex gap-6 p-8 glass-card rounded-3xl">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-black text-blue-400 shrink-0">{i+1}</div>
              <div>
                <h4 className="text-xl font-bold mb-2 font-outfit uppercase">{r.t}</h4>
                <p className="text-slate-400 font-light">{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ openModal, onPricing }: { openModal: (t: ModalType) => void; onPricing: () => void }) => (
  <section className="py-40 px-6 relative overflow-hidden bg-gradient-to-b from-transparent to-emerald-950/10">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[160px] rounded-full"></div>
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <h2 className="text-5xl md:text-8xl font-black mb-12 font-outfit tracking-tighter leading-tight">
        PRÊT À PASSER À <br /> L'ÉTAPE SUIVANTE ?
      </h2>

      <div className="grid sm:grid-cols-3 gap-6">
        <button
          onClick={() => openModal('Rendez-vous')}
          className="px-8 py-6 bg-white text-black rounded-2xl font-black hover:scale-105 transition-all shadow-2xl"
        >
          Prendre un rendez-vous
        </button>
        <button
          onClick={() => openModal('Formation')}
          className="px-8 py-6 glass-card text-white rounded-2xl font-black hover:bg-white/10 transition-all border-white/10"
        >
          Demander une formation
        </button>
        <button
          onClick={() => openModal('Accompagnement')}
          className="px-8 py-6 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
        >
          Être accompagné
        </button>
      </div>

      {/* Lien Tarifs */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          onClick={onPricing}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-emerald-500/30 text-emerald-400 font-extrabold text-lg hover:bg-emerald-500/10 hover:border-emerald-400 transition-all"
        >
          <Sparkles className="w-5 h-5" />
          Voir les Tarifs
          <ArrowRight className="w-5 h-5" />
        </button>
        <a
          href="https://wa.me/221775218762"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-green-500/30 text-green-400 font-bold hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
        >
          <WhatsAppIcon />
          Ou discuter directement sur WhatsApp
        </a>
      </div>
    </div>
  </section>
);

const Footer = ({ openModal }: { openModal: (t: ModalType) => void }) => (
  <footer className="py-12 px-6 border-t border-white/5 bg-slate-950/50">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Djimtech" className="h-8 w-auto object-contain" />
        <span className="text-lg font-black font-outfit uppercase">Djimtech</span>
      </div>
      <div className="text-slate-500 text-sm font-medium">
        © 2025 Djimtech. Expert Coach & Formateur IA.
      </div>
      <div className="flex items-center gap-4">
        <a href="https://www.youtube.com/@djimtechdjimiadotevi1166" target="_blank" rel="noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-red-600 transition-colors text-slate-400 hover:text-white">
          <Youtube className="w-4 h-4" />
        </a>
        <a href="https://www.linkedin.com/in/djimi-adotevi" target="_blank" rel="noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-blue-600 transition-colors text-slate-400 hover:text-white">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href="https://wa.me/221775218762" target="_blank" rel="noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-green-600 transition-colors text-slate-400 hover:text-white">
          <WhatsAppIcon />
        </a>
        <button onClick={() => openModal('Rendez-vous')} className="text-slate-500 hover:text-white transition-colors text-sm font-medium ml-2">Contact</button>
      </div>
    </div>
  </footer>
);

// --- Page Tarifs ---

const pricingAxes = [
  {
    id: 'chatbots',
    icon: '🤖',
    title: 'Chatbots & Assistants IA',
    color: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-500/30',
    glow: 'bg-emerald-500/5',
    individual: '30 000 FCFA',
    group: '125 000 FCFA',
    hourly: [
      { hours: 2, price: '10 000 FCFA' },
      { hours: 3, price: '15 000 FCFA' },
    ],
    description: 'Maîtriser ChatGPT, Claude, Gemini, les outils RAG, audio, vidéo, photo IA — adapté à tous les secteurs.',
  },
  {
    id: 'agents',
    icon: '🧠',
    title: 'Agents IA & Automatisations',
    color: 'from-blue-500 to-purple-500',
    border: 'border-blue-500/30',
    glow: 'bg-blue-500/5',
    individual: '50 000 – 80 000 FCFA',
    group: '150 000 FCFA',
    hourly: [
      { hours: 2, price: '20 000 FCFA' },
      { hours: 3, price: '25 000 FCFA' },
    ],
    description: 'Make, N8N, agents sur mesure, outils agentiques (Antigravity, Claude Cowork, Manus AI, Genspark…)',
    popular: true,
  },
  {
    id: 'vibe',
    icon: '💻',
    title: 'Vibe Coding & Agentic',
    color: 'from-purple-500 to-pink-500',
    border: 'border-purple-500/30',
    glow: 'bg-purple-500/5',
    individual: '50 000 – 80 000 FCFA',
    group: '150 000 FCFA',
    hourly: [
      { hours: 2, price: '20 000 FCFA' },
      { hours: 3, price: '25 000 FCFA' },
    ],
    description: 'Vibe Coding, Vibe Prospecting, Vibe Editing, Vibe Marketing, Vibe Agents — créer sans coder avec l\'IA.',
  },
];

const sectors = [
  { icon: '📣', label: 'Marketing & Commercial' },
  { icon: '📋', label: 'Gestion de projet' },
  { icon: '🎧', label: 'Support client' },
  { icon: '⚡', label: 'Productivité' },
  { icon: '💰', label: 'Comptabilité & Finances' },
  { icon: '🤖', label: 'Chatbots IA' },
  { icon: '🧠', label: 'Agents IA' },
  { icon: '💻', label: 'Vibe Coding' },
];

const PricingPage = ({ onBack, openModal }: { onBack: () => void; openModal: (t: ModalType) => void }) => (
  <div className="min-h-screen bg-[#050816] text-white">
    {/* Header */}
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold mb-10"
      >
        <ArrowRight className="w-4 h-4 rotate-180" /> Retour au site
      </button>

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Tarifs transparents
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold font-outfit mb-4 tracking-tight">
          Investissez dans <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500">
            votre transformation IA
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Des formules adaptées à chaque profil — individuel, groupe ou entreprise.
        </p>
      </div>
    </div>

    {/* Grille tarifs */}
    <div className="max-w-7xl mx-auto px-6 mb-20">

      {/* En-têtes colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        {pricingAxes.map((ax) => (
          <div key={ax.id} className={`relative rounded-2xl border ${ax.border} ${ax.glow} p-6`}>
            {ax.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                Populaire
              </div>
            )}
            <div className="text-3xl mb-3">{ax.icon}</div>
            <h2 className="text-xl font-extrabold font-outfit mb-2">{ax.title}</h2>
            <p className="text-slate-400 text-sm mb-6">{ax.description}</p>

            {/* Individuel */}
            <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Individuel / mois</span>
              </div>
              <div className={`text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${ax.color}`}>
                {ax.individual}
              </div>
            </div>

            {/* Groupe */}
            <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Groupe 5 pers. / mois</span>
              </div>
              <div className={`text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${ax.color}`}>
                {ax.group}
              </div>
            </div>

            {/* Tarifs à l'heure */}
            <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Séances ponctuelles</span>
              </div>
              <div className="flex flex-col gap-2">
                {(ax as any).hourly?.map((h: { hours: number; price: string }) => (
                  <div key={h.hours} className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">{h.hours}h de formation</span>
                    <span className={`text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${ax.color}`}>{h.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => openModal('Formation')}
              className={`w-full py-3 rounded-xl font-extrabold text-sm bg-gradient-to-r ${ax.color} text-white hover:opacity-90 transition-all active:scale-95`}
            >
              Commencer
            </button>
          </div>
        ))}
      </div>

      {/* Entreprise */}
      <div className="mt-6 rounded-2xl border border-white/10 glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🏢</span>
            <h3 className="text-xl font-extrabold font-outfit">Entreprise</h3>
          </div>
          <p className="text-slate-400 text-sm max-w-xl">
            Formation intra-entreprise, accompagnement sur mesure, intégration IA dans vos processus — pour toutes vos équipes (marketing, gestion de projet, support, finances…).
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 shrink-0">
          <span className="text-2xl font-extrabold text-white">Tarif sur devis</span>
          <button
            onClick={() => openModal('Rendez-vous')}
            className="bg-white text-black px-6 py-3 rounded-xl font-extrabold text-sm hover:scale-105 transition-all active:scale-95 shadow-xl whitespace-nowrap"
          >
            Prendre rendez-vous
          </button>
        </div>
      </div>
    </div>

    {/* Secteurs */}
    <div className="max-w-7xl mx-auto px-6 mb-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-extrabold font-outfit mb-2">Secteurs d'intervention</h2>
        <p className="text-slate-400 text-sm">J'accompagne l'intégration de l'IA dans toutes ces activités</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sectors.map((s) => (
          <div key={s.label} className="flex items-center gap-3 p-4 rounded-xl glass-card border border-white/10 hover:border-white/20 transition-colors">
            <span className="text-xl">{s.icon}</span>
            <span className="text-sm font-semibold text-slate-300">{s.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* CTA final */}
    <div className="max-w-3xl mx-auto px-6 pb-20 text-center">
      <div className="rounded-2xl glass-card border border-white/10 p-10">
        <h3 className="text-2xl font-extrabold font-outfit mb-3">Pas sûr de la formule ?</h3>
        <p className="text-slate-400 mb-6">Réservez un appel découverte gratuit de 30 min. On définit ensemble ce qui vous correspond.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => openModal('Rendez-vous')}
            className="bg-white text-black px-6 py-3 rounded-xl font-extrabold text-sm hover:scale-105 transition-all active:scale-95 shadow-xl"
          >
            Réserver mon appel gratuit
          </button>
          <a
            href="https://wa.me/221775218762"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-extrabold text-sm border border-green-500/30 text-green-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
          >
            <WhatsAppIcon />
            Discuter sur WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [modal, setModal] = useState<ModalType>(null);
  const [page, setPage] = useState<'home' | 'pricing'>('home');
  const openModal = (type: ModalType) => setModal(type);
  const closeModal = () => setModal(null);

  if (page === 'pricing') {
    return (
      <>
        <ContactModal type={modal} onClose={closeModal} />
        <PricingPage onBack={() => setPage('home')} openModal={openModal} />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <ContactModal type={modal} onClose={closeModal} />
      <Navbar openModal={openModal} onPricing={() => setPage('pricing')} />
      <Hero openModal={openModal} onPricing={() => setPage('pricing')} />
      <Philosophy />
      <Path openModal={openModal} />
      <CoachSection />
      <Publics />
      <WhyUs />
      <FinalCTA openModal={openModal} onPricing={() => setPage('pricing')} />
      <Footer openModal={openModal} />
    </div>
  );
}

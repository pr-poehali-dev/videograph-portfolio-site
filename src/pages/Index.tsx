import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_IMG = "https://cdn.poehali.dev/projects/f86ef855-9614-47c9-aa55-6d8cad3637ce/files/1aa43c95-f9fc-4358-a9dc-59657aee2c92.jpg";
const BUSINESS_IMG = "https://cdn.poehali.dev/projects/f86ef855-9614-47c9-aa55-6d8cad3637ce/files/db8e0820-de04-409b-b7e8-1f3da55d42af.jpg";
const CLIENT_IMG = "https://cdn.poehali.dev/projects/f86ef855-9614-47c9-aa55-6d8cad3637ce/files/c1bdd140-4405-40fa-9d10-3ed5dabbbe41.jpg";

const NAV_ITEMS = [
  { id: "about", label: "Обо мне" },
  { id: "portfolio", label: "Портфолио" },
  { id: "pricing", label: "Пакеты" },
  { id: "reviews", label: "Отзывы" },
  { id: "contact", label: "Контакты" },
];

const PORTFOLIO_ITEMS = [
  { id: 1, category: "wedding", title: "Анна & Михаил", subtitle: "Свадьба в усадьбе", img: WEDDING_IMG, duration: "5:42" },
  { id: 2, category: "business", title: "TechForum 2024", subtitle: "Корпоративное мероприятие", img: BUSINESS_IMG, duration: "12:15" },
  { id: 3, category: "wedding", title: "Елена & Дмитрий", subtitle: "Выездная церемония", img: WEDDING_IMG, duration: "6:10" },
  { id: 4, category: "events", title: "Gala Night", subtitle: "Вечернее мероприятие", img: BUSINESS_IMG, duration: "8:30" },
  { id: 5, category: "business", title: "Product Launch", subtitle: "Презентация продукта", img: BUSINESS_IMG, duration: "3:55" },
  { id: 6, category: "wedding", title: "Ирина & Антон", subtitle: "Свадьба у моря", img: WEDDING_IMG, duration: "7:20" },
];

const PACKAGES = [
  {
    name: "Базовый",
    price: "45 000 ₽",
    tag: null,
    items: [
      "Съёмка до 6 часов",
      "Один оператор",
      "Клип 3–5 минут",
      "Цветокоррекция",
      "Готово за 2 недели",
    ],
  },
  {
    name: "Стандарт",
    price: "85 000 ₽",
    tag: "Популярный",
    items: [
      "Съёмка до 10 часов",
      "Два оператора",
      "Клип 5–8 минут",
      "Полная запись дня",
      "Аэросъёмка (дрон)",
      "Цветокоррекция",
      "Готово за 3 недели",
    ],
  },
  {
    name: "Премиум",
    price: "140 000 ₽",
    tag: null,
    items: [
      "Съёмка без ограничений",
      "Три оператора",
      "Клип 8–12 минут",
      "Полная запись + teaser",
      "Аэросъёмка (дрон)",
      "Запись в 4K",
      "Цветокоррекция DCI",
      "Готово за 2 недели",
    ],
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Алина Соколова",
    role: "Невеста",
    rating: 5,
    text: "Просто нет слов. Когда мы впервые увидели наш свадебный фильм — плакали всей семьёй. Каждый взгляд, каждый смех пойман так точно, что кажется, будто заново проживаешь этот день.",
    img: CLIENT_IMG,
    hasVideo: false,
  },
  {
    id: 2,
    name: "Максим Петров",
    role: "Организатор форума",
    rating: 5,
    text: "Работали вместе на трёх крупных конференциях. Профессионализм высочайшего уровня: всегда незаметен на площадке и всегда в нужном месте в нужный момент.",
    img: CLIENT_IMG,
    hasVideo: true,
  },
  {
    id: 3,
    name: "Виктория Ермакова",
    role: "HR-директор",
    rating: 5,
    text: "Снимал наш корпоративный ивент. Результат превзошёл все ожидания — видео показали совету директоров и оно получило стоячие овации. Рекомендую без колебаний.",
    img: CLIENT_IMG,
    hasVideo: false,
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < rating ? "#C9A96E" : "none"} stroke="#C9A96E" strokeWidth="1">
          <polygon points="7,1 8.8,5.4 13.5,5.8 10,8.9 11.1,13.5 7,11 2.9,13.5 4,8.9 0.5,5.8 5.2,5.4" />
        </svg>
      ))}
    </div>
  );
}

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeNav, setActiveNav] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = activeFilter === "all"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(i => i.category === activeFilter);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map(n => document.getElementById(n.id));
      const scrollY = window.scrollY + 120;
      sections.forEach((sec, i) => {
        if (sec && sec.offsetTop <= scrollY) setActiveNav(NAV_ITEMS[i].id);
      });
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const hero = useInView(0.1);
  const portfolio = useInView(0.1);
  const pricing = useInView(0.1);
  const reviews = useInView(0.1);
  const contact = useInView(0.1);

  return (
    <div className="bg-[#0A0A0A] text-[#E8E4DC] font-ibm min-h-screen overflow-x-hidden">

      <style>{`
        :root { --gold: #C9A96E; --dim: #5A5650; --surface: #131313; --border-c: #1E1E1E; }
        .anim { opacity: 0; transform: translateY(28px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .anim.show { opacity: 1; transform: translateY(0); }
        .anim-d1 { transition-delay: 0.1s; }
        .anim-d2 { transition-delay: 0.2s; }
        .anim-d3 { transition-delay: 0.3s; }
        .filter-btn { letter-spacing: 0.15em; font-size: 11px; color: var(--dim); padding: 6px 18px; border: 1px solid transparent; transition: all 0.25s; cursor: pointer; background: none; text-transform: uppercase; }
        .filter-btn:hover, .filter-btn.active { color: var(--gold); border-color: var(--gold); }
        .portfolio-card { position: relative; overflow: hidden; cursor: pointer; }
        .portfolio-card img { transition: transform 0.7s ease; display: block; width: 100%; height: 100%; object-fit: cover; }
        .portfolio-card:hover img { transform: scale(1.06); }
        .portfolio-card .overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%); opacity: 0; transition: opacity 0.4s; }
        .portfolio-card:hover .overlay { opacity: 1; }
        .pkg { border: 1px solid var(--border-c); padding: 40px 32px; transition: border-color 0.3s; }
        .pkg:hover { border-color: var(--gold); }
        .pkg.featured { border-color: var(--gold); background: rgba(201,169,110,0.04); }
        .nav-link { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--dim); transition: color 0.25s; cursor: pointer; background: none; border: none; }
        .nav-link:hover, .nav-link.active { color: #E8E4DC; }
        .gold-line { width: 40px; height: 1px; background: var(--gold); }
        .review-card { border: 1px solid var(--border-c); padding: 32px; transition: border-color 0.3s; }
        .review-card:hover { border-color: rgba(201,169,110,0.4); }
        .play-btn { width: 40px; height: 40px; border-radius: 50%; background: var(--gold); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s, background 0.2s; flex-shrink: 0; border: none; }
        .play-btn:hover { transform: scale(1.1); background: #d4b07a; }
        .contact-input { background: var(--surface); border: 1px solid var(--border-c); color: #E8E4DC; padding: 14px 18px; width: 100%; font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; transition: border-color 0.25s; outline: none; }
        .contact-input:focus { border-color: var(--gold); }
        .contact-input::placeholder { color: var(--dim); }
        .contact-input option { background: #131313; color: #E8E4DC; }
        .submit-btn { background: var(--gold); color: #0A0A0A; padding: 16px 40px; font-family: 'IBM Plex Sans', sans-serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.25s, transform 0.2s; font-weight: 500; }
        .submit-btn:hover { background: #d4b07a; transform: translateY(-1px); }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0A0A0A; } ::-webkit-scrollbar-thumb { background: #1E1E1E; }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.95), transparent)" }}>
        <div className="font-cormorant text-xl font-light tracking-widest text-[#E8E4DC]">
          КАДР
        </div>
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} className={`nav-link ${activeNav === n.id ? "active" : ""}`}>
              {n.label}
            </button>
          ))}
        </div>
        <button className="md:hidden text-[#E8E4DC] bg-transparent border-none cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col items-center justify-center gap-10">
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} className="font-cormorant text-2xl font-light tracking-widest text-[#E8E4DC] bg-transparent border-none cursor-pointer">
              {n.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={WEDDING_IMG} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.22)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, #0A0A0A 100%)" }} />
        </div>
        <div ref={hero.ref} className={`relative z-10 text-center px-8 anim ${hero.inView ? "show" : ""}`}>
          <p className="font-ibm text-[10px] tracking-[0.35em] text-[#C9A96E] uppercase mb-8">Видеограф · Москва</p>
          <h1 className="font-cormorant font-light text-6xl md:text-8xl lg:text-[110px] leading-none tracking-tight text-[#E8E4DC] mb-8">
            Кадры,<br />
            <em>которые</em><br />
            остаются
          </h1>
          <p className="font-ibm font-light text-sm tracking-widest text-[#5A5650] uppercase max-w-sm mx-auto mb-14">
            Кинематографичная видеосъёмка свадеб,<br />мероприятий и бизнес-проектов
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button onClick={() => scrollTo("portfolio")} className="submit-btn">
              Смотреть портфолио
            </button>
            <button onClick={() => scrollTo("contact")} className="font-ibm text-[11px] tracking-[0.2em] uppercase text-[#5A5650] hover:text-[#E8E4DC] transition-colors bg-transparent border-none border-b border-[#5A5650] pb-0.5 cursor-pointer">
              Связаться
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <Icon name="ChevronDown" size={16} className="text-[#5A5650]" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-8 md:px-16 lg:px-32 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="relative">
              <img src={BUSINESS_IMG} alt="" className="w-full object-cover" style={{ height: 520 }} />
              <div className="absolute -bottom-5 -right-5 bg-[#131313] border border-[#1E1E1E] px-8 py-6">
                <p className="font-cormorant text-5xl font-light text-[#C9A96E]">7+</p>
                <p className="font-ibm text-[10px] tracking-[0.2em] text-[#5A5650] uppercase mt-1">лет в профессии</p>
              </div>
            </div>
          </div>
          <div>
            <p className="font-ibm text-[10px] tracking-[0.3em] text-[#C9A96E] uppercase mb-6">Обо мне</p>
            <div className="gold-line mb-8" />
            <h2 className="font-cormorant text-4xl md:text-5xl font-light leading-tight text-[#E8E4DC] mb-8">
              Превращаю<br /><em>моменты</em><br />в кино
            </h2>
            <p className="font-ibm text-sm font-light leading-loose text-[#7A7670] mb-6">
              Меня зовут Илья. Я работаю с видео с 2017 года и за это время снял более 200 проектов: от камерных свадеб до крупных форумов с тысячной аудиторией.
            </p>
            <p className="font-ibm text-sm font-light leading-loose text-[#7A7670] mb-10">
              Мой подход — кинематографичность без пышности. Я не создаю шаблонное видео. Каждый проект — отдельная история со своим ритмом, светом и настроением.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[["200+", "проектов"], ["30+", "городов"], ["4K", "качество"]].map(([num, label]) => (
                <div key={label}>
                  <p className="font-cormorant text-3xl font-light text-[#C9A96E]">{num}</p>
                  <p className="font-ibm text-[10px] tracking-[0.2em] text-[#5A5650] uppercase mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-8 md:px-16">
        <div ref={portfolio.ref} className={`anim ${portfolio.inView ? "show" : ""}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
              <div>
                <p className="font-ibm text-[10px] tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Работы</p>
                <h2 className="font-cormorant text-5xl font-light text-[#E8E4DC]">Портфолио</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "Все" },
                  { key: "wedding", label: "Свадьбы" },
                  { key: "events", label: "Мероприятия" },
                  { key: "business", label: "Бизнес" },
                ].map(f => (
                  <button key={f.key} onClick={() => setActiveFilter(f.key)} className={`filter-btn ${activeFilter === f.key ? "active" : ""}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item, i) => (
                <div key={item.id} className="portfolio-card" style={{ height: i % 3 === 1 ? 380 : 280 }}>
                  <img src={item.img} alt={item.title} />
                  <div className="overlay" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                    <div>
                      <p className="font-cormorant text-xl font-light text-white">{item.title}</p>
                      <p className="font-ibm text-[10px] tracking-widest text-[#C9A96E] uppercase">{item.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Icon name="Play" size={12} />
                      <span className="font-ibm text-xs text-[#7A7670]">{item.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 px-8 md:px-16">
        <div ref={pricing.ref} className={`anim ${pricing.inView ? "show" : ""}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-ibm text-[10px] tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Услуги</p>
              <h2 className="font-cormorant text-5xl font-light text-[#E8E4DC]">Пакеты съёмки</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-0 md:divide-x divide-[#1E1E1E]">
              {PACKAGES.map((pkg) => (
                <div key={pkg.name} className={`pkg ${pkg.tag ? "featured" : ""}`}>
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      {pkg.tag && (
                        <p className="font-ibm text-[9px] tracking-[0.25em] text-[#C9A96E] uppercase mb-2">{pkg.tag}</p>
                      )}
                      <p className="font-cormorant text-2xl font-light text-[#E8E4DC]">{pkg.name}</p>
                    </div>
                  </div>
                  <p className="font-cormorant text-4xl font-light text-[#C9A96E] mb-8">{pkg.price}</p>
                  <div className="gold-line mb-8" />
                  <ul className="space-y-4">
                    {pkg.items.map(item => (
                      <li key={item} className="flex items-start gap-3">
                        <Icon name="Check" size={13} className="text-[#C9A96E] mt-0.5 flex-shrink-0" />
                        <span className="font-ibm text-sm font-light text-[#7A7670]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo("contact")} className="mt-10 w-full submit-btn">
                    Выбрать пакет
                  </button>
                </div>
              ))}
            </div>
            <p className="text-center font-ibm text-xs text-[#5A5650] mt-8 tracking-wider">
              Все пакеты включают авторскую цветокоррекцию · Возможна индивидуальная комплектация
            </p>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-32 px-8 md:px-16 bg-[#080808]">
        <div ref={reviews.ref} className={`anim ${reviews.inView ? "show" : ""}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-ibm text-[10px] tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Клиенты</p>
              <h2 className="font-cormorant text-5xl font-light text-[#E8E4DC]">Отзывы</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {REVIEWS.map((r) => (
                <div key={r.id} className="review-card">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={r.img} alt={r.name} className="w-12 h-12 rounded-full object-cover" style={{ filter: "grayscale(30%)" }} />
                    <div>
                      <p className="font-ibm text-sm text-[#E8E4DC]">{r.name}</p>
                      <p className="font-ibm text-[10px] tracking-wider text-[#5A5650] uppercase">{r.role}</p>
                    </div>
                    {r.hasVideo && (
                      <button className="ml-auto play-btn">
                        <Icon name="Play" size={14} className="text-[#0A0A0A] ml-0.5" />
                      </button>
                    )}
                  </div>
                  <StarRating rating={r.rating} />
                  <p className="font-ibm text-sm font-light leading-loose text-[#7A7670] mt-5">
                    "{r.text}"
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-14 gap-8 md:gap-20">
              {[["200+", "клиентов"], ["4.9", "рейтинг"], ["100%", "рекомендуют"]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p className="font-cormorant text-4xl font-light text-[#C9A96E]">{num}</p>
                  <p className="font-ibm text-[10px] tracking-[0.2em] text-[#5A5650] uppercase mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-8 md:px-16">
        <div ref={contact.ref} className={`anim ${contact.inView ? "show" : ""}`}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-ibm text-[10px] tracking-[0.3em] text-[#C9A96E] uppercase mb-4">Связь</p>
              <h2 className="font-cormorant text-5xl font-light text-[#E8E4DC] mb-4">Обсудим проект</h2>
              <p className="font-ibm text-sm font-light text-[#5A5650]">
                Оставьте заявку — отвечу в течение 2 часов
              </p>
            </div>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Ваше имя" className="contact-input" />
                <input type="tel" placeholder="Телефон" className="contact-input" />
              </div>
              <select className="contact-input" defaultValue="">
                <option value="" disabled>Тип съёмки</option>
                <option>Свадьба</option>
                <option>Мероприятие / Форум</option>
                <option>Корпоративный проект</option>
                <option>Другое</option>
              </select>
              <input type="date" className="contact-input" />
              <textarea placeholder="Расскажите о вашем событии..." className="contact-input" rows={5} style={{ resize: "none" }} />
              <div className="flex justify-center pt-4">
                <button type="submit" className="submit-btn">
                  Отправить заявку
                </button>
              </div>
            </form>
            <div className="flex flex-col sm:flex-row justify-center gap-8 mt-16 pt-12 border-t border-[#1E1E1E]">
              {[
                { icon: "Phone", label: "+7 (999) 000-00-00" },
                { icon: "Mail", label: "hello@kadrvideo.ru" },
                { icon: "Instagram", label: "@kadrvideo" },
              ].map(c => (
                <div key={c.label} className="flex flex-col items-center gap-3">
                  <Icon name={c.icon as "Phone" | "Mail" | "Instagram"} size={18} className="text-[#C9A96E]" />
                  <span className="font-ibm text-xs text-[#5A5650]">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-8 border-t border-[#1E1E1E] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-cormorant text-lg font-light tracking-widest text-[#E8E4DC]">КАДР</p>
        <p className="font-ibm text-[10px] tracking-[0.2em] text-[#5A5650] uppercase">
          © 2024 · Видеограф Илья · Москва
        </p>
        <div className="flex gap-6">
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} className="nav-link" style={{ fontSize: "9px" }}>
              {n.label}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}

"use client";

import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  GitBranch,
  GraduationCap,
  Languages,
  Mail,
  Phone,
  Smartphone,
  Terminal,
} from "lucide-react";
import { useMemo, useState } from "react";

type Lang = "en" | "ru" | "kz";

const dictionaries = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
    },
    common: {
      available: "Open to junior developer opportunities",
      contactMe: "Contact me",
      downloadCv: "Download CV",
      viewProject: "View project",
      location: "Location",
      email: "Email",
      phone: "Phone",
      github: "GitHub",
    },
    hero: {
      title: "Rauan Tuken",
      role: "Junior Full Stack Developer",
      description:
        "3rd-year IT student at KBTU with hands-on experience in mobile, frontend, and full stack web development.",
    },
    sections: {
      aboutKicker: "Profile",
      aboutTitle: "A developer building practical interfaces across web and mobile.",
      skillsKicker: "Stack",
      skillsTitle: "Technologies from real work, coursework, and academic projects.",
      experienceKicker: "Experience",
      experienceTitle: "Commercial development experience with mobile and frontend products.",
      projectsKicker: "Projects",
      projectsTitle: "Academic full stack work with Angular and Django.",
      educationKicker: "Education",
      educationTitle: "Information Technology education in progress.",
      contactKicker: "Contact",
      contactTitle: "Let us talk about internships, junior roles, and project work.",
    },
    about:
      "I am a 3rd-year IT student at Kazakh-British Technical University. I have hands-on experience in mobile and frontend development at Itdevgroup, along with web application development using Angular and Django. I actively learn modern technologies and am ready to apply my knowledge in practice.",
    facts: {
      university: "Kazakh-British Technical University (KBTU)",
      year: "3rd year, in progress",
      city: "Almaty, Kazakhstan",
    },
    skills: {
      programming: "Programming Languages",
      frontendMobile: "Frontend & Mobile",
      backendDb: "Backend & Databases",
      workflow: "Workflow",
      languages: "Languages",
      soft: "Soft Skills",
    },
    experience: {
      company: "Itdevgroup",
      role: "Android Developer & Frontend Developer (React)",
      period: "2025 - Present",
      location: "Almaty, Kazakhstan",
      items: [
        "Developed and maintained a mobile application using Flutter and Android.",
        "Implemented new features, managed Git branches, and resolved merge conflicts.",
        "Adapted an admin dashboard for mobile and tablet devices using React.",
        "Worked with component-based architecture, FSD, Chakra UI, and MobX.",
        "Worked with GitLab CI/CD pipelines, build and deployment flows, code review, and team development.",
      ],
    },
    project: {
      name: "Web Application (Full Stack)",
      course: "Course: Web Development",
      description:
        "Built a full stack web application with Angular, TypeScript, Django, and REST API communication.",
      items: [
        "Built the frontend using Angular with TypeScript and a component-based architecture.",
        "Implemented a RESTful backend with Django.",
        "Set up client-server communication via REST API.",
      ],
    },
    education: {
      university: "Kazakh-British Technical University (KBTU)",
      degree: "Bachelor's - Information Technology",
      period: "2024 - Present",
      status: "3rd year, in progress",
      location: "Almaty, Kazakhstan",
    },
    footer: "Portfolio CV website",
  },
  ru: {
    nav: {
      about: "Обо мне",
      skills: "Навыки",
      experience: "Опыт",
      projects: "Проекты",
      education: "Образование",
      contact: "Контакты",
    },
    common: {
      available: "Открыт к junior developer возможностям",
      contactMe: "Связаться",
      downloadCv: "Скачать резюме",
      viewProject: "Открыть проект",
      location: "Локация",
      email: "Email",
      phone: "Телефон",
      github: "GitHub",
    },
    hero: {
      title: "Rauan Tuken",
      role: "Junior Full Stack Developer",
      description:
        "Студент 3 курса IT в KBTU с практическим опытом в mobile, frontend и full stack web development.",
    },
    sections: {
      aboutKicker: "Профиль",
      aboutTitle: "Разработчик, который создает практичные интерфейсы для web и mobile.",
      skillsKicker: "Стек",
      skillsTitle: "Технологии из реального опыта, обучения и академических проектов.",
      experienceKicker: "Опыт",
      experienceTitle: "Коммерческий опыт разработки mobile и frontend продуктов.",
      projectsKicker: "Проекты",
      projectsTitle: "Академический full stack проект на Angular и Django.",
      educationKicker: "Образование",
      educationTitle: "Образование в сфере Information Technology продолжается.",
      contactKicker: "Контакты",
      contactTitle: "Можно обсудить internships, junior roles и проектную работу.",
    },
    about:
      "Я студент 3 курса IT в Kazakh-British Technical University. У меня есть практический опыт mobile и frontend разработки в Itdevgroup, а также опыт создания web applications с Angular и Django. Я активно изучаю современные технологии и готов применять знания на практике.",
    facts: {
      university: "Kazakh-British Technical University (KBTU)",
      year: "3 курс, обучение продолжается",
      city: "Almaty, Kazakhstan",
    },
    skills: {
      programming: "Языки программирования",
      frontendMobile: "Frontend & Mobile",
      backendDb: "Backend & Databases",
      workflow: "Workflow",
      languages: "Языки",
      soft: "Soft Skills",
    },
    experience: {
      company: "Itdevgroup",
      role: "Android Developer & Frontend Developer (React)",
      period: "2025 - Present",
      location: "Almaty, Kazakhstan",
      items: [
        "Разрабатывал и поддерживал mobile application с использованием Flutter и Android.",
        "Реализовывал новые функции, работал с Git branches и решал merge conflicts.",
        "Адаптировал admin dashboard под mobile и tablet устройства на React.",
        "Работал с component-based architecture, FSD, Chakra UI и MobX.",
        "Работал с GitLab CI/CD pipelines, build/deployment процессами, code review и командной разработкой.",
      ],
    },
    project: {
      name: "Web Application (Full Stack)",
      course: "Course: Web Development",
      description:
        "Full stack web application с Angular, TypeScript, Django и обменом данными через REST API.",
      items: [
        "Создал frontend на Angular с TypeScript и component-based architecture.",
        "Реализовал RESTful backend на Django.",
        "Настроил client-server communication через REST API.",
      ],
    },
    education: {
      university: "Kazakh-British Technical University (KBTU)",
      degree: "Bachelor's - Information Technology",
      period: "2024 - Present",
      status: "3 курс, обучение продолжается",
      location: "Almaty, Kazakhstan",
    },
    footer: "Portfolio CV website",
  },
  kz: {
    nav: {
      about: "Мен туралы",
      skills: "Дағдылар",
      experience: "Тәжірибе",
      projects: "Жобалар",
      education: "Білім",
      contact: "Байланыс",
    },
    common: {
      available: "Junior developer мүмкіндіктеріне ашықпын",
      contactMe: "Байланысу",
      downloadCv: "Түйіндемені жүктеу",
      viewProject: "Жобаны ашу",
      location: "Орналасқан жері",
      email: "Email",
      phone: "Телефон",
      github: "GitHub",
    },
    hero: {
      title: "Rauan Tuken",
      role: "Junior Full Stack Developer",
      description:
        "KBTU университетінің 3-курс IT студенті. Mobile, frontend және full stack web development бойынша практикалық тәжірибесі бар.",
    },
    sections: {
      aboutKicker: "Профиль",
      aboutTitle: "Web және mobile үшін қолдануға ыңғайлы интерфейстер жасайтын developer.",
      skillsKicker: "Стек",
      skillsTitle: "Нақты жұмыс тәжірибесінен, оқудан және академиялық жобалардан алынған технологиялар.",
      experienceKicker: "Тәжірибе",
      experienceTitle: "Mobile және frontend өнімдерін әзірлеудегі коммерциялық тәжірибе.",
      projectsKicker: "Жобалар",
      projectsTitle: "Angular және Django қолданылған академиялық full stack жоба.",
      educationKicker: "Білім",
      educationTitle: "Information Technology бағыты бойынша оқу жалғасуда.",
      contactKicker: "Байланыс",
      contactTitle: "Internship, junior role және project work бойынша сөйлесе аламыз.",
    },
    about:
      "Мен Kazakh-British Technical University университетінің IT мамандығы бойынша 3-курс студентімін. Itdevgroup компаниясында mobile және frontend development бойынша практикалық тәжірибем бар, сондай-ақ Angular және Django арқылы web application әзірледім. Заманауи технологияларды белсенді үйреніп, білімімді тәжірибеде қолдануға дайынмын.",
    facts: {
      university: "Kazakh-British Technical University (KBTU)",
      year: "3 курс, оқу жалғасуда",
      city: "Almaty, Kazakhstan",
    },
    skills: {
      programming: "Бағдарламалау тілдері",
      frontendMobile: "Frontend & Mobile",
      backendDb: "Backend & Databases",
      workflow: "Workflow",
      languages: "Тілдер",
      soft: "Soft Skills",
    },
    experience: {
      company: "Itdevgroup",
      role: "Android Developer & Frontend Developer (React)",
      period: "2025 - Present",
      location: "Almaty, Kazakhstan",
      items: [
        "Flutter және Android қолданылған mobile application әзірлеп, қолдадым.",
        "Жаңа функциялар қостым, Git branches басқардым және merge conflicts шештім.",
        "React арқылы admin dashboard интерфейсін mobile және tablet құрылғыларына бейімдедім.",
        "Component-based architecture, FSD, Chakra UI және MobX-пен жұмыс істедім.",
        "GitLab CI/CD pipelines, build/deployment процестері, code review және командалық әзірлеуге қатыстым.",
      ],
    },
    project: {
      name: "Web Application (Full Stack)",
      course: "Course: Web Development",
      description:
        "Angular, TypeScript, Django және REST API communication қолданылған full stack web application.",
      items: [
        "Angular және TypeScript арқылы component-based architecture негізінде frontend жасадым.",
        "Django арқылы RESTful backend әзірледім.",
        "REST API арқылы client-server communication баптадым.",
      ],
    },
    education: {
      university: "Kazakh-British Technical University (KBTU)",
      degree: "Bachelor's - Information Technology",
      period: "2024 - Present",
      status: "3 курс, оқу жалғасуда",
      location: "Almaty, Kazakhstan",
    },
    footer: "Portfolio CV website",
  },
};

const skills = {
  programming: ["Python", "JavaScript", "TypeScript", "Java", "C++", "Dart"],
  frontendMobile: ["React", "Flutter", "Android", "Angular", "Chakra UI", "MobX"],
  backendDb: ["Django", "Django REST Framework", "PostgreSQL", "REST API"],
  workflow: ["Git", "Git branches", "GitLab CI/CD", "Code review", "FSD"],
  languages: ["Kazakh - C2 Native", "Russian - C1 Advanced", "English - B2 Upper-Intermediate"],
  soft: [
    "Fast learner of new technologies",
    "Attention to detail and code quality",
    "Team player and strong communicator",
    "Self-driven and proactive",
  ],
};

const mapDots =
  "0000001110000000000000111000000000" +
  "0000111111100000000001111110000000" +
  "0001111111110000000011111111000000" +
  "0011111111111000000111111111100000" +
  "0001111111110000001111111111000000" +
  "0000111111000000000111111110000000" +
  "0000001110000000000011111000000000" +
  "0000000000000111000001110000011100" +
  "0000000000001111100000000000111110" +
  "0000000000011111110000000001111110" +
  "0000000000001111100000000000111100";

const navItems = [
  ["about", "about"],
  ["skills", "skills"],
  ["experience", "experience"],
  ["projects", "projects"],
  ["education", "education"],
  ["contact", "contact"],
] as const;

export default function Home() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const savedLang = window.localStorage.getItem("resume-lang") as Lang | null;
    return savedLang && ["en", "ru", "kz"].includes(savedLang) ? savedLang : "en";
  });
  const t = dictionaries[lang];

  const changeLang = (nextLang: Lang) => {
    setLang(nextLang);
    window.localStorage.setItem("resume-lang", nextLang);
  };

  const dots = useMemo(() => mapDots.split(""), []);

  return (
    <main className="page-shell">
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Rauan Tuken home">
            Rauan Tuken
          </a>

          <nav className="nav" aria-label="Primary navigation">
            {navItems.map(([key, href]) => (
              <a key={key} href={`#${href}`}>
                {t.nav[key]}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="lang-switcher" aria-label="Language switcher">
              {(["en", "ru", "kz"] as const).map((item) => (
                <button
                  key={item}
                  className={`lang-button ${lang === item ? "active": ""}`}
                  type="button"
                  onClick={() => changeLang(item)}
                  aria-pressed={lang === item}
                >
                  {item.toUpperCase()}
                </button>  
              ))}
            </div>
            <a className="secondary-button" href="#contact">
              {t.common.contactMe}
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="container hero-content">
          <div className="status-badge">
            <span aria-hidden="true" />
            {t.common.available}
          </div>

          <h1 className="display-title">{t.hero.title}</h1>
          <p className="hero-subtitle">
            {t.hero.role}. {t.hero.description}
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="mailto:rauantuken3@gmail.com">
              {t.common.contactMe}
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
            <a className="secondary-button" href="/cv/resume.pdf">
              {t.common.downloadCv}
            </a>
          </div>

          <div className="dot-map" aria-hidden="true">
            {dots.map((dot, index) => (
              <span
                key={index}
                className={`map-dot ${dot === "0" ? "hide" : index % 5 === 0 ? "dim" : ""}`}
              />  
            ))}
          </div>
        </div>
      </section>

      <Section id="about" kicker={t.sections.aboutKicker} title={t.sections.aboutTitle}>
        <div className="about-grid">
          <div className="about-main">
            <p className="body-copy">{t.about}</p>
          </div>
          <div className="about-side fact-list">
            <Fact label="University" value={t.facts.university} />
            <Fact label="Status" value={t.facts.year} />
            <Fact label={t.common.location} value={t.facts.city} />
          </div>
        </div>
      </Section>

      <Section id="skills" kicker={t.sections.skillsKicker} title={t.sections.skillsTitle}>
        <div className="card-grid">
          <SkillCard icon={<Code2 />} title={t.skills.programming} items={skills.programming} />
          <SkillCard icon={<Smartphone />} title={t.skills.frontendMobile} items={skills.frontendMobile} />
          <SkillCard icon={<Terminal />} title={t.skills.backendDb} items={skills.backendDb} />
          <SkillCard icon={<BriefcaseBusiness />} title={t.skills.workflow} items={skills.workflow} />
          <SkillCard icon={<Languages />} title={t.skills.languages} items={skills.languages} />
          <SkillCard icon={<BookOpen />} title={t.skills.soft} items={skills.soft} />
        </div>
      </Section>

      <Section id="experience" kicker={t.sections.experienceKicker} title={t.sections.experienceTitle}>
        <div className="timeline">
          <article className="timeline-item">
            <div className="timeline-meta">
              {t.experience.period}
              <br />
              {t.experience.location}
            </div>
            <div>
              <h3 className="timeline-title">{t.experience.company}</h3>
              <p className="body-copy">{t.experience.role}</p>
              <ul className="clean-list">
                {t.experience.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </Section>

      <Section id="projects" kicker={t.sections.projectsKicker} title={t.sections.projectsTitle}>
        <article className="project-card">
          <div className="project-topline">
            <div>
              <p className="meta-text">{t.project.course}</p>
              <h3 className="timeline-title">{t.project.name}</h3>
            </div>
            <GitBranch size={32} strokeWidth={1.5} className="card-icon" />
          </div>
          <p className="body-copy">{t.project.description}</p>
          <ul className="clean-list">
            {t.project.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="hero-actions" style={{ justifyContent: "flex-start" }}>
            <a
              className="secondary-button"
              href="https://github.com/rauantuken06/quickbite-web-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.common.viewProject}
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          </div>
        </article>
      </Section>

      <Section id="education" kicker={t.sections.educationKicker} title={t.sections.educationTitle}>
        <div className="timeline">
          <article className="timeline-item">
            <div className="timeline-meta">
              {t.education.period}
              <br />
              {t.education.location}
            </div>
            <div>
              <GraduationCap size={32} strokeWidth={1.5} className="card-icon" />
              <h3 className="timeline-title">{t.education.university}</h3>
              <p className="body-copy">
                {t.education.degree}
                <br />
                {t.education.status}
              </p>
            </div>
          </article>
        </div>
      </Section>

      <Section id="contact" kicker={t.sections.contactKicker} title={t.sections.contactTitle}>
        <div className="contact-grid">
          <a className="contact-link" href="mailto:rauantuken3@gmail.com">
            <Mail size={28} strokeWidth={1.5} />
            <span>
              <span className="fact-label">{t.common.email}</span>
              <span className="fact-value">rauantuken3@gmail.com</span>
            </span>
          </a>
          <a className="contact-link" href="tel:+77056933955">
            <Phone size={28} strokeWidth={1.5} />
            <span>
              <span className="fact-label">{t.common.phone}</span>
              <span className="fact-value">+7 705 693 3955</span>
            </span>
          </a>
          <a
            className="contact-link"
            href="https://github.com/rauantuken06"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitBranch size={28} strokeWidth={1.5} />
            <span>
              <span className="fact-label">{t.common.github}</span>
              <span className="fact-value">github.com/rauantuken06</span>
            </span>
          </a>
        </div>
      </Section>

      <footer className="footer">
        <div className="container footer-inner">
          <span>{t.footer}</span>
          <span>Almaty, Kazakhstan</span>
        </div>
      </footer>
    </main>
  );
}

function Section({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-kicker">{kicker}</p>
          <h2 className="section-title">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string}) {
  return (
    <div>
      <div className="fact-label">{label}</div>
      <div className="fact-value">{value}</div>
    </div>
  );
}

function SkillCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <article className="info-card">
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <div className="badge-row">
        {items.map((item) => (
          <span className="skill-badge" key={item}>
            {item}
          </span>
        ))}
      </div>
    </article>
  )
}

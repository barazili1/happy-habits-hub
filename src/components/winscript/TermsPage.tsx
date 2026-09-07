import { motion } from "framer-motion";
import {
  Apple,
  BadgeDollarSign,
  Banknote,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Lock,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { TopBar } from "./TopBar";
import { LoadingDialog } from "./LoadingDialog";
import { GAMES, PLATFORM, type GameId } from "./platforms";
import { VerifyDialog } from "./VerifyDialog";

const PROMO = "JAC15";
const TELEGRAM_LINK = "https://t.me/+NPDZ2ZgLD4s5MWI8";
const REGISTER_LINK =
  "https://reffpa.com/L?tag=d_3355598m_97c_&site=3355598&ad=97&r=registration";
const DOWNLOAD_LINK = REGISTER_LINK;

function Step({
  index,
  total,
  title,
  subtitle,
  icon,
  done,
  children,
}: {
  index: number;
  total: number;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  done?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 210, damping: 24 }}
      className="relative grid grid-cols-[34px_minmax(0,1fr)] gap-3"
    >
      {/* rail */}
      <div className="relative flex flex-col items-center">
        <span
          className={`relative z-10 grid h-[34px] w-[34px] place-items-center rounded-full border text-[11px] font-black transition-all ${
            done
              ? "border-neon bg-neon text-background shadow-[0_0_18px_-2px_var(--neon)]"
              : "border-neon/35 bg-black text-neon"
          }`}
        >
          {done ? <Check className="h-4 w-4" /> : index}
        </span>
        {index < total && (
          <span className="absolute top-[34px] bottom-[-14px] w-px bg-gradient-to-b from-neon/45 to-neon/5" />
        )}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-neon/15 bg-black/60 p-4 backdrop-blur-sm">
        <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-neon/25 bg-neon/[0.08] text-neon">
            {icon}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-extrabold leading-tight">{title}</h2>
            {subtitle && (
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {children}
      </div>
    </motion.section>
  );
}

export function TermsPage({
  initialUserId = "",
  onVerified,
}: {
  initialUserId?: string;
  onVerified: (game: GameId, userId: string) => void;
}) {
  const [userId, setUserId] = useState(initialUserId);
  const [selectedGame, setSelectedGame] = useState<GameId | null>(null);
  const [loadingGame, setLoadingGame] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const copyPromo = async () => {
    try {
      await navigator.clipboard.writeText(PROMO);
    } catch {
      /* clipboard unavailable */
    }
    toast("تم نسخ البروموكود");
  };

  const pickGame = (id: GameId) => {
    if (loadingGame) return;
    setLoadingGame(true);
    setTimeout(() => {
      setLoadingGame(false);
      setSelectedGame(id);
      toast("تم الاتصال باللعبة المطلوبة");
    }, 3000);
  };

  const idValid = /^\d{6,14}$/.test(userId.trim());
  const doneCount = [idValid, Boolean(selectedGame)].filter(Boolean).length;
  const pct = 20 + doneCount * 40;
  const ready = idValid && Boolean(selectedGame);
  const TOTAL = 6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="relative min-h-screen bg-black"
    >
      <TopBar />

      {/* sticky progress strip */}
      <div className="sticky top-14 z-20 border-b border-neon/15 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-2.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-neon/35 bg-neon/10 px-2 py-0.5 text-[10px] font-black text-neon">
            <ShieldCheck className="h-3 w-3" />
            {PLATFORM.name}
          </span>
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-neon shadow-[0_0_12px_var(--neon)]"
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 160, damping: 24 }}
            />
          </div>
          <span className="text-sm font-black tabular-nums text-neon">{pct}%</span>
        </div>
      </div>

      <main className="relative mx-auto max-w-md px-4 pt-5">
        {/* hero */}
        <section className="relative overflow-hidden rounded-3xl border border-neon/25 bg-[radial-gradient(120%_100%_at_100%_0%,color-mix(in_oklab,var(--neon)_22%,transparent),transparent_70%)] p-5">
          <span className="pointer-events-none absolute inset-0 grid-veil opacity-50" />
          <div className="relative flex items-center gap-3">
            <img
              src={PLATFORM.image}
              alt={PLATFORM.name}
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 object-contain drop-shadow-[0_0_18px_var(--neon)]"
            />
            <div className="min-w-0">
              <h1 className="text-xl font-black leading-tight">
                شروط تشغيل <span className="neon-text">الاسكربت</span>
              </h1>
              <p className="mt-1 text-[11px] text-muted-foreground">
                أكمل الخطوات الست بالترتيب لتفعيل اسكربت الفوز
              </p>
            </div>
          </div>
          <div className="relative mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { icon: <Zap className="h-3.5 w-3.5" />, label: "تفعيل فوري" },
              { icon: <Lock className="h-3.5 w-3.5" />, label: "اتصال آمن" },
              { icon: <Sparkles className="h-3.5 w-3.5" />, label: "دقة عالية" },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center justify-center gap-1 rounded-xl border border-neon/20 bg-black/50 py-2 text-[10px] font-bold text-neon"
              >
                {c.icon}
                {c.label}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 space-y-3.5">
          <Step
            index={1}
            total={TOTAL}
            title="تحميل تطبيق 1xBet الرسمي"
            subtitle="ثبّت التطبيق لضمان عمل الاسكربت"
            icon={<Download className="h-4 w-4" />}
          >
            <a href={DOWNLOAD_LINK} target="_blank" rel="noreferrer" className="btn-white mt-3">
              <Download className="h-4 w-4" />
              تثبيت المنصة
            </a>
          </Step>

          <Step
            index={2}
            total={TOTAL}
            title="الانضمام إلى قناة التلجرام"
            subtitle="لمتابعة الإشارات اليومية"
            icon={<Send className="h-4 w-4" />}
          >
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-white-outline mt-3"
            >
              <Send className="h-4 w-4" />
              انضمام
            </a>
          </Step>

          <Step
            index={3}
            total={TOTAL}
            title="التسجيل بالبروموكود"
            subtitle="أدخل الكود أثناء إنشاء الحساب"
            icon={<Copy className="h-4 w-4" />}
          >
            <button
              type="button"
              onClick={copyPromo}
              className="mt-3 flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-neon/45 bg-neon/[0.07] px-3 py-3 transition-colors hover:bg-neon/15"
            >
              <span className="text-xl font-black tracking-[0.35em] text-neon">{PROMO}</span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-neon">
                <Copy className="h-3.5 w-3.5" />
                نسخ الكود
              </span>
            </button>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href={REGISTER_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-neon/35 bg-neon/10 text-[12px] font-extrabold text-neon transition-colors hover:bg-neon/20"
              >
                <Smartphone className="h-4 w-4" />
                أندرويد
              </a>
              <a
                href={REGISTER_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-neon/20 bg-white/5 text-[12px] font-extrabold text-foreground transition-colors hover:border-neon/50"
              >
                <Apple className="h-4 w-4" />
                أيفون
              </a>
            </div>
          </Step>

          <Step
            index={4}
            total={TOTAL}
            title="إيداع 300 جنيه أو 6 دولار"
            subtitle="الحد الأدنى لتشغيل الاسكربت"
            icon={<Banknote className="h-4 w-4" />}
          >
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-neon/20 bg-neon/[0.05] p-3 text-center">
                <Banknote className="mx-auto h-5 w-5 text-neon" />
                <p className="mt-1 text-base font-black">300 EGP</p>
                <p className="text-[10px] text-muted-foreground">الجنيه المصري</p>
              </div>
              <div className="rounded-xl border border-neon/20 bg-neon/[0.05] p-3 text-center">
                <BadgeDollarSign className="mx-auto h-5 w-5 text-neon" />
                <p className="mt-1 text-base font-black">$6 USD</p>
                <p className="text-[10px] text-muted-foreground">الدولار الأمريكي</p>
              </div>
            </div>
          </Step>

          <Step
            index={5}
            total={TOTAL}
            title="إدخل الـ ID الخاص بك"
            subtitle="رقم الحساب داخل المنصة"
            icon={<CheckCircle2 className="h-4 w-4" />}
            done={idValid}
          >
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value.replace(/\D/g, "").slice(0, 14))}
              inputMode="numeric"
              maxLength={14}
              placeholder="أدخل رقم الـ ID هنا..."
              className="mt-3 h-12 w-full rounded-xl border border-neon/20 bg-black/60 px-4 text-center text-lg font-black tracking-widest text-foreground outline-none transition-colors placeholder:text-[13px] placeholder:font-normal placeholder:tracking-normal placeholder:text-muted-foreground focus:border-neon"
            />
          </Step>

          <Step
            index={6}
            total={TOTAL}
            title="اختيار اللعبة المطلوبة"
            subtitle="اللعبة التي سيعمل عليها الاسكربت"
            icon={<Sparkles className="h-4 w-4" />}
            done={Boolean(selectedGame)}
          >
            <div className="mt-3 grid grid-cols-2 gap-3">
              {GAMES.map((g) => (
                <motion.button
                  key={g.id}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => pickGame(g.id)}
                  className={`relative flex h-[96px] w-full items-end justify-center overflow-hidden rounded-xl border text-[11px] font-extrabold transition-all ${
                    selectedGame === g.id
                      ? "border-neon text-neon shadow-[0_0_26px_-8px_var(--neon)]"
                      : "border-neon/15 text-foreground hover:border-neon/50"
                  }`}
                >
                  <img
                    src={g.image}
                    alt={g.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <span className="relative z-10 mb-2">{g.name}</span>
                  {selectedGame === g.id && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute left-1.5 top-1.5"
                    >
                      <CheckCircle2 className="h-5 w-5 text-neon" />
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </Step>
        </div>
      </main>

      {/* sticky action bar */}
      <div className="sticky bottom-0 z-20 mt-6 border-t border-neon/15 bg-black/85 backdrop-blur-md">
        <div className="mx-auto max-w-md px-4 py-3">
          <button
            type="button"
            onClick={() => {
              if (!idValid) {
                toast("الرجاء إدخال ID صحيح");
                return;
              }
              if (!selectedGame) {
                toast("الرجاء اختيار اللعبة المطلوبة");
                return;
              }
              setVerifying(true);
            }}
            className={`btn-white h-14 text-lg ${ready ? "animate-breathe" : "opacity-70"}`}
          >
            <ShieldCheck className="h-5 w-5" />
            التحقق وتشغيل الاسكربت
          </button>
        </div>
      </div>

      <LoadingDialog open={loadingGame} />
      <VerifyDialog
        open={verifying}
        onDone={() => {
          setVerifying(false);
          if (selectedGame) onVerified(selectedGame, userId.trim());
        }}
      />
    </motion.div>
  );
}

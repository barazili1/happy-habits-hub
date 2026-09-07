import { motion } from "framer-motion";
import {
  Apple,
  BadgeDollarSign,
  Banknote,
  Check,
  CheckCircle2,
  Copy,
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
const TELEGRAM_LINK = "https://t.me/+3OgVOYihck8yYjE0";
const REGISTER_LINK =
  "https://reffpa.com/L?tag=d_3355598m_97c_&site=3355598&ad=97&r=registration";

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
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 190, damping: 22 }}
      className="relative overflow-hidden rounded-3xl border border-neon/15 bg-gradient-to-b from-neon/[0.06] to-black/70 p-[1px]"
    >
      <div className="relative overflow-hidden rounded-3xl bg-black/80 p-5 backdrop-blur-sm">
        {/* oversized step number watermark */}
        <span
          aria-hidden
          className={`pointer-events-none absolute -left-2 -top-5 select-none text-[110px] font-black leading-none transition-colors ${
            done ? "text-neon/20" : "text-neon/[0.07]"
          }`}
        >
          {done ? <Check className="h-24 w-24" strokeWidth={3} /> : index}
        </span>

        <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border transition-all ${
                done
                  ? "border-neon bg-neon text-background shadow-[0_0_22px_-4px_var(--neon)]"
                  : "border-neon/25 bg-neon/[0.08] text-neon"
              }`}
            >
              {icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neon/70">
                الخطوة {index} من {total}
              </p>
              <h2 className="mt-0.5 text-base font-extrabold leading-tight">{title}</h2>
              {subtitle && (
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
          {children}
        </div>
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
  const TOTAL = 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="relative min-h-screen bg-black"
    >
      <TopBar />

      <main className="relative mx-auto max-w-md px-4 pb-12 pt-5">
        {/* hero */}
        <section className="relative overflow-hidden rounded-[2rem] border border-neon/25 bg-[radial-gradient(130%_110%_at_100%_0%,color-mix(in_oklab,var(--neon)_26%,transparent),transparent_70%)] p-6 text-center">
          <span className="pointer-events-none absolute inset-0 grid-veil opacity-50" />

          <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full border border-neon/40 bg-neon/[0.07] shadow-[0_0_45px_-8px_var(--neon)]">
            <span className="absolute inset-0 animate-spin rounded-full border-t-2 border-neon/70 [animation-duration:6s]" />
            <img
              src={PLATFORM.image}
              alt={PLATFORM.name}
              width={56}
              height={56}
              className="h-14 w-14 object-contain drop-shadow-[0_0_18px_var(--neon)]"
            />
          </div>

          <h1 className="relative mt-4 text-2xl font-black leading-tight">
            شروط تشغيل <span className="neon-text">الاسكربت</span>
          </h1>
          <p className="relative mt-1.5 text-[12px] text-muted-foreground">
            أكمل الخطوات الخمس بالترتيب لتفعيل اسكربت الفوز على {PLATFORM.name}
          </p>

          {/* progress inline in hero */}
          <div className="relative mt-5">
            <div className="flex items-center justify-between text-[10px] font-black text-neon">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                نسبة الإنجاز
              </span>
              <span className="tabular-nums">{pct}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-neon/60 to-neon shadow-[0_0_14px_var(--neon)]"
                animate={{ width: `${pct}%` }}
                transition={{ type: "spring", stiffness: 160, damping: 24 }}
              />
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

        <div className="mt-6 space-y-4">
          <Step
            index={1}
            total={TOTAL}
            title="الانضمام إلى قناة التلجرام"
            subtitle="لمتابعة الإشارات اليومية"
            icon={<Send className="h-5 w-5" />}
          >
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-white-outline mt-4"
            >
              <Send className="h-4 w-4" />
              انضمام للقناة
            </a>
          </Step>

          <Step
            index={2}
            total={TOTAL}
            title="التسجيل بالبروموكود"
            subtitle="أدخل الكود أثناء إنشاء الحساب"
            icon={<Copy className="h-5 w-5" />}
          >
            <button
              type="button"
              onClick={copyPromo}
              className="mt-4 flex w-full items-center justify-between gap-3 rounded-2xl border border-dashed border-neon/45 bg-neon/[0.07] px-4 py-3.5 transition-colors hover:bg-neon/15"
            >
              <span className="text-2xl font-black tracking-[0.35em] text-neon">{PROMO}</span>
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
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-neon/35 bg-neon/10 text-[12px] font-extrabold text-neon transition-colors hover:bg-neon/20"
              >
                <Smartphone className="h-4 w-4" />
                أندرويد
              </a>
              <a
                href={REGISTER_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-neon/20 bg-white/5 text-[12px] font-extrabold text-foreground transition-colors hover:border-neon/50"
              >
                <Apple className="h-4 w-4" />
                أيفون
              </a>
            </div>
          </Step>

          <Step
            index={3}
            total={TOTAL}
            title="إيداع 300 جنيه أو 6 دولار"
            subtitle="الحد الأدنى لتشغيل الاسكربت"
            icon={<Banknote className="h-5 w-5" />}
          >
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-neon/20 bg-neon/[0.05] p-3 text-center">
                <Banknote className="mx-auto h-5 w-5 text-neon" />
                <p className="mt-1 text-base font-black">300 EGP</p>
                <p className="text-[10px] text-muted-foreground">الجنيه المصري</p>
              </div>
              <div className="rounded-2xl border border-neon/20 bg-neon/[0.05] p-3 text-center">
                <BadgeDollarSign className="mx-auto h-5 w-5 text-neon" />
                <p className="mt-1 text-base font-black">$6 USD</p>
                <p className="text-[10px] text-muted-foreground">الدولار الأمريكي</p>
              </div>
            </div>
          </Step>

          <Step
            index={4}
            total={TOTAL}
            title="إدخل الـ ID الخاص بك"
            subtitle="رقم الحساب داخل المنصة"
            icon={<CheckCircle2 className="h-5 w-5" />}
            done={idValid}
          >
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value.replace(/\D/g, "").slice(0, 14))}
              inputMode="numeric"
              maxLength={14}
              placeholder="أدخل رقم الـ ID هنا..."
              className="mt-4 h-13 w-full rounded-2xl border border-neon/20 bg-black/60 px-4 py-3.5 text-center text-lg font-black tracking-widest text-foreground outline-none transition-colors placeholder:text-[13px] placeholder:font-normal placeholder:tracking-normal placeholder:text-muted-foreground focus:border-neon"
            />
          </Step>

          <Step
            index={5}
            total={TOTAL}
            title="اختيار اللعبة المطلوبة"
            subtitle="اللعبة التي سيعمل عليها الاسكربت"
            icon={<Sparkles className="h-5 w-5" />}
            done={Boolean(selectedGame)}
          >
            <div className="mt-4 grid grid-cols-2 gap-3">
              {GAMES.map((g) => (
                <motion.button
                  key={g.id}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => pickGame(g.id)}
                  className={`relative flex h-[104px] w-full items-end justify-center overflow-hidden rounded-2xl border text-[11px] font-extrabold transition-all ${
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

        {/* verify button — flows with the page, not fixed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ type: "spring", stiffness: 190, damping: 22 }}
          className="mt-8"
        >
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
            className={`btn-white h-16 rounded-2xl text-lg ${ready ? "animate-breathe" : "opacity-70"}`}
          >
            <ShieldCheck className="h-5 w-5" />
            التحقق وتشغيل الاسكربت
          </button>
          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            بالضغط على الزر أنت توافق على شروط الاستخدام وسياسة الخصوصية
          </p>
        </motion.div>
      </main>

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

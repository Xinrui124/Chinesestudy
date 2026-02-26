/*************************************************
 * 我是语文小状元 - 二年级闯关（纯前端）
 * 流程：板块 → 单元 → 课文 → 闯关
 * 规则：做完立刻反馈；错题必须重做；答对 +1 分
 * 全班同榜：Google Apps Script（已配置）
 *************************************************/

const REMOTE_LEADERBOARD_URL =
  "https://script.google.com/macros/s/AKfycbzAbU2XhV4zJE6bTSzHexs3_pXuZEkPs4RjOQ0QHXpaCOzufbzbdOGoTzx5wFINU_MByg/exec";

// ====== 课本目录（8 单元 + 课文清单）======
const CURRICULUM = {
  "第一单元": ["古诗二首", "找春天", "开满鲜花的小路", "邓小平爷爷植树", "语文园地一"],
  "第二单元": ["雷锋叔叔，你在哪里", "千人糕", "我不是最弱小的", "语文园地二"],
  "第三单元": ["神州谣", "传统节日", "“贝”的故事", "中国美食", "语文园地三"],
  "第四单元": ["彩色的梦", "一匹出色的马", "枫树上的喜鹊", "语文园地四"],
  "第五单元": ["寓言二则", "画杨桃", "小马过河", "语文园地五"],
  "第六单元": ["古诗二首", "雷雨", "要是你在野外迷了路", "太空生活趣事多", "语文园地六"],
  "第七单元": ["大象的耳朵", "蜘蛛开店", "青蛙卖泥塘", "小毛虫", "语文园地七"],
  "第八单元": ["羿射九日", "黄帝的传说", "大禹治水", "语文园地八"]
};

const TOPICS = ["字词", "句子", "古诗", "阅读"];

// ====== 题库（选择题：字词 + 阅读）======
const QUESTION_BANK = [
  /* 字词 / 第一单元 / 古诗二首 */
  { id:"ZC-U1-GS-001", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"“妆”的正确读音是（ ）", options:["zhuāng","zuāng","zhāng","zuǎng"], answerIndex:0 },
  { id:"ZC-U1-GS-002", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"“裁”的正确读音是（ ）", options:["cái","chái","cāi","zǎi"], answerIndex:0 },
  { id:"ZC-U1-GS-003", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"“莺”的正确读音是（ ）", options:["yīng","yīn","yíng","yìng"], answerIndex:0 },
  { id:"ZC-U1-GS-004", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"“拂”的正确读音是（ ）", options:["fú","fó","fǔ","fù"], answerIndex:0 },
  { id:"ZC-U1-GS-005", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"“趁”的正确读音是（ ）", options:["chèn","chèng","chéng","chěn"], answerIndex:0 },

  { id:"ZC-U1-GS-006", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"春天到了，我们一起读古（ ）。", options:["诗","失"], answerIndex:0 },
  { id:"ZC-U1-GS-007", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"（ ）年是最快乐的时光。", options:["童","同","铜"], answerIndex:0 },
  { id:"ZC-U1-GS-008", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"小朋友们在草地上放风筝，欢声笑语像一首美丽的（ ）。", options:["诗","失"], answerIndex:0 },
  { id:"ZC-U1-GS-009", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"二月春风似（ ）刀。", options:["剪","前"], answerIndex:0 },
  { id:"ZC-U1-GS-010", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"小明和我（ ）心协力完成任务。", options:["童","同","铜"], answerIndex:1 },
  { id:"ZC-U1-GS-011", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"他在吹（ ）号。", options:["铜","童","同"], answerIndex:0 },
  { id:"ZC-U1-GS-012", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"春风像一把（ ）刀，裁出了嫩绿的柳叶。", options:["剪","前"], answerIndex:0 },

  { id:"ZC-U1-GS-013", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"不知细叶谁裁出，______________。", options:["二月春风似剪刀","三月春风像剪刀","二月春风如小刀","二月春风剪细叶"], answerIndex:0 },

  { id:"ZC-U1-GS-014", topic:"字词", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"（ ）长莺飞二月天，拂堤杨柳醉（ ）。",
    desc:"提示：选出正确的两处填词组合。",
    options:["草……春烟","花……春风","草……春风","花……春烟"], answerIndex:0 },

  /* 阅读 / 第一单元 / 古诗二首 */
  { id:"YD-U1-GS-001", topic:"阅读", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"《咏柳》这首诗表达了诗人对( )的赞美之情。", options:["柳树","杨树","松树","柏树"], answerIndex:0 },
  { id:"YD-U1-GS-002", topic:"阅读", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"《村居》这首诗表达了诗人对( )的热爱之情。", options:["夏天","秋天","春天","冬天"], answerIndex:2 },
  { id:"YD-U1-GS-003", topic:"阅读", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"《咏柳》中把春风比作剪刀的诗句是( )",
    options:["碧玉妆成一树高，万条垂下绿丝绦。","不知细叶谁裁出，二月春风似剪刀。"], answerIndex:1 },
  { id:"YD-U1-GS-004", topic:"阅读", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"《村居》中描绘孩子们放学后快乐情景的诗句是( )",
    options:["草长莺飞二月天，拂堤杨柳醉春烟。","儿童散学归来早，忙趁东风放纸鸢。"], answerIndex:1 },
  { id:"YD-U1-GS-005", topic:"阅读", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"“不知细叶谁裁出”中“裁”的意思是(）", options:["裁剪","裁判","量体裁衣"], answerIndex:0 },
  { id:"YD-U1-GS-006", topic:"阅读", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"“拂堤杨柳醉春烟”中“醉”的意思是(）", options:["喝醉","陶醉","迷醉"], answerIndex:1 },
  { id:"YD-U1-GS-007", topic:"阅读", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"判断对错：《村居》和《咏柳》都是描写春天的古诗。( )", options:["√","X"], answerIndex:0 },
  { id:"YD-U1-GS-008", topic:"阅读", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"判断对错：“儿童散学归来早”中“散学”的意思是放学。( )", options:["√","X"], answerIndex:0 },
  { id:"YD-U1-GS-009", topic:"阅读", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"判断对错：“万条垂下绿丝绦”中“万条”指一万条柳枝。( )", options:["√","X"], answerIndex:1 },
  { id:"YD-U1-GS-010", topic:"阅读", unit:"第一单元", lesson:"古诗二首", type:"mcq",
    stem:"判断对错：《咏柳》的作者是唐代诗人贺知章。( )", options:["√","X"], answerIndex:0 }
];

// ====== 本机存储（姓名 + 兜底积分展示）======
const LS = {
  NAME: "ywxzy_name_v5",
  LOCAL_DAILY: "ywxzy_local_daily_scores_v5"
};

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function getName() { return (localStorage.getItem(LS.NAME) || "").trim(); }
function setName(name) { localStorage.setItem(LS.NAME, name.trim()); }

// ====== 本机兜底（仅用于首页“今日积分”快速显示）======
function getLocalDailyMap() {
  try { return JSON.parse(localStorage.getItem(LS.LOCAL_DAILY) || "{}"); }
  catch { return {}; }
}
function setLocalDailyMap(obj) {
  localStorage.setItem(LS.LOCAL_DAILY, JSON.stringify(obj));
}
function getLocalTodayScoreFor(name) {
  if (!name) return 0;
  const map = getLocalDailyMap();
  const t = todayKey();
  return map[t]?.[name] ?? 0;
}
function addLocalTodayScore(name, delta) {
  if (!name) return;
  const map = getLocalDailyMap();
  const t = todayKey();
  if (!map[t]) map[t] = {};
  if (!map[t][name]) map[t][name] = 0;
  map[t][name] += delta;
  setLocalDailyMap(map);
}

// ====== 远程榜单（全班同榜）======
function hasRemote() {
  return typeof REMOTE_LEADERBOARD_URL === "string" && REMOTE_LEADERBOARD_URL.trim().length > 0;
}

async function remoteAddScore(name, delta) {
  try {
    const res = await fetch(REMOTE_LEADERBOARD_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ date: todayKey(), name, delta })
    });
    return await res.json().catch(() => ({ ok:false }));
  } catch (e) {
    return { ok:false, error:String(e) };
  }
}

async function remoteGetBoard() {
  try {
    const url = `${REMOTE_LEADERBOARD_URL}?date=${encodeURIComponent(todayKey())}`;
    const res = await fetch(url, { method: "GET" });
    return await res.json().catch(() => ({ ok:false, entries:[] }));
  } catch (e) {
    return { ok:false, entries:[], error:String(e) };
  }
}

// ====== DOM ======
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const views = {
  home: $("#view-home"),
  unit: $("#view-unit"),
  lesson: $("#view-lesson"),
  game: $("#view-game"),
  board: $("#view-board")
};

const navBtns = $$(".navBtn");

const studentNameInput = $("#studentName");
const btnSaveName = $("#btnSaveName");
const nameText = $("#nameText");
const todayScoreText = $("#todayScoreText");

const unitTopicText = $("#unitTopicText");
const unitNameText = $("#unitNameText");
const unitGrid = $("#unitGrid");
const btnBackHome1 = $("#btnBackHome1");

const lessonTopicText = $("#lessonTopicText");
const lessonUnitText = $("#lessonUnitText");
const lessonNameText = $("#lessonNameText");
const lessonGrid = $("#lessonGrid");
const btnBackUnit = $("#btnBackUnit");
const btnBackHome2 = $("#btnBackHome2");

const topicBadge = $("#topicBadge");
const unitBadge = $("#unitBadge");
const lessonBadge = $("#lessonBadge");
const playerNameInGame = $("#playerNameInGame");

const roundScoreEl = $("#roundScore");
const dayScoreEl = $("#dayScore");
const progressBar = $("#progressBar");
const qIndexEl = $("#qIndex");
const qTitleEl = $("#qTitle");
const qDescEl = $("#qDesc");
const qBody = $("#qBody");
const feedback = $("#feedback");
const btnNext = $("#btnNext");
const btnQuitToLesson = $("#btnQuitToLesson");

const champText = $("#champText");
const champSub = $("#champSub");
const boardStatus = $("#boardStatus");
const boardList = $("#boardList");
const podiumGrid = $("#podiumGrid");
const btnRefreshBoard = $("#btnRefreshBoard");

const flowerBtns = $$(".flower");

// ====== 状态 ======
let selectedTopic = null;
let selectedUnit = null;
let selectedLesson = null;

let list = [];
let i = 0;
let roundScore = 0;
let unlockedNext = false;

// ====== 视图切换 ======
function showView(view) {
  Object.keys(views).forEach((k) => views[k].classList.toggle("hidden", k !== view));
  navBtns.forEach((b) => b.classList.toggle("active", b.dataset.view === view));

  if (view === "home") refreshHome();
  if (view === "board") renderBoard();
}

function refreshHome() {
  const nm = getName();
  nameText.textContent = nm || "未填写";
  studentNameInput.value = nm;
  todayScoreText.textContent = String(getLocalTodayScoreFor(nm));
}

function ensureNameOrToast() {
  const nm = getName();
  if (!nm) {
    alert("请先输入姓名并确认～");
    showView("home");
    return null;
  }
  return nm;
}

// ====== 板块 → 单元 ======
function openUnits(topic) {
  const nm = ensureNameOrToast();
  if (!nm) return;

  selectedTopic = topic;
  selectedUnit = null;
  selectedLesson = null;

  unitTopicText.textContent = topic;
  unitNameText.textContent = nm;

  renderUnitGrid();
  showView("unit");
}

function renderUnitGrid() {
  unitGrid.innerHTML = "";
  const units = Object.keys(CURRICULUM);

  units.forEach((unitName, idx) => {
    const card = document.createElement("div");
    card.className = `unitCard uc${(idx % 4) + 1}`;
    card.innerHTML = `<div class="t">${unitName}</div><div class="s">点击进入课文列表</div>`;
    card.addEventListener("click", () => openLessons(unitName));
    unitGrid.appendChild(card);
  });
}

// ====== 单元 → 课文 ======
function openLessons(unitName) {
  const nm = ensureNameOrToast();
  if (!nm) return;

  selectedUnit = unitName;
  selectedLesson = null;

  lessonTopicText.textContent = selectedTopic || "—";
  lessonUnitText.textContent = selectedUnit || "—";
  lessonNameText.textContent = nm;

  renderLessonGrid();
  showView("lesson");
}

function renderLessonGrid() {
  lessonGrid.innerHTML = "";
  const lessons = CURRICULUM[selectedUnit] || [];

  lessons.forEach((lessonName, idx) => {
    const card = document.createElement("div");
    card.className = `lessonCard lc${(idx % 4) + 1}`;

    const count = countQuestions(selectedTopic, selectedUnit, lessonName);
    const sub = count > 0 ? `题目数量：${count} 题` : "暂无题库（可继续补充）";

    card.innerHTML = `<div class="t">${lessonName}</div><div class="s">${sub}</div>`;
    card.addEventListener("click", () => startLesson(lessonName));
    lessonGrid.appendChild(card);
  });
}

function countQuestions(topic, unit, lesson) {
  return QUESTION_BANK.filter((q) => q.topic === topic && q.unit === unit && q.lesson === lesson).length;
}

// ====== 课文 → 闯关 ======
function startLesson(lessonName) {
  const nm = ensureNameOrToast();
  if (!nm) return;

  selectedLesson = lessonName;

  list = QUESTION_BANK.filter(
    (q) => q.topic === selectedTopic && q.unit === selectedUnit && q.lesson === selectedLesson
  );

  if (!list.length) {
    alert(`“${selectedTopic} - ${selectedUnit} - ${selectedLesson}” 暂时没有题库。\n把题库发我即可继续补充～`);
    return;
  }

  list = shuffle([...list]);
  i = 0;
  roundScore = 0;
  unlockedNext = false;

  topicBadge.textContent = `板块：${selectedTopic}`;
  unitBadge.textContent = `单元：${selectedUnit}`;
  lessonBadge.textContent = `课文：${selectedLesson}`;
  playerNameInGame.textContent = nm;

  roundScoreEl.textContent = "0";
  dayScoreEl.textContent = String(getLocalTodayScoreFor(nm));

  showView("game");
  renderQuestion();
}

function renderQuestion() {
  unlockedNext = false;
  btnNext.disabled = true;

  const q = list[i];
  const total = list.length;

  qIndexEl.textContent = `第 ${i + 1} 题（共 ${total} 题）`;
  qTitleEl.textContent = q.stem;
  qDescEl.textContent = q.desc || "";

  progressBar.style.width = `${Math.round((i / total) * 100)}%`;

  feedback.className = "feedback";
  feedback.textContent = "";

  qBody.innerHTML = "";
  renderMCQ(q);
}

async function passQuestion() {
  const nm = getName();

  roundScore += 1;
  roundScoreEl.textContent = String(roundScore);

  // 本机先加分（UI 立即反馈）
  addLocalTodayScore(nm, 1);
  const localToday = getLocalTodayScoreFor(nm);
  dayScoreEl.textContent = String(localToday);
  todayScoreText.textContent = String(localToday);

  // 远程提交（全班同榜）
  const r = await remoteAddScore(nm, 1);

  feedback.className = "feedback ok";
  feedback.textContent = (r && r.ok === true)
    ? "✅ 答对啦！+1 分"
    : "✅ 答对啦！+1 分（远程提交可能失败，稍后刷新榜单查看）";

  unlockedNext = true;
  btnNext.disabled = false;
}

function failAndRetry(msg) {
  feedback.className = "feedback bad";
  feedback.textContent = `❌ ${msg}（要重做直到正确）`;
  unlockedNext = false;
  btnNext.disabled = true;
}

function nextQuestion() {
  if (!unlockedNext) return;

  const total = list.length;
  if (i < total - 1) {
    i += 1;
    renderQuestion();
    return;
  }

  progressBar.style.width = "100%";
  qIndexEl.textContent = "完成";
  qTitleEl.textContent = `本课文闯关完成！本轮得分：${roundScore} / ${total}`;
  qDescEl.textContent = "你可以返回课文列表继续学习，或去“今日榜单”看看。";
  qBody.innerHTML = "";
  feedback.className = "feedback ok";
  feedback.textContent = "🎉 继续加油，冲击语文小状元！";
  btnNext.disabled = true;
}

// ====== 题型：选择题 ======
function renderMCQ(q) {
  const grid = document.createElement("div");
  grid.className = "mcqGrid";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;

    btn.addEventListener("click", async () => {
      const correct = idx === q.answerIndex;
      if (correct) {
        btn.classList.add("good");
        [...grid.querySelectorAll("button")].forEach((b) => (b.disabled = true));
        await passQuestion();
      } else {
        btn.classList.add("bad");
        failAndRetry("再想一想～");
      }
    });

    grid.appendChild(btn);
  });

  qBody.appendChild(grid);
}

// ====== 今日榜单（领奖台 + 列表） ======
function crownSVG() {
  // 简洁皇冠（SVG），自带金色渐变
  return `
  <div class="crown crownBounce" aria-hidden="true">
    <div class="crownGlow"></div>
    <svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="64" y2="48" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFE08A"/>
          <stop offset="0.55" stop-color="#F6C453"/>
          <stop offset="1" stop-color="#F2B83B"/>
        </linearGradient>
      </defs>
      <path d="M8 18 L18 28 L28 12 L36 28 L46 12 L52 28 L56 18 L56 38 H8 V18 Z" fill="url(#g)" stroke="rgba(30,30,60,.18)" stroke-width="2" />
      <circle cx="28" cy="12" r="4" fill="url(#g)" stroke="rgba(30,30,60,.18)" stroke-width="2"/>
      <circle cx="46" cy="12" r="4" fill="url(#g)" stroke="rgba(30,30,60,.18)" stroke-width="2"/>
      <circle cx="8" cy="18" r="3.5" fill="url(#g)" stroke="rgba(30,30,60,.18)" stroke-width="2"/>
      <circle cx="56" cy="18" r="3.5" fill="url(#g)" stroke="rgba(30,30,60,.18)" stroke-width="2"/>
    </svg>
  </div>`;
}

function safeText(s) {
  return String(s ?? "").replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

function renderPodium(entries) {
  // entries: [{name, score}] 已排序 desc
  const top3 = [entries[0], entries[1], entries[2]];

  // 领奖台排序：2,1,3 更像真实领奖台视觉
  const order = [
    { idx: 1, cls: "p2", medal: "🥈", label: "第 2 名" },
    { idx: 0, cls: "p1", medal: "🥇", label: "第 1 名" },
    { idx: 2, cls: "p3", medal: "🥉", label: "第 3 名" }
  ];

  podiumGrid.innerHTML = "";

  order.forEach(({ idx, cls, medal, label }) => {
    const item = top3[idx];
    const name = item ? safeText(item.name) : "—";
    const score = item ? Number(item.score || 0) : 0;

    const div = document.createElement("div");
    div.className = `podiumCard ${cls}`;

    div.innerHTML = `
      <div class="podiumTop">
        <div class="rankTag">${label}</div>
        <div class="rankMedal">${medal}</div>
      </div>

      ${cls === "p1" && item ? crownSVG() : ""}

      <div class="podiumName">${name}</div>
      <div class="podiumScore">${item ? `积分：${score} 分` : "等待上榜…"}</div>

      <div class="podiumBase">
        <span class="muted">日期：${todayKey()}</span>
        <span class="muted">全班同榜</span>
      </div>
    `;

    podiumGrid.appendChild(div);
  });
}

async function renderBoard() {
  boardList.innerHTML = "";
  champText.textContent = "—";
  champSub.textContent = "—";
  boardStatus.textContent = "正在加载全班榜单…";
  podiumGrid.innerHTML = "";

  if (!hasRemote()) {
    boardStatus.textContent = "未配置远程榜单链接（请检查 app.js）";
    boardList.innerHTML = `<div class="muted">暂无数据</div>`;
    return;
  }

  const data = await remoteGetBoard();

  if (!(data && data.ok && Array.isArray(data.entries))) {
    boardStatus.textContent = "榜单加载失败（请稍后再试）";
    boardList.innerHTML = `<div class="muted">加载失败</div>`;
    return;
  }

  const entries = data.entries
    .map(e => ({ name: String(e.name || ""), score: Number(e.score || 0) }))
    .sort((a,b) => b.score - a.score);

  boardStatus.textContent = `全班同榜 · ${todayKey()} · 共 ${entries.length} 人上榜`;

  if (entries.length === 0) {
    podiumGrid.innerHTML = `
      <div class="muted">今天还没有人上榜～先去答题吧！</div>
    `;
    boardList.innerHTML = `<div class="muted">暂无数据</div>`;
    return;
  }

  // 语文小状元（第一名）
  champText.textContent = entries[0].name;
  champSub.textContent = `今日积分：${entries[0].score} 分`;

  // 领奖台
  renderPodium(entries);

  // 完整列表
  entries.forEach((e, idx) => {
    const div = document.createElement("div");
    div.className = "boardCard";
    div.style.borderRadius = "14px";
    div.style.padding = "10px 12px";
    div.innerHTML = `<strong>#${idx + 1}</strong>　${safeText(e.name)}　<span class="muted">·</span>　<strong>${e.score}</strong> 分`;
    boardList.appendChild(div);
  });
}

// ====== 工具 ======
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ====== 事件绑定 ======
navBtns.forEach((b) => b.addEventListener("click", () => showView(b.dataset.view)));

btnSaveName.addEventListener("click", () => {
  const name = (studentNameInput.value || "").trim();
  if (!name) {
    alert("姓名不能为空～");
    return;
  }
  setName(name);
  refreshHome();
  alert(`已保存姓名：${name}。现在可以选择板块开始闯关啦！`);
});

flowerBtns.forEach((btn) => btn.addEventListener("click", () => openUnits(btn.dataset.topic)));

btnBackHome1.addEventListener("click", () => showView("home"));
btnBackHome2.addEventListener("click", () => showView("home"));
btnBackUnit.addEventListener("click", () => openUnits(selectedTopic));

btnQuitToLesson.addEventListener("click", () => openLessons(selectedUnit));
btnNext.addEventListener("click", nextQuestion);

btnRefreshBoard.addEventListener("click", renderBoard);

// ====== 启动 ======
refreshHome();
showView("home");

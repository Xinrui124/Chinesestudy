/*************************************************
 * 我是语文小状元 - 二年级闯关（纯前端）
 * 流程：板块 → 单元 → 课文 → 闯关
 * 规则：做完立刻反馈；错题必须重做；答对 +1 分
 * 榜单：本机 localStorage（无后端）
 *************************************************/

// ====== 课本目录（你给的 8 单元 + 课文清单）======
const CURRICULUM = {
  "第一单元": ["古诗二首","找春天","开满鲜花的小路","邓小平爷爷植树","语文园地一"],
  "第二单元": ["雷锋叔叔，你在哪里","千人糕","我不是最弱小的","语文园地二"],
  "第三单元": ["神州谣","传统节日","“贝”的故事","中国美食","语文园地三"],
  "第四单元": ["彩色的梦","一匹出色的马","枫树上的喜鹊","语文园地四"],
  "第五单元": ["寓言二则","画杨桃","小马过河","语文园地五"],
  "第六单元": ["古诗二首","雷雨","要是你在野外迷了路","太空生活趣事多","语文园地六"],
  "第七单元": ["大象的耳朵","蜘蛛开店","青蛙卖泥塘","小毛虫","语文园地七"],
  "第八单元": ["羿射九日","黄帝的传说","大禹治水","语文园地八"]
};

const TOPICS = ["字词","句子","古诗","阅读"];

// ====== 题库（已替换为：字词-第一单元-古诗二首）======
const QUESTION_BANK = [
  // 选择题：读音
  {
    id: "ZC-U1-GS-001",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "mcq",
    stem: "“妆”的正确读音是（ ）",
    options: ["zhuāng","zuāng","zhāng","zuǎng"],
    answerIndex: 0,
    explain: "“妆”读 zhuāng。"
  },
  {
    id: "ZC-U1-GS-002",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "mcq",
    stem: "“裁”的正确读音是（ ）",
    options: ["cái","chái","cāi","zǎi"],
    answerIndex: 0,
    explain: "“裁”读 cái。"
  },
  {
    id: "ZC-U1-GS-003",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "mcq",
    stem: "“莺”的正确读音是（ ）",
    options: ["yīng","yīn","yíng","yìng"],
    answerIndex: 0,
    explain: "“莺”读 yīng。"
  },
  {
    id: "ZC-U1-GS-004",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "mcq",
    stem: "“拂”的正确读音是（ ）",
    options: ["fú","fó","fǔ","fù"],
    answerIndex: 0,
    explain: "“拂”读 fú。"
  },
  {
    id: "ZC-U1-GS-005",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "mcq",
    stem: "“趁”的正确读音是（ ）",
    options: ["chèn","chèng","chéng","chěn"],
    answerIndex: 0,
    explain: "“趁”读 chèn。"
  },

  // 单空选字（点选/拖拽）
  {
    id: "ZC-U1-GS-006",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "match_single",
    stem: "春天到了，我们一起读古（   ）。",
    desc: "点一下选项，再点括号；也支持拖拽到括号。",
    choices: ["诗","失"],
    answer: "诗",
    explain: "“古诗”。"
  },
  {
    id: "ZC-U1-GS-007",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "match_single",
    stem: "（   ）年是最快乐的时光。",
    desc: "从下面选一个填入括号。",
    choices: ["童","同","铜"],
    answer: "童",
    explain: "“童年”。"
  },
  {
    id: "ZC-U1-GS-008",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "match_single",
    stem: "小朋友们在草地上放风筝，欢声笑语像一首美丽的（   ）。",
    choices: ["诗","失"],
    answer: "诗",
    explain: "“一首美丽的诗”。"
  },
  {
    id: "ZC-U1-GS-009",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "match_single",
    stem: "二月春风似（   ）刀。",
    choices: ["剪","前"],
    answer: "剪",
    explain: "“似剪刀”。"
  },
  {
    id: "ZC-U1-GS-010",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "match_single",
    stem: "小明和我（   ）心协力完成任务。",
    choices: ["童","同","铜"],
    answer: "同",
    explain: "“同心协力”。"
  },
  {
    id: "ZC-U1-GS-011",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "match_single",
    stem: "他在吹（   ）号。",
    choices: ["铜","童","同"],
    answer: "铜",
    explain: "“吹铜号”。"
  },
  {
    id: "ZC-U1-GS-012",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "match_single",
    stem: "春风像一把（   ）刀，裁出了嫩绿的柳叶。",
    choices: ["剪","前"],
    answer: "剪",
    explain: "“一把剪刀”。"
  },

  // 整句填空
  {
    id: "ZC-U1-GS-013",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "fill",
    stem: "不知细叶谁裁出，______________。",
    desc: "提示：填写整句",
    answers: ["二月春风似剪刀"],
    explain: "原句：不知细叶谁裁出，二月春风似剪刀。"
  },

  // 两空填空
  {
    id: "ZC-U1-GS-014",
    topic: "字词",
    unit: "第一单元",
    lesson: "古诗二首",
    type: "fill_multi",
    stem: "（ ）长莺飞二月天，拂堤杨柳醉（ ）。",
    desc: "填写两个词语。",
    blanks: [
      { answers: ["草"] },
      { answers: ["春烟"] }
    ],
    explain: "原句：草长莺飞二月天，拂堤杨柳醉春烟。"
  }
];

// ====== 存储键 ======
const LS = {
  NAME: "ywxzy_name_v2",
  DAILY: "ywxzy_daily_scores_v2" // { "YYYY-MM-DD": { "小明": 12 } }
};

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getDailyMap() {
  try {
    const raw = localStorage.getItem(LS.DAILY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setDailyMap(obj) {
  localStorage.setItem(LS.DAILY, JSON.stringify(obj));
}

function getName() {
  return (localStorage.getItem(LS.NAME) || "").trim();
}

function setName(name) {
  localStorage.setItem(LS.NAME, name.trim());
}

function getTodayScoreFor(name) {
  if (!name) return 0;
  const map = getDailyMap();
  const t = todayKey();
  return (map[t] && map[t][name]) ? map[t][name] : 0;
}

function addTodayScore(name, delta) {
  if (!name) return;
  const map = getDailyMap();
  const t = todayKey();
  if (!map[t]) map[t] = {};
  if (!map[t][name]) map[t][name] = 0;
  map[t][name] += delta;
  setDailyMap(map);
}

// ====== DOM ======
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const views = {
  home: $("#view-home"),
  unit: $("#view-unit"),
  lesson: $("#view-lesson"),
  game: $("#view-game"),
  board: $("#view-board"),
  teacher: $("#view-teacher")
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

const boardList = $("#boardList");
const champText = $("#champText");
const champSub = $("#champSub");
const btnClearBoard = $("#btnClearBoard");

const flowerBtns = $$(".flower");

// ====== 状态 ======
let currentView = "home";
let selectedTopic = null;
let selectedUnit = null;
let selectedLesson = null;

let list = [];
let i = 0;
let roundScore = 0;
let unlockedNext = false;

// match_single 辅助：移动端点选
let chosenChipValue = null;

function showView(view) {
  currentView = view;
  Object.keys(views).forEach(k => views[k].classList.toggle("hidden", k !== view));
  navBtns.forEach(b => b.classList.toggle("active", b.dataset.view === view));

  if (view === "home") refreshHome();
  if (view === "board") renderBoard();
}

function refreshHome() {
  const nm = getName();
  nameText.textContent = nm || "未填写";
  studentNameInput.value = nm;
  todayScoreText.textContent = String(getTodayScoreFor(nm));
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
    card.innerHTML = `
      <div class="t">${unitName}</div>
      <div class="s">点击进入课文列表</div>
    `;
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

    card.innerHTML = `
      <div class="t">${lessonName}</div>
      <div class="s">${sub}</div>
    `;
    card.addEventListener("click", () => startLesson(lessonName));
    lessonGrid.appendChild(card);
  });
}

function countQuestions(topic, unit, lesson) {
  return QUESTION_BANK.filter(q =>
    q.topic === topic && q.unit === unit && q.lesson === lesson
  ).length;
}

// ====== 课文 → 闯关 ======
function startLesson(lessonName) {
  const nm = ensureNameOrToast();
  if (!nm) return;

  selectedLesson = lessonName;

  list = QUESTION_BANK.filter(q =>
    q.topic === selectedTopic &&
    q.unit === selectedUnit &&
    q.lesson === selectedLesson
  );

  if (!list.length) {
    alert(`“${selectedTopic} - ${selectedUnit} - ${selectedLesson}” 暂时没有题库。\n你把题库发我，我马上帮你整理进去～`);
    return;
  }

  // 乱序
  list = shuffle([...list]);
  i = 0;
  roundScore = 0;
  unlockedNext = false;

  // 顶部信息
  topicBadge.textContent = `板块：${selectedTopic}`;
  unitBadge.textContent = `单元：${selectedUnit}`;
  lessonBadge.textContent = `课文：${selectedLesson}`;
  playerNameInGame.textContent = nm;

  roundScoreEl.textContent = "0";
  dayScoreEl.textContent = String(getTodayScoreFor(nm));

  showView("game");
  renderQuestion();
}

function renderQuestion() {
  unlockedNext = false;
  btnNext.disabled = true;
  chosenChipValue = null;

  const q = list[i];
  const total = list.length;

  qIndexEl.textContent = `第 ${i + 1} 题（共 ${total} 题）`;
  qTitleEl.textContent = q.stem;
  qDescEl.textContent = q.desc || "";

  progressBar.style.width = `${Math.round((i / total) * 100)}%`;

  feedback.className = "feedback";
  feedback.textContent = "";

  qBody.innerHTML = "";

  if (q.type === "mcq") renderMCQ(q);
  else if (q.type === "match_single") renderMatchSingle(q);
  else if (q.type === "fill") renderFill(q);
  else if (q.type === "fill_multi") renderFillMulti(q);
  else {
    qBody.innerHTML = `<div class="muted">未知题型：${q.type}</div>`;
  }
}

function passQuestion(withExplain) {
  const nm = getName();
  roundScore += 1;
  roundScoreEl.textContent = String(roundScore);

  addTodayScore(nm, 1);
  dayScoreEl.textContent = String(getTodayScoreFor(nm));

  unlockedNext = true;
  btnNext.disabled = false;

  feedback.className = "feedback ok";
  feedback.textContent = `✅ 答对啦！+1 分${withExplain ? " 解析：" + withExplain : ""}`;
}

function failAndRetry(msg, explain) {
  feedback.className = "feedback bad";
  feedback.textContent = `❌ ${msg}（要重做直到正确）${explain ? " 解析：" + explain : ""}`;
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

// ====== 题型渲染 ======
function renderMCQ(q) {
  const grid = document.createElement("div");
  grid.className = "mcqGrid";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;
    btn.addEventListener("click", () => {
      const correct = idx === q.answerIndex;
      if (correct) {
        btn.classList.add("good");
        [...grid.querySelectorAll("button")].forEach(b => b.disabled = true);
        passQuestion(q.explain);
      } else {
        btn.classList.add("bad");
        failAndRetry("再想一想～", q.explain || "");
      }
    });
    grid.appendChild(btn);
  });

  qBody.appendChild(grid);
}

function renderMatchSingle(q) {
  const wrap = document.createElement("div");
  wrap.className = "matchOneWrap";

  const desc = document.createElement("div");
  desc.className = "muted tiny";
  desc.textContent = q.desc || "点选或拖拽把正确的字填入括号。";
  wrap.appendChild(desc);

  // 句子显示 + 空格放置区
  const zone = document.createElement("div");
  zone.className = "blankZone";
  zone.innerHTML = `
    <div>
      <div class="muted tiny">题目：</div>
      <div class="blankText">${q.stem}</div>
    </div>
    <div style="text-align:right">
      <div class="muted tiny">括号里放这里</div>
      <div class="blankHint" id="blankHint">（点选后再点这里 / 或拖拽到这里）</div>
    </div>
  `;

  // 让右侧成为可放置区域
  const blankHint = zone.querySelector("#blankHint");
  blankHint.dataset.value = "";

  // 拖拽支持（桌面）
  blankHint.addEventListener("dragover", (e) => e.preventDefault());
  blankHint.addEventListener("drop", (e) => {
    e.preventDefault();
    const val = e.dataTransfer.getData("text/plain");
    if (!val) return;
    placeMatchSingle(val);
  });

  // 点选支持（平板/手机）
  blankHint.style.cursor = "pointer";
  blankHint.addEventListener("click", () => {
    if (!chosenChipValue) {
      failAndRetry("先点一下下面的选项哦～", q.explain || "");
      return;
    }
    placeMatchSingle(chosenChipValue);
  });

  wrap.appendChild(zone);

  // 选项 chips
  const row = document.createElement("div");
  row.className = "choiceRow";

  q.choices.forEach((ch) => {
    const chip = document.createElement("div");
    chip.className = "chip draggable";
    chip.textContent = ch;
    chip.draggable = true;
    chip.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", ch);
    });
    chip.addEventListener("click", () => {
      chosenChipValue = ch;
      [...row.querySelectorAll(".chip")].forEach(x => x.classList.remove("selected"));
      chip.classList.add("selected");
    });
    row.appendChild(chip);
  });

  wrap.appendChild(row);

  // 放置判断
  function placeMatchSingle(val) {
    blankHint.textContent = `已填：${val}（点击可改）`;
    blankHint.dataset.value = val;

    if (normalizeText(val) === normalizeText(q.answer)) {
      // 答对：锁定
      [...row.querySelectorAll(".chip")].forEach(c => {
        c.style.opacity = "0.7";
        c.style.pointerEvents = "none";
        c.draggable = false;
      });
      blankHint.style.pointerEvents = "none";
      passQuestion(q.explain);
    } else {
      failAndRetry("这个字不对，再换一个～", q.explain || "");
      // 允许继续改
    }
  }

  qBody.appendChild(wrap);
}

function renderFill(q) {
  const wrap = document.createElement("div");

  const p = document.createElement("div");
  p.className = "blockQuote";
  p.textContent = q.stem;
  wrap.appendChild(p);

  const row = document.createElement("div");
  row.className = "fillRow";

  const input = document.createElement("input");
  input.className = "fillInput";
  input.placeholder = "请输入答案（整句/词语）";

  const btn = document.createElement("button");
  btn.className = "btn primary";
  btn.textContent = "提交";

  btn.addEventListener("click", () => {
    const val = (input.value || "").trim();
    if (!val) {
      failAndRetry("还没输入哦～", q.explain || "");
      return;
    }
    const answers = q.answers || [];
    const ok = answers.some(a => normalizeText(val) === normalizeText(a));
    if (ok) {
      input.disabled = true;
      btn.disabled = true;
      passQuestion(q.explain);
    } else {
      failAndRetry("不对，再试一次～", q.explain || "");
      input.focus();
      input.select();
    }
  });

  row.appendChild(input);
  row.appendChild(btn);
  wrap.appendChild(row);

  qBody.appendChild(wrap);
}

function renderFillMulti(q) {
  const wrap = document.createElement("div");

  const p = document.createElement("div");
  p.className = "blockQuote";
  p.textContent = q.stem;
  wrap.appendChild(p);

  const row = document.createElement("div");
  row.className = "fillRow";

  const inputs = [];
  (q.blanks || []).forEach((b, idx) => {
    const input = document.createElement("input");
    input.className = "fillInput";
    input.placeholder = `第${idx + 1}空`;
    inputs.push(input);
    row.appendChild(input);
  });

  const btn = document.createElement("button");
  btn.className = "btn primary";
  btn.textContent = "提交";
  row.appendChild(btn);

  btn.addEventListener("click", () => {
    const vals = inputs.map(x => (x.value || "").trim());
    if (!vals.every(v => v.length > 0)) {
      failAndRetry("还有空没填完哦～", q.explain || "");
      return;
    }

    const ok = vals.every((v, idx) => {
      const answers = (q.blanks[idx] && q.blanks[idx].answers) ? q.blanks[idx].answers : [];
      return answers.some(a => normalizeText(v) === normalizeText(a));
    });

    if (ok) {
      inputs.forEach(x => x.disabled = true);
      btn.disabled = true;
      passQuestion(q.explain);
    } else {
      failAndRetry("有空填错了，再检查一下～", q.explain || "");
      inputs[0].focus();
      inputs[0].select();
    }
  });

  wrap.appendChild(row);
  qBody.appendChild(wrap);
}

// ====== 榜单（本机）======
function renderBoard() {
  const map = getDailyMap();
  const t = todayKey();
  const today = map[t] || {};
  const entries = Object.entries(today).sort((a,b) => b[1] - a[1]);

  boardList.innerHTML = "";
  if (!entries.length) {
    boardList.innerHTML = `<div class="muted">本机今天还没有记录～</div>`;
    champText.textContent = "—";
    champSub.textContent = "—";
    return;
  }

  const [topName, topScore] = entries[0];
  champText.textContent = `${topName}`;
  champSub.textContent = `今日积分：${topScore} 分（日期：${t}）`;

  entries.forEach(([n, s], idx) => {
    const div = document.createElement("div");
    div.className = "boardCard";
    div.style.borderRadius = "14px";
    div.style.padding = "10px 12px";
    div.innerHTML = `<strong>#${idx+1}</strong>　${n}　<span class="muted">·</span>　<strong>${s}</strong> 分`;
    boardList.appendChild(div);
  });
}

function clearBoard() {
  if (!confirm("确定清空本机榜单吗？（只影响这台设备）")) return;
  setDailyMap({});
  renderBoard();
  refreshHome();
}

// ====== 工具 ======
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalizeText(s) {
  return (s || "").replace(/\s+/g, "");
}

// ====== 事件绑定 ======
navBtns.forEach(b => b.addEventListener("click", () => showView(b.dataset.view)));

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

flowerBtns.forEach(btn => btn.addEventListener("click", () => {
  const topic = btn.dataset.topic;
  openUnits(topic);
}));

btnBackHome1.addEventListener("click", () => showView("home"));
btnBackHome2.addEventListener("click", () => showView("home"));
btnBackUnit.addEventListener("click", () => openUnits(selectedTopic));

btnQuitToLesson.addEventListener("click", () => openLessons(selectedUnit));
btnNext.addEventListener("click", nextQuestion);

btnClearBoard.addEventListener("click", clearBoard);

// ====== 启动 ======
refreshHome();
showView("home");

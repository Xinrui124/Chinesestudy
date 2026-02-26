/*************************************************
 * 我是语文小状元 - 二年级闯关页（纯前端）
 * 题型：mcq（选择题）/ match（拖拽配对）/ fill（填空）
 * 规则：做完立刻反馈；错题必须重做直到正确；答对 +1 分
 * 榜单：本机 localStorage（无后端）
 *************************************************/

// ====== 题库（你之后给我题库，我会帮你整理成这种格式）======
const QUESTION_BANK = [
  // 字词 - 选择题
  {
    id: "ZC-001",
    topic: "字词",
    type: "mcq",
    stem: "下面哪个词语书写正确？",
    desc: "选出正确的一项。",
    options: ["高兴", "高杏", "高性", "告兴"],
    answerIndex: 0,
    explain: "“高兴”表示开心。"
  },
  // 句子 - 拖拽配对
  {
    id: "JZ-001",
    topic: "句子",
    type: "match",
    stem: "把词语和意思配对（拖一拖）。",
    desc: "将左侧词语拖到右侧对应意思上。",
    pairs: [
      { left: "清澈", right: "非常透明，干净" },
      { left: "勇敢", right: "不怕困难" },
      { left: "温暖", right: "让人感觉舒适" }
    ],
    explain: "全部配对正确才算过关。"
  },
  // 古诗 - 填空
  {
    id: "GS-001",
    topic: "古诗",
    type: "fill",
    stem: "补全诗句：床前明月____。",
    desc: "在空格里填一个字。",
    blanks: [{ placeholder: "____", answers: ["光"] }],
    explain: "李白《静夜思》：床前明月光。"
  },
  // 阅读 - 选择题（示例）
  {
    id: "YD-001",
    topic: "阅读",
    type: "mcq",
    stem: "小兔子把胡萝卜送给朋友，说明小兔子很——",
    desc: "选出最合适的词语。",
    options: ["自私", "大方", "懒惰", "粗心"],
    answerIndex: 1,
    explain: "愿意分享，说明很大方。"
  }
];

// ====== 存储键 ======
const LS = {
  NAME: "ywxzy_name_v1",
  DAILY: "ywxzy_daily_scores_v1" // { "2026-02-26": { "小明": 12, "小红": 9 } }
};

function todayKey() {
  const d = new Date();
  // 以本机日期为准（学校统一的话建议同一时区/同一设备）
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
  game: $("#view-game"),
  board: $("#view-board"),
  teacher: $("#view-teacher")
};

const navBtns = $$(".navBtn");

const studentNameInput = $("#studentName");
const btnSaveName = $("#btnSaveName");
const nameText = $("#nameText");
const todayScoreText = $("#todayScoreText");

const topicBadge = $("#topicBadge");
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
const btnQuit = $("#btnQuit");
const btnSkip = $("#btnSkip"); // 默认关闭

const boardList = $("#boardList");
const champText = $("#champText");
const champSub = $("#champSub");
const btnClearBoard = $("#btnClearBoard");

// 首页花朵按钮
const flowerBtns = $$(".flower");

// ====== 状态 ======
let currentView = "home";
let currentTopic = null;
let list = [];
let i = 0;
let roundScore = 0;
let unlockedNext = false; // 答对才可下一题

function showView(view) {
  currentView = view;
  Object.keys(views).forEach(k => {
    views[k].classList.toggle("hidden", k !== view);
  });
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

// ====== 游戏流程 ======
function startTopic(topic) {
  const nm = ensureNameOrToast();
  if (!nm) return;

  currentTopic = topic;
  list = QUESTION_BANK.filter(q => q.topic === topic);

  if (!list.length) {
    alert(`题库里暂时没有“${topic}”的题目。你把题库发我，我来整理进去～`);
    return;
  }

  // 乱序（同一主题更像闯关）
  list = shuffle([...list]);
  i = 0;
  roundScore = 0;
  unlockedNext = false;

  topicBadge.textContent = `主题：${topic}`;
  playerNameInGame.textContent = nm;
  roundScoreEl.textContent = "0";
  dayScoreEl.textContent = String(getTodayScoreFor(nm));

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

  if (q.type === "mcq") renderMCQ(q);
  else if (q.type === "match") renderMatch(q);
  else if (q.type === "fill") renderFill(q);
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

// 下一题
function nextQuestion() {
  if (!unlockedNext) return;

  const total = list.length;
  if (i < total - 1) {
    i += 1;
    renderQuestion();
    return;
  }

  // 完成
  progressBar.style.width = "100%";
  qIndexEl.textContent = "完成";
  qTitleEl.textContent = `本主题闯关完成！本轮得分：${roundScore} / ${total}`;
  qDescEl.textContent = "你可以返回首页换一朵花继续闯关，或去“今日榜单”看看。";
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
      // 立刻反馈；错了要重做（不锁死按钮，方便立刻再点）
      if (correct) {
        btn.classList.add("good");
        // 禁用全部，防止重复加分
        [...grid.querySelectorAll("button")].forEach(b => b.disabled = true);
        passQuestion(q.explain);
      } else {
        btn.classList.add("bad");
        failAndRetry("再想一想～", q.explain || "");
        // 允许重做：只把错误样式保持一下，学生可继续点
      }
    });
    grid.appendChild(btn);
  });

  qBody.appendChild(grid);
}

function renderMatch(q) {
  const wrap = document.createElement("div");
  wrap.className = "matchWrap";

  const leftCol = document.createElement("div");
  leftCol.className = "matchCol";
  leftCol.innerHTML = `<strong>左侧（拖动）</strong><div class="muted tiny">按住拖到右侧对应意思</div>`;

  const rightCol = document.createElement("div");
  rightCol.className = "matchCol";
  rightCol.innerHTML = `<strong>右侧（放置）</strong><div class="muted tiny">拖对后会显示匹配结果</div>`;

  // 打乱左右顺序
  const pairs = q.pairs.map(p => ({...p}));
  const leftItems = shuffle(pairs.map(p => p.left));
  const rightItems = shuffle(pairs.map(p => p.right));

  const correctMap = new Map(pairs.map(p => [p.right, p.left])); // right -> left

  // 左侧 draggable
  leftItems.forEach(text => {
    const item = document.createElement("div");
    item.className = "matchItem draggable";
    item.draggable = true;
    item.textContent = text;
    item.dataset.value = text;
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", text);
    });
    leftCol.appendChild(item);
  });

  // 右侧 dropzone
  const state = {}; // right -> placed left
  rightItems.forEach(rtext => {
    const zone = document.createElement("div");
    zone.className = "matchItem dropzone";
    zone.dataset.right = rtext;

    const leftBox = document.createElement("div");
    leftBox.className = "dropHint";
    leftBox.textContent = "把词语拖到这里";

    const rightBox = document.createElement("div");
    rightBox.innerHTML = `<span class="muted">意思：</span><span>${rtext}</span>`;

    zone.appendChild(leftBox);
    zone.appendChild(rightBox);

    zone.addEventListener("dragover", (e) => e.preventDefault());
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      const ltext = e.dataTransfer.getData("text/plain");
      if (!ltext) return;

      state[rtext] = ltext;
      leftBox.className = "dropFilled";
      leftBox.textContent = `已放入：${ltext}`;

      // 检查是否全部放完且全对
      const allFilled = rightItems.every(x => state[x]);
      if (!allFilled) {
        feedback.className = "feedback";
        feedback.textContent = "继续拖拽完成全部配对～";
        return;
      }

      const allCorrect = rightItems.every(x => state[x] === correctMap.get(x));
      if (allCorrect) {
        // 禁止继续拖拽/放置，防止重复加分
        [...leftCol.querySelectorAll(".draggable")].forEach(d => d.draggable = false);
        [...rightCol.querySelectorAll(".dropzone")].forEach(z => z.style.opacity = "0.98");
        passQuestion(q.explain);
      } else {
        failAndRetry("配对有错，请重新调整（可以把左侧词再拖到右侧覆盖）", q.explain || "");
      }
    });

    rightCol.appendChild(zone);
  });

  wrap.appendChild(leftCol);
  wrap.appendChild(rightCol);

  qBody.appendChild(wrap);
}

function renderFill(q) {
  const wrap = document.createElement("div");

  const row = document.createElement("div");
  row.className = "fillRow";

  const input = document.createElement("input");
  input.className = "fillInput";
  input.placeholder = "在这里输入答案（可输入一个字/一个词/一句话）";

  const btn = document.createElement("button");
  btn.className = "btn primary";
  btn.textContent = "提交";

  btn.addEventListener("click", () => {
    const val = (input.value || "").trim();
    if (!val) {
      failAndRetry("还没输入哦～", q.explain || "");
      return;
    }

    // 当前实现：只支持一个空（够你先跑起来）
    // answers 支持多个可接受答案
    const answers = (q.blanks && q.blanks[0] && q.blanks[0].answers) ? q.blanks[0].answers : [];
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

  const tip = document.createElement("div");
  tip.className = "muted tiny";
  tip.textContent = "提示：填空题会按“可接受答案列表”判分（同义写法可以都加进 answers）。";

  wrap.appendChild(row);
  wrap.appendChild(tip);
  qBody.appendChild(wrap);
}

// ====== 榜单渲染（本机）======
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
    div.className = "matchItem";
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
  // 去空格、全角半角差异不处理（需要的话我可以再增强）
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
  alert(`已保存姓名：${name}。现在可以选一朵花开始闯关啦！`);
});

flowerBtns.forEach(btn => btn.addEventListener("click", () => {
  const topic = btn.dataset.topic;
  startTopic(topic);
}));

btnNext.addEventListener("click", nextQuestion);

btnQuit.addEventListener("click", () => {
  showView("home");
});

btnClearBoard.addEventListener("click", clearBoard);

// 默认不开放跳过（符合“错题重做”）
btnSkip.disabled = true;

// ====== 启动 ======
refreshHome();
showView("home");

<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>我是语文小状元</title>
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <header class="topbar">
    <div class="brand">
      <div class="mark">语</div>
      <div class="brandText">
        <h1>我是语文小状元</h1>
        <p class="sub">二年级 · 闯关练习 · 即时反馈 · 积分榜</p>
      </div>
    </div>

    <nav class="nav">
      <button class="navBtn active" data-view="home">首页</button>
      <button class="navBtn" data-view="board">今日榜单</button>
      <button class="navBtn" data-view="teacher">题库格式</button>
    </nav>
  </header>

  <main class="container">
    <!-- 首页：姓名 + 板块 -->
    <section id="view-home" class="view">
      <div class="card hero">
        <div class="heroLeft">
          <h2>先输入姓名，再选一个板块开始闯关</h2>
          <p class="muted">答对 +1 分；做错要重做，直到正确才能进入下一题。</p>

          <div class="nameRow">
            <label class="label" for="studentName">学生姓名</label>
            <input id="studentName" class="input" placeholder="例如：小明" maxlength="12" />
            <button id="btnSaveName" class="btn primary">确认姓名</button>
          </div>

          <div class="miniStats">
            <div class="pill">当前姓名：<strong id="nameText">未填写</strong></div>
            <div class="pill">今日积分：<strong id="todayScoreText">0</strong></div>
          </div>
        </div>

        <div class="heroRight">
          <div class="flowers">
            <button class="flower f1" data-topic="字词" aria-label="字词">字词</button>
            <button class="flower f2" data-topic="句子" aria-label="句子">句子</button>
            <button class="flower f3" data-topic="古诗" aria-label="古诗">古诗</button>
            <button class="flower f4" data-topic="阅读" aria-label="阅读">阅读</button>
          </div>
          <p class="hint muted">提示：选择板块后，会进入“单元 → 课文 → 闯关”。</p>
        </div>
      </div>
    </section>

    <!-- 单元选择 -->
    <section id="view-unit" class="view hidden">
      <div class="card">
        <div class="row space">
          <div>
            <h2 id="unitTitle">选择单元</h2>
            <p class="muted">板块：<strong id="unitTopicText">—</strong>　|　姓名：<strong id="unitNameText">—</strong></p>
          </div>
          <button class="btn" id="btnBackHome1">返回首页</button>
        </div>

        <div class="unitGrid" id="unitGrid"></div>
      </div>
    </section>

    <!-- 课文选择 -->
    <section id="view-lesson" class="view hidden">
      <div class="card">
        <div class="row space">
          <div>
            <h2 id="lessonTitle">选择课文</h2>
            <p class="muted">板块：<strong id="lessonTopicText">—</strong>　|　单元：<strong id="lessonUnitText">—</strong>　|　姓名：<strong id="lessonNameText">—</strong></p>
          </div>
          <div class="row gap">
            <button class="btn" id="btnBackUnit">返回单元</button>
            <button class="btn" id="btnBackHome2">返回首页</button>
          </div>
        </div>

        <div class="lessonGrid" id="lessonGrid"></div>

        <div class="muted tiny">
          说明：如果某课文暂时没有题库，点击会提示“暂无题库”，你把题发我我就能继续整理进去。
        </div>
      </div>
    </section>

    <!-- 闯关页 -->
    <section id="view-game" class="view hidden">
      <div class="card">
        <div class="row space">
          <div class="leftMeta">
            <div class="badge">二年级</div>
            <div class="badge soft" id="topicBadge">板块：—</div>
            <div class="badge soft" id="unitBadge">单元：—</div>
            <div class="badge soft" id="lessonBadge">课文：—</div>
            <div class="badge soft">姓名：<span id="playerNameInGame">—</span></div>
          </div>
          <div class="rightMeta">
            <div class="scoreBox">本轮得分：<strong id="roundScore">0</strong></div>
            <div class="scoreBox">今日总分：<strong id="dayScore">0</strong></div>
          </div>
        </div>

        <div class="progress">
          <div class="bar" id="progressBar"></div>
        </div>

        <div class="qArea">
          <div class="qIndex" id="qIndex">第 1 题</div>
          <h2 class="qTitle" id="qTitle">加载中…</h2>
          <p class="qDesc muted" id="qDesc"></p>

          <div id="qBody"></div>

          <div class="feedback" id="feedback" aria-live="polite"></div>

          <div class="row space actions">
            <button class="btn" id="btnQuitToLesson">返回课文</button>
            <div class="row gap">
              <button class="btn primary" id="btnNext" disabled>下一题</button>
            </div>
          </div>

          <div class="muted tiny">
            规则：做错必须重做；答对才解锁“下一题”。积分会记入“今日榜单（本机）”。
          </div>
        </div>
      </div>
    </section>

    <!-- 今日榜单 -->
    <section id="view-board" class="view hidden">
      <div class="card">
        <div class="row space">
          <div>
            <h2>今日榜单 🏆</h2>
            <p class="muted">仅记录在本机浏览器（GitHub Pages 无后端）。要“全班同榜”，我可以后面帮你接入表单/数据库。</p>
          </div>
          <button class="btn" id="btnClearBoard">清空本机榜单</button>
        </div>

        <div class="boardGrid">
          <div class="boardCard">
            <div class="boardTitle">今天（本机）语文小状元</div>
            <div class="champ" id="champText">—</div>
            <div class="muted tiny" id="champSub">—</div>
          </div>

          <div class="boardCard">
            <div class="boardTitle">排行榜</div>
            <div id="boardList" class="boardList"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 题库格式 -->
    <section id="view-teacher" class="view hidden">
      <div class="card">
        <h2>题库格式（你发我题库，我就按这个整理进代码）</h2>
        <p class="muted">题库在 <code>app.js</code> 的 <code>QUESTION_BANK</code>。现在支持：选择题、单空选字（点选/拖拽）、填空（整句/多空）。</p>

        <pre class="codeBlock"><code>// 选择题（mcq）
{
  id: "ZC-U1-001",
  topic: "字词",
  unit: "第一单元",
  lesson: "古诗二首",
  type: "mcq",
  stem: "“妆”的正确读音是（ ）",
  options: ["zhuāng","zuāng","zhāng","zuǎng"],
  answerIndex: 0,
  explain: "可选：解析"
}

// 单空选字（match_single）：给若干字，选对一个填进括号
{
  id: "ZC-U1-006",
  topic: "字词",
  unit: "第一单元",
  lesson: "古诗二首",
  type: "match_single",
  stem: "春天到了，我们一起读古（   ）。",
  desc: "点一下选项，再点括号；也支持拖拽。",
  choices: ["诗","失"],
  answer: "诗"
}

// 填空（fill）：整句/一个答案
{
  id: "ZC-U1-009",
  topic: "字词",
  unit: "第一单元",
  lesson: "古诗二首",
  type: "fill",
  stem: "不知细叶谁裁出，______________。",
  answers: ["二月春风似剪刀"]
}

// 多空填空（fill_multi）
{
  id: "ZC-U1-010",
  topic: "字词",
  unit: "第一单元",
  lesson: "古诗二首",
  type: "fill_multi",
  stem: "（ ）长莺飞二月天，拂堤杨柳醉（ ）。",
  blanks: [
    { answers: ["草"] },
    { answers: ["春烟"] }
  ]
}
</code></pre>

        <p class="muted">
          你给我题库时最省事的格式是：<br/>
          <strong>板块 / 单元 / 课文</strong> 然后逐题写：题干、选项（如有）、答案、解析（可选）。<br/>
          我会帮你做编号、整理成可直接粘贴的 QUESTION_BANK。
        </p>
      </div>
    </section>

  </main>

  <footer class="footer muted">© 我是语文小状元 · 二年级语文闯关</footer>
  <script src="./app.js"></script>
</body>
</html>

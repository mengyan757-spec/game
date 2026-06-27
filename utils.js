/**
 * 中华传统节日文化闯关小游戏 - 公共工具函数库
 * 面向小学生，无外部依赖，纯前端实现
 */

// ==================== 节日数据 ====================
const FESTIVAL_DATA = {
  chunjie: {
    id: 'chunjie',
    name: '春节',
    emoji: '🧧',
    date: '农历正月初一',
    brief: '春节是中国最重要的传统节日，象征辞旧迎新、阖家团圆。',
    color: '#E74C3C',
    bgColor: '#FDEDEC',
    customs: ['贴春联', '放鞭炮', '吃年夜饭', '拜年', '发红包', '守岁'],
    foods: ['饺子', '年糕', '汤圆（部分地区）'],
  },
  yuanxiao: {
    id: 'yuanxiao',
    name: '元宵节',
    emoji: '🏮',
    date: '农历正月十五',
    brief: '元宵节又称灯节，人们赏花灯、猜灯谜、吃元宵，热闹非凡。',
    color: '#F39C12',
    bgColor: '#FEF5E7',
    customs: ['赏花灯', '猜灯谜', '吃元宵', '舞龙舞狮', '放烟花'],
    foods: ['元宵', '汤圆'],
  },
  qingming: {
    id: 'qingming',
    name: '清明节',
    emoji: '🌿',
    date: '公历4月4日~6日',
    brief: '清明节既是自然节气又是传统节日，人们扫墓祭祖、踏青春游。',
    color: '#27AE60',
    bgColor: '#E8F8F5',
    customs: ['扫墓祭祖', '踏青', '插柳', '放风筝', '荡秋千'],
    foods: ['青团', '馓子', '清明粿'],
  },
  duanwu: {
    id: 'duanwu',
    name: '端午节',
    emoji: '🐲',
    date: '农历五月初五',
    brief: '端午节是为纪念爱国诗人屈原，有赛龙舟、吃粽子的习俗。',
    color: '#2980B9',
    bgColor: '#EBF5FB',
    customs: ['赛龙舟', '吃粽子', '挂艾草', '佩香囊', '系五彩绳'],
    foods: ['粽子', '咸鸭蛋', '雄黄酒'],
  },
  qixi: {
    id: 'qixi',
    name: '七夕节',
    emoji: '💫',
    date: '农历七月初七',
    brief: '七夕节源于牛郎织女的传说，是中国最具浪漫色彩的传统节日。',
    color: '#8E44AD',
    bgColor: '#F4ECF7',
    customs: ['乞巧', '拜织女', '观星', '穿针引线', '晒书'],
    foods: ['巧果', '花糕'],
  },
  zhongqiu: {
    id: 'zhongqiu',
    name: '中秋节',
    emoji: '🥮',
    date: '农历八月十五',
    brief: '中秋节是团圆的日子，人们赏月、吃月饼，寄托思念之情。',
    color: '#D4AC0D',
    bgColor: '#FEF9E7',
    customs: ['赏月', '吃月饼', '饮桂花酒', '玩花灯', '拜月'],
    foods: ['月饼', '柚子', '桂花糕'],
  },
  chongyang: {
    id: 'chongyang',
    name: '重阳节',
    emoji: '🏔️',
    date: '农历九月初九',
    brief: '重阳节有登高望远、敬老爱老的传统，寓意健康长寿。',
    color: '#E67E22',
    bgColor: '#FDF2E9',
    customs: ['登高', '赏菊', '插茱萸', '敬老', '饮菊花酒'],
    foods: ['重阳糕', '菊花酒'],
  },
  dongzhi: {
    id: 'dongzhi',
    name: '冬至',
    emoji: '❄️',
    date: '公历12月21日~23日',
    brief: '冬至是"数九"的开始，北方吃饺子、南方吃汤圆，象征团圆。',
    color: '#1ABC9C',
    bgColor: '#E8F8F5',
    customs: ['吃饺子', '吃汤圆', '祭祖', '数九', '画消寒图'],
    foods: ['饺子', '汤圆', '羊肉汤'],
  }
};

// ==================== 题目库 ====================
const QUIZ_BANK = [
  // 春节
  { id: 'q1', festival: 'chunjie', question: '春节是指农历的哪一天？', options: ['正月初一', '正月十五', '八月十五', '五月初五'], answer: 0, knowledge: '春节是农历正月初一，是中国最重要的传统节日，已有4000多年历史。' },
  { id: 'q2', festival: 'chunjie', question: '春节期间，长辈给晚辈什么表示祝福？', options: ['月饼', '红包', '粽子', '汤圆'], answer: 1, knowledge: '发红包（压岁钱）是春节重要习俗，寓意辟邪驱鬼、保佑平安。' },
  { id: 'q3', festival: 'chunjie', question: '春节时门上贴红色的什么？', options: ['福字', '对联', '剪纸', '以上都是'], answer: 3, knowledge: '贴春联、贴福字是春节的传统习俗，红色象征吉祥喜庆。' },
  { id: 'q4', festival: 'chunjie', question: '春节最重要的团圆饭是？', options: ['早餐', '午餐', '年夜饭', '宵夜'], answer: 2, knowledge: '年夜饭是春节最重要的家庭聚餐，全家人围坐在一起共享美味佳肴。' },

  // 元宵节
  { id: 'q5', festival: 'yuanxiao', question: '元宵节在农历正月几日？', options: ['初一', '初七', '十五', '三十'], answer: 2, knowledge: '元宵节在农历正月十五，是春节之后的第一个重要节日。' },
  { id: 'q6', festival: 'yuanxiao', question: '元宵节的传统食物是什么？', options: ['月饼', '粽子', '元宵/汤圆', '饺子'], answer: 2, knowledge: '元宵节吃元宵（汤圆），象征家庭团圆、生活甜蜜。' },
  { id: 'q7', festival: 'yuanxiao', question: '元宵节人们喜欢参加什么智力游戏？', options: ['猜谜语', '猜灯谜', '脑筋急转弯', '拼图'], answer: 1, knowledge: '猜灯谜是元宵节的传统活动，将谜语写在灯笼上供人猜射。' },

  // 清明节
  { id: 'q8', festival: 'qingming', question: '清明节的主要活动是什么？', options: ['赛龙舟', '扫墓祭祖', '吃月饼', '放鞭炮'], answer: 1, knowledge: '清明节最重要的习俗是扫墓祭祖，表达对逝去亲人的思念。' },
  { id: 'q9', festival: 'qingming', question: '清明节的传统食物是？', options: ['粽子', '青团', '月饼', '元宵'], answer: 1, knowledge: '青团是清明节的传统食品，用艾草汁染色，馅料多为豆沙。' },
  { id: 'q10', festival: 'qingming', question: '清明节人们还会做什么活动？', options: ['踏青', '游泳', '滑雪', '跑酷'], answer: 0, knowledge: '清明节正值春天，人们在祭祖之外还会踏青游玩，感受春天的气息。' },

  // 端午节
  { id: 'q11', festival: 'duanwu', question: '端午节是为了纪念哪位历史人物？', options: ['李白', '屈原', '孔子', '曹操'], answer: 1, knowledge: '端午节纪念的是爱国诗人屈原，他于五月初五投江殉国。' },
  { id: 'q12', festival: 'duanwu', question: '端午节最有特色的运动是什么？', options: ['赛马', '赛龙舟', '拔河', '放风筝'], answer: 1, knowledge: '赛龙舟是端午节最热闹的活动，源于人们划船营救屈原的传说。' },
  { id: 'q13', festival: 'duanwu', question: '端午节的代表食物是？', options: ['饺子', '月饼', '粽子', '元宵'], answer: 2, knowledge: '粽子是端午节的传统食物，用粽叶包裹糯米，有甜咸之分。' },
  { id: 'q14', festival: 'duanwu', question: '端午节人们会在门口挂什么植物？', options: ['玫瑰', '艾草', '菊花', '牡丹'], answer: 1, knowledge: '端午节挂艾草和菖蒲，传说可以驱蚊辟邪、保佑家宅平安。' },

  // 七夕节
  { id: 'q15', festival: 'qixi', question: '七夕节与哪个爱情传说有关？', options: ['白蛇传', '牛郎织女', '梁山伯与祝英台', '孟姜女'], answer: 1, knowledge: '七夕节源于牛郎织女的美丽传说，两人被银河隔开，每年七夕鹊桥相会。' },
  { id: 'q16', festival: 'qixi', question: '七夕节又叫什么节？', options: ['团圆节', '女儿节', '粽子节', '赏月节'], answer: 1, knowledge: '七夕节又称女儿节、乞巧节，古代女子在这一天祈求心灵手巧。' },

  // 中秋节
  { id: 'q17', festival: 'zhongqiu', question: '中秋节的代表食物是什么？', options: ['粽子', '饺子', '月饼', '汤圆'], answer: 2, knowledge: '月饼是中秋节的传统美食，圆圆的形状象征着家人团圆。' },
  { id: 'q18', festival: 'zhongqiu', question: '中秋节人们主要欣赏什么？', options: ['太阳', '月亮', '星星', '云朵'], answer: 1, knowledge: '中秋赏月是重要的传统习俗，八月十五的月亮最圆最亮。' },
  { id: 'q19', festival: 'zhongqiu', question: '以下哪个月亮最可能与中秋节相关？', options: ['月牙', '半月', '满月', '新月'], answer: 2, knowledge: '中秋节在农历八月十五，正值满月，象征圆满和团圆。' },

  // 重阳节
  { id: 'q20', festival: 'chongyang', question: '重阳节人们喜欢做什么运动？', options: ['游泳', '登高', '跑步', '骑车'], answer: 1, knowledge: '重阳节登高望远，寓意步步高升、健康长寿。' },
  { id: 'q21', festival: 'chongyang', question: '重阳节在哪一天？', options: ['八月初八', '九月初九', '十月初十', '七月初七'], answer: 1, knowledge: '重阳节是农历九月初九，"九"是阳数之极，故称"重阳"。' },
  { id: 'q22', festival: 'chongyang', question: '重阳节又被称为什么节？', options: ['儿童节', '青年节', '老人节/敬老节', '妇女节'], answer: 2, knowledge: '重阳节现在是中国的敬老节，倡导尊老、爱老、敬老的传统美德。' },

  // 冬至
  { id: 'q23', festival: 'dongzhi', question: '冬至这一天有什么特别之处？', options: ['最长的一天', '最短的一天', '最热的一天', '最冷的一天'], answer: 1, knowledge: '冬至是北半球白天最短、夜晚最长的一天，之后白天逐渐变长。' },
  { id: 'q24', festival: 'dongzhi', question: '北方冬至通常吃什么？', options: ['汤圆', '粽子', '饺子', '月饼'], answer: 2, knowledge: '北方有"冬至不端饺子碗，冻掉耳朵没人管"的说法，吃饺子是重要习俗。' },
  { id: 'q25', festival: 'dongzhi', question: '南方冬至有吃什么的习俗？', options: ['饺子', '汤圆', '面条', '馒头'], answer: 1, knowledge: '南方地区冬至习惯吃汤圆，象征家庭团圆、圆满美好。' },
];

// ==================== 拼图主题 ====================
const PUZZLE_THEMES = [
  { id: 'p1', name: '红灯笼', festival: '元宵节', difficulty: 'easy', grid: 3, canvas: 'drawLantern' },
  { id: 'p2', name: '粽子', festival: '端午节', difficulty: 'easy', grid: 3, canvas: 'drawZongzi' },
  { id: 'p3', name: '月饼', festival: '中秋节', difficulty: 'medium', grid: 4, canvas: 'drawMooncake' },
  { id: 'p4', name: '福字', festival: '春节', difficulty: 'medium', grid: 4, canvas: 'drawFu' },
  { id: 'p5', name: '龙头', festival: '端午节', difficulty: 'hard', grid: 5, canvas: 'drawDragonHead' },
];

// ==================== 拖拽匹配数据 ====================
// 每个 level 有多个习俗项要拖到对应节日
const DRAG_LEVELS = [
  {
    id: 'd1', name: '初级·食物匹配', items: [
      { text: '饺子', target: 'chunjie', emoji: '🥟' },
      { text: '元宵', target: 'yuanxiao', emoji: '🏮' },
      { text: '青团', target: 'qingming', emoji: '🍃' },
      { text: '粽子', target: 'duanwu', emoji: '🐲' },
      { text: '月饼', target: 'zhongqiu', emoji: '🥮' },
    ]
  },
  {
    id: 'd2', name: '中级·习俗匹配', items: [
      { text: '贴春联', target: 'chunjie', emoji: '🧧' },
      { text: '赏花灯', target: 'yuanxiao', emoji: '🏮' },
      { text: '扫墓祭祖', target: 'qingming', emoji: '🌿' },
      { text: '赛龙舟', target: 'duanwu', emoji: '🚣' },
      { text: '赏月', target: 'zhongqiu', emoji: '🌕' },
      { text: '登高', target: 'chongyang', emoji: '🏔️' },
    ]
  },
  {
    id: 'd3', name: '高级·综合匹配', items: [
      { text: '压岁钱', target: 'chunjie', emoji: '🧧' },
      { text: '猜灯谜', target: 'yuanxiao', emoji: '💡' },
      { text: '踏青', target: 'qingming', emoji: '🌸' },
      { text: '挂艾草', target: 'duanwu', emoji: '🌿' },
      { text: '牛郎织女', target: 'qixi', emoji: '💫' },
      { text: '吃月饼', target: 'zhongqiu', emoji: '🥮' },
      { text: '敬老', target: 'chongyang', emoji: '👴' },
      { text: '数九', target: 'dongzhi', emoji: '❄️' },
    ]
  }
];

// ==================== LocalStorage 工具函数 ====================
const STORAGE_KEY_PREFIX = 'festival_game_';

/**
 * 安全地从 LocalStorage 读取数据
 */
function loadData(key) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('读取存储数据失败:', key, e);
    return null;
  }
}

/**
 * 安全地存储数据到 LocalStorage
 */
function saveData(key, data) {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.warn('存储数据失败:', key, e);
    return false;
  }
}

/**
 * 随机打乱数组（Fisher-Yates 洗牌算法）
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 随机选择 n 个元素
 */
function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

/**
 * 格式化秒数为 分:秒
 */
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * 获取当前日期字符串
 */
function getDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * 获取当前时间字符串
 */
function getTimeString() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

/**
 * 生成唯一 ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/**
 * 获取学生姓名（从 localStorage）
 */
function getStudentName() {
  return loadData('student_name') || '';
}

/**
 * 设置学生姓名
 */
function setStudentName(name) {
  saveData('student_name', name);
}

/**
 * 保存答题记录
 */
function saveQuizRecord(record) {
  const records = loadData('quiz_records') || [];
  records.push({ ...record, id: generateId(), date: getDateString(), time: getTimeString() });
  saveData('quiz_records', records);
}

/**
 * 获取所有答题记录
 */
function getQuizRecords() {
  return loadData('quiz_records') || [];
}

/**
 * 保存错题
 */
function saveErrorQuestion(q) {
  const errors = loadData('error_book') || [];
  // 避免重复
  const exists = errors.find(e => e.id === q.id);
  if (!exists) {
    errors.push({ ...q, recordDate: getDateString(), recordTime: getTimeString() });
    saveData('error_book', errors);
  }
}

/**
 * 获取错题本
 */
function getErrorBook() {
  return loadData('error_book') || [];
}

/**
 * 删除错题
 */
function removeErrorQuestion(qId) {
  let errors = loadData('error_book') || [];
  errors = errors.filter(e => e.id !== qId);
  saveData('error_book', errors);
}

/**
 * 清除所有数据
 */
function clearAllData() {
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith(STORAGE_KEY_PREFIX)) {
      localStorage.removeItem(k);
    }
  });
}

/**
 * 保存闯关记录（通用）
 */
function saveLevelRecord(gameType, data) {
  const key = gameType + '_records';
  const records = loadData(key) || [];
  records.push({ ...data, id: generateId(), date: getDateString(), time: getTimeString() });
  saveData(key, records);
}

/**
 * 获取闯关记录
 */
function getLevelRecords(gameType) {
  return loadData(gameType + '_records') || [];
}

/**
 * 计算正确率
 */
function calcAccuracy(records) {
  if (!records || records.length === 0) return 0;
  const total = records.reduce((sum, r) => sum + (r.totalQuestions || 0), 0);
  const correct = records.reduce((sum, r) => sum + (r.correctCount || 0), 0);
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

/**
 * 获取节日名称
 */
function getFestivalName(id) {
  return FESTIVAL_DATA[id] ? FESTIVAL_DATA[id].name : id;
}

/**
 * 显示提示消息
 */
function showToast(msg, duration = 2000) {
  const existing = document.querySelector('.toast-message');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-message fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-800 bg-opacity-90 text-white px-6 py-3 rounded-xl shadow-lg text-lg z-50 animate-bounce-in';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// ==================== Canvas 绘制函数（拼图用） ====================

/** 绘制灯笼 */
function drawLantern(ctx, w, h) {
  const cx = w / 2, cy = h / 2;
  // 背景
  ctx.fillStyle = '#FFF5E6';
  ctx.fillRect(0, 0, w, h);
  // 主体
  const bodyH = h * 0.4;
  const bodyW = w * 0.45;
  const bodyY = cy - bodyH / 2;
  ctx.fillStyle = '#E74C3C';
  ctx.beginPath();
  ctx.ellipse(cx, cy, bodyW, bodyH / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  // 条纹
  ctx.strokeStyle = '#F4D03F';
  ctx.lineWidth = 3;
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.ellipse(cx, cy + i * bodyH / 12, bodyW, bodyH / 2.2, 0, 0, Math.PI);
    ctx.stroke();
  }
  // 顶部
  ctx.fillStyle = '#F4D03F';
  ctx.fillRect(cx - w * 0.05, bodyY - h * 0.15, w * 0.1, h * 0.15);
  // 底部
  ctx.fillRect(cx - w * 0.05, bodyY + bodyH, w * 0.1, h * 0.1);
  // 流苏
  ctx.fillStyle = '#F4D03F';
  ctx.beginPath();
  ctx.moveTo(cx, bodyY + bodyH + h * 0.1);
  ctx.lineTo(cx - w * 0.08, h * 0.9);
  ctx.lineTo(cx + w * 0.08, h * 0.85);
  ctx.closePath();
  ctx.fill();
  // 挂绳
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, bodyY - h * 0.15);
  ctx.lineTo(cx, h * 0.05);
  ctx.stroke();
}

/** 绘制粽子 */
function drawZongzi(ctx, w, h) {
  const cx = w / 2, cy = h / 2;
  ctx.fillStyle = '#E8F8F5';
  ctx.fillRect(0, 0, w, h);
  // 粽子主体（三角形）
  ctx.fillStyle = '#4CAF50';
  ctx.beginPath();
  ctx.moveTo(cx, cy - h * 0.3);
  ctx.lineTo(cx - w * 0.35, cy + h * 0.25);
  ctx.lineTo(cx + w * 0.35, cy + h * 0.25);
  ctx.closePath();
  ctx.fill();
  // 粽叶纹理
  ctx.strokeStyle = '#2E7D32';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy - h * 0.3);
  ctx.lineTo(cx, cy + h * 0.22);
  ctx.stroke();
  // 绑绳
  ctx.strokeStyle = '#8D6E63';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.25, cy + h * 0.1);
  ctx.lineTo(cx + w * 0.25, cy + h * 0.1);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.2, cy);
  ctx.lineTo(cx + w * 0.2, cy);
  ctx.stroke();
  // 叶子
  ctx.fillStyle = '#66BB6A';
  ctx.beginPath();
  ctx.ellipse(cx - w * 0.2, cy - h * 0.32, w * 0.1, h * 0.12, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx + w * 0.2, cy - h * 0.32, w * 0.1, h * 0.12, 0.3, 0, Math.PI * 2);
  ctx.fill();
}

/** 绘制月饼 */
function drawMooncake(ctx, w, h) {
  const cx = w / 2, cy = h / 2;
  ctx.fillStyle = '#FEF9E7';
  ctx.fillRect(0, 0, w, h);
  // 月饼主体
  const r = Math.min(w, h) * 0.35;
  ctx.fillStyle = '#D4A017';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  // 边缘花纹
  ctx.strokeStyle = '#B8860B';
  ctx.lineWidth = 2;
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const x = cx + Math.cos(angle) * r * 0.85;
    const y = cy + Math.sin(angle) * r * 0.85;
    ctx.beginPath();
    ctx.arc(x, y, r * 0.06, 0, Math.PI * 2);
    ctx.fill();
  }
  // 文字
  ctx.fillStyle = '#8B6914';
  ctx.font = `bold ${Math.floor(r * 0.5)}px "KaiTi", "STKaiti", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('月饼', cx, cy);
  // 顶部高光
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.beginPath();
  ctx.arc(cx - r * 0.25, cy - r * 0.25, r * 0.3, 0, Math.PI * 2);
  ctx.fill();
}

/** 绘制福字 */
function drawFu(ctx, w, h) {
  const cx = w / 2, cy = h / 2;
  ctx.fillStyle = '#E74C3C';
  ctx.fillRect(0, 0, w, h);
  // 菱形背景
  const d = Math.min(w, h) * 0.7;
  ctx.fillStyle = '#F4D03F';
  ctx.beginPath();
  ctx.moveTo(cx, cy - d / 2);
  ctx.lineTo(cx + d / 2, cy);
  ctx.lineTo(cx, cy + d / 2);
  ctx.lineTo(cx - d / 2, cy);
  ctx.closePath();
  ctx.fill();
  // 福字
  ctx.fillStyle = '#E74C3C';
  ctx.font = `bold ${Math.floor(d * 0.45)}px "KaiTi", "STKaiti", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('福', cx, cy + d * 0.02);
}

/** 绘制龙头 */
function drawDragonHead(ctx, w, h) {
  const cx = w / 2, cy = h / 2;
  ctx.fillStyle = '#EBF5FB';
  ctx.fillRect(0, 0, w, h);
  // 龙头轮廓
  ctx.fillStyle = '#27AE60';
  ctx.beginPath();
  ctx.arc(cx, cy, w * 0.25, 0, Math.PI * 2);
  ctx.fill();
  // 龙角
  ctx.fillStyle = '#F39C12';
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.15, cy - w * 0.2);
  ctx.lineTo(cx - w * 0.2, cy - w * 0.4);
  ctx.lineTo(cx - w * 0.05, cy - w * 0.25);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.15, cy - w * 0.2);
  ctx.lineTo(cx + w * 0.2, cy - w * 0.4);
  ctx.lineTo(cx + w * 0.05, cy - w * 0.25);
  ctx.closePath();
  ctx.fill();
  // 眼睛
  ctx.fillStyle = '#FFF';
  ctx.beginPath();
  ctx.arc(cx - w * 0.08, cy - w * 0.05, w * 0.06, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + w * 0.08, cy - w * 0.05, w * 0.06, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(cx - w * 0.07, cy - w * 0.04, w * 0.03, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + w * 0.07, cy - w * 0.04, w * 0.03, 0, Math.PI * 2);
  ctx.fill();
  // 嘴巴
  ctx.fillStyle = '#E74C3C';
  ctx.beginPath();
  ctx.arc(cx, cy + w * 0.08, w * 0.12, 0.2, Math.PI - 0.2);
  ctx.lineTo(cx, cy + w * 0.02);
  ctx.closePath();
  ctx.fill();
  // 胡须
  ctx.strokeStyle = '#F39C12';
  ctx.lineWidth = 2;
  for (let i = -1; i <= 1; i += 0.5) {
    ctx.beginPath();
    ctx.moveTo(cx + i * w * 0.08, cy + w * 0.05);
    ctx.quadraticCurveTo(cx + i * w * 0.2, cy + w * 0.2, cx + i * w * 0.15, cy + w * 0.3);
    ctx.stroke();
  }
}

// ==================== 双人对弈记录 ====================

/**
 * 保存双人对弈记录
 */
function saveVsRecord(record) {
  const records = loadData('vs_records') || [];
  records.push({ ...record, id: generateId(), date: getDateString(), time: getTimeString() });
  saveData('vs_records', records);
}

/**
 * 获取双人对弈记录
 */
function getVsRecords() {
  return loadData('vs_records') || [];
}

// ==================== 组队闯关记录 ====================

/**
 * 保存组队记录
 */
function saveTeamRecord(record) {
  const records = loadData('team_records') || [];
  records.push({ ...record, id: generateId(), date: getDateString(), time: getTimeString() });
  saveData('team_records', records);
}

/**
 * 获取组队记录
 */
function getTeamRecords() {
  return loadData('team_records') || [];
}

/**
 * 获取组队成员姓名列表
 */
function getTeamStudentNames() {
  const records = getTeamRecords();
  const names = new Set();
  records.forEach(r => {
    if (r.members) r.members.forEach(m => names.add(m));
  });
  return [...names];
}

// ==================== 对战专用题库（包含部分原题+新增题目，避免和单人模式重复过多） ====================
const VS_QUIZ_BANK = [
  // 春节
  { id: 'vs1', festival: 'chunjie', question: '春节时，人们为什么要在门口贴"福"字？', options: ['装饰好看', '祈求福气到来', '遮挡阳光', '标记门牌号'], answer: 1, knowledge: '贴福字象征福气临门，有时倒贴寓意"福到了"。' },
  { id: 'vs2', festival: 'chunjie', question: '压岁钱的"岁"与以下哪个字同音？', options: ['碎', '祟', '随', '穗'], answer: 1, knowledge: '压岁钱原称"压祟钱"，"祟"指不吉利的东西，寓意保护孩子平安。' },
  { id: 'vs3', festival: 'chunjie', question: '十二生肖中，排在第一位的是？', options: ['牛', '龙', '鼠', '虎'], answer: 2, knowledge: '十二生肖以鼠为首，传说老鼠在排生肖时耍了小聪明得了第一。' },
  { id: 'vs4', festival: 'chunjie', question: '春节对联的上联应该贴在门的哪边？', options: ['左边', '右边', '上面', '下面'], answer: 0, knowledge: '传统上面对大门时，上联贴在右边（古以右为尊），现在一般左为上联。' },
  // 元宵节
  { id: 'vs5', festival: 'yuanxiao', question: '元宵节赏灯的习俗起源于哪个朝代？', options: ['唐朝', '汉朝', '宋朝', '明朝'], answer: 1, knowledge: '元宵赏灯始于东汉明帝时期，已有2000多年历史。' },
  { id: 'vs6', festival: 'yuanxiao', question: '汤圆和元宵是同一种东西吗？', options: ['完全一样', '做法不同，元宵是滚的', '颜色不同', '没有区别'], answer: 1, knowledge: '汤圆是包的，元宵是滚的，北方多吃元宵、南方多吃汤圆。' },
  // 清明节
  { id: 'vs7', festival: 'qingming', question: '清明节的日期与哪个节气有关？', options: ['立春', '谷雨', '清明节气', '春分'], answer: 2, knowledge: '清明节是二十四节气中唯一既是节气又是节日的。' },
  { id: 'vs8', festival: 'qingming', question: '以下哪句诗描写的是清明节？', options: ['床前明月光', '清明时节雨纷纷', '春眠不觉晓', '锄禾日当午'], answer: 1, knowledge: '"清明时节雨纷纷，路上行人欲断魂"是杜牧的《清明》名句。' },
  // 端午节
  { id: 'vs9', festival: 'duanwu', question: '端午节又叫什么节？', options: ['团圆节', '粽子节', '女儿节', '重阳节'], answer: 1, knowledge: '端午节因吃粽子而俗称"粽子节"，正式名称还有端阳节、龙舟节等。' },
  { id: 'vs10', festival: 'duanwu', question: '屈原是哪个国家的爱国诗人？', options: ['秦国', '楚国', '齐国', '燕国'], answer: 1, knowledge: '屈原是战国时期楚国人，因楚国被秦攻破而投江殉国。' },
  { id: 'vs11', festival: 'duanwu', question: '龙舟比赛中，船头通常装饰什么？', options: ['凤凰', '龙头', '老虎', '麒麟'], answer: 1, knowledge: '龙舟船头雕刻龙头，象征龙的传人，增添气势。' },
  // 七夕节
  { id: 'vs12', festival: 'qixi', question: '七夕节又称什么？', options: ['粽子节', '乞巧节', '团圆节', '登高节'], answer: 1, knowledge: '七夕节又称乞巧节、女儿节，是古代女子展示手艺和祈求巧艺的节日。' },
  // 中秋节
  { id: 'vs13', festival: 'zhongqiu', question: '以下哪首词与中秋节有关？', options: ['静夜思', '水调歌头·明月几时有', '登鹳雀楼', '春晓'], answer: 1, knowledge: '苏轼的《水调歌头》"明月几时有，把酒问青天"是写中秋的千古名篇。' },
  { id: 'vs14', festival: 'zhongqiu', question: '月饼最初是用来做什么的？', options: ['零食', '祭品的点心', '军粮', '礼品'], answer: 1, knowledge: '月饼最初是古代中秋祭拜月神的供品，后来才演变为中秋必备食品。' },
  // 重阳节
  { id: 'vs15', festival: 'chongyang', question: '"每逢佳节倍思亲"描写的是哪个节日？', options: ['春节', '中秋节', '重阳节', '清明节'], answer: 2, knowledge: '王维《九月九日忆山东兄弟》"独在异乡为异客，每逢佳节倍思亲"写于重阳节。' },
  { id: 'vs16', festival: 'chongyang', question: '重阳节插茱萸的习俗有什么寓意？', options: ['装饰', '驱邪避灾', '纪念祖先', '祈求丰收'], answer: 1, knowledge: '茱萸有浓烈香气，古人认为可以驱虫去湿、辟邪消灾。' },
  // 冬至
  { id: 'vs17', festival: 'dongzhi', question: '冬至之后，白天会怎样变化？', options: ['越来越短', '越来越长', '不变', '不确定'], answer: 1, knowledge: '冬至是北半球白天最短的一天，此后白天逐渐变长，古人说"冬至一阳生"。' },
  { id: 'vs18', festival: 'dongzhi', question: '以下哪个不是冬至的传统习俗？', options: ['吃饺子', '画消寒图', '赛龙舟', '数九'], answer: 2, knowledge: '赛龙舟是端午节的习俗。冬至有吃饺子、画消寒图、数九等习俗。' },
  // 混合难易题
  { id: 'vs19', festival: 'chunjie', question: '年兽最怕什么？（多选提示：选最全的）', options: ['红色', '鞭炮声', '红色和鞭炮声', '水'], answer: 2, knowledge: '传说年兽害怕红色和巨大的响声，所以春节贴红对联、放鞭炮来驱赶年兽。' },
  { id: 'vs20', festival: 'zhongqiu', question: '中秋节与下面哪个神话传说有关？', options: ['女娲补天', '嫦娥奔月', '精卫填海', '大禹治水'], answer: 1, knowledge: '中秋节与嫦娥奔月的传说密切相关，嫦娥吃仙药后飞到了月亮上。' },
];

// Canvas 绘制函数映射
const CANVAS_DRAWERS = {
  drawLantern,
  drawZongzi,
  drawMooncake,
  drawFu,
  drawDragonHead,
};

// ==================== 游戏全局状态 ====================
const GameState = {
    currentScreen: 'start-screen',
    unlockedLevels: [1],
    completedLevels: [],
    level1: {
        selectedPhotos: new Set(),
        correctAnswers: new Set(),
        timer: null,
        startTime: null,
        submitted: false
    },
    level2: {
        sampleCount: 200,
        epochCount: 50,
        accuracy: 0,
        loss: 2.5,
        isTraining: false,
        timer: null,
        startTime: null,
        trainingComplete: false
    },
    level3: {
        currentRound: 0,
        totalRounds: 10,
        score: 100,
        correctCount: 0,
        results: [],
        timer: null,
        isRunning: false,
        currentPerson: null
    }
};

// ==================== 人脸照片数据（关卡一） ====================
const facePhotos = [
    { id: 1, quality: 'good', label: '清晰正面照', type: 'student', avatar: '👨‍🎓' },
    { id: 2, quality: 'good', label: '清晰正面照', type: 'teacher', avatar: '👩‍🏫' },
    { id: 3, quality: 'bad', label: '逆光照片', type: 'student', avatar: '👨‍🎓' },
    { id: 4, quality: 'good', label: '清晰正面照', type: 'student', avatar: '👩‍🎓' },
    { id: 5, quality: 'bad', label: '戴口罩遮挡', type: 'teacher', avatar: '🧑‍🏫' },
    { id: 6, quality: 'bad', label: '模糊不清', type: 'student', avatar: '👨‍🎓' },
    { id: 7, quality: 'good', label: '清晰正面照', type: 'staff', avatar: '👨‍💼' },
    { id: 8, quality: 'bad', label: '侧脸过偏', type: 'student', avatar: '👩‍🎓' },
    { id: 9, quality: 'good', label: '清晰正面照', type: 'teacher', avatar: '👩‍🏫' },
    { id: 10, quality: 'bad', label: '光线过暗', type: 'student', avatar: '👨‍🎓' },
    { id: 11, quality: 'good', label: '清晰正面照', type: 'student', avatar: '👩‍🎓' },
    { id: 12, quality: 'bad', label: '运动模糊', type: 'teacher', avatar: '👨‍🏫' },
    { id: 13, quality: 'good', label: '清晰正面照', type: 'student', avatar: '👨‍🎓' },
    { id: 14, quality: 'bad', label: '帽子遮挡', type: 'student', avatar: '👩‍🎓' },
    { id: 15, quality: 'good', label: '清晰正面照', type: 'staff', avatar: '👩‍💼' },
    { id: 16, quality: 'bad', label: '强光过曝', type: 'student', avatar: '👨‍🎓' },
    { id: 17, quality: 'good', label: '清晰正面照', type: 'teacher', avatar: '👩‍🏫' },
    { id: 18, quality: 'bad', label: '部分遮挡', type: 'student', avatar: '👩‍🎓' },
    { id: 19, quality: 'good', label: '清晰正面照', type: 'student', avatar: '👨‍🎓' },
    { id: 20, quality: 'bad', label: '分辨率过低', type: 'teacher', avatar: '👨‍🏫' }
];

// ==================== 测试人员数据（关卡三） ====================
const testPersons = [
    { name: '张明', role: '九年级学生', identity: 'authorized', avatar: '👨‍🎓', confidence: 96 },
    { name: '李华', role: '九年级学生', identity: 'authorized', avatar: '👩‍🎓', confidence: 94 },
    { name: '王老师', role: '数学教师', identity: 'authorized', avatar: '👩‍🏫', confidence: 98 },
    { name: '陌生人甲', role: '校外人员', identity: 'unauthorized', avatar: '🚶', confidence: 15 },
    { name: '刘芳', role: '九年级学生', identity: 'authorized', avatar: '👩‍🎓', confidence: 92 },
    { name: '戴口罩的人', role: '身份不明', identity: 'masked', avatar: '😷', confidence: 45 },
    { name: '陈校长', role: '学校领导', identity: 'authorized', avatar: '👨‍💼', confidence: 99 },
    { name: '陌生人乙', role: '外卖员', identity: 'unauthorized', avatar: '🛵', confidence: 8 },
    { name: '赵雪', role: '八年级学生', identity: 'authorized', avatar: '👩‍🎓', confidence: 91 },
    { name: '相似人脸', role: '双胞胎(未录入)', identity: 'similar', avatar: '👯', confidence: 78 }
];

// ==================== 屏幕切换函数 ====================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    GameState.currentScreen = screenId;
    
    if (screenId === 'level-select-screen') {
        updateLevelSelectUI();
    } else if (screenId === 'level1-screen' && !GameState.level1.submitted) {
        initLevel1();
    } else if (screenId === 'level3-screen' && !GameState.level3.isRunning) {
        initLevel3();
    }
}

// ==================== 开始游戏 ====================
function startGame() {
    showScreen('level-select-screen');
}

// ==================== 关卡选择界面更新 ====================
function updateLevelSelectUI() {
    const unlocked = GameState.unlockedLevels;
    const completed = GameState.completedLevels;
    
    // 更新旧版UI（保留兼容）
    for (let i = 1; i <= 3; i++) {
        const card = document.getElementById(`level${i}-card`);
        const lockIcon = document.getElementById(`level${i}-lock`);
        const statusText = document.getElementById(`${i === 1 ? 'level1' : `level${i}`}-status`);
        
        if (unlocked.includes(i)) {
            card.classList.remove('locked');
            lockIcon.textContent = '';
            
            if (completed.includes(i)) {
                statusText.textContent = '✅ 已完成';
                statusText.style.color = '#5CB85C';
                card.classList.add('completed');
            } else {
                statusText.textContent = '点击开始';
                statusText.style.color = '#4A90E2';
            }
            
            if (i < 3 && !unlocked.includes(i + 1)) {
                const nextLock = document.getElementById(`level${i+1}-lock`);
                const nextStatus = document.getElementById(`level${i+1}-status`);
                nextStatus.textContent = '需要通关上一关';
            }
        } else {
            card.classList.add('locked');
            lockIcon.textContent = '🔒';
            statusText.textContent = i > 1 ? '需要通关上一关' : '未解锁';
        }
    }
    
    // 更新版UI - 新增部分
    updateModernLevelSelectUI(unlocked, completed);
    
    // 更新进度条
    const progressPercent = Math.round((completed.length / 3) * 100);
    
    // 圆形进度条动画
    const progressCircle = document.getElementById('progress-circle');
    if (progressCircle) {
        const circumference = 283; // 2 * PI * 45
        const offset = circumference - (progressPercent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }
    
    // 进度百分比文字
    const percentEl = document.getElementById('progress-percent');
    if (percentEl) {
        percentEl.textContent = `${progressPercent}%`;
    }
    
    // 迷你进度显示
    const miniProgress = document.getElementById('mini-progress-text');
    if (miniProgress) {
        miniProgress.textContent = `${completed.length}/3`;
    }
    
    // 检查列表更新
    updateChecklist(completed, unlocked);
    
    // 旧进度条兼容
    document.getElementById('total-progress').style.width = `${progressPercent}%`;
    document.getElementById('progress-text').textContent = `${completed.length}/3 关卡完成`;
}

// 新版本关卡选择UI更新函数
function updateModernLevelSelectUI(unlocked, completed) {
    for (let i = 1; i <= 3; i++) {
        const card = document.getElementById(`level${i}-card`);
        const statusBar = document.getElementById(`level${i}-status-bar`);
        const checkItem = document.querySelector(`.check-item[data-level="${i}"]`);
        
        if (!card) continue;
        
        // 移除旧状态类
        card.classList.remove('completed');
        
        if (unlocked.includes(i)) {
            card.classList.remove('locked');
            
            if (completed.includes(i)) {
                card.classList.add('completed');
                if (statusBar) {
                    statusBar.style.background = 'linear-gradient(90deg, #5CB85C, #449D44)';
                }
                
                if (checkItem) {
                    checkItem.classList.add('completed');
                    checkItem.classList.remove('pending', 'locked');
                    checkItem.querySelector('.check-box').textContent = '✓';
                    checkItem.querySelector('.check-status').textContent = '已完成';
                    checkItem.querySelector('.check-status').className = 'check-status done';
                }
            } else {
                if (statusBar) {
                    statusBar.style.background = 'linear-gradient(90deg, #4A90E2, #764ba2)';
                }
                
                if (checkItem) {
                    checkItem.classList.remove('completed', 'locked');
                    checkItem.classList.add('pending');
                    checkItem.querySelector('.check-box').textContent = '○';
                    checkItem.querySelector('.check-status').textContent = '待完成';
                    checkItem.querySelector('.check-status').className = 'check-status pending';
                }
            }
        } else {
            card.classList.add('locked');
            card.classList.remove('completed');
            
            if (statusBar) {
                statusBar.style.background = '#ddd';
            }
            
            if (checkItem) {
                checkItem.classList.remove('completed', 'pending');
                checkItem.classList.add('locked');
                checkItem.querySelector('.check-box').textContent = '🔒';
                checkItem.querySelector('.check-status').textContent = '待解锁';
                checkItem.querySelector('.check-status').className = 'check-status locked';
            }
        }
    }
}

// 更新检查列表
function updateChecklist(completed, unlocked) {
    // 这个函数已经在updateModernLevelSelectUI中处理了
}

// 选中的关卡ID
let selectedLevelId = null;

// 选择关卡（增强版）
function selectLevel(level) {
    if (!GameState.unlockedLevels.includes(level)) return;
    
    selectedLevelId = level;
    
    // 高亮选中的卡片
    document.querySelectorAll('.level-card-modern').forEach(card => {
        card.style.outline = 'none';
    });
    
    const selectedCard = document.getElementById(`level${level}-card`);
    if (selectedCard && !selectedCard.classList.contains('locked')) {
        selectedCard.style.outline = '3px solid #4A90E2';
        selectedCard.style.outlineOffset = '3px';
    }
    
    // 更新开始按钮文本
    const startBtn = document.getElementById('btn-start-level');
    if (startBtn) {
        const levelNames = ['', '第一关：数据采集', '第二关：模型训练', '第三关：门禁实战'];
        startBtn.textContent = `▶ 开始${levelNames[level]}`;
    }
    
    // 延迟后跳转或等待点击开始按钮
    setTimeout(() => {
        switch(level) {
            case 1:
                showScreen('level1-screen');
                break;
            case 2:
                showScreen('level2-screen');
                break;
            case 3:
                showScreen('level3-screen');
                break;
        }
    }, 300);
}

// ==================== 关卡一：初始化 ====================
function initLevel1() {
    GameState.level1.selectedPhotos.clear();
    GameState.level1.submitted = false;
    
    // 初始化正确答案（所有quality为good的照片）
    GameState.level1.correctAnswers.clear();
    facePhotos.forEach(p => {
        if (p.quality === 'good') {
            GameState.level1.correctAnswers.add(p.id);
        }
    });
    
    renderPhotoGrid();
    updateStats();
    startTimer('level1-timer');
}

// ==================== 关卡一：渲染照片网格 ====================
function renderPhotoGrid() {
    const grid = document.getElementById('photo-grid');
    grid.innerHTML = '';
    
    facePhotos.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'photo-item';
        item.dataset.id = photo.id;
        
        if (GameState.level1.selectedPhotos.has(photo.id)) {
            item.classList.add('selected');
        }
        
        // 根据质量生成不同的视觉效果
        let bgGradient, overlayStyle = '';
        if (photo.quality === 'bad') {
            const badEffects = {
                '逆光照片': 'linear-gradient(135deg, #fff 0%, #333 100%)',
                '戴口罩遮挡': 'linear-gradient(135deg, #e0e0e0 0%, #999 100%)',
                '模糊不清': 'linear-gradient(135deg, #bbb 0%, #888 100%)',
                '侧脸过偏': 'linear-gradient(90deg, #ddd 50%, #666 100%)',
                '光线过暗': 'linear-gradient(135deg, #333 0%, #111 100%)',
                '运动模糊': 'linear-gradient(135deg, #aaa 40%, #777 60%)',
                '帽子遮挡': 'linear-gradient(180deg, #555 35%, #e8d0b0 100%)',
                '强光过曝': 'linear-gradient(135deg, #fff 0%, #eee 100%)',
                '部分遮挡': 'linear-gradient(135deg, #ccc 30%, #e8d0b0 70%)',
                '分辨率过低': 'repeating-linear-gradient(0deg, #999 0px, #777 2px, #999 4px)'
            };
            bgGradient = badEffects[photo.label] || 'linear-gradient(135deg, #999, #666)';
        } else {
            const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
            bgGradient = `linear-gradient(135deg, ${colors[photo.id % colors.length]}, ${colors[(photo.id + 2) % colors.length]})`;
        }
        
        item.style.background = bgGradient;
        
        item.innerHTML = `
            <div class="photo-quality-tag ${photo.quality === 'good' ? 'quality-good' : 'quality-bad'}">
                ${photo.quality === 'good' ? '合格' : '不合格'}
            </div>
            <div class="photo-image" style="display:flex;align-items:center;justify-content:center;font-size:3rem;">
                ${photo.avatar}
            </div>
            <div class="photo-label">${photo.label}</div>
        `;
        
        item.addEventListener('click', () => togglePhotoSelection(photo.id));
        grid.appendChild(item);
    });
}

// ==================== 关卡一：切换照片选择状态 ====================
function togglePhotoSelection(id) {
    if (GameState.level1.submitted) return;
    
    if (GameState.level1.selectedPhotos.has(id)) {
        GameState.level1.selectedPhotos.delete(id);
    } else {
        GameState.level1.selectedPhotos.add(id);
    }
    
    renderPhotoGrid();
    updateStats();
}

// ==================== 关卡一：更新统计信息 ====================
function updateStats() {
    const selected = GameState.level1.selectedPhotos.size;
    const noiseCount = [...GameState.level1.selectedPhotos].filter(id => 
        facePhotos.find(p => p.id === id).quality === 'bad'
    ).length;
    
    document.getElementById('selected-count').textContent = selected;
    document.getElementById('noise-count').textContent = noiseCount;
    document.getElementById('remaining-count').textContent = 20 - selected;
}

// ==================== 关卡一：重置选择 ====================
function resetLevel1() {
    GameState.level1.selectedPhotos.clear();
    renderPhotoGrid();
    updateStats();
}

// ==================== 关卡一：提交结果 ====================
function submitLevel1() {
    const selected = GameState.level1.selectedPhotos.size;
    const noiseData = [...GameState.level1.selectedPhotos].filter(id => 
        facePhotos.find(p => p.id === id).quality === 'bad'
    );
    
    // 验证数量
    if (selected < 8) {
        showModal('level1-modal', '⚠️', '选择数量不足', 
            `你只选择了 ${selected} 张照片，至少需要选择 8-18 张才能进行训练。`,
            '<strong>知识点：</strong>AI模型训练需要足够的数据量支撑，样本太少会导致模型无法学习到有效特征。',
            false); // 不显示下一关按钮
        return;
    }
    
    if (selected > 18) {
        showModal('level1-modal', '⚠️', '选择数量过多',
            `你选择了 ${selected} 张照片，超过了推荐的最大值 18 张。`,
            '<strong>知识点：</strong>虽然数据越多越好，但也要注意数据质量，包含过多噪声数据反而会降低模型性能。',
            false); // 不显示下一关按钮
        return;
    }
    
    GameState.level1.submitted = true;
    stopTimer('level1-timer');
    
    // 计算得分
    const correctSelections = [...GameState.level1.selectedPhotos].filter(id => 
        GameState.level1.correctAnswers.has(id)
    ).length;
    const missedGood = GameState.level1.correctAnswers.size - correctSelections;
    const totalCorrectPossible = GameState.level1.correctAnswers.size;
    const accuracy = Math.round((correctSelections / Math.max(selected, totalCorrectPossible)) * 100);
    
    let title, icon, message, knowledge, canProceed;
    
    if (noiseData.length === 0 && missedGood <= 2 && accuracy >= 85) {
        icon = '🌟';
        title = '优秀！数据采集完美';
        message = `你成功筛选出 ${correctSelections} 张优质人脸样本，噪声数据为 0！这些高质量数据将大大提升模型的识别准确率。`;
        knowledge = '<strong>课本知识：</strong>「采集优质数据，是人工智能识别的第一步。」高质量、多样本是 AI 精准识别的基础。';
        canProceed = true;
        
        if (!GameState.unlockedLevels.includes(2)) {
            GameState.unlockedLevels.push(2);
        }
        GameState.completedLevels.push(1);
    } else if (noiseData.length <= 2 && accuracy >= 65) {
        icon = '✅';
        title = '合格！通过数据采集关';
        message = `你选择了 ${selected} 张照片，其中 ${noiseData.length} 张包含噪声数据，${missedGood} 张合格样本被遗漏。准确率约 ${accuracy}%。`;
        knowledge = `<strong>重要提示：</strong>模糊、遮挡、逆光等不合格人脸<strong>无法提取有效的几何特征和纹理特征</strong>，不能用于模型训练。这会直接导致后续识别精度下降。`;
        canProceed = true;
        
        if (!GameState.unlockedLevels.includes(2)) {
            GameState.unlockedLevels.push(2);
        }
        GameState.completedLevels.push(1);
    } else {
        icon = '❌';
        title = '需要改进！数据质量不达标';
        message = `你选择的 ${selected} 张照片中包含 ${noiseData.length} 张噪声数据，且遗漏了 ${missedGood} 张合格样本。这样的数据集会导致模型训练效果很差。`;
        knowledge = `<strong>知识点回顾：</strong>合格的训练数据应满足：<br>1. 图像清晰、无模糊<br>2. 正面拍摄、角度正常<br>3. 光线充足、无明显阴影<br>4. 无遮挡物（口罩、帽子等）<br><br>请重新筛选后再提交！`;
        canProceed = false;
    }
    
    showModal('level1-modal', icon, title, message, knowledge, canProceed);
}

// 关卡一完成后进入第二关
function goToLevel2FromLevel1() {
    closeModal('level1-modal');
    showScreen('level2-screen');
}

// 关卡一关闭弹窗并重试
function closeModalAndRetryLevel1() {
    closeModal('level1-modal');
    resetLevel1();
}

// ==================== 关卡二：参数显示更新 ====================
function updateParamDisplay(inputId, displayId) {
    const value = document.getElementById(inputId).value;
    document.getElementById(displayId).textContent = value;
    
    if (inputId === 'sample-count') {
        GameState.level2.sampleCount = parseInt(value);
    } else if (inputId === 'epoch-count') {
        GameState.level2.epochCount = parseInt(value);
    }
    
    updateEstimatedResults();
}

// ==================== 关卡二：预设模式 ====================
function setSamplePreset(value, mode) {
    document.getElementById('sample-count').value = value;
    document.getElementById('sample-display').textContent = value;
    GameState.level2.sampleCount = value;
    
    // 更新按钮状态
    document.querySelectorAll('.param-group:first-child .option-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    updateEstimatedResults();
}

function setEpochPreset(value, mode) {
    document.getElementById('epoch-count').value = value;
    document.getElementById('epoch-display').textContent = value;
    GameState.level2.epochCount = value;
    
    // 更新按钮状态
    document.querySelectorAll('.param-group:last-child .option-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    updateEstimatedResults();
}

// ==================== 关卡二：预估结果计算 ====================
function updateEstimatedResults() {
    const samples = GameState.level2.sampleCount;
    const epochs = GameState.level2.epochCount;
    
    // 基于参数估算时间和准确率
    const baseTime = Math.round((samples / 100) * (epochs / 20) * 8);
    const timeStr = baseTime < 60 ? `约${baseTime}秒` : `约${Math.round(baseTime/60)}分钟`;
    
    // 简化的准确率估算公式
    let minAcc, maxAcc;
    if (samples <= 100 || epochs <= 20) {
        minAcc = 55; maxAcc = 72;
    } else if (samples <= 200 && epochs <= 50) {
        minAcc = 72; maxAcc = 88;
    } else if (samples <= 350 && epochs <= 70) {
        minAcc = 82; maxAcc = 94;
    } else {
        minAcc = 88; maxAcc = 98;
    }
    
    document.getElementById('estimated-time').textContent = timeStr;
    document.getElementById('expected-accuracy').textContent = `${minAcc}% - ${maxAcc}%`;
}

// ==================== 关卡二：开始训练 ====================
async function startTraining() {
    if (GameState.level2.isTraining) return;
    
    GameState.level2.isTraining = true;
    GameState.level2.trainingComplete = false;
    document.getElementById('start-training-btn').disabled = true;
    document.getElementById('start-training-btn').textContent = '⏳ 训练中...';
    
    // 更新状态指示器
    const statusEl = document.getElementById('training-status');
    statusEl.innerHTML = '<div class="status-indicator running"></div><span>模型训练进行中...</span>';
    
    startTimer('level2-timer');
    clearTrainingLog();
    addLogEntry('[系统] 开始初始化训练环境...', 'normal');
    
    await sleep(500);
    addLogEntry(`[配置] 样本数量: ${GameState.level2.sampleCount}`, 'normal');
    addLogEntry(`[配置] 迭代次数: ${GameState.level2.epochCount}`, 'normal');
    
    await sleep(800);
    addLogEntry('[系统] 加载预训练权重...', 'normal');
    await sleep(600);
    addLogEntry('[系统] 数据增强处理完成', 'normal');
    await sleep(400);
    addLogEntry('[系统] 开始训练循环...', 'success');
    
    const totalSteps = 100;
    let currentAccuracy = 25 + Math.random() * 15;
    let currentLoss = 2.2 + Math.random() * 0.5;
    
    const accuracyHistory = [];
    const lossHistory = [];
    
    for (let step = 1; step <= totalSteps; step++) {
        await sleep(80 + Math.random() * 60);
        
        // 模拟训练过程
        const progress = step / totalSteps;
        
        // 准确率逐步上升（带随机波动）
        const targetAccuracy = calculateTargetAccuracy();
        currentAccuracy += (targetAccuracy - currentAccuracy) * 0.08 + (Math.random() - 0.48) * 3;
        currentAccuracy = Math.min(Math.max(currentAccuracy, 30), 99.5);
        
        // Loss逐步下降（带随机波动）
        targetLoss = calculateTargetLoss();
        currentLoss += (targetLoss - currentLoss) * 0.06 + (Math.random() - 0.52) * 0.15;
        currentLoss = Math.max(currentLoss, 0.05);
        
        accuracyHistory.push(currentAccuracy);
        lossHistory.push(currentLoss);
        
        // 更新UI
        document.getElementById('training-progress').style.width = `${step}%`;
        document.getElementById('training-progress-text').textContent = `${step}%`;
        document.getElementById('accuracy-value').textContent = `${currentAccuracy.toFixed(1)}%`;
        document.getElementById('loss-value').textContent = currentLoss.toFixed(3);
        
        // 每10步记录日志
        if (step % 10 === 0 || step === totalSteps) {
            addLogEntry(`[Epoch ${Math.round(step/totalSteps*GameState.level2.epochCount)}] Acc: ${currentAccuracy.toFixed(2)}% | Loss: ${currentLoss.toFixed(4)}`, 'normal');
        }
        
        // 更新图表（简化版）
        if (step % 5 === 0) {
            updateMiniChart('accuracy-chart', accuracyHistory.slice(-20), '#5CB85C');
            updateMiniChart('loss-chart', lossHistory.slice(-20), '#E74C3C');
        }
    }
    
    // 训练完成
    GameState.level2.accuracy = currentAccuracy;
    GameState.level2.loss = currentLoss;
    GameState.level2.trainingComplete = true;
    GameState.level2.isTraining = false;
    
    stopTimer('level2-timer');
    
    statusEl.innerHTML = '<div class="status-indicator success"></div><span>训练完成！</span>';
    addLogEntry('[系统] 🎉 模型训练完成！', 'success');
    
    document.getElementById('start-training-btn').disabled = false;
    document.getElementById('start-training-btn').textContent = '🚀 重新训练';
    
    // 显示结果弹窗
    setTimeout(() => showTrainingResult(), 800);
}

// ==================== 计算目标准确率和损失 ====================
function calculateTargetAccuracy() {
    const samples = GameState.level2.sampleCount;
    const epochs = GameState.level2.epochCount;
    
    let base = 60;
    base += (samples / 500) * 25;  // 样本贡献
    base += (epochs / 100) * 15;   // 迭代贡献
    
    // 添加一些非线性因素
    base += Math.sin(samples / 50) * 5 + Math.cos(epochs / 20) * 3;
    
    return base;
}

function calculateTargetLoss() {
    const samples = GameState.level2.sampleCount;
    const epochs = GameState.level2.epochCount;
    
    let base = 1.5;
    base -= (samples / 500) * 1.0;
    base -= (epochs / 100) * 0.8;
    
    return Math.max(base, 0.08);
}

// ==================== 关卡二：迷你图表更新 ====================
function updateMiniChart(chartId, data, color) {
    const chart = document.getElementById(chartId);
    if (!chart || data.length < 2) return;
    
    const width = chart.offsetWidth || 150;
    const height = chart.offsetHeight || 70;
    const padding = 5;
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    let points = data.map((v, i) => {
        const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((v - min) / range) * (height - 2 * padding);
        return `${x},${y}`;
    }).join(' ');
    
    chart.innerHTML = `
        <svg width="100%" height="100%" style="position:absolute;top:0;left:0;">
            <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2" />
        </svg>
    `;
}

// ==================== 关卡二：显示训练结果 ====================
function showTrainingResult() {
    const acc = GameState.level2.accuracy;
    const loss = GameState.level2.loss;
    
    let rank, rankEmoji, evaluation, knowledge;
    
    if (acc >= 92) {
        rank = '金牌';
        rankEmoji = '🥇';
        evaluation = '优秀！模型表现极佳';
        knowledge = '<strong>恭喜！</strong>你设置的参数非常合理，模型达到了优秀的识别能力。<br><br>关键因素：充足的样本量保证了模型的泛化能力，足够的迭代次数让算法充分收敛。<br><br><em>AI三大要素具象化体现：</em>数据(样本量)、算法(迭代优化)、算力(训练效率)';
    } else if (acc >= 80) {
        rank = '银牌';
        rankEmoji = '🥈';
        evaluation = '良好！模型可用';
        knowledge = '<strong>不错！</strong>模型达到了可用的水平。<br><br>提示：如果想要更高的准确率，可以尝试增加样本数量或提高迭代次数。<br><br>记住：<strong>数据越多、训练越充分，AI算法模型越稳定</strong>！';
    } else if (acc >= 65) {
        rank = '铜牌';
        rankEmoji = '🥉';
        evaluation = '及格！但建议优化';
        knowledge = '<strong>提醒：</strong>当前模型准确率偏低，在实际应用中可能会产生较多误判。<br><br>建议调整：1. 增加训练样本至200张以上；2. 提高迭代次数至50次以上；3. 确保第一关的数据质量过关。';
    } else {
        rank = '需改进';
        rankEmoji = '⚠️';
        evaluation = '模型需要重新训练';
        knowledge = '<strong>警告：</strong>模型准确率过低，不建议投入使用。<br><br><strong>问题分析：</strong>可能原因包括：样本数量不足、迭代次数不够、或前一关卡数据质量差。<br><br>请返回调整参数后重新训练！';
    }
    
    document.getElementById('training-rank').textContent = rankEmoji;
    document.getElementById('training-result-title').textContent = `${rank}成就解锁！`;
    document.getElementById('final-accuracy').textContent = `${acc.toFixed(1)}%`;
    document.getElementById('final-loss').textContent = loss.toFixed(4);
    document.getElementById('training-evaluation').textContent = evaluation;
    document.getElementById('training-knowledge').innerHTML = knowledge;
    
    document.getElementById('training-complete-modal').classList.remove('hidden');
    
    if (acc >= 75 && !GameState.unlockedLevels.includes(3)) {
        GameState.unlockedLevels.push(3);
    }
    if (acc >= 65 && !GameState.completedLevels.includes(2)) {
        GameState.completedLevels.push(2);
    }
}

// ==================== 关卡二：重新训练/进入下一关 ====================
function retryTraining() {
    closeModal('training-complete-modal');
    document.getElementById('start-training-btn').textContent = '🚀 开始训练';
    
    // 重置显示
    document.getElementById('training-progress').style.width = '0%';
    document.getElementById('training-progress-text').textContent = '0%';
    document.getElementById('accuracy-value').textContent = '--%';
    document.getElementById('loss-value').textContent = '--';
    document.getElementById('accuracy-chart').innerHTML = '';
    document.getElementById('loss-chart').innerHTML = '';
    
    document.getElementById('training-status').innerHTML = 
        '<div class="status-indicator idle"></div><span>等待开始训练...</span>';
}

function goToLevel3() {
    closeModal('training-complete-modal');
    showScreen('level3-screen');
}

// ==================== 日志功能 ====================
function clearTrainingLog() {
    document.getElementById('training-log').innerHTML = '';
}

function addLogEntry(message, type = 'normal') {
    const log = document.getElementById('training-log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

// ==================== 关卡三：初始化 ====================
function initLevel3() {
    GameState.level3.currentRound = 0;
    GameState.level3.score = 100;
    GameState.level3.correctCount = 0;
    GameState.level3.results = [];
    GameState.level3.isRunning = true;
    GameState.level3.currentPerson = null;
    
    // 重置UI
    document.getElementById('round-number').textContent = '1';
    document.getElementById('level3-score').textContent = '100';
    document.getElementById('log-entries').innerHTML = '';
    document.getElementById('confidence-value').textContent = '--';
    document.getElementById('match-icon').textContent = '?';
    document.getElementById('match-text').textContent = '等待中...';
    document.getElementById('match-status').className = 'match-status';
    document.getElementById('scanner-display').className = 'scanner-display';
    document.getElementById('scanner-text').textContent = '等待识别';
    
    // 重置门禁动画状态
    resetDoorAnimation();
    
    document.getElementById('next-person-btn').style.display = 'none';
    document.getElementById('btn-correct').disabled = true;
    document.getElementById('btn-wrong').disabled = true;
    
    // 打乱测试人员顺序
    shuffleArray(testPersons);
    
    setTimeout(() => nextPerson(), 500);
}

// ==================== 关卡三：下一位人员 ====================
function nextPerson() {
    if (GameState.level3.currentRound >= GameState.level3.totalRounds) {
        showFinalResult();
        return;
    }
    
    const round = GameState.level3.currentRound;
    const person = testPersons[round];
    GameState.level3.currentPerson = person;
    
    // 更新轮次显示
    document.getElementById('round-number').textContent = round + 1;
    
    // 重置识别结果显示
    document.getElementById('match-icon').textContent = '🔍';
    document.getElementById('match-text').textContent = '正在识别...';
    document.getElementById('match-status').className = 'match-status';
    document.getElementById('scanner-display').className = 'scanner-display';
    document.getElementById('scanner-text').textContent = '扫描中...';
    document.getElementById('confidence-value').textContent = '--';
    document.getElementById('btn-correct').disabled = true;
    document.getElementById('btn-wrong').disabled = true;
    document.getElementById('next-person-btn').style.display = 'none';
    
    // 重置门禁状态
    resetDoorAnimation();
    
    // 显示人物
    showPerson(person);
    
    // 启动扫描动画
    startScanning(person);
}

// ==================== 显示人物 ====================
function showPerson(person) {
    const personArea = document.getElementById('person-area');
    const avatar = document.getElementById('person-avatar');
    const name = document.getElementById('person-name');
    const role = document.getElementById('person-role');
    
    avatar.textContent = person.avatar;
    name.textContent = person.name;
    role.textContent = person.role;
    
    // 触发入场动画
    personArea.classList.remove('visible');
    void personArea.offsetWidth; // 强制重绘
    personArea.classList.add('visible');
}

// ==================== 扫描动画 ====================
async function startScanning(person) {
    const scannerLight = document.getElementById('scanner-light');
    const scannerDisplay = document.getElementById('scanner-display');
    const scannerText = document.getElementById('scanner-text');
    
    // 启动扫描线动画
    scannerLight.classList.add('active');
    
    // 模拟识别延迟
    await sleep(1200 + Math.random() * 800);
    
    scannerLight.classList.remove('active');
    
    // 根据置信度决定识别结果
    // 考虑第二关的训练准确率影响最终判断
    const modelQuality = GameState.level2.accuracy || 82;
    const adjustedConfidence = adjustConfidence(person.confidence, modelQuality);
    
    const isMatch = adjustedConfidence > 65;
    const actualAuthorized = ['authorized'].includes(person.identity);
    
    // 显示识别结果
    displayRecognitionResult(isMatch, adjustedConfidence, person);
    
    // 启用判断按钮
    document.getElementById('btn-correct').disabled = false;
    document.getElementById('btn-wrong').disabled = false;
    
    // 存储本轮信息用于判断
    GameState.level3.currentPerson.aiSaysMatch = isMatch;
    GameState.level3.currentPerson.actualAuthorized = actualAuthorized;
    GameState.level3.currentPerson.displayConfidence = adjustedConfidence;
}

// ==================== 根据模型质量调整置信度 ====================
function adjustConfidence(baseConfidence, modelQuality) {
    // 模型质量越高，识别越准确（即置信度越接近真实情况）
    const qualityFactor = modelQuality / 100;
    const randomFactor = (Math.random() - 0.5) * (100 - modelQuality) * 0.6;
    
    let result = baseConfidence + randomFactor;
    return Math.min(Math.max(result, 5), 99.5);
}

// ==================== 显示识别结果 ====================
function displayRecognitionResult(isMatch, confidence, person) {
    const matchStatus = document.getElementById('match-status');
    const matchIcon = document.getElementById('match-icon');
    const matchText = document.getElementById('match-text');
    const scannerDisplay = document.getElementById('scanner-display');
    const scannerText = document.getElementById('scanner-text');
    const confidenceValue = document.getElementById('confidence-value');
    
    confidenceValue.textContent = `${confidence.toFixed(1)}%`;
    
    if (isMatch) {
        matchStatus.className = 'match-status success';
        matchIcon.textContent = '✅';
        matchText.textContent = `识别匹配 - Welcome!`;
        scannerDisplay.className = 'scanner-display success';
        scannerText.textContent = 'Welcome!';
        
        // 门禁开启动画
        openDoorAnimation();
    } else {
        matchStatus.className = 'match-status fail';
        matchIcon.textContent = '❌';
        matchText.textContent = `识别失败 - Unknown`;
        scannerDisplay.className = 'scanner-display fail';
        scannerText.textContent = 'Unknown';
        
        // 报警效果
        alarmEffect();
    }
}

// ==================== 门禁动画 ====================
function openDoorAnimation() {
    const doorGate = document.getElementById('door-gate');
    const servoArm = document.getElementById('servo-arm');
    const scannerLight = document.getElementById('scanner-light');
    
    // 舵机旋转
    servoArm.classList.add('rotated');
    
    // 门打开
    setTimeout(() => {
        doorGate.classList.add('open');
    }, 300);
    
    // 绿色灯光闪烁
    scannerLight.style.background = '#5CB85C';
    scannerLight.style.boxShadow = '0 0 20px #5CB85C';
    scannerLight.style.opacity = '1';
}

function resetDoorAnimation() {
    const doorGate = document.getElementById('door-gate');
    const servoArm = document.getElementById('servo-arm');
    const scannerLight = document.getElementById('scanner-light');
    
    doorGate.classList.remove('open');
    servoArm.classList.remove('rotated');
    scannerLight.style.background = '#4A90E2';
    scannerLight.style.boxShadow = '0 0 15px #4A90E2';
    scannerLight.style.opacity = '0';
}

function alarmEffect() {
    const scannerLight = document.getElementById('scanner-light');
    const doorArea = document.querySelector('.door-area');
    
    // 红灯闪烁
    let flashCount = 0;
    const flashInterval = setInterval(() => {
        scannerLight.style.background = flashCount % 2 === 0 ? '#E74C3C' : 'transparent';
        scannerLight.style.boxShadow = flashCount % 2 === 0 ? '0 0 25px #E74C3C' : 'none';
        scannerLight.style.opacity = flashCount % 2 === 0 ? '1' : '0.3';
        flashCount++;
        if (flashCount > 5) {
            clearInterval(flashInterval);
            scannerLight.style.opacity = '0';
        }
    }, 200);
    
    // 门框震动
    doorArea.classList.add('shake-animation');
    setTimeout(() => doorArea.classList.remove('shake-animation'), 500);
}

// ==================== 玩家判断 ====================
function judgeResult(playerThinksCorrect) {
    const person = GameState.level3.currentPerson;
    if (!person) return;
    
    // AI的判断是否正确（与实际情况对比）
    const aiWasRight = person.aiSaysMatch === person.actualAuthorized;
    
    // 玩家的判断是否正确
    const playerIsRight = playerThinksCorrect === aiWasRight;
    
    // 记录结果
    const result = {
        round: GameState.level3.currentRound + 1,
        name: person.name,
        role: person.role,
        aiSaid: person.aiSaysMatch ? '放行' : '拦截',
        actually: person.actualAuthorized ? '应放行' : '应拦截',
        playerJudged: playerThinksCorrect ? '正确' : '错误',
        playerIsRight: playerIsRight
    };
    
    GameState.level3.results.push(result);
    
    if (playerIsRight) {
        GameState.level3.correctCount++;
    } else {
        // 扣分
        GameState.level3.score -= 10;
        if (person.identity === 'unauthorized' && person.aiSaysMatch) {
            // 特别严重的误判（陌生人被放行）
            GameState.level3.score -= 5;
        }
    }
    
    // 添加到历史记录
    addToHistoryLog(result);
    
    // 更新分数显示
    document.getElementById('level3-score').textContent = Math.max(GameState.level3.score, 0);
    
    // 禁用按钮，显示下一人按钮
    document.getElementById('btn-correct').disabled = true;
    document.getElementById('btn-wrong').disabled = true;
    document.getElementById('next-person-btn').style.display = 'block';
    
    // 推进轮次
    GameState.level3.currentRound++;
}

// ==================== 添加历史记录 ====================
function addToHistoryLog(result) {
    const entriesContainer = document.getElementById('log-entries');
    const entry = document.createElement('div');
    entry.className = 'log-entry-item';
    
    const icon = result.playerIsRight ? '✅' : '❌';
    const resultClass = result.playerIsRight ? 'correct' : 'wrong';
    
    entry.innerHTML = `
        <span class="log-entry-icon">${icon}</span>
        <span class="log-entry-name">${result.name}</span>
        <span class="log-entry-result ${resultClass}">${result.playerJudged}</span>
    `;
    
    entriesContainer.appendChild(entry);
    entriesContainer.scrollTop = entriesContainer.scrollHeight;
}

// ==================== 显示最终结果 ====================
function showFinalResult() {
    GameState.level3.isRunning = false;
    
    const total = GameState.level3.totalRounds;
    const correct = GameState.level3.correctCount;
    const rate = Math.round((correct / total) * 100);
    const score = Math.max(GameState.level3.score, 0);
    
    let rank, trophy;
    if (rate >= 90) {
        rank = '🏆 金牌门禁设计师';
        trophy = '🏆';
    } else if (rate >= 70) {
        rank = '🥈 银牌门禁设计师';
        trophy = '🥈';
    } else {
        rank = '🥉 见习门禁管理员';
        trophy = '🥉';
    }
    
    document.getElementById('trophy-animation').textContent = trophy;
    document.getElementById('final-title').textContent = rate >= 90 ? '挑战成功！' : '挑战完成！';
    document.getElementById('final-correct-rate').textContent = `${rate}%`;
    document.getElementById('final-correct-count').textContent = `${correct}/${total}`;
    document.getElementById('final-rank').textContent = rank;
    
    // AI伦理警示
    const ethicsWarning = document.getElementById('ethics-warning');
    const ethicsMessage = document.getElementById('ethics-message');
    
    if (rate < 80) {
        ethicsWarning.style.display = 'block';
        ethicsMessage.textContent = '在本次测试中，门禁系统出现了一定的误识率。这说明人脸识别技术并非100%可靠，存在误识漏洞。同时，人脸数据属于敏感个人信息，校园AI设备必须规范管理、保护学生隐私，防止数据泄露风险。作为未来的科技使用者，我们需要理性看待AI技术的局限性，并积极维护信息安全。';
    } else {
        ethicsWarning.style.display = 'block';
        ethicsMessage.textContent = '虽然本次测试表现良好，但仍需认识到：人脸识别技术可能存在相似人脸误判、照片攻击等安全风险。在智慧校园建设中，我们应当：①规范采集和使用人脸数据；②定期检测和升级识别算法；③建立多重身份验证机制；④重视师生隐私权保护。这是每一位信息科技学习者应当具备的信息社会责任素养。';
    }
    
    // 完成第三关
    if (!GameState.completedLevels.includes(3)) {
        GameState.completedLevels.push(3);
    }
    
    document.getElementById('final-result-modal').classList.remove('hidden');
}

// ==================== 重新开始游戏 ====================
function restartGame() {
    closeModal('final-result-modal');
    
    // 重置所有状态
    GameState.unlockedLevels = [1];
    GameState.completedLevels = [];
    GameState.level1.selectedPhotos.clear();
    GameState.level1.submitted = false;
    GameState.level2.trainingComplete = false;
    GameState.level2.isTraining = false;
    
    retryTraining(); // 重置关卡二UI
    showScreen('start-screen');
}

// ==================== 弹窗控制 ====================
function showModal(modalId, icon, title, message, knowledgeHtml = '', showNextBtn = true) {
    const modal = document.getElementById(modalId);
    
    // 基本内容
    const modalIcon = modal.querySelector('#modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalMsg = document.getElementById('modal-message');
    
    if (modalIcon) modalIcon.textContent = icon;
    if (modalTitle) modalTitle.textContent = title;
    if (modalMsg) modalMsg.textContent = message;
    
    // 知识点区域
    const knowledgeEl = modal.querySelector('#modal-knowledge');
    if (knowledgeEl) {
        if (knowledgeHtml) {
            knowledgeEl.innerHTML = knowledgeHtml;
            knowledgeEl.style.display = 'block';
        } else {
            knowledgeEl.style.display = 'none';
        }
    }
    
    // 关卡一的特殊处理 - 控制下一关按钮显示
    if (modalId === 'level1-modal') {
        const nextBtn = document.getElementById('level1-next-btn');
        const actionsDiv = modal.querySelector('.level1-actions');
        
        if (actionsDiv && nextBtn) {
            if (showNextBtn) {
                nextBtn.style.display = 'inline-flex';
                nextBtn.textContent = '进入第二关 🤖 →';
                actionsDiv.style.display = 'flex';
            } else {
                nextBtn.style.display = 'none';
                // 只显示确定按钮（重新挑战）
                actionsDiv.style.display = 'flex';
            }
        }
    }
    
    // 通用确定按钮（如果没有自定义操作区）
    const primaryBtn = modal.querySelector('.primary-btn:not(.level1-actions .primary-btn)');
    if (primaryBtn && !modal.querySelector('.level1-actions')) {
        primaryBtn.textContent = '我知道了';
    }
    
    modal.classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// ==================== 工具函数 ====================
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ==================== 计时器功能 ====================
function startTimer(timerId) {
    const element = document.getElementById(timerId);
    let seconds = 0;
    
    const timerKey = timerId.replace('-timer', '');
    if (GameState[timerKey]) {
        GameState[timerKey].startTime = Date.now();
    }
    
    const interval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        element.textContent = `${mins}:${secs}`;
    }, 1000);
    
    const timerKeyForInterval = timerId.replace('-timer', '') + 'Timer';
    GameState[timerKeyForInterval] = interval;
}

function stopTimer(timerId) {
    const timerKeyForInterval = timerId.replace('-timer', '') + 'Timer';
    if (GameState[timerKeyForInterval]) {
        clearInterval(GameState[timerKeyForInterval]);
        GameState[timerKeyForInterval] = null;
    }
}

// ==================== 页面加载完成后的初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    // 初始化预估结果
    updateEstimatedResults();
    
    // 为模态框添加点击外部关闭功能
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
});

// 导出供HTML调用
window.startGame = startGame;
window.showScreen = showScreen;
window.selectLevel = selectLevel;
window.initLevel1 = initLevel1;
window.togglePhotoSelection = togglePhotoSelection;
window.resetLevel1 = resetLevel1;
window.submitLevel1 = submitLevel1;
window.updateParamDisplay = updateParamDisplay;
window.setSamplePreset = setSamplePreset;
window.setEpochPreset = setEpochPreset;
window.startTraining = startTraining;
window.retryTraining = retryTraining;
window.goToLevel3 = goToLevel3;
window.goToLevel2FromLevel1 = goToLevel2FromLevel1;
window.closeModalAndRetryLevel1 = closeModalAndRetryLevel1;
window.closeModal = closeModal;
window.judgeResult = judgeResult;
window.nextPerson = nextPerson;
window.restartGame = restartGame;

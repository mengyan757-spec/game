/**
 * 传统节日闯关 - 房间信令+消息中转服务器
 */
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var PORT = 8080;

var rooms = {};

setInterval(function() {
  var now = Date.now();
  Object.keys(rooms).forEach(function(code) {
    if (now - rooms[code].ts > 30*60*1000) delete rooms[code];
  });
}, 60*1000);

var MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8'
};

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, code, data) {
  setCors(res);
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function getBody(req, cb) {
  var body = '';
  req.on('data', function(chunk) { body += chunk; });
  req.on('end', function() { cb(body); });
}

var server = http.createServer(function(req, res) {
  var parsed = url.parse(req.url, true);
  var pathname = parsed.pathname;
  var method = req.method;

  if (method === 'OPTIONS') {
    setCors(res);
    res.writeHead(200);
    res.end();
    return;
  }

  // ---------- API ----------
  var apiMatch = pathname.match(/^\/api\/room\/([^\/]+)(\/\w+)?$/);
  if (apiMatch) {
    var code = apiMatch[1];
    var action = apiMatch[2] || '';
    var room = rooms[code];

    if (action === '/create' && method === 'POST') {
      if (!code) { sendJson(res, 400, { error: 'no code' }); return; }
      if (room) { sendJson(res, 409, { error: '房间已存在' }); return; }
      getBody(req, function(body) {
        try {
          var d = JSON.parse(body);
          rooms[code] = { hostName: d.hostName || '', guestName: '', status: 'waiting', messages: [], seq: 0, ts: Date.now() };
          console.log('[房间] ' + code + ' 创建成功');
          sendJson(res, 200, { ok: true, code: code });
        } catch(e) {
          sendJson(res, 400, { error: '数据错误' });
        }
      });
      return;
    }

    if (action === '/status' && method === 'GET') {
      if (!room) { sendJson(res, 404, { error: '房间不存在' }); return; }
      room.ts = Date.now();
      sendJson(res, 200, { status: room.status, hostName: room.hostName, guestName: room.guestName });
      return;
    }

    if (action === '/join' && method === 'POST') {
      if (!room) { sendJson(res, 404, { error: '房间不存在' }); return; }
      getBody(req, function(body) {
        try {
          var d = JSON.parse(body);
          room.guestName = d.guestName || '';
          room.status = 'connected';
          room.ts = Date.now();
          console.log('[房间] ' + code + ' B加入: ' + room.guestName);
          sendJson(res, 200, { ok: true, hostName: room.hostName });
        } catch(e) {
          sendJson(res, 400, { error: '数据错误' });
        }
      });
      return;
    }

    if (action === '/msg' && method === 'POST') {
      if (!room) { sendJson(res, 404, { error: '房间不存在' }); return; }
      getBody(req, function(body) {
        try {
          var d = JSON.parse(body);
          room.seq++;
          room.messages.push({ seq: room.seq, msg: d.msg, from: d.from });
          if (room.messages.length > 200) room.messages = room.messages.slice(-100);
          room.ts = Date.now();
          sendJson(res, 200, { ok: true, seq: room.seq });
        } catch(e) {
          sendJson(res, 400, { error: '数据错误' });
        }
      });
      return;
    }

    if (action === '/poll' && method === 'GET') {
      if (!room) { sendJson(res, 404, { error: '房间不存在' }); return; }
      var since = parseInt(parsed.query.since) || 0;
      room.ts = Date.now();
      var newMsgs = room.messages.filter(function(m) { return m.seq > since; });
      sendJson(res, 200, { msgs: newMsgs, seq: room.seq, status: room.status });
      return;
    }

    // unknown API
    sendJson(res, 404, { error: 'unknown api' });
    return;
  }

  // ---------- 静态文件 ----------
  var filePath = path.join(__dirname, pathname === '/' ? '/index.html' : pathname.split('?')[0].split('#')[0]);
  var ext = path.extname(filePath);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      if (!ext || ext === '.html') {
        fs.readFile(path.join(__dirname, 'index.html'), function(e2, d2) {
          if (e2) { res.writeHead(404); res.end('404'); }
          else { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(d2); }
        });
        return;
      }
      res.writeHead(404); res.end('404');
    } else {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
      res.end(data);
    }
  });
});

server.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
});

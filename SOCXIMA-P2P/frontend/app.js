const socket = io('http://localhost:3000');
let walletPublicKey = null, ROOM_ID = null, tempRoomId = null;

const loginView = document.getElementById('loginView'), mainView = document.getElementById('mainView'), btnConnectWallet = document.getElementById('btnConnectWallet');
const tabs = document.querySelectorAll('.tab-btn'), tabContents = document.querySelectorAll('.tab-content');
const marketList = document.getElementById('marketList');
const joinModal = document.getElementById('joinModal'), joinRoomId = document.getElementById('joinRoomId'), joinPassInput = document.getElementById('joinPassInput'), btnConfirmJoin = document.getElementById('btnConfirmJoin'), btnCancelJoin = document.getElementById('btnCancelJoin');
const roomName = document.getElementById('roomName'), roomAsset = document.getElementById('roomAsset'), roomAmount = document.getElementById('roomAmount'), roomPass = document.getElementById('roomPass'), btnCreateRoom = document.getElementById('btnCreateRoom');
const chatContainer = document.getElementById('chatContainer'), messageInput = document.getElementById('messageInput'), sendMessageBtn = document.getElementById('sendMessageBtn'), roomIdBadge = document.getElementById('roomIdBadge');
const localVideo = document.getElementById('localVideo'), remoteVideo = document.getElementById('remoteVideo');
const rtcConfig = {iceServers:[{urls:'stun:stun.l.google.com:19302'}]};
let localStream, peerConnection;

tabs.forEach(t => t.onclick = () => {
  tabs.forEach(tt => tt.classList.remove('border-gold','text-gold','active'), tt.classList.add('border-transparent'));
  t.classList.add('border-gold','text-gold','active');
  tabContents.forEach(c => c.classList.add('hidden'));
  document.getElementById(t.dataset.target).classList.remove('hidden');
});

btnConnectWallet.onclick = async () => {
  if(!window.solana?.isPhantom) return alert('Instala la wallet Phantom 🟣');
  try {
    const resp = await window.solana.connect();
    walletPublicKey = resp.publicKey.toString();
    socket.emit('auth:connect', walletPublicKey);
    loginView.classList.add('hidden'); mainView.classList.remove('hidden');
    cargarMercado();
  } catch(e){console.error(e)}
};

function cargarMercado(){socket.emit('market:list');}
socket.on('market:list', lista => {
  marketList.innerHTML = lista.length ? '' : `<p class="text-gray-500 text-center py-4">Sin salas disponibles</p>`;
  lista.forEach(s => {
    const el = document.createElement('div');
    el.className = 'bg-panel2 p-3 rounded-lg border border-border hover:border-gold cursor-pointer';
    el.innerHTML = `<div class="flex justify-between"><div><h4 class="font-bold">${s.name}</h4><p class="text-xs text-gray-400">${s.asset} • ${s.amount}</p></div><button class="bg-gold text-black px-2 rounded text-sm">Unirse</button></div>`;
    el.onclick = () => {tempRoomId = s.id; joinRoomId.textContent = s.id; joinModal.classList.remove('hidden'); joinModal.classList.add('flex');};
    marketList.appendChild(el);
  });
});

btnCreateRoom.onclick = () => {
  if(!roomName.value || !roomAsset.value || !roomAmount.value || !roomPass.value) return alert('Completa todos los campos');
  socket.emit('room:create', roomName.value, roomPass.value, roomAsset.value, roomAmount.value);
  socket.once('room:created', d => {ROOM_ID = d.id; roomIdBadge.textContent = d.id; tabs[2].click(); iniciarChatVideo();});
};

btnCancelJoin.onclick = () => joinModal.classList.add('hidden');
btnConfirmJoin.onclick = () => {
  if(!joinPassInput.value) return;
  socket.emit('room:join', tempRoomId, joinPassInput.value, walletPublicKey.slice(0,8));
  socket.once('room:entered', d => {ROOM_ID = d.id; roomIdBadge.textContent = d.id; joinModal.classList.add('hidden'); tabs[2].click(); iniciarChatVideo();});
};

function iniciarChatVideo(){
  sendMessageBtn.onclick = () => {if(messageInput.value.trim()) socket.emit('chat:send', ROOM_ID, messageInput.value), messageInput.value = '';};
  socket.on('chat:new', m => {
    const div = document.createElement('div');
    div.className = `p-2 rounded max-w-[80%] ${m.from===socket.id?'bg-green/20 ml-auto text-right':'bg-panel2 mr-auto'}`;
    div.innerHTML = `<span class="text-xs opacity-70">[${m.time}]</span> <b>${m.user}</b>: ${m.text}`;
    chatContainer.appendChild(div); chatContainer.scrollTop = chatContainer.scrollHeight;
  });

  navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(s => {localStream = s; localVideo.srcObject = s;});
  socket.on('call:offer', async d => {
    peerConnection = new RTCPeerConnection(rtcConfig);
    localStream.getTracks().forEach(t => peerConnection.addTrack(t, localStream));
    await peerConnection.setRemoteDescription(new RTCSessionDescription(d.offer));
    const ans = await peerConnection.createAnswer(); await peerConnection.setLocalDescription(ans);
    socket.emit('call:answer', d.from, ans);
    peerConnection.ontrack = e => {remoteVideo.srcObject = e.streams[0];};
  });
  socket.on('call:answer', d => peerConnection?.setRemoteDescription(new RTCSessionDescription(d.ans)));
  socket.on('call:iceCandidate', d => peerConnection?.addIceCandidate(new RTCIceCandidate(d.cand)));
}
socket.on('error', m => alert(m));

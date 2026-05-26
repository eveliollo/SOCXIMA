module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🔌 Conectado:", socket.id);

    socket.on("auth:connect", (pubKey) => {
      socket.data.pubKey = pubKey;
      socket.emit("auth:ok", { id: socket.id, pubKey: pubKey.slice(0,8)+"..." });
    });

    socket.on("room:create", (name, pass, asset, amount) => {
      const id = "sxm-" + Math.random().toString(36).slice(2,10);
      socket.data.room = { id, name, pass, asset, amount, status:"waiting" };
      socket.join(id);
      socket.emit("room:created", socket.data.room);
      io.emit("market:update");
    });

    socket.on("room:join", (roomId, pass, user) => {
      let room = null;
      io.sockets.sockets.forEach(s => {if(s.data.room?.id === roomId) room = s.data.room;});
      if(!room) return socket.emit("error", "❌ Sala no existe");
      if(room.pass !== pass) return socket.emit("error", "🔒 Contraseña incorrecta");
      socket.join(roomId);
      socket.data.user = user;
      room.status = "active";
      io.to(roomId).emit("room:entered", {user, room});
      io.emit("market:update");
    });

    socket.on("market:list", () => {
      const list = [];
      io.sockets.sockets.forEach(s => {if(s.data.room?.status === "waiting") list.push(s.data.room);});
      socket.emit("market:list", list);
    });

    socket.on("chat:send", (roomId, txt) => {
      io.to(roomId).emit("chat:new", {from:socket.id, user:socket.data.user, text:txt, time:new Date().toLocaleTimeString()});
    });

    socket.on("call:offer", (toId, offer) => socket.to(toId).emit("call:offer", {from:socket.id, offer}));
    socket.on("call:answer", (toId, ans) => socket.to(toId).emit("call:answer", {from:socket.id, answer:ans}));
    socket.on("call:iceCandidate", (toId, cand) => socket.to(toId).emit("call:iceCandidate", {from:socket.id, candidate:cand}));

    socket.on("disconnect", () => io.emit("market:update"));
  });
};

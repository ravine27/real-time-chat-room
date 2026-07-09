import ws from 'k6/ws';
import { check } from 'k6';

export const options = {
  vus: 100,
  duration: '30s',
};

export default function () {
  const url = 'https://real-time-chat-room-production.up.railway.app/chat';

  const res = ws.connect(url, {}, function (socket) {

    socket.on('open', () => {
      console.log('connected');

      socket.send(JSON.stringify({
        message: "Hello"
      }));
    });

    socket.on('message', (data) => {
      console.log(data);
    });

    socket.setTimeout(function () {
      socket.close();
    }, 30000);
  });

  check(res, {
    'connected': (r) => r && r.status === 101,
  });
}
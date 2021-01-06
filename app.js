require('dotenv').config();
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 // 1 min
  }
}));

app.get('/dangnhap', (req, res, next) => {
  req.session.isLogin = true;
  req.session.user = 'nosnart';
  res.send('<a href="/">trang chu</a>');
})

app.get('/', (req, res, next) => {
  console.log('req: ', req.session);
  if (req.session.isLogin) {
    res.send(`
      <div>
        <p>Hello ${req.session.user}</p>
        <a href="/dangxuat">dang xuat</a>
      </div>
    `);
  } else {
    res.json('Ban can dang nhap!!');
  }
})

app.get('/dangxuat', (req, res, next) => {
  req.session.destroy();
  res.json('Dang xuat!!')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running!!`)
})

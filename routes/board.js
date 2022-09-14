// @ts-check

const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: 'title',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia delectus iusto fugiat autem cupiditate adipisci quas, in consectetur repudiandae, soluta, suscipit debitis veniam nobis aspernatur blanditiis ex ipsum tempore impedit.',
  },
  {
    title: 'title2',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia delectus iusto fugiat autem cupiditate adipisci quas, in consectetur repudiandae, soluta, suscipit debitis veniam nobis aspernatur blanditiis ex ipsum tempore impedit.',
  },
];

router.get('/', (req, res) => {
  // 글 전체 목록 보여주기
  const articleLen = ARTICLE.length;
  res.render('board', { ARTICLE, articleCounts: articleLen });
});

router.get('/write', (req, res) => {
  // 글 쓰기 모드로 이동
  res.render('board_write');
});

router.post('/write', (req, res) => {
  // 글 추가 모드로 이동
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    ARTICLE.push(newArticle);
    res.redirect('/board');
  } else {
    const err = new Error('데이터가 없습니다');
    err.statusCode = 404;
    throw err;
  }
});

router.get('/modify/title/:title', (req, res) => {
  // 글 수정 모드로 이동
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('board_modify', { selectedArticle });
});

router.post('/modify/title/:title', (req, res) => {
  // 글 수정 기능 수행
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (article) => article.title === req.params.title
    );
    ARTICLE[arrIndex].title = req.body.title;
    ARTICLE[arrIndex].content = req.body.content;
    res.redirect('/board');
  } else {
    const err = new Error('요청 값이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/delete/title/:title', (req, res) => {
  // 글 삭제 기능 수행
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  if (arrIndex !== -1) {
    ARTICLE.splice(arrIndex, 1);
    res.send('삭제완료');
  } else {
    const err = new Error('해당 제목을 가진 글이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;

# Room Floor Rotation

정적 개인 음악 취향 웹사이트입니다. 오래된 방바닥 위에 커버, 메모, 영수증, 레코드판이 흩어진 lo-fi 바이닐 아카이브 분위기로 구성했습니다.

## 실행

로컬 서버로 열면 됩니다.

```bash
python3 -m http.server 4173
```

그 다음 브라우저에서 `http://localhost:4173`을 엽니다.

## 구성

- `index.html`: 방바닥 아카이브 마크업
- `styles.css`: grunge / DIY zine / wet paper 질감 스타일
- `script.js`: 3곡 커버 클릭과 now playing 패널
- `assets/`: 최적화된 실제 커버 WebP와 노이즈/바닥 텍스처
- `tools/make_assets.py`: 실제 커버와 질감 자산 재생성 스크립트

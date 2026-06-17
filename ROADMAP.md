# Roadmap — Mini-Mini-Wallet (Tuần 1)

Stack: **Sails + MongoDB (backend)** · **React + Vite (frontend)** · Auth = **Session** · Monorepo · Git

Cấu trúc đích:
```
JITS week 1/
├─ backend/      # Sails app
├─ frontend/     # React + Vite app
├─ .gitignore
└─ README.md
```

## Các giai đoạn (commit sau mỗi giai đoạn ✅)

| GĐ | Nội dung | Yêu cầu phủ |
|----|----------|-------------|
| 0  | Cài công cụ, tạo monorepo, `git init`, commit đầu | Mục 7 |
| 1  | Scaffold Sails, nối MongoDB, tắt blueprints, deny-by-default | Mục 4 (routing/policy) |
| 2  | `api/responses/` + service `respCode`, envelope `{err,message,...data}` | Mục 4 (response) |
| 3  | Models `Customer`, `Pocket`, `Transaction` | Mục 5 |
| 4  | Đăng ký (tạo ví 1.000.000) + đăng nhập + policy `isLoggedIn` | F1,F2,F3 |
| 5  | Xem số dư + Chuyển tiền (toàn vẹn, không âm, đủ tiền, hợp lệ, truy vết) | F4,F5 + Mục 6 |
| 6  | Lịch sử giao dịch (gửi đi + nhận về) | F6 |
| 7  | Frontend React+Vite: các trang đăng ký/đăng nhập/số dư/chuyển/lịch sử | UI |
| 8  | VSCode debug `launch.json`, Postman, demo end-to-end | Mục 8,9 |

## Quy ước bắt buộc (mục 4) — nhớ kỹ
- HTTP **luôn 200**; phân biệt thành/bại bằng `err` (`err===200` là OK).
- Mọi response qua `api/responses/` — không `res.json` rải rác. Luôn `return res.xxx()`.
- Mã lỗi tập trung ở service `respCode`.
- Blueprints **tắt hết**; mọi route tự khai ở `config/routes.js`.
- **Mọi API dùng POST**.
- Policies `'*': false` (deny-by-default); chỉ API công khai mới `true`.

## Quy tắc commit
Commit cuối mỗi giai đoạn, message dạng: `feat(scope): mô tả` hoặc `chore:`, `fix:`.
Ví dụ: `chore: init monorepo`, `feat(auth): register & login`, `feat(wallet): transfer money`.

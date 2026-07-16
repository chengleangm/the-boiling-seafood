# The Boiling Seafood — Interactive Restaurant Demo

A premium, mobile-first sales demo showing how The Boiling Seafood’s connected customer ordering and restaurant operations system can work. It uses local mock data only and does not charge money, send messages, or store production customer data.

## Main features

- Restaurant homepage, digital menu, promotions, gallery, contact and reservations
- 20+ searchable dishes with sizes, sauces, spice levels, extras and notes
- Persistent cart, `BOILING10` promotion, delivery, pickup and Table QR checkout
- Simulated ABA PayWay, KHQR, cash and pay-at-restaurant outcomes
- Confirmation, simulated Telegram notification and order tracking
- Table-aware routes such as `/table/8`
- Admin routes for orders, menu, promotions, tables, payments and reports
- LocalStorage persistence for customer orders and menu edits

## Technology

- Next.js 16 App Router, React 19 and TypeScript
- Tailwind CSS 4 plus project CSS
- React Icons, local mock data and browser LocalStorage

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Verification commands:

```bash
npm run lint
npm run build
npm start
```

## Demo admin login

- Route: `/admin/login`
- Email: `admin@theboilingseafood.demo`
- Password: `Demo1234`

Authentication is deliberately browser-only and is not suitable for production.

## Public routes

`/`, `/menu`, `/promotions`, `/order`, `/cart`, `/checkout`, `/order-confirmation`, `/track-order`, `/reservation`, `/about`, `/gallery`, `/contact`, and `/table/[number]`.

## Admin routes

`/admin`, `/admin/orders`, `/admin/menu`, `/admin/categories`, `/admin/promotions`, `/admin/tables`, `/admin/payments`, `/admin/reservations`, `/admin/customers`, `/admin/reports`, `/admin/gallery`, `/admin/content`, and `/admin/settings`.

## Demo payments and Table QR

ABA PayWay and KHQR buttons only simulate success or failure. Table routes automatically identify the table number; an order from `/table/8` is saved with channel `Table QR` and customer `Table 8`, then appears in the shared admin order list.

## Build and deployment

Run `npm run build` before deploying to a standard Next.js host. LocalStorage data is device-specific and must be replaced by a database before production.

## Production integrations required

- Secure staff authentication, roles, database and server-side validation
- ABA PayWay and KHQR merchant integrations
- Telegram bot, SMS, email and kitchen-display integrations
- Receipt printers and real delivery dispatch/tracking
- Final restaurant content, legal policies, analytics and monitoring

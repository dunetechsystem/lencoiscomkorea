# Mister K Lençóis — site

Next.js 16 + Tailwind 4. Passeios, preços, fotos e a reserva vêm do **DunasTour**
(mesmo contrato do link `dunastour.com.br/misterk-lencois`), mas o turista compra aqui mesmo, sem redirecionamento.

## Rodar

```bash
cp .env.example .env.local   # ajuste se precisar
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
```

## Como conecta ao DunasTour

- **Só o servidor do Next fala com a API** (`DUNASTOUR_API_URL`) → libere no backend o IP do servidor onde o site roda.
- Leituras (agência, passeios, pacotes, galeria, avaliações, lagoas): `src/lib/dunastour/server.ts`, cache de 5 min.
- Ações do navegador passam pelo proxy `src/app/api/dunas/[...path]/route.ts`, que só aceita rotas públicas do checkout e
  sempre usa o id desta agência. O IP/User-Agent do turista seguem em `X-Forwarded-For`/`User-Agent` (registro do aceite).
- Fluxo de reserva (`/reservar`): roteiro → seus dados → termo de risco (quando algum passeio tem) → confirmar →
  `POST /api/agencies/{id}/checkout-submissions` → cada item vira um voucher pendente no painel da agência (origem "Link")
  → botão de WhatsApp com o resumo pra combinar o pagamento.

## Conteúdo editável

`src/config/site.ts`: vídeo do hero, reels do Instagram, vídeos próprios, serviços, destinos e FAQ.
Fotos/vídeos da galeria vêm do que a agência cadastra no DunasTour (fotos dos passeios e dos lugares do mapa).

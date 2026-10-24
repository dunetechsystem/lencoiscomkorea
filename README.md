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

## Tráfego pago e vendas

IDs no `.env` (ver `.env.example`): Meta Pixel, GA4, Google Ads (+ rótulo da conversão) e/ou GTM. Sem ID, nada carrega.
Tudo em `src/lib/track.ts` + `src/components/layout/Analytics.tsx`.

| Evento (Meta / GA4) | Quando |
| --- | --- |
| `ViewContent` / `view_item` | Abriu a página de um passeio ou pacote |
| `AddToCart` / `add_to_cart` | Adicionou à viagem/roteiro |
| `InitiateCheckout` / `begin_checkout` | Abriu o carrinho com itens |
| `Lead` / `generate_lead` (+ conversão do Google Ads) | **Qualquer** clique num link do WhatsApp |
| `Purchase` / `purchase` | Reserva enviada pelo `/reservar` (com `onlineBooking` ligado) — o DunasTour manda o mesmo pela API de Conversões |

O `Lead` sai de um ouvinte único em todo link `api.whatsapp.com`, então botão novo de WhatsApp já entra no
rastreio; `data-lead` (o que é) e `data-value` (valor em R$) no link enriquecem o evento.

**Origem da conversa:** UTM, `gclid` e `fbclid` da visita ficam guardados por 30 dias e vão no fim da mensagem do
WhatsApp (`_ref: google/cpc/lagoa-azul_`). Use UTMs nos anúncios
(`?utm_source=meta&utm_medium=paid&utm_campaign=lagoa-azul`) pra saber qual campanha vendeu.

**A venda (Purchase):** fecha no link de checkout do DunasTour que vai pelo WhatsApp. Cadastre **o mesmo ID do pixel**
no painel do DunasTour (Link de checkout → Pixel do Meta) — de preferência com o token da API de Conversões. Aí o pedido
enviado no link vira `Purchase` no mesmo pixel, ligado ao anúncio pelo telefone/e-mail do cliente.

Para anúncio, mande o tráfego pra página do passeio (`/passeios/<slug>`), não pra home.

## Conteúdo editável

`src/config/site.ts`: vídeo do hero, reels do Instagram, vídeos próprios, serviços, destinos e FAQ.
Fotos/vídeos da galeria vêm do que a agência cadastra no DunasTour (fotos dos passeios e dos lugares do mapa).

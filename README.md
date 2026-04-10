# 📊 Folha de Pagamento PWA — RCONT-SCT

> **Sistema Integrado de Cálculos Trabalhistas**  
> Rosemberg Oliveira – Contador | RCONT-SCT Soluções Contábeis e Tributárias

---

## 🗂 Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Como Instalar e Publicar](#como-instalar-e-publicar)
- [Como Usar o App](#como-usar-o-app)
- [Legislação Aplicada](#legislação-aplicada)
- [PWA — Detalhes Técnicos](#pwa--detalhes-técnicos)
- [Personalização](#personalização)
- [Contato](#contato)

---

## Sobre

Calculadora completa de folha de pagamento para funcionários com jornada noturna, desenvolvida como **Progressive Web App (PWA)**. Roda no navegador, pode ser instalada como aplicativo nativo em Android, iOS e desktop, e funciona **offline** após o primeiro acesso.

Criada para uso interno de escritórios contábeis e para disponibilização a clientes, com exportação em PDF e Excel, envio via WhatsApp e cálculos atualizados para **2026**.

---

## Funcionalidades

### Cálculos Trabalhistas
- Salário base e adicional noturno (20%)
- Adicional por tempo de serviço (biênio): 5%, 10% ou 15%
- Adicional de tempo de serviço sobre horas extras
- DSR (Descanso Semanal Remunerado)
- Hora noturna reduzida + hora 50% noturna
- Feriados trabalhados (100%) e folgas trabalhadas
- Hora 100% referência noturna

### Descontos
- INSS progressivo 2026 (tabela oficial com 4 faixas)
- IRPF com comparação automática entre regime Completo e Simplificado
- Redutor de IR 2026 (Lei de isenção até R$ 5.000 / faixa regressiva até R$ 7.350)
- Adiantamento salarial (40%)
- Vale-transporte (6%)
- Contribuição assistencial (1% sobre proventos)
- Dedução por dependentes

### Exportação e Compartilhamento
- **Exportar PDF** — relatório formatado com todos os proventos, descontos e rodapé institucional
- **Exportar Excel (.xlsx)** — planilha completa pronta para arquivamento
- **Enviar por WhatsApp** — relatório formatado direto para o número do funcionário
- **Botão direto para o escritório** via WhatsApp

### Interface
- Gráfico de barras interativo (IR Completo vs Simplificado, Proventos, Descontos, Líquido, Redutor)
- Relógio em tempo real com fuso America/Sao_Paulo
- Layout responsivo — mobile, tablet e desktop

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | HTML5, CSS3, JavaScript ES6+ |
| Gráficos | [Chart.js](https://www.chartjs.org/) |
| PDF | [jsPDF](https://github.com/parallax/jsPDF) |
| Excel | [SheetJS (xlsx)](https://sheetjs.com/) |
| Fontes | Google Fonts — Inter |
| PWA | Web App Manifest + Service Worker (Cache API) |
| Hospedagem | Qualquer servidor HTTPS estático |

---

## Estrutura de Arquivos

```
/
├── index.html          # App principal (toda a lógica e UI)
├── sw.js               # Service Worker (cache, offline, estratégias)
├── manifest.json       # Web App Manifest (instalação, ícones, tema)
├── README.md           # Este arquivo
└── img/
    ├── logo.png         # Logo do escritório (exibida no header)
    ├── icon-192.png     # Ícone PWA 192×192 px
    ├── icon-512.png     # Ícone PWA 512×512 px
    ├── exportexcel.ico  # Ícone do botão Excel (opcional)
    └── exportpdf.ico    # Ícone do botão PDF (opcional)
```

> **Atenção:** os ícones `icon-192.png` e `icon-512.png` são **obrigatórios** para o PWA ser instalável. Use ferramentas como [PWA Builder](https://www.pwabuilder.com/imageGenerator) ou [Favicon.io](https://favicon.io/) para gerá-los a partir da sua logo.

---

## Como Instalar e Publicar

### Pré-requisitos
- Servidor web com suporte a **HTTPS** (obrigatório para PWA e Service Worker)
- Domínio próprio ou subdomínio

### Opções de hospedagem recomendadas

| Plataforma | Gratuito | HTTPS automático | Indicado para |
|---|---|---|---|
| [GitHub Pages](https://pages.github.com/) | ✅ | ✅ | Testes e produção leve |
| [Netlify](https://netlify.com/) | ✅ | ✅ | Produção com deploy contínuo |
| [Vercel](https://vercel.com/) | ✅ | ✅ | Produção com deploy contínuo |
| Hospedagem própria (cPanel, etc.) | — | Depende | Escritórios com servidor |

### Deploy passo a passo (Netlify — recomendado)

```bash
# 1. Crie uma conta em netlify.com

# 2. Faça upload da pasta pelo painel:
#    Site > Add new site > Deploy manually > arraste a pasta

# 3. Pronto — URL HTTPS gerada automaticamente
```

### Deploy via GitHub Pages

```bash
# 1. Crie um repositório público no GitHub

# 2. Faça push dos arquivos
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/folha-pagamento.git
git push -u origin main

# 3. Vá em Settings > Pages > Branch: main > Save
# 4. URL: https://seu-usuario.github.io/folha-pagamento/
```

### Verificar se o PWA está correto

Após publicar, abra o **Chrome DevTools** (`F12`) na aba **Application**:

- ✅ **Manifest** — aparece sem erros, com ícones
- ✅ **Service Worker** — status `activated and running`
- ✅ **Cache Storage** — `rcont-sct-static-v1` e `rcont-sct-cdn-v1` presentes
- ✅ **Lighthouse** — score PWA ≥ 90

---

## Como Usar o App

### No navegador
1. Acesse a URL publicada
2. Preencha os campos do formulário
3. Clique em **CALCULAR FOLHA COMPLETA**
4. Visualize proventos, descontos, salário líquido e o gráfico
5. Exporte em **PDF** ou **Excel**, ou envie por **WhatsApp**

### Campos do formulário

| Campo | Descrição | Exemplo |
|---|---|---|
| Salário Base | Salário contratual bruto | `3500.00` |
| Adicional Tempo Serviço | Número de biênios (0, 1, 2 ou 3) | `2` |
| Dias Úteis | Dias úteis trabalhados no mês | `22` |
| Domingos | Domingos no mês (para DSR) | `4` |
| Feriados no Mês | Total de feriados do mês (para DSR) | `2` |
| Feriados Trabalhados | Feriados efetivamente trabalhados | `1` |
| Folgas Trabalhadas | Folgas efetivamente trabalhadas | `2` |
| Dependentes | Número de dependentes para IR | `1` |

### Instalar como app nativo
- **Android (Chrome):** o banner de instalação aparece automaticamente. Toque em **Instalar**
- **iOS (Safari):** toque no botão de compartilhar → "Adicionar à Tela de Início"
- **Desktop (Chrome/Edge):** ícone de instalação na barra de endereços

---

## Legislação Aplicada

Todos os cálculos seguem a legislação vigente para **2026**:

### Tabela INSS Progressiva 2026

| Faixa de Salário | Alíquota |
|---|---|
| Até R$ 1.412,00 | 7,5% |
| De R$ 1.412,01 a R$ 2.666,68 | 9,0% |
| De R$ 2.666,69 a R$ 4.000,03 | 12,0% |
| De R$ 4.000,04 a R$ 7.786,02 | 14,0% |

### Tabela IRPF Progressiva 2026

| Base de Cálculo | Alíquota | Parcela a Deduzir |
|---|---|---|
| Até R$ 2.112,00 | Isento | — |
| De R$ 2.112,01 a R$ 2.826,65 | 7,5% | R$ 158,40 |
| De R$ 2.826,66 a R$ 3.751,05 | 15,0% | R$ 370,40 |
| De R$ 3.751,06 a R$ 4.664,68 | 22,5% | R$ 651,73 |
| Acima de R$ 4.664,68 | 27,5% | R$ 884,96 |

### Redutor de IR 2026

| Renda Bruta Mensal | Redutor |
|---|---|
| Até R$ 5.000,00 | R$ 312,89 (IR zerado) |
| De R$ 5.000,01 a R$ 7.350,00 | R$ 978,62 − (0,133145 × renda bruta) |
| Acima de R$ 7.350,00 | Sem redução |

### Outros parâmetros
- Dedução por dependente: **R$ 189,59**
- Desconto simplificado IR: **R$ 607,00**
- Adicional noturno: **20%** sobre hora normal
- Vale-transporte: **6%** do salário base
- Adiantamento salarial: **40%** do salário base
- Contribuição assistencial: **1%** sobre total de proventos

> ⚠️ Esta ferramenta é uma **simulação**. Os resultados têm caráter orientativo e não substituem a análise de um contador habilitado.

---

## PWA — Detalhes Técnicos

### Service Worker (`sw.js`)

Implementa duas estratégias de cache:

- **Cache-First** para arquivos locais (HTML, imagens, manifest): responde instantaneamente do cache; atualiza em background na próxima visita
- **Stale-While-Revalidate** para recursos CDN (Chart.js, jsPDF, XLSX, fontes): usa versão em cache enquanto busca atualização em paralelo

```
Caches criados:
  rcont-sct-static-v1  → arquivos locais
  rcont-sct-cdn-v1     → bibliotecas externas
```

Para **invalidar o cache** (após atualização do app), basta incrementar a versão em `sw.js`:

```js
const CACHE_NAME = 'rcont-sct-v1.0.0';  // altere para v1.0.1, v2.0.0, etc.
```

### Manifest (`manifest.json`)

```json
{
  "display": "standalone",
  "theme_color": "#b8860b",
  "background_color": "#0a1929",
  "start_url": "/index.html"
}
```

### Recursos PWA implementados

| Recurso | Status |
|---|---|
| Web App Manifest | ✅ |
| Service Worker | ✅ |
| Modo Offline | ✅ |
| Banner de instalação (Android/Desktop) | ✅ |
| Suporte iOS (apple-mobile-web-app) | ✅ |
| Bottom Navigation (modo standalone) | ✅ |
| Toast offline/online | ✅ |
| Safe area inset (notch iPhone) | ✅ |
| inputmode para teclado mobile correto | ✅ |
| Lighthouse PWA score ≥ 90 | ✅ |

---

## Personalização

### Trocar a logo
Substitua `img/logo.png` pela logo do seu escritório. Para logo escura (fundo claro), o CSS já aplica `filter: brightness(0) invert(1)` para torná-la branca. Para usar a logo colorida, adicione a classe `color-logo` à tag `<img>` no HTML.

### Atualizar tabelas de cálculo
Todas as constantes fiscais ficam no objeto `CONFIG` no `index.html`:

```js
const CONFIG = {
    VALOR_DEPENDENTE:      189.59,
    DESCONTO_SIMPLIFICADO: 607.00,
    REDUTOR_BASE:          978.62,
    REDUTOR_FATOR:         0.133145
};
```

As tabelas INSS e IRPF ficam nas funções `calcularINSS()` e `calcularIR()`.

### Alterar informações do escritório
Busque e substitua no `index.html` e `manifest.json`:
- `RCONT-SCT` → nome do seu escritório
- `Rosemberg Oliveira` → seu nome
- `(11) 95893-0291` → seu telefone
- `contato@rcont-sct.com.br` → seu e-mail
- `5511958930291` → seu número WhatsApp (formato internacional)

---

## Contato

**RCONT-SCT | Soluções Contábeis e Tributárias**  
Rosemberg Oliveira – Contador  
📞 (11) 95893-0291  
📩 contato@rcont-sct.com.br  
💬 [WhatsApp](https://wa.me/5511958930291)

---

*© 2026 RCONT-SCT — Todos os direitos reservados.*

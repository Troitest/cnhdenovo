# Tema WordPress – CNH de Novo

## Instalação

1. Copie a pasta `wordpress-theme` e renomeie para `cnhdenovo`
2. Coloque dentro de `wp-content/themes/cnhdenovo`
3. Adicione suas imagens na pasta `images/`:
   - `logo.png` – logotipo
   - `hero-image.jpg` – imagem de fundo do hero
4. Substitua `screenshot.png` por uma captura de tela real (1200×900px)
5. Ative o tema em **Aparência → Temas**
6. Configure a página inicial como "Página estática" em **Configurações → Leitura**

## Customização

- **WhatsApp e Instagram**: Acesse **Aparência → Personalizar → WhatsApp**
- **Logotipo**: Acesse **Aparência → Personalizar → Identidade do site → Logotipo**

## Estrutura de arquivos

```
cnhdenovo/
├── style.css          → CSS completo do tema
├── functions.php      → Setup, scripts, customizer
├── header.php         → Navbar + head
├── footer.php         → Footer + scripts
├── front-page.php     → Landing page completa
├── index.php          → Blog fallback
├── page.php           → Páginas genéricas
├── 404.php            → Página de erro
├── js/
│   ├── quiz.js        → Quiz interativo
│   └── form.js        → Formulário → WhatsApp
├── images/
│   ├── logo.png       → (você adiciona)
│   └── hero-image.jpg → (você adiciona)
└── screenshot.png     → Preview do tema
```

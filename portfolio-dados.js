/* =========================================================
   PORTFÓLIO DA NEXOR — é aqui que vocês colocam os trabalhos.
   Vale para as duas páginas:
     - página inicial: mostra só uma amostra de cada área
       (os trabalhos já prontos aparecem primeiro);
     - portfolio.html: mostra tudo.

   COMO COLOCAR UM TRABALHO
   1. Coloque o arquivo na pasta  site-institucional/assets/portfolio/
      Vídeo: .mp4 ou .webm   ·   Imagem: .png, .jpg, .svg ou .webp
   2. Escreva o nome do arquivo em `arquivo`, entre as aspas.
      Ex.: arquivo: "reels-clinica-sorriso.mp4"
   3. Preencha `titulo` e `cliente` (o cliente é opcional).
   4. (Opcional, só vídeo) `capa`: imagem mostrada antes do play.
      Sem capa, aparece o primeiro quadro do vídeo.

   O QUE CADA TIPO ACEITA
   - Vídeos ............ vídeo (.mp4)
   - Carrossel ......... VÁRIAS imagens, uma por tela, na ordem, em `imagens`:
                         imagens: ["clinica-1.png", "clinica-2.png", "clinica-3.png"]
                         Vira um carrossel de verdade: arrasta para o lado ou usa as setas.
   - Post de imagem única .. só imagem (.png, .jpg, .svg ou .webp)
   - Stories ........... vídeo OU imagem
   - Marca e sites ..... vídeo ou imagem

   Vaga com `arquivo` vazio aparece como "em breve".
   Para ter mais vagas, é só copiar uma linha. Para tirar, apague a linha.
   `formato`: "9:16" (em pé), "4:5" (feed), "1:1" (quadrado) ou "16:9" (deitado).

   Nos VÍDEOS, a pessoa clica no play e assiste com som.
   Em DESIGN e SITES, o vídeo roda sozinho, sem som e em repetição.
   ========================================================= */
const PORTFOLIO = {
  videos: [
    { tipo: "Vídeo em pé", formato: "9:16", titulo: "Reels de ofertas com a voz do dono", cliente: "Imperial Store · iPhones", arquivo: "assets/portfolio/imperial-store/video-reels.mp4", capa: "assets/portfolio/imperial-store/capa-video-reels.jpg" },
    { tipo: "Vídeo em pé", formato: "9:16", titulo: "Vídeo de apresentação do site", cliente: "Henrique Valadares · Engenharia Civil", arquivo: "assets/portfolio/henrique-valadares/video-site.mp4" },
    { tipo: "Vídeo em pé", formato: "9:16", titulo: "Vídeo de apresentação do site", cliente: "Brisa · Gelateria Artesanal", arquivo: "assets/portfolio/brisa-gelateria/video-site.mp4" },
    { tipo: "Vídeo em pé", formato: "9:16", titulo: "Animação 3D: do terreno à casa pronta", cliente: "Projeto residencial · Animação 3D", arquivo: "assets/portfolio/casa-3d/video-casa-3d.mp4" },
    { tipo: "Vídeo em pé", formato: "9:16", titulo: "Casa 3D no terreno real, com tour", cliente: "Rafael Duarte · Engenharia", arquivo: "assets/portfolio/rafael-duarte/video-casa-terreno-real.mp4", capa: "assets/portfolio/rafael-duarte/capa-video-casa-terreno-real.jpg" },
    { tipo: "Vídeo em pé", formato: "9:16", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Vídeo em pé", formato: "9:16", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Vídeo em pé", formato: "9:16", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Vídeo deitado", formato: "16:9", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Vídeo deitado", formato: "16:9", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Vídeo deitado", formato: "16:9", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Vídeo deitado", formato: "16:9", titulo: "", cliente: "", arquivo: "" },
  ],

  // Design · para as redes sociais
  redes: [
    // carrossel: uma imagem por tela, na ordem. Ex.: imagens: ["loja-1.png", "loja-2.png"]
    { tipo: "Carrossel", formato: "4:5", titulo: "Fissura, trinca ou rachadura?", cliente: "Henrique Valadares · Engenharia Civil", imagens: [
      "assets/portfolio/henrique-valadares/carrossel-01-capa.jpg", "assets/portfolio/henrique-valadares/carrossel-02-fissura.jpg", "assets/portfolio/henrique-valadares/carrossel-03-trinca.jpg", "assets/portfolio/henrique-valadares/carrossel-04-rachadura.jpg", "assets/portfolio/henrique-valadares/carrossel-05-sinais.jpg", "assets/portfolio/henrique-valadares/carrossel-06-vistoria.jpg",
    ] },
    { tipo: "Carrossel", formato: "4:5", titulo: "Gelato, sorvete ou sorbet?", cliente: "Brisa · Gelateria Artesanal", imagens: [
      "assets/portfolio/brisa-gelateria/carrossel-01-capa.jpg", "assets/portfolio/brisa-gelateria/carrossel-02-sorvete.jpg", "assets/portfolio/brisa-gelateria/carrossel-03-gelato.jpg", "assets/portfolio/brisa-gelateria/carrossel-04-sorbet.jpg", "assets/portfolio/brisa-gelateria/carrossel-05-sinais.jpg", "assets/portfolio/brisa-gelateria/carrossel-06-prove.jpg",
    ] },
    { tipo: "Carrossel", formato: "4:5", titulo: "4 sinais de que a elétrica pede socorro", cliente: "Rafael Duarte · Engenharia Elétrica", imagens: [
      "assets/portfolio/rafael-duarte/carrossel-01-capa.jpg", "assets/portfolio/rafael-duarte/carrossel-02-disjuntor.jpg", "assets/portfolio/rafael-duarte/carrossel-03-tomada.jpg", "assets/portfolio/rafael-duarte/carrossel-04-luz.jpg", "assets/portfolio/rafael-duarte/carrossel-05-choque.jpg", "assets/portfolio/rafael-duarte/carrossel-06-vistoria.jpg",
    ] },
    { tipo: "Carrossel", formato: "4:5", titulo: "", cliente: "", imagens: [] },
    // post de imagem única: só imagem (.png, .jpg, .svg, .webp)
    { tipo: "Post de imagem única", formato: "4:5", titulo: "Post para o Instagram", cliente: "Henrique Valadares · Engenharia Civil", arquivo: "assets/portfolio/henrique-valadares/post-unico.jpg" },
    { tipo: "Post de imagem única", formato: "4:5", titulo: "Post para o Instagram", cliente: "Brisa · Gelateria Artesanal", arquivo: "assets/portfolio/brisa-gelateria/post-unico.jpg" },
    { tipo: "Post de imagem única", formato: "4:5", titulo: "Post para o Instagram", cliente: "Rafael Duarte · Engenharia Elétrica", arquivo: "assets/portfolio/rafael-duarte/post-unico.jpg" },
    { tipo: "Post de imagem única", formato: "4:5", titulo: "", cliente: "", arquivo: "" },
    // stories: vídeo (.mp4) ou imagem (.png, .jpg, .svg, .webp)
    { tipo: "Stories", formato: "9:16", titulo: "Story para o Instagram", cliente: "Henrique Valadares · Engenharia Civil", arquivo: "assets/portfolio/henrique-valadares/story.jpg" },
    { tipo: "Stories", formato: "9:16", titulo: "Story para o Instagram", cliente: "Brisa · Gelateria Artesanal", arquivo: "assets/portfolio/brisa-gelateria/story.jpg" },
    { tipo: "Stories", formato: "9:16", titulo: "Story para o Instagram", cliente: "Rafael Duarte · Engenharia Elétrica", arquivo: "assets/portfolio/rafael-duarte/story.jpg" },
    { tipo: "Stories", formato: "9:16", titulo: "", cliente: "", arquivo: "" },
  ],

  // Design · para a marca
  marca: [
    { tipo: "Logo & identidade", formato: "1:1", titulo: "Logo e identidade visual", cliente: "Henrique Valadares · Engenharia Civil", arquivo: "assets/portfolio/henrique-valadares/logo-identidade.png" },
    { tipo: "Logo & identidade", formato: "1:1", titulo: "Logo e identidade visual", cliente: "Brisa · Gelateria Artesanal", arquivo: "assets/portfolio/brisa-gelateria/logo-identidade.png" },
    { tipo: "Logo & identidade", formato: "1:1", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Logo & identidade", formato: "1:1", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Banner", formato: "16:9", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Banner", formato: "16:9", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Tratamento de foto", formato: "4:5", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Tratamento de foto", formato: "4:5", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Tratamento de foto", formato: "4:5", titulo: "", cliente: "", arquivo: "" },
    { tipo: "Tratamento de foto", formato: "4:5", titulo: "", cliente: "", arquivo: "" },
  ],

  sites: [
    { tipo: "Site institucional", formato: "16:9", titulo: "Site de engenharia civil", cliente: "Henrique Valadares · Engenharia Civil", arquivo: "assets/portfolio/henrique-valadares/site-rolagem.mp4", capa: "assets/portfolio/henrique-valadares/site-rolagem-capa.jpg" },
    { tipo: "Site institucional", formato: "16:9", titulo: "Site de gelateria", cliente: "Brisa · Gelateria Artesanal", arquivo: "assets/portfolio/brisa-gelateria/site-rolagem.mp4", capa: "assets/portfolio/brisa-gelateria/site-rolagem-capa.jpg" },
    { tipo: "Landing page", formato: "16:9", titulo: "Landing page de serviço", cliente: "Polar Climatização · Ar-condicionado", arquivo: "assets/portfolio/polar-climatizacao/site-rolagem.mp4", capa: "assets/portfolio/polar-climatizacao/site-rolagem-capa.jpg" },
    { tipo: "Landing page", formato: "16:9", titulo: "Landing page de curso online", cliente: "Make em 10 Minutos · Curso de Automaquiagem", arquivo: "assets/portfolio/make-10-minutos/site-rolagem.mp4", capa: "assets/portfolio/make-10-minutos/site-rolagem-capa.jpg" },
    { tipo: "Landing page", formato: "16:9", titulo: "Landing page de curso online", cliente: "Bolo que Vende · Curso de Confeitaria", arquivo: "assets/portfolio/bolo-que-vende/site-rolagem.mp4", capa: "assets/portfolio/bolo-que-vende/site-rolagem-capa.jpg" },
  ],
};

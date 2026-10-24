# Homenagem Lito Souza a David Xavier

Uma homenagem digital, independente e em evolução a **Lito Sousa**, criada por **David Xavier / XD Plans**.

[![Deploy na Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdavidxavierxdplanschat%2Fhomenagem-lito-souza-david-xavier&output-directory=dist)

> Algumas pessoas não partem. Viram horizonte.

## Sobre o projeto

Lito aproximou a aviação de milhões de pessoas ao transformar sistemas complexos em histórias compreensíveis. Este projeto nasce da admiração de David Xavier por esse trabalho e da relação que ele enxerga entre um cockpit de aeronave e os cockpits digitais usados em tecnologia, computadores, dados e marketing.

Para muitas pessoas, um cockpit é apenas um conjunto de botões. Para quem trabalha com tecnologia, ele representa algo maior: sinais organizados, informação confiável e clareza para decidir o próximo movimento.

O site também reconhece **Mila Seidl** e a equipe do **Aviões e Músicas**, que participam da continuidade desse legado. A XD Plans deseja força, serenidade e sucesso nessa nova etapa e se coloca à disposição para colaborar, quando e se for útil, com inteligência artificial, automação, dados, desenvolvimento web e experiências digitais.

## Experiência

- Cena de abertura com céu, aeronave e telemetria.
- Retrato ilustrado de Lito no cockpit.
- Jornada longa de rolagem em câmera lenta até o “Sol da Música”.
- Linha do tempo sobre a trajetória de Lito e do Aviões e Músicas.
- Conteúdo sobre medo de voar, segurança e fatores humanos.
- Cockpit interativo de desempenho para tecnologia e marketing.
- Página documental com bastidores, arquitetura e fontes.

## Tecnologia

O projeto foi construído sem framework e sem dependências de execução:

- **HTML5 semântico** para conteúdo, navegação e acessibilidade.
- **CSS moderno** para layout responsivo, cenas sticky, animações, profundidade, HUD e iluminação.
- **JavaScript puro** para telemetria, interações e animações vinculadas à rolagem.
- **CSS Custom Properties** atualizadas com `requestAnimationFrame` para manter o movimento suave.
- **IntersectionObserver** para revelar conteúdos somente quando entram em cena.
- **Web Audio API** para o ambiente sonoro opcional.
- **ChatGPT Sites** para versionamento técnico e publicação da pasta estática `dist/`.

### Estrutura

```text
.
├── .openai/hosting.json   # Configuração de publicação do Site
├── dist/
│   ├── index.html         # Experiência principal
│   ├── projeto.html       # Documento sobre a homenagem e a tecnologia
│   ├── style.css          # Direção visual e componentes principais
│   ├── projeto.css        # Estilos da página documental
│   ├── app.js             # Movimento, cockpit e interações
│   └── assets/            # Arte da homenagem
└── README.md
```

## Executar localmente

Não é necessário instalar dependências. Na raiz do projeto:

```bash
python -m http.server 4176 -d dist
```

Depois, abra `http://localhost:4176`.

## Publicar na Vercel

O projeto já inclui `vercel.json` apontando para a pasta estática `dist`, portanto não precisa de framework, instalação de dependências ou comando de build.

1. Clique no botão **Deploy na Vercel** no início deste README.
2. Confirme a importação do repositório.
3. Mantenha o preset como **Other**; a saída `dist` já está configurada no código.
4. Clique em **Deploy**.

Depois disso, cada novo commit na branch `main` poderá gerar uma nova publicação automaticamente.

## Princípios do projeto

1. Respeito à memória de Lito, à família e à equipe.
2. Informação conferida e fontes visíveis.
3. Acessibilidade e adaptação para diferentes telas.
4. Tecnologia usada para emocionar sem esconder o conteúdo.
5. Evolução contínua, como todo bom cockpit.

## Fontes principais

- [Aviões e Músicas](https://avioesemusicas.com/)
- [Memorial Lito Sousa](https://litosousa.com/)
- [Agência Brasil — despedida de Lito Sousa](https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/morre-o-piloto-e-youtuber-lito-sousa-aos-59-anos)
- [Trip — Lito Sousa, o cara que ensinava a voar](https://revistatrip.uol.com.br/trip-fm/lito-sousa-o-cara-que-ensinava-a-voar-a-gente-aprende-na-vida-as-coisas-que-faz-com-paixao)
- [CNN Brasil — preservação de objetos e ideia de um museu](https://www.cnnbrasil.com.br/pop/celebridades/esposa-de-lito-sousa-define-o-que-fara-com-objetos-pessoais-dele-saiba/)

## Autoria e respeito

Concepção de **David Xavier / XD Plans**. Esta é uma homenagem independente, sem vínculo oficial com Lito Sousa, sua família, o canal Aviões e Músicas ou suas empresas.

O código está publicamente visível. Nenhuma licença de reutilização foi definida até o momento.

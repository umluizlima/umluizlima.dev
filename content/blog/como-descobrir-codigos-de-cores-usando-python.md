---
title: 'Como descobrir códigos de cores usando Python?'
description: 'Aprenda a encontrar a cor de qualquer pixel na sua tela.'
date: '2020-08-16'
disclaimer: true
---

Neste artigo você vai conhecer a solução que acabei desenvolvendo para um problema corriqueiro ao lidar com cores no computador.

## O problema

Imagine que você esteja caprichando no preparo de uma apresentação importante e, depois de muito navegar, encontra a imagem perfeita para o fundo daquele slide principal. Sabe o que seria bem legal? Usar algumas de suas cores como paleta para destacar outros elementos e deixar tudo combinando.

Com dois cliques ela está baixada na área de trabalho. Um arrastar e já está na apresentação. Alguns ajustes e está pronta pra impactar todo mundo com aquela frase de efeito que não saiu da sua mente desde ontem.

Agora só falta atualizar as cores nas outras telas e vai ficar um espetáculo! Mas espera aí, como faz pra saber os códigos das cores mesmo?

...

Talvez você já tenha passado por esta situação na vida real. Talvez, assim como eu, já perdeu um bom tempo procurando softwares, extensões de navegador ou qualquer outra solução para descobrir um simples código de cor.

## A solução

Um dos recursos que mais gostei de consumir nos estudos iniciais da linguagem de programação Python foi o livro <a target="_blank" rel="noopener" href="https://automatetheboringstuff.com/">Automate the Boring Stuff with Python</a>**\***. O que mais me encanta na sua didática é que mesmo os conceitos mais básicos da programação são introduzidos em pequenos projetos que resolvem algum problema real.

**\*** a versão original em inglês é totalmente gratuita pelo <a target="_blank" rel="noopener" href="https://automatetheboringstuff.com/">site</a>. Já a tradução para Português está disponível para <a target="_blank" rel="noopener" href="https://amzn.to/3h2DO4H">venda</a>.

Por uma feliz coincidência, passei pelo problema que te convidei a imaginar ali em cima na mesma época em que estudava este livro. Havia encontrado meu próprio problema real para colocar as habilidades em prática!

### Objetivo

Escrever um programa que, ao ser executado, armazene na área de transferência do computador o código de cor correspondente ao pixel sobre o qual o ponteiro do mouse está.

### Requisitos

- <a target="_blank" rel="noopener" href="https://www.python.org/downloads/">Python 3.6+</a>

### Preparação

Vamos precisar de duas bibliotecas para nossa solução:
- <a target="_blank" rel="noopener" href="https://pyautogui.readthedocs.io/en/latest/index.html">pyautogui</a> para tirar um screenshot da tela no momento da execução do código e também descobrir qual é a posição do ponteiro do mouse;
- <a target="_blank" rel="noopener" href="https://pyperclip.readthedocs.io/en/latest/">pyperclip</a> para colocar o código de cor na área de transferência do computador;

Podemos instalá-las com o seguinte comando:

```bash
pip install pyautogui pyperclip
```

A partir de agora podemos acessar o interpretador do Python:

```bash
python
```

### Implementação

O primeiro passo é importarmos as duas bibliotecas para acessar seus recursos:

```python
>>> import pyautogui
>>> import pyperclip
```

Podemos então utilizar o comando `dir` para descobrir o que cada uma nos oferece:

```python
>>> dir(pyautogui)
[..., position, ..., screenshot, ...]
>>> dir(pyperclip)
[..., copy, ...]
```

Algum dos itens listados chamou atenção? Podemos conhecer seus detalhes com o comando `help`:

```python
>>> help(pyautogui.position)
...
```

Vimos que a função `pyautogui.position` retorna uma tupla com as coordenadas `x` e `y` atuais do ponteiro do mouse. Você pode executá-la para testar:

```python
>>> pyautogui.position()
Point(x=..., y=...)
```

---

```python
>>> help(pyautogui.screenshot)
...
```

Já a `pyautogui.screenshot` retorna uma instância da classe `PIL.PngImagePlugin.PngImageFile`, como podemos validar:

```python
>>> img = pyautogui.screenshot()
>>> img
<PIL.PngImagePlugin.PngImageFile image mode=RGB size=...x... at ...>
```

Ao investigar essa instância vemos que ela oferece um método chamado `getpixel` que, ao receber uma tupla de dois elementos representando a coordenada desejada, retorna o valor daquele pixel:

```python
>>> dir(img)
[..., getpixel, ...]
>>> help(img.getpixel)
...
>>> img.getpixel((0, 0))
(..., ..., ...)
```

---

```python
>>> help(pyperclip.copy)
...
```

A função `pyperclip.copy` permite copiar uma string qualquer para a área de transferência do computador, tornando-a disponível para ser colada.

---

Com os recursos definidos, podemos implementar uma função simples para realizar os passos necessários sempre que executada:

```python
>>> import pyautogui
>>> import pyperclip
>>> def get_color_code():
...    img = pyautogui.screenshot()
...    color = img.getpixel(pyautogui.position())
...    pyperclip.copy('#{0:02x}{1:02x}{2:02x}'.format(*color))
```

Agora, sempre que rodar o comando `get_color_code()` nesta sessão do interpretador Python, sua função vai realizar os seguintes passos:
1. Capturar um screenshot da tela e armazenar na variável `img`;
2. Armazenar na variável `color` o valor do pixel sobre o qual o ponteiro do mouse se encontra;
3. Copiar para a área de transferência do computador uma string <a target="_blank" rel="noopener" href="https://stackoverflow.com/a/19996754/9234095">formatada</a> para corresponder ao código de cor hexadecimal daquele pixel;

E você pode conferir o resultado colando o valor em um editor de texto ou no próprio terminal!

---

Na intenção de não repetir infinitamente a definição deste código e nem mantê-lo limitado a minha própria máquina, empacotei-o sob a biblioteca <a target="_blank" rel="noopener" href="https://pypi.org/project/eyedropper/">eyedropper</a> que está disponível para instalação:

```bash
pip install eyedropper
```

E que pode ser utilizado através do seguinte comando diretamente no terminal:

```bash
eyedropper
```

## Conclusão

Este é um projeto simples que marcou muito meus estudos de Python. Enxergar a existência de pequenos problemas espalhados por aí que podem ser resolvidos através da programação foi essencial para despertar de vez meu interesse por esta habilidade e me impulsionou a continuar estudando para enfrentar problemas cada vez maiores.

Se você está começando agora, sugiro que trilhe um caminho parecido: procure resolver problemas que desafiem suas habilidades atuais na medida certa para se manter em estado de <a target="_blank" rel="noopener" href="https://www.ted.com/talks/mihaly_csikszentmihalyi_flow_the_secret_to_happiness?language=pt-br#t-588436">fluxo</a> e continuar aprendendo. Um desafio muito superior a sua competência pode despertar a ansiedade, enquanto um muito inferior pode causar tédio.

Se você gostou deste artigo, **compartilhe** com alguém que também possa se interessar.

---
title: 'Você se garante na tabuada?'
description: 'Desenvolva um jogo para praticar a tabuada usando Python.'
date: '2020-08-19'
---

Se tem algo que aprendemos na escola e usamos pro resto da vida, são as operações aritméticas. Todo dia tem um troquinho pra subtrair, uma receita pra multiplicar os ingredientes, uma conta pra dividir com a galera ou uma economia pra somar na reserva financeira. São nessas situações que estar com a habilidade afiada ajuda muito.

Uma maneira de manter essas continhas sempre na ponta da língua é praticando a tabuada. Que tal desenvolvermos um jogo pra ajudar nisso?

Primeiro vamos deixar as regras bem definidas para facilitar o trabalho de desenvolvimento.

O jogo irá funcionar na linha de comando, e deverá seguir a seguinte rotina:

1. É apresentada uma equação no formato: **A operador B**
2. Digitamos a resposta e teclamos ENTER
3. Se estiver correta: aparece uma nova equação (passo 1)
4. Senão: o jogo acaba e é mostrado o número de acertos na partida

É legal definir limites para o escopo não ficar muito amplo:

- Os operandos serão números inteiros entre 1 e 9
- O operador será exclusivamente o da multiplicação

Exemplo:

```python
7 x 4
Resposta: 28
4 x 5
Resposta: 21
Acertos: 1
```

Beleza, primeiro vamos estruturar a lógica do jogo usando valores fixos pros operandos. Em um arquivo tabuada.py digite o seguinte código:

```python
def tabuada():
    equacao = f'2 * 3'
    print(equacao.replace('*', 'x'))
    return int(input('Resposta: ')) == eval(equacao)

acertos = 0
while(tabuada()):
    acertos += 1
print(f'Acertos: {acertos}')
```

A estrutura é simples:

1. Declaramos uma função chamada tabuada() na qual a equação é definida em uma string simples equacao = f'2 * 3'
2. A equação é impressa na tela, substituindo o caractere ‘*’ por ‘x’ print(equacao.replace('*', 'x'))
3. A função então retorna o resultado (True ou False) da comparação de igualdade entre a resposta digitada int(input('Resposta: ')) e o resultado da equação (utilizamos a função eval(equacao) para calcular o resultado)
4. A função então é chamada enquanto a resposta dada estiver correta while(tabuada()): e incrementa a variável acertos += 1
5. Quando a resposta for errada, a função retorna False , saindo do loop e imprimindo o número de acertos print(f'Acertos: {acertos}')

```python
2 x 3
Resposta: 6
2 x 3
Resposta: 6
2 x 3
Resposta: 5
Acertos: 2
```

Testando vemos que tá funcionando! Só não tem muita graça…

O próximo passo é gerar os operandos aleatoriamente. Mas como podemos fazer isso? O módulo random já vem disponível com a instalação do Python e tem um método que gera números inteiros aleatórios, por isso vamos utilizá-lo:

1. Importamos o método randint do módulo random: from random import randint no topo do arquivo tabuada.py
2. Dentro da função, alteramos a declaração da equação para gerar os operandos de maneira aleatória: equacao = f'{randint(1,9)} * {randint(1,9)}'

```python
from random import randint

def tabuada():
    equacao = f'{randint(1,9)} * {randint(1,9)}'
    print(equacao.replace('*', 'x'))
    return int(input('Resposta: ')) == eval(equacao)

acertos = 0
while(tabuada()):
    acertos += 1
print(f'Acertos: {acertos}')
```

Resultado

```python
7 x 4
Resposta: 28
8 x 5
Resposta: 40
5 x 5
Resposta: 25
5 x 3
Resposta: 14
Acertos: 3
```

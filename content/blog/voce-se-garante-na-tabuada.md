---
title: 'Você se garante na tabuada?'
description: 'Desenvolva um jogo para praticar a tabuada usando Python.'
date: '2020-08-19'
disclaimer: false
---

Se tem algo que aprendemos na escola e usamos pelo resto da vida, são as operações aritméticas. Todos os dias temos um troco para subtrair, uma receita para multiplicar os ingredientes, uma conta para dividir com outras pessoas ou uma economia para somar na reserva financeira. São nessas situações que estar com a habilidade afiada ajuda muito.

Uma maneira de manter essas continhas sempre na ponta da língua é praticando a tabuada. Que tal desenvolvermos um jogo pra ajudar nisso?

Vamos deixar as regras bem definidas para facilitar o trabalho de desenvolvimento. O jogo irá funcionar na linha de comando, e deverá seguir a seguinte rotina:

1. É apresentada uma equação no formato `A operador B`;
2. Digitamos a resposta e teclamos ENTER;
3. Se estiver correta, uma nova equação aparece (volta para o passo 1);
4. Senão, o jogo termina e o número de acertos da partida é mostrado;

É importante definirmos também alguns limites para que o escopo não fique muito amplo:

- Os operandos serão números inteiros entre 1 e 9;
- O operador será exclusivamente o da multiplicação;

Assim, podemos ilustrar que uma partida deverá funcionar da seguinte forma:

```bash
7 x 4
Resposta: 28
4 x 5
Resposta: 21
Acertos: 1
```

---

Primeiro, vamos estruturar a lógica do jogo usando valores fixos para os operandos. Em um arquivo `tabuada.py` declaramos uma função chamada `tabuada()` que executa os seguintes passos sempre que for chamada:

1. Define os operandos da equação, `a` e `b` (vamos usar valores fixos por enquanto);
2. Imprime a equação na tela, formatando os operandos em uma string;
3. Retorna o resultado da comparação de igualdade (`True` ou `False`) entre a resposta digitada e o resultado da equação;

```python
def tabuada():
    a, b = 2, 3
    print(f"{a} x {b}")
    return int(input("Resposta: ")) == a * b
```

Também definimos o ciclo de vida do jogo, que:

1. Inicializa a variável `acertos` com o valor 0;
2. Estabelece um loop de execução que deverá ser repetido enquanto o retorno da função tabuada for verdadeiro, incrementando o número de acertos a cada iteração completa;
3. Quando o ciclo for quebrado, imprime o número de acertos na tela;

```python
acertos = 0
while(tabuada()):
    acertos += 1
print(f"Acertos: {acertos}")
```

A partir daqui já podemos testar o jogo ao executar o seguinte comando no terminal**\***:

```bash
python tabuada.py
2 x 3
Resposta: 6
2 x 3
Resposta: 6
2 x 3
Resposta: 5
Acertos: 2
```

**\*** É preciso estar na mesma pasta que o arquivo do jogo.

Nosso próximo passo é gerar os operandos aleatoriamente. Mas como podemos fazer isso?

O módulo `random` já vem disponível com a instalação do Python e tem um método que gera números inteiros aleatórios. Podemos importar seu método `randint` no topo do arquivo:

```python
from random import randint
```

Dentro da função `tabuada()` alteramos a declaração dos operandos para que sejam gerados aleatoriamente:

```python
a, b = randint(1,9), randint(1,9)
```

Agora sim o jogo está completo e vamos manter a aritmética em dia! Podemos testá-lo mais uma vez no terminal:

```bash
python tabuada.py
7 x 8
Resposta: 56
6 x 6
Resposta: 36
1 x 4
Resposta: 4
2 x 9
Resposta: 17
Acertos: 3
```

---

Neste pequeno projeto pudemos praticar alguns conceitos básicos que são comuns a diversas linguagens de programação, como ler uma entrada de dados, imprimir informações na tela, importar dependências e formatar strings usando variáveis. Aqui cabe um lembrete: nem todo projeto precisa ser revolucionário ou ter planos de longo prazo, mas pode simplesmente servir para fixar conhecimentos específicos. É importante aceitarmos isto para que o aprendizado possa acontecer de forma leve e prazerosa.

Aqui temos o resultado final do arquivo `tabuada.py`:

```python
from random import randint

def tabuada():
    a, b = randint(1,9), randint(1,9)
    print(f"{a} x {b}")
    return int(input("Resposta: ")) == a * b

acertos = 0
while(tabuada()):
    acertos += 1
print(f"Acertos: {acertos}")
```

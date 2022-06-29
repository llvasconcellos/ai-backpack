# ai-backpack
Artificial Intelligence Backpack Problem Solver Using Genetic Algorithm JavaScript

Inteligência Artificial: Resolução do Problema da Mochila
Mestrado em Computação Aplicada – Engenharia de Software - UTFPR
Leonardo Lima de Vasconcellos


1. Explique como procedeu para penalizar o fitness de mochilas infactíveis (mochilas cujo
peso é maior do que o máximo permitido.

Para a penalização foi determinado que para os indivíduos com peso acima do permitido o fitness seria reduzido pela metade.

a. Adicione o pseudo-código do método implementado no PDF a ser entregue.
```javascript
function penalizacao(individuo){
    individuo.fitness = individuo.fitness / 2;
}
```

b. Explique o método em linguagem natural.

Dividir o fitness do individuo por dois.


2. Explique como procedeu para reparar mochilas infactíveis (cujo peso é maior do que o
máximo permitido), ou seja, para que tivessem seu peso ajustado para atender à
restrição de capacidade.

Foi feito uma varredura no cromossomo do individuo removendo sempre o primeiro item da lista e recalculando o valor de peso do individuo até que o mesmo estivesse dentro do peso ideal.

a. Adicione o pseudo-código do método ao PDF a ser entregue.
```javascript
function reparacao(individuo){
    while (individuo.peso > pesoMaximo) {
        for(let i = 0; i < individuo.cromossomo.length; i++) {
            if(individuo.cromossomo[i]) {
                individuo.cromossomo[i] = false;
                break;
            }
        }
        calcularImportanciaPesoFitness(individuo);
    }
}
```

b. Explique o método em linguagem natural.

Enquanto o peso do individuo é maior do que o peso máximo da mochila faça:
Encontre o primeiro item contido na mochila e remova.
Calcule o peso, importância e fitness novamente;

3. Plote um gráfico valor do fitness x geração da execução na qual obteve o melhor
fitness, portanto, o gráfico deve ter 2 curvas (uma para cada implementação).

Médias:

| Metodo      | Quantidade de itens | Peso Total | Valor Total |
|-------------|---------------------|------------|-------------|
| Reparação   | 7,7                 | 118,7      | 171,5       |
| Penalização | 16,7                | 111,9      | 169,2       |

Gráfico:

![grafico](/grafico.png)

Responda: as curvas variam em função do modo de cálculo de fitness: penalização x
reparação? Explique.

Variam sim pois os resultados foram diferentes. O método de reparação teve um desempenho superior mas também a penalização poderia ter sido melhor implementada.

4. Sobre as melhores soluções obtidas, responda para cada uma das implementações:

a. Qual foi o valor máximo para os itens de uma mochila que você encontrou
(sem violar a capacidade em Kg da mochila)?

Reparação: 184
Penalização: 137

b. Quantas mochilas com valor máximo foram obtidas?

Reparação: 1
Penalização: 1

c. Liste todas as mochilas que obteve que apresentaram valor máximo. Para cada
uma delas coloque os itens, valor total e peso total.

Reparação:
Quantidade de itens: 8
mochila.js:160 Peso total: 117
mochila.js:161 Valor total: 184
mochila.js:162 Itens: 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1


Penalização
Quantidade de itens: 16
mochila.js:160 Peso total: 111
mochila.js:161 Valor total: 137
mochila.js:162 Itens: 1,0,1,1,0,1,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,1,1,1,1,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1


5. Compare a taxa de sucesso das implementações penalização e reparação. Para este
problema, taxa de sucesso é o número de vezes que a solução de maior valor
(possivelmente a ótima) foi encontrada nas execuções realizadas (recorda-se que o
total de execuções foi definido no item a do método). Responda:

A taxa de sucesso foi igual mas a reparação teve desempenho superior.

a. Quais foram as taxas de sucesso obtidas?

1/1

b. Quantas vezes o cálculo de fitness é executado para a configuração em
questão por execução? Escreva a fórmula.
É executado toda vez que há mudança nos valores.

c. Qual método implementado é mais custoso temporalmente: o de reparação
ou de penalização?
Reparação é mais custoso.

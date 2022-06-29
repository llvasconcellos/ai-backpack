
const objetos = [
    { peso: 3, valor: 1 },
    { peso: 8, valor: 3 }, 
    { peso: 12, valor: 1 }, 
    { peso: 2, valor: 8 }, 
    { peso: 8, valor: 9 }, 
    { peso: 4, valor: 3 },
    { peso: 4, valor: 2 }, 
    { peso: 5, valor: 8 }, 
    { peso: 1, valor: 5 }, 
    { peso: 1, valor: 1 }, 
    { peso: 8, valor: 1 },
    { peso: 6, valor: 6 }, 
    { peso: 4, valor: 3 }, 
    { peso: 3, valor: 2 },
    { peso: 3, valor: 5 }, 
    { peso: 5, valor: 2 },
    { peso: 7, valor: 3 }, 
    { peso: 3, valor: 8 }, 
    { peso: 5, valor: 9 }, 
    { peso: 7, valor: 3 }, 
    { peso: 4, valor: 2 }, 
    { peso: 3, valor: 4 },
    { peso: 7, valor: 5 }, 
    { peso: 2, valor: 4 }, 
    { peso: 3, valor: 3 }, 
    { peso: 5, valor: 1 }, 
    { peso: 4, valor: 3 }, 
    { peso: 3, valor: 2 },
    { peso: 7, valor: 14 }, 
    { peso: 19, valor: 32 }, 
    { peso: 20, valor: 20 }, 
    { peso: 21, valor: 19 }, 
    { peso: 11, valor: 15 }, 
    { peso: 24, valor: 37 }, 
    { peso: 13, valor: 18 }, 
    { peso: 17, valor: 13 }, 
    { peso: 18, valor: 19 }, 
    { peso: 6, valor: 10 }, 
    { peso: 15, valor: 15 }, 
    { peso: 25, valor: 40 }, 
    { peso: 12, valor: 17 }, 
    { peso: 19, valor: 39 }
];

const objetivo = 120;
const maxGeracoes = 500;
const mochila = [];
const maxPopulacaoInicial = 10;
const pesoMaximo = 120;
let populacao = [];
let maximaImportancia = 0;
let maximoFitness = 0;
let probabilidadeMutacao = 30;
let ajuste = "reparacao";
//let ajuste = "penalizacao";

(function calculaMaximaImportancia() {
    for(let i = 0; i < objetos.length; i++) {
        maximaImportancia += objetos[i].valor;
    }
})();

console.log("maximaImportancia=", maximaImportancia);

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

function penalizacao(individuo){
    individuo.fitness = individuo.fitness / 2;
}

function calcularFitness(individuo) {
    percImportancia = (100 * individuo.importancia) / maximaImportancia;
    percPeso = (100 * individuo.peso) / pesoMaximo;
    if(percPeso > 100) {
        percPeso = 100 - (percPeso - 100);
    }
    // Fitness maximo = 200
    individuo.fitness = percImportancia + percPeso;
    maximoFitness += individuo.fitness;
};

function calcularImportanciaPesoFitness(individuo){
    individuo.importancia = 0;
    individuo.peso = 0;
    for(let i = 0; i < individuo.cromossomo.length; i++) {
        if(individuo.cromossomo[i]) {
            individuo.importancia += objetos[i].valor;
            individuo.peso += objetos[i].peso;
        }
    }
    calcularFitness(individuo);
};

function determinaPais(populacao, pai) {
    var totalFitness = 0;
    for(var i = 0; i < populacao.length; i++) {
        totalFitness += populacao[i].fitness;
    }
    for(var i = 0; i < populacao.length; i++) {
        populacao[i].roleta = (populacao[i].fitness / totalFitness) * 100;
    }
    let random = randomInt(100);
    let teste = 0;
    for(var i = 0; i < populacao.length; i++) {
        if(random >= teste & random <= (populacao[i].roleta + teste)) {
            if(pai && populacao[i].cromossomo === pai.cromossomo) {
                return determinaPais(populacao, pai);
            } else {
                return populacao[i];
            }
        } else {
            teste += populacao[i].roleta;
        }
    }
}

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function cruzamento(pai, mae) {
    const pontoDeCorte = randomInt(objetos.length);
    herancaPai = pai.cromossomo.slice(0, pontoDeCorte);
    herancaMae = mae.cromossomo.slice(pontoDeCorte);
    let filho = {
        cromossomo: herancaPai.concat(herancaMae)
    };
    calcularImportanciaPesoFitness(filho);
    return filho;
}

function exibeResultado(populacao) {
    let melhor = populacao[0];
    let qtdItens = 0;
    let itens = "";
    for(let i = 0; i < melhor.cromossomo.length; i++) {
        if(melhor.cromossomo[i]) {
            itens += "1";
            qtdItens++;
        } else {
            itens += "0";
        }
        if (i < melhor.cromossomo.length - 1) {
            itens += ",";
        }
    }
    console.log(`Quantidade de itens: ${qtdItens}`);
    console.log(`Peso total: ${melhor.peso}`);
    console.log(`Valor total: ${melhor.importancia}`);
    console.log(`Itens: ${itens}`);
}

function mutacao(individuo) {
    for(let i = 0; i < 10; i++) {
        let random = randomInt(objetos.length);
        individuo.cromossomo[random] = !individuo.cromossomo[random];
    }
    calcularImportanciaPesoFitness(individuo);
}

let geracao = 0;
function algoritmoGenetico(pop) {
    let novaPopulacao = [];

    pop.sort(function (a, b) {
        if (a.fitness > b.fitness) {
            return -1;
        }
        if (a.fitness < b.fitness) {
            return 1;
        }
        return 0;
    });

    if(geracao < maxGeracoes) {
        for(var i = 0; i < maxPopulacaoInicial; i++) {
            let pai = self.determinaPais(pop);
            let mae = self.determinaPais(pop, pai);
            let filho = cruzamento(pai, mae);
            if(probabilidadeMutacao < randomInt(100)) {
                mutacao(filho);
            }
            if(filho.peso > pesoMaximo) {
                if(ajuste === "reparacao") {
                    reparacao(filho);
                } else {
                    penalizacao(filho);
                }
            }
            novaPopulacao.push(filho);
        }
        geracao++;
        algoritmoGenetico(novaPopulacao);
    } else {
        exibeResultado(pop);
    }
}

(function geraPopulacaoInicial() {
    for(let i = 0; i < maxPopulacaoInicial; i++) {
        populacao[i] = {cromossomo: []};
        for(let j = 0; j < objetos.length; j++) {
            populacao[i].cromossomo.push(Math.random() >= 0.5);
        }
    }
})();

(function calcularImportanciaPesoPopulacao() {
    for(let i = 0; i < populacao.length; i++) {
        populacao[i].importancia = 0;
        populacao[i].peso = 0;
        for(let j = 0; j < populacao[i].cromossomo.length; j++) {
            if(populacao[i].cromossomo[j]) {
                populacao[i].importancia += objetos[j].valor;
                populacao[i].peso += objetos[j].peso;
            }
        }
        calcularFitness(populacao[i]);
    }
})();

for(var i = 0; i < maxPopulacaoInicial; i++) {
    if(populacao[i].peso > pesoMaximo) {
        if(ajuste === "reparacao") {
            reparacao(populacao[i]);
        } else {
            penalizacao(populacao[i]);
        }
    }
}

console.log(populacao);

algoritmoGenetico(populacao);

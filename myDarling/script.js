/* lista franxx */
import { listaArrayFranxx, listaArrayFranxxEN, franxxStats, arrayIMGduo } from './fraxx.js';

/* textos / traducao */
import { textosL } from './pt_en.js'




/* loading */

window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector("#loading").classList.add("ativoLoad");
    }, 1500);
});



/* card do universo */
const removerADD = [...document.querySelectorAll(`.cardUniverso`)];

removerADD.forEach((el) => {
    el.addEventListener(`click`, () => {

        removerADD.forEach((elme) => {
            elme.classList.remove(`ativo`);
            el.classList.add(`ativo`);
        });
    });
});


/* cards dos personagens */
const fFecharToggle = () => {

    const cardSelecionado = [...document.querySelectorAll(`.activeEsquad`)];

    cardSelecionado.forEach((el) => {
        el.classList.remove(`activeEsquad`);


        const nomeBack = [...document.querySelectorAll('.spanALLpersona')];
        nomeBack.forEach((el) => {
            el.classList.remove(`personaActive`);
        });

    });
};


const personagem = [...document.querySelectorAll(`.personagem`)];
personagem.forEach((el) => {

    el.addEventListener(`click`, (evt) => {
        fFecharToggle();
        evt.currentTarget.classList.toggle(`activeEsquad`);

        const card = evt.currentTarget;
        const nome = card.querySelector('.spanALLpersona');
        nome.classList.toggle('personaActive');
    });

});



const testeRemover = [...document.querySelectorAll(`.hudBio`)];
testeRemover.forEach((el) => {

    el.addEventListener(`click`, (evt) => {
        evt.stopPropagation();

        const personagem = [...document.querySelectorAll(`.personagem`)];
        personagem.forEach(() => {
            fFecharToggle();
        });

        const nomeBack = [...document.querySelectorAll('.spanALLpersona')];
        nomeBack.forEach((el) => {
            el.classList.remove(`personaActive`);
        });

    });
});




/* porcetagem status */

const energyPc = document.querySelector(`.energyPc`);
const compatPc = document.querySelector(`.compatPc`);
const syncPc = document.querySelector(`.syncPc`);

const energyFranxx = document.querySelector(`.energy`); //estilo
const compatFranxx = document.querySelector(`.compat`); //estilo
const syncFranxx = document.querySelector(`.sync`); //estilo


/* estilo root/global */
const root = document.documentElement;

const wEnergy = getComputedStyle(root).getPropertyValue(`--wEnergy`)
const wCompat = getComputedStyle(root).getPropertyValue(`--wCompat`)
const wSync = getComputedStyle(root).getPropertyValue(`--wSync`)





/* verificar lingua */

const verificarLingua = () => {

    const lingAtiva = document.querySelector(`.listaOPCAO`);

    const laT = lingAtiva.dataset.lang
    return laT === `pt-br` ? listaArrayFranxx : listaArrayFranxxEN;
};



let indexAtual = 0;
const objInfos = () => {

    const listaAtivaFranxx = verificarLingua();
    const franxxAtual = listaAtivaFranxx[indexAtual];

    const dataInfo = document.querySelectorAll('[data-frx]');

    dataInfo.forEach((el) => {
        const frxInfo = el.dataset.frx;

        if (frxInfo === 'img') {
            el.src = franxxAtual[frxInfo];
        } else {
            el.textContent = franxxAtual[frxInfo];
        }
    });

    // weapons
    weaponsList.innerHTML = '';

    franxxAtual.weapons.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        weaponsList.appendChild(li);
    });

    // status
    energyFranxx.style.setProperty('--wEnergy', `${franxxStats[indexAtual].energy}%`);
    compatFranxx.style.setProperty('--wCompat', `${franxxStats[indexAtual].compatibility}%`);
    syncFranxx.style.setProperty('--wSync', `${franxxStats[indexAtual].sync}%`);

    energyPc.textContent = `${franxxStats[indexAtual].energy}%`;
    compatPc.textContent = `${franxxStats[indexAtual].compatibility}%`;
    syncPc.textContent = `${franxxStats[indexAtual].sync}%`;

    // duo
    const duoEsquedo = document.querySelector('.duoEsquedo');
    const duoDireito = document.querySelector('.duoDireito');

    const nomeDouEsquerdo = document.querySelector('.duoEsquerdoName');
    const nomeDuoDireito = document.querySelector('.duoDireitoName');

    duoEsquedo.src = arrayIMGduo[indexAtual].duo[0].img;
    nomeDouEsquerdo.textContent = arrayIMGduo[indexAtual].duo[0].name;

    duoDireito.src = arrayIMGduo[indexAtual].duo[1].img;
    nomeDuoDireito.textContent = arrayIMGduo[indexAtual].duo[1].name;
};


const voltarSlide = () => {
    indexAtual === 0 ? indexAtual = listaArrayFranxx.length - 1 : indexAtual--;
    objInfos();
};

const proximoSlide = () => {
    indexAtual === listaArrayFranxx.length - 1 ? indexAtual = 0 : indexAtual++;
    objInfos();
};



const hudRight = document.querySelector('.hudRight');

const renderComAnimacao = () => {

    hudRight.classList.add('fade-out');

    setTimeout(() => {
        objInfos();

        hudRight.classList.remove('fade-out');
        hudRight.classList.add('fade-in');

        setTimeout(() => {
            hudRight.classList.remove('fade-in');
        }, 300);

    }, 200);
};


const container = document.querySelector('.franxxCenter');

const trocarComFade = () => {

    container.classList.add('fade');

    setTimeout(() => {
        objInfos();

        container.classList.remove('fade');
    }, 200);
};


const btnPrev = document.querySelector("#btnSetaPrev");
const btnNext = document.querySelector("#btnSetaNext");

btnPrev.addEventListener(`click`, () => {
    voltarSlide();
    renderComAnimacao()
    trocarComFade()
});

btnNext.addEventListener(`click`, () => {
    proximoSlide();
    renderComAnimacao()
    trocarComFade()

});



/* slide auto / o mundo */

const arraySlide = [
    `/imgs/darlingALL/imgUNIVERSO/worldDesert.jpg`,
    `/imgs/darlingALL/imgUNIVERSO/bus.jpg`,
    `/imgs/darlingALL/imgUNIVERSO/latifundio.jpg`,
    `/imgs/darlingALL/imgUNIVERSO/city.webp`
];

const arraySlideEsquad = [
    `/imgs/darlingALL/imgUNIVERSO/squad13House.jpg`,
    `/imgs/darlingALL/imgUNIVERSO/esquadraoTREZE.jpg`

]


const houseEsquad = document.querySelector(`.houseEsquad`);
const slideMundo = document.querySelector(`.worldIMG`);
const containerOppH = document.querySelector(`.oppH`);
const containerOpp = document.querySelector(`.opp`);



const alternerIMG = () => {

    let acum = 0;
    let acumH = 0;

    setInterval(() => {

        containerOppH.classList.add("active");
        containerOpp.classList.add("active");


        setTimeout(() => {

            houseEsquad.src = arraySlideEsquad[acumH];
            acumH = (acumH + 1) % arraySlideEsquad.length;

            slideMundo.src = arraySlide[acum];
            acum = (acum + 1) % arraySlide.length;

            containerOppH.classList.remove("active");
            containerOpp.classList.remove("active");


        }, 250);

    }, 3000);
};

alternerIMG();
alternerIMG();
/* arrumar as funcoes e as variaveis */


/* hora */
const dataOf = (() => {

    const data = new Date();

    const hora = data.getHours().toString().padStart(2, 0);
    const minuto = data.getMinutes().toString().padStart(2, 0);
    const segundo = data.getSeconds().toString().padStart(2, 0);

    const clock = `${hora}:${minuto}:${segundo}`;

    document.querySelector(`.eta`).textContent = clock;
});

dataOf();

setInterval(() => {
    dataOf();
}, 1000);


/* footer text */

const textoSakuraSlide = () => {

    const textos = [
        "MY DARLING",
        "We were meant to meet.",
        "Beyond time and space.",
        "Our hearts are synced.",
        "I’ll never forget you."
    ];

    let acumSakura = 0;
    const textoSakura = document.querySelector(`.textoSakura`);

    setInterval(() => {
        acumSakura = (acumSakura + 1) % textos.length;

        textoSakura.textContent = textos[acumSakura];
    }, 3000);
};

textoSakuraSlide();


/* scroll animation */
const containerSobreUniverso = document.querySelector(`.containerSobreUniverso`);

const UniversoALLimg = [...document.querySelectorAll(`.containerSobreUniverso img`)];



const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add('ativarAnim');
        }
    });
}, { threshold: 0.4 });


const dataDados = document.querySelectorAll(`[data-anim]`).forEach((el) => {
    observer.observe(el);
});



/* barra menu / links/navs*/

const menu = document.querySelector(`#menuToggle`);
const bottomNav = document.querySelector(`.bottom-nav`);

menu.addEventListener(`click`, () => {
    bottomNav.classList.toggle(`listaAtiva`);
    menu.classList.toggle(`menuAtivo`);
    menu.textContent = bottomNav.classList.contains(`listaAtiva`) ? `close` : `menu`;
});


/* personagens arrow */



const personaBTNant = document.querySelector(`.anterior`);
const personaBTNprox = document.querySelector(`.proxima`);
const dots = [...document.querySelectorAll(`.dot`)];

const peronaa = [...document.querySelectorAll(`.personagem`)];


let acumPersona = 0;


const personasPROX = () => {

    peronaa[acumPersona].classList.add(`personaHidden`);
    dots[acumPersona].classList.remove(`ativa`);
    acumPersona = (acumPersona + 1) % peronaa.length;

    peronaa[acumPersona].classList.remove(`personaHidden`);
    dots[acumPersona].classList.add(`ativa`);
}
const personasANT = () => {
    peronaa[acumPersona].classList.add(`personaHidden`);
    dots[acumPersona].classList.remove(`ativa`);

    acumPersona = (acumPersona - 1 + peronaa.length) % peronaa.length;
    peronaa[acumPersona].classList.remove(`personaHidden`);
    dots[acumPersona].classList.add(`ativa`);
}


personaBTNant.addEventListener(`click`, () => {
    personasANT();

});

personaBTNprox.addEventListener(`click`, () => {
    personasPROX();

});

dots.forEach((el, index) => {
    el.addEventListener(`click`, () => {
        peronaa[acumPersona].classList.add(`personaHidden`);
        dots[acumPersona].classList.remove(`ativa`);

        acumPersona = index;

        peronaa[acumPersona].classList.remove(`personaHidden`);
        dots[acumPersona].classList.add(`ativa`);

    });
});



/* lingua pt-br / en */


const lingua = [...document.querySelectorAll(`.linguaSelect`)];
const modoAtivoL = document.querySelector(`.modo`);

const btnPT = [...document.querySelectorAll(`#btnPT`)];
const btnEN = [...document.querySelectorAll(`#btnEN`)];


const altIdiomaPT = () => {
    const dataLingua = [...document.querySelectorAll(`[data-key]`)];

    dataLingua.forEach((el) => {
        const key = el.dataset.key;
        el.textContent = textosL.pt[key];
    });

    btnPT.forEach((el) => {

        el.removeAttribute(`data-lang`);
        el.setAttribute(`data-lang`, `en`);

        document.querySelectorAll(`.active`).forEach(el => el.classList.remove(`active`));
        btnPT.forEach(el => el.classList.add(`active`))

        el.classList.add(`active`)
    })



};

const altIdiomaEN = () => {
    const dataLingua = [...document.querySelectorAll(`[data-key]`)];

    dataLingua.forEach((el) => {
        const key = el.dataset.key;
        el.textContent = textosL.en[key];
    });

    btnEN.forEach((el) => {

        el.removeAttribute(`data-lang`);
        el.setAttribute(`data-lang`, `pt-br`);

        document.querySelectorAll(`.active`).forEach(el => el.classList.remove(`active`));
        btnEN.forEach(el => el.classList.add(`active`))

        el.classList.add(`active`)
    })

};


btnPT.forEach((el) => {
    el.addEventListener(`click`, () => {
        altIdiomaPT();
        objInfos();
    });

});

btnEN.forEach((el) => {
    el.addEventListener(`click`, () => {
        altIdiomaEN();

        objInfos();
    });
});





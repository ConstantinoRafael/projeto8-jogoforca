import palavras from "./Palavras";
import alfabeto from "./Alfabeto";
import forca0 from "./assets/forca0.png";
import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png";
import { useState } from "react";


export default function App() {
    let [palavra, setPalavra] = useState([]);
    let [preenchendoOsTracinhos, setPreenchendoOsTracinhos] = useState([]);
    const [clicadas, setClicadas] = useState(alfabeto);
    const [desabilitaInput, setDesabilitaInput] = useState(true);
    const [desabilitabotao, setDesabilitaBotao] = useState(true);
    let [imagem, setImagem] = useState(forca0);
    let [contador, setContador] = useState(0);
    const [corPalavra, setCorPalavra] = useState("palavra-adivinhar");
    const [chute, setChute] = useState("");

    function ComecarJogo() {
        //Para pegar uma palavra de forma aleatória
        palavras.sort(comparador)

        function comparador() {
            return Math.random() - 0.5;
        }

        //Para transformar a palabra que vem em array
        let novaPalavra = palavras[0].split(''); //palavra agora é um array

        setPalavra(novaPalavra);

        let arrayDeTracinhos = novaPalavra.map((l) => ("_"))

        setPreenchendoOsTracinhos(arrayDeTracinhos);

        setClicadas([]);

        setDesabilitaInput(false);

        setDesabilitaBotao(false);

        setContador(0);

        setCorPalavra("palavra-adivinhar");

        setImagem(forca0);

    }

    console.log(palavra);

    function Clicada(letraClicada) {
        switch (letraClicada) {
            case "a":
                palavra.forEach((p, i) => (((p === letraClicada || p === "á" || p === "ã" || p === "â") && preenchendoOsTracinhos[i] === "_") ? (preenchendoOsTracinhos[i] = p) : ""))
                break;
            case "e":
                palavra.forEach((p, i) => (((p === letraClicada || p === "é" || p === "ê") && preenchendoOsTracinhos[i] === "_") ? (preenchendoOsTracinhos[i] = p) : ""))
                break;
            case "i":
                palavra.forEach((p, i) => (((p === letraClicada || p === "í" || p === "î") && preenchendoOsTracinhos[i] === "_") ? (preenchendoOsTracinhos[i] = p) : ""))
                break;
            case "o":
                palavra.forEach((p, i) => (((p === letraClicada || p === "ó" || p === "õ" || p === "ô") && preenchendoOsTracinhos[i] === "_") ? (preenchendoOsTracinhos[i] = p) : ""))
                break;
            case "u":
                palavra.forEach((p, i) => (((p === letraClicada || p === "ú") && preenchendoOsTracinhos[i] === "_") ? (preenchendoOsTracinhos[i] = p) : ""))
                break;
            case "c":
                palavra.forEach((p, i) => (((p === letraClicada || p === "ç") && preenchendoOsTracinhos[i] === "_") ? (preenchendoOsTracinhos[i] = p) : ""))
                break;
            default:
                palavra.forEach((p, i) => ((p === letraClicada && preenchendoOsTracinhos[i] === "_") ? (preenchendoOsTracinhos[i] = p) : ""))
        }


        let estouPreenchendo = preenchendoOsTracinhos
        //console.log(estouPreenchendo);
        setPreenchendoOsTracinhos(estouPreenchendo);

        setClicadas([...clicadas, letraClicada]);

        if (palavra.includes(letraClicada) === false) {
            contador++;
            setContador(contador);
        }

        switch (contador) {
            case 0:
                setImagem(forca0);
                break;
            case 1:
                setImagem(forca1);
                break;
            case 2:
                setImagem(forca2);
                break;
            case 3:
                setImagem(forca3);
                break;
            case 4:
                setImagem(forca4);
                break;
            case 5:
                setImagem(forca5);
                break;
            case 6:
                setImagem(forca6);
                break;
            default:
                console.log("default");
        }

        if (contador === 6) {
            perdeu();
        }

        if (!preenchendoOsTracinhos.includes("_")) {
            ganhou();
        }




        console.log(preenchendoOsTracinhos);
    }

    function ganhou() {
        setClicadas(alfabeto);
        setPreenchendoOsTracinhos(palavra);
        setCorPalavra("palavra-adivinhar ganhou");
    }


    function perdeu() {
        setClicadas(alfabeto);
        setPreenchendoOsTracinhos(palavra);
        setCorPalavra("palavra-adivinhar perdeu");
    }

    function chutar() {
        setChute(chute);

        console.log(chute);
        console.log(palavras[0]);
        if (chute === palavras[0]) {
            ganhou();
        } else {
            setImagem(forca6);
            perdeu();
        }
    }


    return (
        <>
            <div className="cima">
                <img data-identifier="game-image" src={imagem} alt={imagem} />
                <div className="direita">
                    <button data-identifier="choose-word" className="botao-comecar" onClick={ComecarJogo}>Escolher Palavra</button>

                    <div data-identifier="word" className={corPalavra}>
                        {preenchendoOsTracinhos.map((p, index) => (<div className="cada-letra" key={index}>{p}</div>))}
                    </div>

                </div>

            </div>

            <div className="baixo">
                <div className="letras">
                    {alfabeto.map((letra, index) => (<button data-identifier="letter" className={clicadas.includes(letra) ? "botao-letra" : "botao-letra habilitado"} key={index} onClick={() => Clicada(letra)} disabled={clicadas.includes(letra) ? true : false} >{letra}</button>))}
                </div>
                <div className="campo-de-chute">
                    <p>Já sei a palavra!</p>
                    <input data-identifier="type-guess" disabled={desabilitaInput} value={chute} onChange={e => setChute(e.target.value)}></input>
                    <button data-identifier="guess-button" className="botao-chute habilitado" onClick={chutar}>Chutar</button>
                </div>
            </div>
        </>
    )
}
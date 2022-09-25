import palavras from "./Palavras";
import alfabeto from "./Alfabeto";
import forca0 from "./assets/forca0.png";
import { useState } from "react";


export default function App() {
    let [palavra, setPalavra] = useState([]);
    let [preenchendoOsTracinhos, setPreenchendoOsTracinhos] = useState([])

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

    }

    console.log(palavra);

    function Clicada(letraClicada) {
        palavra.forEach((p, i) => ((p === letraClicada && preenchendoOsTracinhos[i] === "_") ? (preenchendoOsTracinhos[i] = p) : ""))
        let estouPreenchendo = preenchendoOsTracinhos;
        console.log(estouPreenchendo);
        setPreenchendoOsTracinhos(estouPreenchendo);
    }

    // console.log(preenchendoOsTracinhos);

    return (
        <>
            <div className="cima">
                <img src={forca0} alt={forca0} />
                <div>
                    <button onClick={ComecarJogo}>Escolher Palavra</button>

                    <div className="palavra-adivinhar">
                        {preenchendoOsTracinhos.map((p, index) =>
                        (
                            <div className="cada-letra" key={index}>{p}</div>
                        ))}
                    </div>

                </div>

            </div>

            <div className="baixo">
                <div className="letras">
                    {alfabeto.map((letra, index) => (<button className="botao-letra" key={index} onClick={() => Clicada(letra)}>{letra}</button>))}
                </div>
                <div className="campo-de-chute">
                    <p>Já sei a palavra!</p>
                    <input></input>
                    <button className="botao-chute">Chutar</button>
                </div>
            </div>
        </>
    )
}
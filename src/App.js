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
    const [desabilitabotao, setDesabilitabotao] = useState(true);
    let [imagem, setImagem] = useState(forca0);
    let [contador, setContador] = useState(0);

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

        setDesabilitabotao(false);

        setContador(0);

    }

    console.log(palavra);
    
    function Clicada(letraClicada) {
        palavra.forEach((p, i) => ((p === letraClicada && preenchendoOsTracinhos[i] === "_") ? (preenchendoOsTracinhos[i] = p) : ""))
        let estouPreenchendo = preenchendoOsTracinhos
        //console.log(estouPreenchendo);
        setPreenchendoOsTracinhos(estouPreenchendo);

        setClicadas([...clicadas, letraClicada]);

        if(palavra.includes(letraClicada) === false) {
            setContador(contador + 1);
        }

        console.log(contador);

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
    }

    
    return (
        <>
            <div className="cima">
                <img src={imagem} alt={imagem} />
                <div className="direita">
                    <button className="botao-comecar" onClick={ComecarJogo}>Escolher Palavra</button>

                    <div className="palavra-adivinhar">
                        {preenchendoOsTracinhos.map((p, index) => (<div className="cada-letra" key={index}>{p}</div>))}
                    </div>

                </div>

            </div>

            <div className="baixo">
                <div className="letras">
                    {alfabeto.map((letra, index) => (<button className={clicadas.includes(letra) ? "botao-letra" : "botao-letra habilitado"} key={index} onClick={() => Clicada(letra)} disabled={desabilitabotao} >{letra}</button>))}
                </div>
                <div className="campo-de-chute">
                    <p>Já sei a palavra!</p>
                    <input disabled={desabilitaInput}></input>
                    <button className="botao-chute habilitado">Chutar</button>
                </div>
            </div>
        </>
    )
}
import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const FAQ = () => {
    return (
        <Fragment>
            <Navbar />
            <section id="faq">
                <div className="faq">
                    <h3>FAQ</h3>
                    <div className="faq-item">
                        <div className="faq-question">
                            <p>É possível ver os episódios por player online?</p>
                        </div>
                        <div className="faq-answer">
                            <p>Nós não disponibilizamos e nem pretendemos disponibilizar episódios para assistir online.<br />Nossa fansub somente disponibiliza episódios para download, a serem assistidos por um reprodutor de vídeo em seu próprio dispostivo.<br/>Note-se que, apesar de o vídeo ser reproduzível no drive, o site não é capaz de reproduzir as legendas no vídeo, pois são legendas softsub.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="faq-question">
                            <p>Por que o vídeo/legenda não está funcionando?</p>
                        </div>
                        <div className="faq-answer">
                            <p>Não são todos os reprodutores de vídeo que conseguem rodar os arquivos de vídeo que disponibilizamos.<br />Para computadores, nós recomendamos o uso do player <a href="https://codecguide.com/download_k-lite_codec_pack_standard.htm"  target="_blank" rel="noopener noreferrer">MPC-HC com K-Lite Codec Pack</a> (clique em um dos 3 "Server" para baixar). Para dispositivos mobile, recomendamos que use o VLC Player. Recomendamos estes pois são os mesmos utilizados por nós.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="faq-question">
                            <p>Encontrei um erro na legenda/o link do episódio está fora do ar, o que faço?</p>
                        </div>
                        <div className="faq-answer">
                            <p>Avise-nos do problema, pelo meio que preferir: nosso <a href="https://discord.gg/utZWJya3Zz"  target="_blank" rel="noopener noreferrer">Discord</a> (preferência nossa), pelos comentários de um post ou por nossa aba de <Link to="/contato" className="">contato</Link>.<br />Independentemente do meio utilizado, nos comprometemos a corrigir o erro assim que possível.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="faq-question">
                            <p>Tem um anime que gostaria muito que fizessem, como posso sugeri-lo?</p>
                        </div>
                        <div className="faq-answer">
                            <p>Pode-se sugeri-lo por meio de nosso <a href="https://discord.gg/utZWJya3Zz"  target="_blank" rel="noopener noreferrer">Discord</a> (preferência nossa) ou por outro meio que achar melhor.<br/>Avisamos de antemão que desejamos fazer somente projetos que não foram feitos em português ou não existem em português em boa qualidade/na melhor qualidade disponível. Assim, pedimos que pesquise se o anime que deseja se encaixa em algum desses critérios antes de enviar sua sugestão. Dois sites bons para descobrir isso são o <a href="https://infoanime.com.br/"  target="_blank" rel="noopener noreferrer">Info Anime</a> e o <a href="https://anidb.net/"  target="_blank" rel="noopener noreferrer">AniDB</a>.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="faq-question">
                            <p>Como posso apoiá-los?</p>
                        </div>
                        <div className="faq-answer">
                            <p>Por mais clichê que pareça, agradecimentos e elogios nos estimulam bastante a continuar produzindo. Se deseja apoiar-nos financeiramente, visite nossa aba de <Link to="/doar" className="">doações</Link>.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="faq-question">
                            <p>Tenho interesse em participar da fansub, o que faço?</p>
                        </div>
                        <div className="faq-answer">
                            <p>Estamos sempre dispostos a aceitar novas pessoas que desejam contribuir em nossos projetos.<br/>Fale conosco por meio de nosso <a href="https://discord.gg/utZWJya3Zz"  target="_blank" rel="noopener noreferrer">Discord</a> ou por nossa aba de <Link to="/contato" className="">contato</Link>, que poderemos trocar uma ideia.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default FAQ;
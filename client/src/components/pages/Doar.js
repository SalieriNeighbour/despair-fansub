import React, {Fragment} from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

import pixQR from '../img/pixQR.png';
import picpayQR from '../img/picpayQR.png';

const Doar = () => {
    return (
        <Fragment>
            <Navbar />
            <section id="doar">
                <div className="doar">
                    <h3>Apoie-nos</h3>
                    <p>A Despair Fansub não existe por intenção de gerar lucros, mas por mera vontade nossa de trazer ao público brasileiro conteúdo de qualidade que é inacessível a muitos por barreira de linguagem. Todo mês, gastamos 7 dólares no servidor de nosso website, além de um gasto anual de 9 doláres pelo domínio do site. Todos esses gastos saem do nosso bolso. Com isso em mente, aceitamos doações, com a intenção única de cobrir esses gastos.<br/>Ao doar qualquer valor, envie-nos um comprovante pelo Discord ou pelo formulário de contato, que lhe colocaremos na lista de contribuidores. Caso recebamos uma doação sem envio de comprovante, será considerada uma doação anônima.<br/>Caso prefira doar por outro meio além dos dispostos aqui, entre em contato conosco.</p>
                    <div className="donation">
                        <div className="donation-list">
                            <h5>Lista de Contribuidores</h5>
                            <p>Ainda não há contribuidores. Seja o primeiro!</p>
                        </div>
                        <div className="donation-methods">
                            <div className="donate-card">
                                <h5>PIX</h5>
                                <div className="pix-img"><img src={pixQR} alt="" /></div>
                                <p>6629d322-584d-468f-a2e0-e78aec34aa38</p>
                            </div>
                            <div className="donate-card">
                                <h5>PicPay</h5>
                                <div className="picpay-img"><img src={picpayQR} alt="" /></div>
                                <a href="https://picpay.me/spibecquerel">https://picpay.me/spibecquerel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default Doar;
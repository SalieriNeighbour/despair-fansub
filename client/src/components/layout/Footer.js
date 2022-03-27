import React from 'react';

const Footer = () => {
    return(
        <footer id="footer" className="footer">
            <p>Despair Fansub © 2021-2022</p>
            <p>Site por Salieri</p>
            <div className="footer-icons">
                <a href="https://twitter.com/despairfansub"  target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a href="https://discord.gg/M9pEhPWWkN"  target="_blank" rel="noopener noreferrer"><i className="fab fa-discord"></i></a>
            </div>
        </footer>
    );
}

export default Footer;
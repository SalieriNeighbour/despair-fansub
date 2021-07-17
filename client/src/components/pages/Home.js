import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const Home = () => {
    return(
        <Fragment>
            <Navbar />
            <section id="home">
                <div className="home-grid-container">
                    <div className="home-main">
                        <div className="main-header">
                            <div className="main-header-text">
                                <h2>Novas Postagens</h2>
                            </div>
                        </div>
                        <div className="posts-grid">
                            <div className="post">
                                <Link><img src="https://i.imgur.com/SJ1xHba.jpeg" alt="" /></Link>
                                <Link><p>Magical Nyan Nyan Taruto - 09</p></Link>
                                <Link><span>16 jul 2021</span></Link>
                            </div>
                            <div className="post">
                                <Link><img src="https://cdn.discordapp.com/attachments/813986653709926432/865790522727202837/KitsuneFansubber_Hakumei_to_Mikochi_-_02_720pHDTV.mkv_snapshot_21.34.367.png" alt="" /></Link>
                                <Link><p>Hakumei to Mikochi - 02</p></Link>
                                <Link><span>13 jul 2021</span></Link>
                            </div>
                            <div className="post">
                                <Link><img src="https://cdn.discordapp.com/attachments/813986653709926432/865790528574062592/FUCKILL_Lupin_III_Part_II_-_001_720p.mkv_snapshot_04.51_2021.02.04_14.08.12.jpg" alt="" /></Link>
                                <Link><p>Lupin III Part II - 01</p></Link>
                                <Link><span>11 jul 2021</span></Link>
                            </div>
                            <div className="post">
                                <Link><img src="https://cdn.discordapp.com/attachments/813986653709926432/865790545762582588/AnimesPLUS_Les_Miserables_Shoujo_Cosette_21_HDTV720p33F26BEC.mkv_snapshot_05.03.836.png" alt="" /></Link>
                                <Link><p>Shoujo Cosette - 21</p></Link>
                                <Link><span>06 jul 2021</span></Link>
                            </div>
                            <div className="post">
                                <Link><img src="https://cdn.discordapp.com/attachments/813986653709926432/865790555183120444/npz_Hi_no_Tori_01_US_BD_1080p_42850851.mkv_snapshot_12.32.576.png" alt="" /></Link>
                                <Link><p>Hi no Tori - 01</p></Link>
                                <Link><span>01 jul 2021</span></Link>
                            </div>
                            <div className="post">
                                <Link><img src="https://cdn.discordapp.com/attachments/813986653709926432/865790558433706004/AnimeNSK_Hayate_no_Gotoku_-_23_Blu-Ray_1920x1080_HEVC_10Bit_395409DC.mkv_snapshot_14.54_2021.04.27_2.png" alt="" /></Link>
                                <Link><p>Hayate no Gotoku - 23</p></Link>
                                <Link><span>29 jun 2021</span></Link>
                            </div>
                            <div className="post">
                                <Link><img src="https://cdn.discordapp.com/attachments/813986653709926432/865790541077938216/Moozzi2_Tamayura_More_Aggressive_-_02_BD_1920x1080_x.264_2Audio.mkv_snapshot_15.15_2021.04.21_00.34..png" alt="" /></Link>
                                <Link><p>Tamayura - 02</p></Link>
                                <Link><span>26 jun 2021</span></Link>
                            </div>
                            <div className="post">
                                <Link><img src="https://cdn.discordapp.com/attachments/813986653709926432/865790559170592768/DBGyakkyou_Burai_Kaiji_Ultimate_Survivor_-_07_10bit_BD1080p_x265.mkv_snapshot_03.36_2021.05.22_15.36.png" alt="" /></Link>
                                <Link><p>Kaiji - 07</p></Link>
                                <Link><span>24 jun 2021</span></Link>
                            </div>
                            <div className="post">
                                <Link><img src="https://media.discordapp.net/attachments/813986653709926432/865790560539508747/AI-Raws_HD_01__H264_10bit_1584x1080_AACA25ED7B1.mkv_snapshot_16.45.699.png" alt="" /></Link>
                                <Link><p>Mahoujin Guru Guru - 01</p></Link>
                                <Link><span>20 jun 2021</span></Link>
                            </div>
                        </div>
                    </div>
                    <div className="home-sidebar">
                        <div className="sidebar-header">
                            <h2>Tags</h2>
                        </div>
                        <div className="home-sidebar-contents">
                            <div className="home-sidebar-item"><p><i class="fas fa-angle-right"></i> Hakumei to Mikochi</p> <span>2</span></div>
                            <div className="home-sidebar-item"><p><i class="fas fa-angle-right"></i> Hayate no Gotoku</p> <span>23</span></div>
                            <div className="home-sidebar-item"><p><i class="fas fa-angle-right"></i> Hi no Tori</p> <span>1</span></div>
                            <div className="home-sidebar-item"><p><i class="fas fa-angle-right"></i> Kaiji</p> <span>7</span></div>
                            <div className="home-sidebar-item"><p><i class="fas fa-angle-right"></i> Lupin III Part II</p> <span>1</span></div>
                            <div className="home-sidebar-item"><p><i class="fas fa-angle-right"></i> Magical Nyan Nyan Taruto</p> <span>9</span></div>
                            <div className="home-sidebar-item"><p><i class="fas fa-angle-right"></i> Mahoujin Guru Guru</p> <span>1</span></div>
                            <div className="home-sidebar-item"><p><i class="fas fa-angle-right"></i> Shoujo Cosette</p> <span>21</span></div>
                            <div className="home-sidebar-item"><p><i class="fas fa-angle-right"></i> Tamayura</p> <span>2</span></div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default Home;
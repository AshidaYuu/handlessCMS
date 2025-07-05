export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <a href="/">
                <h2 className="footer-brand">KANAUUU</h2>
                <p className="footer-company">合同会社Kanauuu</p>
              </a>
            </div>
          </div>
          
          <div className="footer-right">
            <div className="footer-nav">
              <div className="footer-nav-column">
                <ul>
                  <li><a href="#">TOP<span className="divider"></span><span>トップ</span></a></li>
                  <li><a href="#about-section">ABOUT<span className="divider"></span><span>私たちについて</span></a></li>
                  <li><a href="#mission-section">OUR CORE<span className="divider"></span><span>私たちの軸</span></a></li>
                  <li><a href="#projects-section">PROJECTS<span className="divider"></span><span>プロジェクト</span></a></li>
                </ul>
              </div>
              <div className="footer-nav-column">
                <ul>
                  <li><a href="#news-section">NEWS<span className="divider"></span><span>お知らせ</span></a></li>
                  <li><a href="#team-section">OUR TEAM<span className="divider"></span><span>私たちのチーム</span></a></li>
                  <li><a href="#contact-section">CONTACT<span className="divider"></span><span>お問い合わせ</span></a></li>
                  <li><a href="#">PRIVACY<span className="divider"></span><span>個人情報保護方針</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">©Kanauuu Co., Ltd.</p>
            <a href="#" className="footer-privacy">個人情報保護方針</a>
          </div>
          <div className="footer-url">
            <span>https://www.kanauuu.com</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
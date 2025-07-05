import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import { sanityClient, queries } from '@/lib/sanity'
import { Post } from '@/types'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kanauuu - 地方から夢は叶う',
  description: '地方から挑戦する人々の背中を押し、夢を叶える土壌をつくる。大崎の子どもたちと企業、そして地域そのものの未来を共創します。',
  keywords: 'Kanauuu, 大崎, 地方創生, 教育, 学習塾, プログラミング, AI, 地域活性化',
}

async function getLatestPosts(): Promise<Post[]> {
  try {
    const posts = await sanityClient.fetch(queries.latestPosts(4))
    return posts || []
  } catch {
    console.error('Failed to fetch posts')
    return []
  }
}

export default async function HomePage() {
  const latestPosts = await getLatestPosts()

  return (
    <Layout>
      {/* Main Visual Section */}
      <section id="main-visual">
        <div className="mv-background-slider">
          <div className="mv-slide active" style={{ backgroundImage: 'url(/assets/images/mv-slideimg1.jpg)' }}></div>
          <div className="mv-slide" style={{ backgroundImage: 'url(/assets/images/mv-slideimg2.jpg)' }}></div>
          <div className="mv-slide" style={{ backgroundImage: 'url(/assets/images/mv-slideimg3.jpg)' }}></div>
          <div className="mv-slide" style={{ backgroundImage: 'url(/assets/images/mv-slideimg4.jpg)' }}></div>
          <div className="mv-slide" style={{ backgroundImage: 'url(/assets/images/mv-slideimg5.jpg)' }}></div>
        </div>
        
        <div className="mv-overlay"></div>
        
        <div className="mv-container">
          <div className="mv-content">
            <h1 className="mv-title">
              <span className="main-text">地方から夢は叶う</span>
              <div className="title-with-progress">
                <span className="sub-text show">KANAUUU</span>
                <div className="slide-progress-line horizontal">
                  <div className="slide-progress-bar"></div>
                </div>
              </div>
            </h1>
            <div className="mv-description">
              <p className="description">地方から挑戦する人々の背中を押し、<br />夢を叶える土壌をつくる</p>
              <p className="mv-mission">大崎の子どもたちと企業、そして地域そのものの未来を共創します</p>
              
              <div className="slide-dots horizontal">
                <div className="slide-dot active" data-slide="0"></div>
                <div className="slide-dot" data-slide="1"></div>
                <div className="slide-dot" data-slide="2"></div>
                <div className="slide-dot" data-slide="3"></div>
                <div className="slide-dot" data-slide="4"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>SCROLL</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section">
        <div className="about-container">
          <div className="about-header">
            <span className="section-label">ABOUT</span>
            <span className="section-subtitle">私たちについて</span>
          </div>
          
          <div className="about-content">
            <div className="about-main-title">
              <h2 className="large-title">
                <span className="title-line">大崎から未来をつくる、</span><br />
                <span className="title-line title-highlight">挑戦のエコシステム</span>
              </h2>
            </div>
            
            <div className="about-description-section">
              <p className="about-description">子どもも大人も、どこにいても最新の学びとテクノロジーにアクセスできる社会。教育現場・企業・クリエイターがつながり、アイデアが循環する場所。私たちは地方から新しい価値を生み出し続けます。</p>
            </div>
            
            <div className="about-circles-section">
              <div className="circles-container">
                <div className="circle-item mission-circle">
                  <div className="circle-content">
                    <h3>MISSION</h3>
                    <p>挑戦する人の背中を押し、<br />夢を叶える土壌をつくる</p>
                  </div>
                </div>
                <div className="circle-item vision-circle">
                  <div className="circle-content">
                    <h3>VISION</h3>
                    <p>地方発イノベーションの<br />交差点になる</p>
                  </div>
                </div>
                <div className="circle-item value-circle">
                  <div className="circle-content">
                    <h3>VALUE</h3>
                    <p>Warm<br />Future<br />Local Pride</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="about-cta">
              <a href="#" className="view-more-btn">
                <span>COMING SOON</span>
                <div className="btn-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission-section">
        <div className="mission-container">
          <div className="section-header">
            <span className="section-label">OUR CORE</span>
            <span className="section-subtitle">私たちの軸</span>
          </div>
          
          <div className="mission-content-wrapper">
            <div className="mission-visual">
              <div className="mission-images">
                <div className="mission-image mission-img-1 active">
                  <div className="image-placeholder mission-bg"></div>
                </div>
                <div className="mission-image mission-img-2">
                  <div className="image-placeholder vision-bg"></div>
                </div>
                <div className="mission-image mission-img-3">
                  <div className="image-placeholder value-bg"></div>
                </div>
              </div>
            </div>
            
            <div className="mission-details">
              <div className="mission-item active">
                <div className="item-header">
                  <div className="item-header-content">
                    <h3>MISSION</h3>
                    <div className="mobile-mini-image mission-bg"></div>
                  </div>
                  <div className="expand-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="item-content">
                  <h4>「挑戦する人の背中を押し、夢を叶える土壌をつくる」</h4>
                  <p>子どもも大人も、どこにいても、最新の学びとテクノロジーにアクセスできる社会を大崎から広げます。</p>
                </div>
              </div>
              
              <div className="mission-item">
                <div className="item-header">
                  <div className="item-header-content">
                    <h3>VISION</h3>
                    <div className="mobile-mini-image vision-bg"></div>
                  </div>
                  <div className="expand-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="item-content">
                  <h4>&ldquo;地方発イノベーションの交差点になる&rdquo;</h4>
                  <p>教育現場・企業・クリエイターがつながり、アイデアが循環する&ldquo;挑戦のエコシステム&rdquo;を育みます。</p>
                </div>
              </div>
              
              <div className="mission-item">
                <div className="item-header">
                  <div className="item-header-content">
                    <h3>VALUE</h3>
                    <div className="mobile-mini-image value-bg"></div>
                  </div>
                  <div className="expand-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="item-content">
                  <h4>「Warm - Future - Local Pride」</h4>
                  <div className="value-simple">
                    <p><strong>1) 伴走者として寄り添う温かさ</strong></p>
                    <p><strong>2) 常に一歩先を取り入れる未来志向</strong></p>
                    <p><strong>3) 故郷を誇り、地域と共に歩む姿勢</strong></p>
                  </div>
                </div>
              </div>
              
              <div className="view-more-section">
                <a href="#" className="view-more-btn">
                  <span>COMING SOON</span>
                  <div className="btn-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <div className="section-header">
              <span className="section-label">PROJECTS</span>
              <span className="section-subtitle">プロジェクト</span>
            </div>
            
            <div className="projects-description">
              <p>地方から生まれる新しい価値創造。教育・技術・地域をつなぎ、<br />大崎から未来を切り拓く5つの挑戦をご紹介します。</p>
            </div>
            
            <div className="nav-buttons">
              <button className="nav-btn prev-btn" aria-label="前へ">←</button>
              <button className="nav-btn next-btn" aria-label="次へ">→</button>
            </div>
          </div>
          
          <div className="projects-gallery">
            <div className="gallery-track">
              <div className="project-card card-1">
                <div className="card-image">
                  <div className="card-text-content">
                    <div className="main-heading">学習塾</div>
                  </div>
                  <div className="sub-heading">Learning</div>
                  <div className="bottom-caption">AIが一人ひとりの弱点を分析し、最短ルートで&ldquo;わかった！&rdquo;へ導きます。</div>
                  <div className="card-button">
                    <span>→</span>
                  </div>
                </div>
              </div>
              
              <div className="project-card card-2">
                <div className="card-image">
                  <div className="card-text-content">
                    <div className="main-heading">プログラミングスクール</div>
                  </div>
                  <div className="sub-heading">Programming</div>
                  <div className="bottom-caption">マインクラフトの世界で&ldquo;遊び&rdquo;ながら論理的思考と創造力を育成。</div>
                  <div className="card-button">
                    <span>→</span>
                  </div>
                </div>
              </div>
              
              <div className="project-card card-3">
                <div className="card-image">
                  <div className="card-text-content">
                    <div className="main-heading">ピアノ教室</div>
                  </div>
                  <div className="sub-heading">Piano</div>
                  <div className="bottom-caption">小学生中心。音楽で培う表現力が、学びへの自信を育みます。</div>
                  <div className="card-button">
                    <span>→</span>
                  </div>
                </div>
              </div>
              
              <div className="project-card card-4">
                <div className="card-image">
                  <div className="card-text-content">
                    <div className="main-heading">Web制作・SNS運用</div>
                  </div>
                  <div className="sub-heading">Digital</div>
                  <div className="bottom-caption">製作費0円、月9,000円から。地元企業の&ldquo;顔&rdquo;をアップデートし、ファンが集まるブランドへ。</div>
                  <div className="card-button">
                    <span>→</span>
                  </div>
                </div>
              </div>
              
              <div className="project-card card-5">
                <div className="card-image">
                  <div className="card-text-content">
                    <div className="main-heading">AI・NANDE</div>
                  </div>
                  <div className="sub-heading">Medical AI</div>
                  <div className="bottom-caption">地方発・看護領域特化AIアプリ 現場の声から生まれた実用機能で、忙しい医療スタッフの判断を支援します</div>
                  <div className="card-button">
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="projects-cta">
            <a href="#" className="view-more-btn">
              <span>COMING SOON</span>
              <div className="btn-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news-section">
        <div className="news-container">
          <div className="news-layout">
            <div className="news-left">
              <div className="section-header">
                <span className="section-label">NEWS</span>
                <span className="section-subtitle">お知らせ</span>
              </div>
              
              <div className="news-description">
                <p>地域とともに歩む最新の取り組みや成果、<br />イベント情報をお伝えします。</p>
              </div>
              
              <Link href="/news" className="view-more-btn news-view-all">
                <span>VIEW ALL</span>
                <div className="btn-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </div>
            
            <div className="news-right">
              <div className="news-list">
                {latestPosts.length > 0 ? (
                  latestPosts.map((post) => (
                    <Link key={post._id} href={`/news/${post.slug.current}`} className="news-item">
                      <time className="news-date">
                        {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }).replace(/\//g, '.')}
                      </time>
                      <h3 className="news-title-item">{post.title}</h3>
                    </Link>
                  ))
                ) : (
                  <div className="news-fallback">
                    <article className="news-item">
                      <time className="news-date">2025.6.06</time>
                      <h3 className="news-title-item">地域向け1Dayプログラミング体験会を開催しました</h3>
                    </article>
                    
                    <article className="news-item">
                      <time className="news-date">2025.4.25</time>
                      <h3 className="news-title-item">ゴールデンウィーク期間中の休業日について</h3>
                    </article>
                    
                    <article className="news-item">
                      <time className="news-date">2025.4.16</time>
                      <h3 className="news-title-item">看護AI「NANDE」β版リリース記念セミナー開催について</h3>
                    </article>
                    
                    <article className="news-item">
                      <time className="news-date">2025.4.10</time>
                      <h3 className="news-title-item">地域企業のWebブランディング支援プロジェクト始動</h3>
                    </article>
                  </div>
                )}
              </div>
              
              <Link href="/news" className="view-more-btn news-view-all-mobile">
                <span>VIEW ALL</span>
                <div className="btn-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team-section">
        <div className="team-bg-animation">
          <object className="osaki-outline" data="/assets/images/osaki_outline_single.svg" type="image/svg+xml"></object>
        </div>
        <div className="team-container">
          <div className="team-content">
            <div className="team-info">
              <div className="section-header">
                <span className="section-label">OUR TEAM</span>
                <span className="section-subtitle">私たちのチーム</span>
              </div>
              
              <div className="team-description">
                <h3 className="team-title">「地方だからこそ、やる価値がある。」</h3>
                <p>東日本大震災後に立ち上げたボランティア塾が、Kanauuu の原点。教育者・エンジニア・クリエイターの多彩なチームが、今日も大崎から世界へ挑みます。</p>
              </div>
              
              <a href="#" className="view-more-btn team-view-more">
                <span>COMING SOON</span>
                <div className="btn-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </div>
          </div>
          
          <div className="team-gallery">
            <div className="gallery-row gallery-row-left">
              <div className="team-image">
                <img src="/assets/images/team-img3.jpeg" alt="Team member 1" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img4.jpeg" alt="Team member 2" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img1.jpg" alt="Team member 3" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img5.jpeg" alt="Team member 4" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img2.jpg" alt="Team member 5" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img6.jpeg" alt="Team member 1" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img7.jpeg" alt="Team member 2" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img8.jpeg" alt="Team member 3" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img9.jpeg" alt="Team member 4" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img10.jpeg" alt="Team member 5" />
              </div>
            </div>
            
            <div className="gallery-row gallery-row-right">
              <div className="team-image">
                <img src="/assets/images/team-img6.jpeg" alt="Team member 1" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img7.jpeg" alt="Team member 2" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img8.jpeg" alt="Team member 3" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img9.jpeg" alt="Team member 4" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img10.jpeg" alt="Team member 5" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img3.jpeg" alt="Team member 1" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img4.jpeg" alt="Team member 2" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img1.jpg" alt="Team member 3" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img5.jpeg" alt="Team member 4" />
              </div>
              <div className="team-image">
                <img src="/assets/images/team-img2.jpg" alt="Team member 5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section">
        <div className="contact-container">
          <div className="contact-content">
            <div className="contact-info">
              <div className="section-header">
                <span className="section-label contact-label">CONTACT</span>
                <span className="section-subtitle contact-subtitle">お問い合わせ</span>
              </div>
              
              <div className="contact-description">
                <p>私たちへのご質問、お仕事に関するご相談は、お気軽にお問い合わせページよりお気軽にご連絡ください。</p>
              </div>
            </div>
            
            <div className="contact-button-wrapper">
              <a href="#" className="contact-circle-btn">
                <span className="contact-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
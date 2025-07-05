import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import LoadingScreen from '@/components/LoadingScreen'
import HeroSlider from '@/components/HeroSlider'
import MissionSection from '@/components/MissionSection'
import ProjectsSection from '@/components/ProjectsSection'
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
    <>
      <LoadingScreen />
      <Layout>
        {/* Main Visual Section */}
        <HeroSlider />

        {/* About Section */}
        <section id="about-section">
          <div className="about-container">
            <div className="about-header">
              <span className="section-label">ABOUT</span>
              <span className="section-subtitle">私たちについて</span>
            </div>
            
            <div className="about-content">
              {/* 大きなタイトル（スクロール連動） */}
              <div className="about-main-title" data-scroll-reveal>
                <h2 className="large-title">
                  <span className="title-line">大崎から未来をつくる、</span><br />
                  <span className="title-line title-highlight">挑戦のエコシステム</span>
                </h2>
              </div>
              
              {/* 説明文 */}
              <div className="about-description-section" data-scroll-reveal>
                <p className="about-description">子どもも大人も、どこにいても最新の学びとテクノロジーにアクセスできる社会。教育現場・企業・クリエイターがつながり、アイデアが循環する場所。私たちは地方から新しい価値を生み出し続けます。
                </p>
              </div>
              
              {/* 円形MISSION/VISION/VALUE */}
              <div className="about-circles-section" data-scroll-reveal>
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
              
              <div className="about-cta" data-scroll-reveal>
                <a href="#" className="view-more-btn-dark">
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

        {/* Mission Section - OUR CORE */}
        <MissionSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* News Section - Sanity連携を維持 */}
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
                
                <a href="/news" className="view-more-btn-dark news-view-all">
                  <span>VIEW ALL</span>
                  <div className="btn-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </a>
              </div>
              
              <div className="news-right">
                <div className="news-list" id="news-list">
                  {/* ローディング表示 */}
                  <div 
                    className="news-loading" 
                    id="news-loading" 
                    style={{ display: latestPosts.length > 0 ? 'none' : 'block' }}
                  >
                    <p>ニュースを読み込み中...</p>
                  </div>
                  
                  {/* Sanityからのデータで動的に生成される */}
                  {latestPosts.length > 0 ? (
                    latestPosts.map((post) => (
                      <article key={post._id} className="news-item">
                        <time className="news-date">
                          {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          }).replace(/\//g, '.')}
                        </time>
                        <h3 className="news-title-item">
                          <Link href={`/news/${post.slug.current}`}>
                            {post.title}
                          </Link>
                        </h3>
                      </article>
                    ))
                  ) : (
                    /* フォールバック用の静的ニュース（Sanity接続エラー時に表示） */
                    <div className="news-fallback" id="news-fallback">
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
                
                <a href="/news" className="view-more-btn-dark news-view-all-mobile">
                  <span>VIEW ALL</span>
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

        {/* Team Section */}
        <section id="team-section">
          <div className="team-bg-animation">
            <object className="osaki-outline" data="/assets/images/osaki_outline_single.svg" type="image/svg+xml" id="osaki-svg-object"></object>
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
                
                <a href="#" className="view-more-btn-white team-view-more">
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
                  <img src="/assets/images/team-img1.JPG" alt="Team member 3" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img5.jpeg" alt="Team member 4" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img2.JPG" alt="Team member 5" />
                </div>
                {/* 複製用 */}
                <div className="team-image">
                  <img src="/assets/images/team-img6.jpeg" alt="Team member 6" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img7.jpeg" alt="Team member 7" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img8.jpeg" alt="Team member 8" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img9.jpeg" alt="Team member 9" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img10.jpeg" alt="Team member 10" />
                </div>
              </div>
              
              <div className="gallery-row gallery-row-right">
                {/* 複製用 */}
                <div className="team-image">
                  <img src="/assets/images/team-img6.jpeg" alt="Team member 6" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img7.jpeg" alt="Team member 7" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img8.jpeg" alt="Team member 8" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img9.jpeg" alt="Team member 9" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img10.jpeg" alt="Team member 10" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img3.jpeg" alt="Team member 1" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img4.jpeg" alt="Team member 2" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img1.JPG" alt="Team member 3" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img5.jpeg" alt="Team member 4" />
                </div>
                <div className="team-image">
                  <img src="/assets/images/team-img2.JPG" alt="Team member 5" />
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
    </>
  )
}
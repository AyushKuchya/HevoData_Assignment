import { useState, useEffect, useRef } from "react"
import SecurityFeatureCard from "./component/SecurityFeatureCard"
import { Users, Globe, Shield, Search } from "lucide-react"
import './App.css'

export default function App() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [revealedCards, setRevealedCards] = useState([])
  const [allCardsRevealed, setAllCardsRevealed] = useState(false)
  const autoPlayTimeoutRef = useRef(null)

  const securityFeatures = [
    {
      id: 1,
      title: "Role based access control",
      icon: <Users className="w-6 h-6 text-purple-600" />,
    },
    {
      id: 2,
      title: "Run pipelines in the region of your choice",
      icon: <Globe className="w-6 h-6 text-gray-700" />,

    },
    {
      id: 3,
      title: "Compliance that you can trust",
      icon: <Shield className="w-6 h-6 text-gray-700" />,

    },

  ]

  useEffect(() => {
    const revealInterval = 800;

    const orderedIds = [1, 2, 3];

    orderedIds.forEach((id, index) => {
      setTimeout(() => {
        setRevealedCards(prev => [...prev, id]);

        if (id === orderedIds[orderedIds.length - 1]) {
          setAllCardsRevealed(true);
        }
      }, (index) * revealInterval);
    });

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (allCardsRevealed && isAutoPlaying) {
      setActiveFeatureIndex(0);
      startAutoPlay();
    }
  }, [allCardsRevealed, isAutoPlaying]);

  const startAutoPlay = () => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current)
    }

    autoPlayTimeoutRef.current = setTimeout(() => {
      setActiveFeatureIndex((prevIndex) => (prevIndex + 1) % securityFeatures.length)
    }, 5000)
  }

  useEffect(() => {
    if (isAutoPlaying && activeFeatureIndex !== null && allCardsRevealed) {
      startAutoPlay()
    }

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current)
      }
    }
  }, [activeFeatureIndex, isAutoPlaying, allCardsRevealed])

  const handleCardClick = (index) => {
    setActiveFeatureIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <main className="main-container">
      <div className="content-container">
        <div className="grid-layout">

          <div className="left-section">
            <h1 className="page-title">Get enterprise-grade security</h1>
            <p className="page-description">
              Regulate and control pipeline acces across your team. Configure the data plane region as per your need.
            </p>

            <div className="feature-cards-container">
              {securityFeatures.map((feature, index) => (
                <SecurityFeatureCard
                  key={feature.id}
                  feature={feature}
                  isActive={index === activeFeatureIndex}
                  isRevealed={revealedCards.includes(feature.id)}
                  onClick={() => handleCardClick(index)}
                  onAnimationComplete={() => {
                    if (isAutoPlaying) {
                      setActiveFeatureIndex((prevIndex) => (prevIndex + 1) % securityFeatures.length)
                    }
                  }}
                />
              ))}
            </div>
          </div>


          <div className="right-section">
            <div className="feature-content">
              {securityFeatures.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`feature-content-panel ${index === activeFeatureIndex ? "visible" : "hidden"
                    }`}
                >
                  {index === 0 && (
                    <div className="white-panel">
                      <div className="card-header">
                        <div className="user-count">25 User(s) found</div>
                        <div className="flex items-center">
                          <Search className=" text-gray-400" />
                        </div>
                      </div>


                      <div className="user-list">

                        <div className="user-item">
                          <div className="user-info">
                            <div className="user-avatar avatar-purple">
                              J
                            </div>
                            <div>
                              <div className="user-name">John Smith (You)</div>
                              <div className="user-email">john.smith@example.com</div>
                            </div>
                          </div>
                          <div className="user-role">Team Administrator +1</div>
                        </div>


                        <div className="user-item">
                          <div className="user-info">
                            <div className="user-avatar avatar-yellow">
                              J
                            </div>
                            <div>
                              <div className="user-name">Jane Doe</div>
                              <div className="user-email">jane.doe@example.com</div>
                            </div>
                          </div>
                          <div className="user-role">Team Administrator +1</div>
                        </div>


                        <div className="user-item">
                          <div className="user-info">
                            <div className="user-avatar avatar-blue">
                              A
                            </div>
                            <div>
                              <div className="user-name">Arthur Taylor</div>
                              <div className="user-email">arthur.taylor@example.com</div>
                            </div>
                          </div>
                          <div className="tag-container">
                            <div className="tag tag-blue">
                              Team Administrator
                            </div>
                          </div>
                        </div>


                        <div className="user-item">
                          <div className="user-info">
                            <div className="user-avatar avatar-cyan">
                              S
                            </div>
                            <div>
                              <div className="user-name">Sophia Williams</div>
                              <div className="user-email">sophia.williams@example.com</div>
                            </div>
                          </div>
                          <div className="tag-container">
                            <div className="tag tag-green">
                              Observer
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {index === 1 && (
                    <div className="white-panel">
                      <div className="region-panel">
                        <div className="region-icon">
                          <Globe className="w-16 h-16 text-gray" />
                        </div>
                        <h3 className="region-title">Region Selection</h3>
                        <div className="regions-grid">
                          <div className="region-option">

                            <span>US East </span>
                          </div>
                          <div className="region-option">
                            <span>US West </span>
                          </div>
                          <div className="region-option">
                            <span>EU </span>
                          </div>
                          <div className="region-option">
                            <span>India </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="white-panel">
                      <div className="compliance-dashboard">
                        <h3 className="dashboard-title">Compliance Dashboard</h3>
                        <div className="compliance-items">
                          <div className="compliance-item">
                            <div className="compliance-header">
                              <div className="compliance-name">
                                <Shield className="compliance-icon status-green" />
                                <span className="font-medium"> Compliance</span>
                              </div>
                              <span className="compliance-status status-green">Compliant</span>
                            </div>
                          </div>
                          <div className="compliance-item">
                            <div className="compliance-header">
                              <div className="compliance-name">
                                <Shield className="compliance-icon status-green" />
                                <span className="font-medium"> Compliance</span>
                              </div>
                              <span className="compliance-status status-green">Compliant</span>
                            </div>
                          </div>
                          <div className="compliance-item">
                            <div className="compliance-header">
                              <div className="compliance-name">
                                <Shield className="compliance-icon status-green" />
                                <span className="font-medium"> Compliance</span>
                              </div>
                              <span className="compliance-status status-green">Compliant</span>
                            </div>
                          </div>
                          <div className="compliance-item">
                            <div className="compliance-header">
                              <div className="compliance-name">
                                <Shield className="compliance-icon status-yellow" />
                                <span className="font-medium"> Compliance</span>
                              </div>
                              <span className="compliance-status status-yellow">In Progress</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
